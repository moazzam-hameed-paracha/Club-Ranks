import { PrismaClient } from "@prisma/client";
import { PAGES } from "@src/constants/pages";
import { NextApiRequest, NextApiResponse } from "next";

type SignOutResp = {
  success: boolean;
  error?: string;
};
type SignOutReq = void;

export const prisma = new PrismaClient();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SignOutResp | SignOutReq>
) => {
  if (req.method === "GET") {
    // unset cookie
    res.setHeader(
      "Set-Cookie",
      `userData=${encodeURIComponent(
        JSON.stringify({})
      )}; HttpOnly; Path=/; Max-Age=604800`
    );

    res.redirect(PAGES.DASHBOARD);
    return res.json({ success: true });
  }
};
