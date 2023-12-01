import { NextApiRequest } from "next";

export type RawNextApiRequest = NextApiRequest & { rawBody?: string };