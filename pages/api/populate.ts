// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db/prisma';
import fs from "fs"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data = fs.readFileSync("../../public/3.webp");

  fs.writeFileSync("../../public/4.webp", data);

  prisma.object.create({
    data: {
      UID: Math.ceil(Math.random() * 10000),
      value: Math.ceil(Math.random() * 10000)
    }
  })

  res.status(200).json({ name: 'John Doe' })
}