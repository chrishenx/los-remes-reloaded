export type CommentsFieldType = {
  name: string;
  email: string;
  comments: string;
  inquiryType: "losRemesReloaded" | "businessRelated";
};

export function parseRawComments(rawComments: unknown): CommentsFieldType {
  if (!rawComments || typeof rawComments !== "object") {
    throw new Error("Invalid comments variable");
  }
  const { name, email, inquiryType, comments } = rawComments as Record<string, string | undefined>;
  if (!name || !email || !inquiryType || !comments) {
    throw new Error("Comments object is missing some field(s)");
  }
  return {
    name,
    email,
    inquiryType: inquiryType as CommentsFieldType["inquiryType"],
    comments,
  };
}