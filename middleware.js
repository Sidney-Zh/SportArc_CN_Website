const CANONICAL_ORIGIN = "https://www.sportarc.cn";
const PAGE_PATHS = new Set([
  "/", "/support/", "/support/recording-guide/", "/features/",
  "/features/table-tennis-ai-coach/", "/features/table-tennis-match-analysis/",
  "/features/table-tennis-video-editor/", "/features/tennis-video-editor/",
  "/features/badminton-video-editor/", "/privacy/", "/terms/",
  "/membership_service_agreement/", "/auto_renewal_subscription_agreement/",
]);

export function middleware(context) {
  const url = new URL(context.request.url);
  let path = url.pathname.replace(/\/index\.html$/, "/");
  const locale = path.match(/^\/(en|zh-CN|zh-TW|de|fr|ja|ko)(?=\/|$)/);
  if (locale) {
    const rest = path.slice(locale[0].length) || "/";
    const candidate = rest.endsWith("/") ? rest : rest + "/";
    // Only redirect known former pages, not arbitrary missing routes.
    if (candidate === "/" || candidate === "/support/" || (locale[1] === "zh-CN" && PAGE_PATHS.has(candidate))) path = candidate;
  }
  if (!path.endsWith("/") && PAGE_PATHS.has(path + "/")) path += "/";
  if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "www.sportarc.cn" || path !== url.pathname) {
    const target = new URL(path, CANONICAL_ORIGIN);
    target.search = url.search;
    return context.redirect(target.toString(), 301);
  }
  return context.next();
}
