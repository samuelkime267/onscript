import { useState, useCallback } from "react";

type CastData = {
  text: string;
  embeds: { url: string }[];
  embedsDeprecated: [];
  mentions: number[];
  mentionsPositions: number[];
};

export default function useCastParser() {
  const [castData, setCastData] = useState<CastData>({
    text: "",
    embeds: [],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
  });

  // Extract URLs with or without protocol
  const extractUrls = useCallback((text: string) => {
    const urlRegex =
      /\b((https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?)\b/g;
    const matches = text.match(urlRegex) || [];
    return matches.map((url) =>
      url.startsWith("http") ? url : `https://${url}`,
    );
  }, []);

  // Extract mentions like @username and get their fids
  const extractMentions = useCallback(async (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }

    const results: { fid: number; position: number }[] = [];

    for (const username of mentions) {
      try {
        const res = await fetch(
          `https://fnames.farcaster.xyz/transfers?name=${username}`,
        );
        const data = await res.json();
        const fid = data.transfers?.[0]?.to || null;

        if (fid) {
          const pos = Buffer.byteLength(
            text.slice(0, text.indexOf(`@${username}`)),
            "utf8",
          );
          results.push({ fid, position: pos });
        }
      } catch (err) {
        console.error(`Failed to get fid for ${username}`, err);
      }
    }

    return results;
  }, []);

  // Main parser function
  const parseCast = useCallback(
    async (text: string) => {
      const urls = extractUrls(text);
      const mentionsData = await extractMentions(text);

      const mentions = mentionsData.map((m) => m.fid);
      const mentionsPositions = mentionsData.map((m) => m.position);

      const cleanText = text.replace(/\B@\w+|https?:\/\/\S+|www\.\S+/g, "");

      setCastData({
        text: cleanText.trim(),
        embeds: urls.map((u) => ({ url: u })),
        embedsDeprecated: [],
        mentions,
        mentionsPositions,
      });
    },
    [extractUrls, extractMentions],
  );

  return { parseCast, castData };
}
