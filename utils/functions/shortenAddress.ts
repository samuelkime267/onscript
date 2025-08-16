export default function shortenAddress(address: string, chars = 4) {
  if (!address) return "";
  const prefix = address.substring(0, 2 + chars); // "0x" + first `chars`
  const suffix = address.substring(address.length - chars);
  return `${prefix}...${suffix}`;
}
