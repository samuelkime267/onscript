const localUrl = "http://localhost:3000";
const prodUrl = process.env.NEXT_PUBLIC_URL || "";
const localDomain = "localhost:3000";
const prodDomain = new URL(prodUrl).hostname;

export const AUTH_RELAY = "https://relay.farcaster.xyz";
export const SIWE_URI =
  process.env.NODE_ENV === "development" ? localUrl : prodUrl;
export const DOMAIN =
  process.env.NODE_ENV === "development" ? localDomain : prodDomain;
