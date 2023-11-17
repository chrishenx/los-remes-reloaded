import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { ReCaptchaBodySchema, ReCaptchaError, ReCaptchaErrorCode, ReCaptchaValidationParams, ReCaptchaValidationResponseSchema } from "./models";
import { z } from "zod";

// Reference: https://developers.google.com/recaptcha/docs/verify
async function validateReCaptchaToken({ reCaptchaToken, secret, remoteIP }: ReCaptchaValidationParams) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reCaptchaToken}&remoteip=${remoteIP}`;
  const response = await fetch(url, {
    method: "post"
  });
  if (response.status !== 200) {
    throw new ReCaptchaError(ReCaptchaErrorCode.FAILED_TO_FETCH);
  }
  const data = await response.json();
  try {
    const validationResponse = ReCaptchaValidationResponseSchema.parse(data);
    if (!validationResponse.success && validationResponse.errorCodes?.[0] !== undefined) {
      throw new ReCaptchaError(validationResponse.errorCodes[0]);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("reCaptcha validation response zod parsing error:", error);
      throw new Error("Error parsing reCaptcha validation response");
    } else {
      throw error;
    }
  }

  // TODO Validate hostname
  /* if (reCaptchaHostnames.includes(validationResponse.hostname)) {
    throw new ReCaptchaError(ReCaptchaErrorCode.INVALID_HOSTNAME);
    return false;
  } */
}

export async function reCatpchaTokenValidationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const { reCaptchaToken } = ReCaptchaBodySchema.parse(req.body);
    await validateReCaptchaToken({
      reCaptchaToken,
      secret: process.env.RECAPTCHA_SECRET_KEY,
      remoteIP: req.socket.remoteAddress,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod parding error in reCaptchaTokenValidationMiddleware:", error);
      return res.status(400).json({ message: "reCaptchaToken is required" });
    }
    if (error instanceof ReCaptchaError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}