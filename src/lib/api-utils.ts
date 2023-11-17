import { ParsingBodyError } from "@/models/ParsingBodyError";
import { z } from "zod";

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