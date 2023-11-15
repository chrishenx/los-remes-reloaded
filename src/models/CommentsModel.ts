import * as z from 'zod';

const inquiryTypes = ["losRemesReloaded", "businessRelated"] as const;

// TODO: Set config values in environment variables
export const isRawCommentsSubmision = z.object({
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.enum(inquiryTypes),
  comments: z.string().min(1).max(500),
});

export type RawCommentsSubmision = z.infer<typeof isRawCommentsSubmision>;

export async function storeComments(commentsSubmission: RawCommentsSubmision) {
  const { name, email, inquiryType, comments: commentsText } = commentsSubmission;
  
  // TODO: Implement reCaptcha validation
  /* const firestore = firestoreClient();
  const commentsCollection = firestore.collection('comments');
  const comments = commentsCollection.doc();
  const commentsId = comments.id;
  const commentsData = {
    name,
    email,
    inquiryType,
    comments: commentsText,
    createdAt: new Date(),
  };
  await comments.set(commentsData); */

}