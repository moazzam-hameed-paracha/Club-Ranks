import {
  PrismaClient,
  Class as ClassType,
  User as UserType,
} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  cosineSimilarity,
  getEmbeddings,
  getGPTPrompt,
} from "@src/utils/helpers";
import OpenAI from "openai";
import { omit } from "lodash";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ClassGetRes = {
  classes: Omit<ClassType, "embedding">[];
};

export type ClassPostReq = ClassGetRes;

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ClassGetRes | ClassPostReq | { error: unknown }>
) => {
  const currUser = JSON.parse(req.cookies["userData"] || "{}") as UserType;
  const isLoggedIn = Boolean(currUser?.id?.length);

  if (req.method === "GET") {
    try {
      const classes = await prisma.class.findMany({
        select: {
          classCode: true,
          classExplanation: true,
          className: true,
          id: true,
          professorName: true,
          prompt: true,
          similarity: true,
        },
      });

      if (!isLoggedIn) {
        return res.json({ classes: classes.slice(0, 5) });
      }

      res.json({ classes });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume, interests } = JSON.parse(req.body);

    const str = interests?.length ? resume + " " + interests : resume;

    const resumeEmbeddings = await getEmbeddings(str, openai);
    
    const classes = (await prisma.class.findMany())
      .map((_class) => {
        const similarity = cosineSimilarity(
          _class.embedding as number[],
          resumeEmbeddings.data[0].embedding
        );

        return {
          ..._class,
          similarity,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const prompt = await getGPTPrompt(
      classes.map((_class) => ({
        name: _class.className,
        description: _class.classExplanation || "",
      })),
      resume,
      "class",
      openai
    );

    const finalData = classes.slice(0, prompt.length).map((_class, index) => ({
      ...omit(_class, ["embedding"]),
      prompt: prompt[index].content,
    }));

    await prisma.analytics.create({
      data: {
        resume,
        type: "class",
        results: finalData,
        user: isLoggedIn
          ? {
              connect: {
                id: currUser?.id,
              },
            }
          : undefined,
      },
    });

    if (!isLoggedIn) {
      return res.json({ classes: [finalData[finalData.length - 1]] });
    }

    return res.json({ classes: finalData });
  }
};
