export type CastCardProps = {
  status?: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "FAILED";
  id?: string | undefined;
  text?: string | undefined;
  channelId?: string | undefined;
  parentAuthorFid?: number | undefined;
  embeds?:
    | {
        cast_id?:
          | {
              hash: string;
              fid: number;
            }
          | undefined;
        url?: string | undefined;
      }[]
    | undefined;
  postHash?: string | undefined;
  scheduledAt?: Date | undefined;
  publishedAt?: Date | undefined;
  qstashMessageId?: string | undefined;

  profilePic?: string | null;
  username?: string | null;
  previewMode?: boolean;
  className?: string;
};
