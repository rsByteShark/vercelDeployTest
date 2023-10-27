// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import prisma from "@/db/prisma"




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await prisma.object.create({
    data: {
      UID: Math.ceil(Math.random() * 10000),
      value: Math.ceil(Math.random() * 10000)
    }
  }).catch(err => {

    res.status(200).json(err)

  }).then(() => {

    res.status(200).json({ ok: "ok" })

  })


}
