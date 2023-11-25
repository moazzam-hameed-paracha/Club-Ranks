import {
  PrismaClient,
  Club as ClubType,
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

export type ClubGetRes = {
  clubs: Omit<ClubType, "embedding" | "cleanedExplanation">[];
};

export type ClubPostReq = ClubGetRes;

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ClubGetRes | ClubPostReq | { error: unknown }>
) => {
  const currUser = JSON.parse(req.cookies["userData"] || "{}") as UserType;
  const isLoggedIn = Boolean(currUser?.id?.length);

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

      if (!isLoggedIn) {
        return res.json({ clubs: clubs.slice(0, 5) });
      }

      res.json({ clubs });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume, interests } = JSON.parse(req.body);

    const str = interests?.length ? resume + " " + interests : resume;

    const resumeEmbeddings = await getEmbeddings(str, openai);

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
      return res.json({ clubs: [finalData[finalData.length - 1]] });
    }

    return res.json({ clubs: finalData });
  }
};
