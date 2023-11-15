import { parseRawBody } from "./api-utils";
import * as z from "zod";

const parsingErrorRegex = /Issues with.*/;

describe("parseRawBody", () => {
  it("throws an error if rawBody is not valid", () => {
    const validator = z.object({
      name: z.string(),
      age: z.number(),
    });
    expect(() => parseRawBody(null, validator)).toThrow(parsingErrorRegex);
    expect(() => parseRawBody(undefined, validator)).toThrow(parsingErrorRegex);
    expect(() => parseRawBody("not an object", validator)).toThrow(parsingErrorRegex);
    expect(() => parseRawBody(123, validator)).toThrow(parsingErrorRegex);
  });

  it("throws an error if rawBody is missing required fields", () => {
    const validator = z.object({
      name: z.string(),
      age: z.number(),
    });
    expect(() => parseRawBody({ name: "John" }, validator)).toThrow(parsingErrorRegex);
    expect(() => parseRawBody({ age: 30 }, validator)).toThrow(parsingErrorRegex);
    expect(() => parseRawBody({}, validator)).toThrow(parsingErrorRegex);
  });

  it("throws an error if rawBody has invalid fields", () => {
    const validator = z.object({
      name: z.string(),
      age: z.number(),
    });
    expect(() => parseRawBody({ name: "John", age: "30" }, validator)).toThrow(parsingErrorRegex);
  });

  it("returns a valid object if rawBody is valid", () => {
    const validator = z.object({
      name: z.string(),
      age: z.number(),
    });
    const rawBody = { name: "John", age: 30 };
    const expectedObject = { name: "John", age: 30 };
    expect(parseRawBody(rawBody, validator)).toEqual(expectedObject);
  });
});
