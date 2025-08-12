import { z } from "zod";

export const loginAuthorizeSchema = z.object({
  message: z.string(),
  address: z.string(),
  nonce: z.string(),
  signature: z.string(),
});
