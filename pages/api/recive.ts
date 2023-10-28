// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import prisma from '@/db/prisma'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const all = await prisma.object.findMany();

    const vars = process.env.SOME_VAR?.substring(0);

    const vars2 = process.env.CRON_SECRET?.substring(0);

    res.status(200).json({
        dbObjectData: all,
        envVar: vars,
        cronSecretVar: vars2,
        somerandom: "random",
        somethingUndefind: undefined
    });
}
