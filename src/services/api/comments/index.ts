import { firestoreClient } from "@/lib/firebase/client";
import { RawCommentsSubmision, StoredComment } from "@/models/Comments";

export async function storeComments(commentsSubmission: RawCommentsSubmision): Promise<StoredComment> {
  const commentToStore: StoredComment = {...commentsSubmission, createdAt: new Date() };
  await firestoreClient
    .collection("comments")
    .add(commentToStore);
  return commentToStore;
}
