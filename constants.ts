import { getDomainParts } from "./utils";

const { host, origin } = getDomainParts();

export const AUTH_RELAY = "https://relay.farcaster.xyz";
export const SIWE_URI = origin;
export const DOMAIN = host;
