// Rewrites Supabase storage URLs to go through our CDN
// to reduce cached egress.
//
// NOTE: CDN currently disabled because cdn.astrabocconi.com returns
// Cloudflare Error 1014 (CNAME Cross-User Banned). Re-enable by flipping
// CDN_ENABLED to true once the Cloudflare/R2 custom domain is configured.
const SUPABASE_HOST = "https://jsuzhbspinevkzmhibop.supabase.co";
const CDN_HOST = "https://cdn.astrabocconi.com";
const CDN_ENABLED = false;

export function toCdnUrl<T extends string | null | undefined>(url: T): T {
  if (!url) return url;
  if (typeof url !== "string") return url;
  if (!CDN_ENABLED) {
    // Reverse any CDN-rewritten URLs already saved in the DB
    if (url.startsWith(`${CDN_HOST}/storage/`)) {
      return url.replace(CDN_HOST, SUPABASE_HOST) as T;
    }
    return url;
  }
  if (url.startsWith(`${SUPABASE_HOST}/storage/`)) {
    return url.replace(SUPABASE_HOST, CDN_HOST) as T;
  }
  return url;
}
