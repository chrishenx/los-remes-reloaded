import { z } from "zod";

export const ReCaptchaBodySchema = z.object({
  reCaptchaToken: z.string().min(1),
});

type TReCaptchaBody = z.infer<typeof ReCaptchaBodySchema>;

export type ReCaptchaValidationParams = TReCaptchaBody & {
  secret: string;
  remoteIP?: string;
}

export enum ReCaptchaErrorCode {
  MISSING_INPUT_SECRET = "missing-input-secret",
  INVALID_INPUT_SECRET = "invalid-input-secret",
  MISSING_INPUT_RESPONSE = "missing-input-response",
  INVALID_INPUT_RESPONSE = "invalid-input-response",
  BAD_REQUEST = "bad-request",
  TIMEOUT_OR_DUPLICATE = "timeout-or-duplicate",
  FAILED_TO_FETCH = "failed-to-fetch",
}

export const ReCaptchaValidationResponseSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string().optional(),
  hostname: z.string().optional(),
  score: z.number().optional(),
  "error-codes": z.array(z.nativeEnum(ReCaptchaErrorCode)).optional(),
}).transform((data) => {
  return {
    success: data.success,
    challenge_ts: data.challenge_ts,
    hostname: data.hostname,
    errorCodes: data["error-codes"],
  };
});

// Convert errorCodes to union
export const reCaptchaErrorDescriptions: Record<ReCaptchaErrorCode, string> = {
  [ReCaptchaErrorCode.MISSING_INPUT_SECRET]: "The secret parameter is missing",
  [ReCaptchaErrorCode.INVALID_INPUT_SECRET]: "The secret parameter is invalid or malformed",
  [ReCaptchaErrorCode.MISSING_INPUT_RESPONSE]: "The response parameter is missing",
  [ReCaptchaErrorCode.INVALID_INPUT_RESPONSE]: "The response parameter is invalid or malformed",
  [ReCaptchaErrorCode.BAD_REQUEST]: "The request is invalid or malformed",
  [ReCaptchaErrorCode.TIMEOUT_OR_DUPLICATE]: "The response is no longer valid: either is too old or has been used previously",
  [ReCaptchaErrorCode.FAILED_TO_FETCH]: "Failed to fetch reCaptcha validation response",
} as const;

export class ReCaptchaError extends Error {
  constructor(public readonly code: ReCaptchaErrorCode) {
    super(reCaptchaErrorDescriptions[code]);
  }
}