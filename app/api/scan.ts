import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../libs/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { decodedText } = req.body;

  if (!decodedText || typeof decodedText !== "string")
    return res.status(400).json({ error: "decodedText is required" });

  try {
    const { db } = await connectToDatabase();
    const doc = {
      decodedText,
      createdAt: new Date()
    };

    const result = await db.collection("scans").insertOne(doc);

    res.status(201).json({ id: result.insertedId, ...doc });
  } catch (err) {
    res.status(500).json({ error: "DB insert failed" });
  }
}
