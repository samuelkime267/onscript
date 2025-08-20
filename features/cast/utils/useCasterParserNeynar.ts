import { useState, useCallback } from "react";

type CastData = {
  text: string;
  embeds: { url: string }[];
};

export default function useCastParserNeynar() {
  const [castData, setCastData] = useState<CastData>({
    text: "",
    embeds: [],
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

  // Main parser function
  const parseCast = useCallback(
    async (text: string) => {
      const urls = extractUrls(text);

      setCastData({
        text,
        embeds: urls.map((u) => ({ url: u })),
      });
    },
    [extractUrls],
  );

  return { parseCast, castData };
}
