import { PrismaClient } from "@prisma/client";
import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

type SignInResp = {
  success: boolean;
  error?: string;
};
type SignInReq = {
  email: string;
  password: string;
};

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SignInResp | SignInReq>
) => {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (isEmpty(userExists)) {
      return res.json({ success: false, error: "User doesn't exists!" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    res.setHeader(
      "Set-Cookie",
      `userData=${encodeURIComponent(
        JSON.stringify(user)
      )}; HttpOnly; Path=/; Max-Age=604800`
    );

    return res.json({ success: true });
  }
};
