import * as z from "zod";
import { FirebaseObjectSchema } from "./FirebaseObject";

const inquiryTypes = ["losRemesReloaded", "businessRelated"] as const;

// TODO: Set config values in environment variables
export const RawCommentsSubmisionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.enum(inquiryTypes),
  comments: z.string().min(1).max(500),
});

export const StoredCommentSchema = z.intersection(RawCommentsSubmisionSchema, FirebaseObjectSchema);

export type RawCommentsSubmision = z.infer<typeof RawCommentsSubmisionSchema>;
export type StoredComment = z.infer<typeof StoredCommentSchema>;
