// pages/api/handleContactFormSubmitted.ts
import { NextApiRequest, NextApiResponse } from "next";
import { RawCommentsSubmisionSchema } from "@/models/Comments";
import { ParsingBodyError } from "@/models/ParsingBodyError";
import { parseRawBody } from "@/lib/api-utils";
import * as z from "zod";
import { apiRouteMiddleware } from "@/middlewares";
import { reCatpchaTokenValidationMiddleware } from "@/middlewares/reCaptchaTokenValidation";
import { storeComments } from "@/services/api/comments";

const isCommentSubmittionWithReCaptcha = z.object({
  commentSubmission: RawCommentsSubmisionSchema,
  reCaptchaToken: z.string().min(1),
});

type CommentsSubmissionWithReCaptcha = z.infer<typeof isCommentSubmittionWithReCaptcha>;

export function parseRawCommentsWithReCaptcha(rawCommentsWithReCaptcha: unknown): CommentsSubmissionWithReCaptcha {
  return parseRawBody(rawCommentsWithReCaptcha, isCommentSubmittionWithReCaptcha); 
}

async function handleContactFormSubmitted(req: NextApiRequest, res: NextApiResponse) {
  try {
    // TODO Remove this response when deployment of API routes is validated
    return res.status(200).json({ message: "OK" });
    // TODO Integrate into a declarative interface, a higher order function that takes n middlewares and applies them in order
    const { commentSubmission } = parseRawCommentsWithReCaptcha(req.body);

    await reCatpchaTokenValidationMiddleware(req, res);

    const storedComments = await storeComments(commentSubmission);
    
    return res.status(200).json(storedComments);
  } catch (error) {
    if (error instanceof ParsingBodyError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

const CommentsApiRoute = apiRouteMiddleware({
  POST: handleContactFormSubmitted,
});

export default CommentsApiRoute;
