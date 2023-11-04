import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		const professors = await prisma.professor.findMany();
		res.json({ professors });
	}
};
