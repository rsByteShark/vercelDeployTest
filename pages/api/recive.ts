// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import prisma from '@/db/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const all = await prisma.object.findMany();

    res.status(200).json({ dbObjectData: all, envVar: process.env.SOME_VAR, cronSecretVar: process.env.CRON_SECRET });
}
