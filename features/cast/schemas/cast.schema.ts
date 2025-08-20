import { z } from "zod";

export const PostStatusSchema = z.enum([
  "DRAFT",
  "SCHEDULED",
  "PUBLISHED",
  "FAILED",
]);

export const CastIdSchema = z.object({
  hash: z.string(),
  fid: z.number(),
});

export const EmbedSchema = z
  .object({
    cast_id: CastIdSchema.optional(),
    url: z.string().url().optional(),
  })
  .strict();

export const PostSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),

  signerUuid: z.string(),
  text: z.string().optional(),

  parent: z.string().optional(),
  channelId: z.string().optional(),
  parentAuthorFid: z.number().optional(),

  embeds: z.array(EmbedSchema).optional(),

  postHash: z.string().optional(),

  status: PostStatusSchema.default("DRAFT"),
  scheduledAt: z.coerce.date().optional(),
  publishedAt: z.coerce.date().optional(),

  qstashMessageId: z.string().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type PostSchemaDataType = z.infer<typeof PostSchema>;
