import { NextApiRequest, NextApiResponse } from "next";

export type ApiRouteHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type ApiRouteHandlers = {
  post?: ApiRouteHandler;
  get?: ApiRouteHandler;
  put?: ApiRouteHandler;
};

export const API_METHODS = ["POST", "GET", "PUT"] as const;
export type APIMethod = typeof API_METHODS[number];
export type HandlersMap = Partial<Record<APIMethod, ApiRouteHandler>>;

export function apiRouteMiddleware(handlers: HandlersMap) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const handler = handlers?.[req.method as APIMethod];
    if (handler === undefined) {
      return res.status(405).json({ message: "Method not allowed or unsupported" });
    }
    return handler(req, res);
  };
}
