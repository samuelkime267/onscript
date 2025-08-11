import { z } from "zod";

export const createUserSchema = z.object({
  address: z.string(),
  fid: z.number(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
