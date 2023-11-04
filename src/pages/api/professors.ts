import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const professors = await prisma.professor.findMany();

      res.json({ professors });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else if (req.method === "POST") {
    // get request body
    const { resume, interests, essay } = req.body;

    const resumeText = resume + " " + interests + " " + essay;

    console.log({ resumeText });

    return res
      .status(200)
      .json({ message: "POST request received" + resumeText });
  }
};
