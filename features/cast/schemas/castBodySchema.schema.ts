import z from "zod";

export enum CastType {
  CAST = 0,
  LONG_CAST = 1,
  TEN_K_CAST = 2,
}

export const castIdSchema = z.object({
  fid: z.number(),
  hash: z.instanceof(Uint8Array),
});

export const embedSchema = z.object({
  url: z.string().url().optional(),
  castId: castIdSchema.optional(),
});

export const castBodySchema = z.object({
  embedsDeprecated: z.array(z.string()).default([]),
  mentions: z.array(z.number()).default([]),
  parentCastId: castIdSchema.optional(),
  parentUrl: z.string().url().optional(),
  text: z.string(),
  mentionsPositions: z.array(z.number()).default([]),
  embeds: z.array(embedSchema).default([]),
  type: z.nativeEnum(CastType).default(CastType.CAST), // numeric enum with default 0
});
