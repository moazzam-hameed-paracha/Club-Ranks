import { PrismaClient, Class as ClassType } from "@prisma/client";
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

      res.json({ classes });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume } = JSON.parse(req.body);

    const resumeEmbeddings = await getEmbeddings(resume, openai);
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
      },
    });

    return res.json({ classes: finalData });
  }
};
