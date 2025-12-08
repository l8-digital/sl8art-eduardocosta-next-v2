
export function baseUrl(path = "") {
  // const base = process.env.NEXT_PUBLIC_ASSET_URL || "";
  // const client = process.env.NEXT_API_CLIENT_ID || "";
  const base = "https://build.l8.digital";
  const client = "826841cd";
  return `${base}/${client}/build/assets/${path}`;
}
