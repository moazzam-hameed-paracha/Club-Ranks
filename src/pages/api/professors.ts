import {
  PrismaClient,
  Professor as ProfessorType,
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

export type ProfessorGetRes = {
  professors: Omit<ProfessorType, "embedding">[];
};

export type ProfessorPostReq = ProfessorGetRes;

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ProfessorGetRes | ProfessorPostReq | { error: unknown }>
) => {
  const currUser = JSON.parse(req.cookies["userData"] || "{}") as UserType;
  const isLoggedIn = Boolean(currUser?.id?.length);

  if (req.method === "GET") {
    try {
      const professors = await prisma.professor.findMany({
        select: {
          department: true,
          id: true,
          name: true,
          researchDescription: true,
          researchTitle: true,
          title: true,
          similarity: true,
          prompt: true,
        },
      });

      if (!isLoggedIn) {
        return res.json({ professors: professors.slice(0, 5) });
      }

      res.json({ professors });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume, interests } = JSON.parse(req.body);

    const str = interests?.length ? resume + " " + interests : resume;

    const resumeEmbeddings = await getEmbeddings(str, openai);

    const professors = (await prisma.professor.findMany())
      .map((professor) => {
        const similarity = cosineSimilarity(
          professor.embedding as number[],
          resumeEmbeddings.data[0].embedding
        );

        return {
          ...professor,
          similarity,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const prompt = await getGPTPrompt(
      professors.map((professor) => ({
        name: professor.name,
        description: professor.researchDescription || "",
      })),
      resume,
      "professor",
      openai
    );

    const finalData = professors
      .slice(0, prompt.length)
      .map((professor, index) => ({
        ...omit(professor, ["embedding"]),
        prompt: prompt[index].content,
      }));

    await prisma.analytics.create({
      data: {
        resume,
        type: "professor",
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
      return res.json({ professors: [finalData[finalData.length - 1]] });
    }

    return res.json({ professors: finalData });
  }
};
