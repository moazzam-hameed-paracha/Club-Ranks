import { PrismaClient, Professor as ProfessorType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  cosineSimilarity,
  getEmbeddings,
  getGPTPrompt,
} from "@src/utils/helpers";
import OpenAI from "openai";
import { omit } from "lodash";

const openai = new OpenAI({
  apiKey: "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",
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

      res.json({ professors });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume } = JSON.parse(req.body);

    const resumeEmbeddings = await getEmbeddings(resume, openai);
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

    return res.json({ professors: finalData });
  }
};
