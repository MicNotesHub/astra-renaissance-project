// Rewrites Supabase storage URLs to go through our CDN
// to reduce cached egress.
const SUPABASE_HOST = "https://jsuzhbspinevkzmhibop.supabase.co";
const CDN_HOST = "https://cdn.astrabocconi.com";

export function toCdnUrl<T extends string | null | undefined>(url: T): T {
  if (!url) return url;
  if (typeof url !== "string") return url;
  if (url.startsWith(`${SUPABASE_HOST}/storage/`)) {
    return url.replace(SUPABASE_HOST, CDN_HOST) as T;
  }
  return url;
}
