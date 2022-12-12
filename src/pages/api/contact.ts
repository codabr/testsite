/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  error: string | undefined;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(200).json({ error: "" });
};
