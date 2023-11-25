import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type SignUpResp = {
  success: boolean;
  error?: string;
};
type SignUpReq = {
  email: string;
  password: string;
};

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SignUpResp | SignUpReq>
) => {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (!userExists) {
      return res.json({ success: false, error: "User already exists!" });
    }

    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return res.json({ success: true });
  }
};
