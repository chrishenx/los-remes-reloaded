import { z } from "zod";

export const FirebaseObjectSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type FirebaseObject = z.infer<typeof FirebaseObjectSchema>;