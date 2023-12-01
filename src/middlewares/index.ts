import { RawNextApiRequest } from "@/types/next-related";
import { NextApiResponse } from "next";
import getRawBody from "raw-body";

export type ApiRouteHandler = (req: RawNextApiRequest, res: NextApiResponse) => Promise<void>;

export type ApiRouteHandlers = {
  post?: ApiRouteHandler;
  get?: ApiRouteHandler;
  put?: ApiRouteHandler;
};

export const API_METHODS = ["POST",
  "GET",
  "PUT"] as const;
export type APIMethod = typeof API_METHODS[number];
export type HandlersMap = Partial<Record<APIMethod, ApiRouteHandler>>;

export function apiRouteMiddleware(handlers: HandlersMap) {
  return async (req: RawNextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
      // Work around for firebase hosting of api routes, we need to disable body parsing for each api route and then do it manually here.
      const rawBody = await getRawBody(req);
      const rawBodyString = rawBody.toString("utf8");
      const parsedBody = JSON.parse(rawBodyString);
      req.rawBody = rawBodyString;
      req.body = parsedBody;
    }
    const handler = handlers?.[req.method as APIMethod];
    if (handler === undefined) {
      return res.status(405).json({ message: "Method not allowed or unsupported" });
    }
    return handler(req, res);
  };
}
