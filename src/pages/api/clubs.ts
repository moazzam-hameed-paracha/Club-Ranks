import { PrismaClient, Club as ClubType } from "@prisma/client";
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

export type ClubGetRes = {
  clubs: Omit<ClubType, "embedding" | "cleanedExplanation">[];
};

export type ClubPostReq = ClubGetRes;

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ClubGetRes | ClubPostReq | { error: unknown }>
) => {
  if (req.method === "GET") {
    try {
      const clubs = await prisma.club.findMany({
        select: {
          id: true,
          name: true,
          explanation: true,
          prompt: true,
          similarity: true,
        },
      });

      res.json({ clubs });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume } = JSON.parse(req.body);

    const resumeEmbeddings = await getEmbeddings(resume, openai);
    const clubs = (await prisma.club.findMany())
      .map((club) => {
        const similarity = cosineSimilarity(
          club.embedding as number[],
          resumeEmbeddings.data[0].embedding
        );

        return {
          ...club,
          similarity,
        };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const prompt = await getGPTPrompt(
      clubs.map((club) => ({
        name: club.name,
        description: club.explanation || "",
      })),
      resume,
      "club",
      openai
    );

    const finalData = clubs.slice(0, prompt.length).map((club, index) => ({
      ...omit(club, ["embedding"]),
      prompt: prompt[index].content,
    }));

    await prisma.analytics.create({
      data: {
        resume,
        type: "club",
        results: finalData,
      },
    });

    return res.json({ clubs: finalData });
  }
};
