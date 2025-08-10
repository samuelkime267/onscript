import { z } from "zod";

export const createUserSchema = z.object({
  address: z.string(),
  displayName: z.string(),
  fid: z.number(),
  pfpUrl: z.string(),
  username: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
