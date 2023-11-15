import { ParsingBodyError } from "@/models/ParsingBodyError";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

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

export function parseRawBody<T>(rawBody: unknown, validator: z.ZodType<T>): T {
  try {
    return validator.parse(rawBody);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issuesCount = error.issues.length;
      const issues = error.issues.reduce((acc, issue, index) => {
        const issuePath = issue.path.join(".");
        const issueMessage = issue.message;
        const issueSeparator = index === issuesCount - 1 ? "" : ", ";
        return `${acc}${issuePath}: ${issueMessage}${issueSeparator}`;
      }, "");
      throw new ParsingBodyError(`Issues with ${issuesCount} fields:\n${issues}`);
    }
    throw new ParsingBodyError("Invalid body");
  }
}
