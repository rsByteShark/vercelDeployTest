// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs"
import prisma from "@/db/prisma"


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  prisma.object.create({
    data: {
      UID: Math.ceil(Math.random() * 10000),
      value: Math.ceil(Math.random() * 10000)
    }
  })

  res.status(200).json({ name: 'John Doe' })
}
