// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/prisma';
import fs from "fs"


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data = prisma.object.findMany();

    res.status(200).json(data)
}
