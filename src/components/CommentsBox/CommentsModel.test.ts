import { parseRawComments } from "./CommentsModel";

describe("parseRawComments", () => {
  it("throws an error if rawComments is not an object", () => {
    expect(() => parseRawComments(null)).toThrow("Invalid comments variable");
    expect(() => parseRawComments("not an object")).toThrow("Invalid comments variable");
    expect(() => parseRawComments(123)).toThrow("Invalid comments variable");
    expect(() => parseRawComments(undefined)).toThrow("Invalid comments variable");
  });

  it("throws an error if any required field is missing", () => {
    expect(() => parseRawComments({})).toThrow("Comments object is missing some field(s)");
    expect(() => parseRawComments({ name: "John" })).toThrow("Comments object is missing some field(s)");
    expect(() => parseRawComments({ email: "john@example.com" })).toThrow("Comments object is missing some field(s)");
    expect(() => parseRawComments({ inquiryType: "General" })).toThrow("Comments object is missing some field(s)");
    expect(() => parseRawComments({ comments: "Hello" })).toThrow("Comments object is missing some field(s)");
  });

  it("returns a valid CommentsFieldType object if all required fields are present", () => {
    const rawComments = {
      name: "John",
      email: "john@example.com",
      inquiryType: "General",
      comments: "Hello",
    };
    const expectedComments = {
      name: "John",
      email: "john@example.com",
      inquiryType: "General",
      comments: "Hello",
    };
    expect(parseRawComments(rawComments)).toEqual(expectedComments);
  });
});