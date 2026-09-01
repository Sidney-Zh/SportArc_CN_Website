const CANONICAL_ORIGIN = "https://www.sportarc.cn";
const SIMPLIFIED_CHINESE_ALIASES = new Set(["/zh-CN", "/zh-CN/", "/zh-CN/index.html"]);
const SIMPLIFIED_CHINESE_SUPPORT_ALIASES = new Set([
  "/zh-CN/support",
  "/zh-CN/support/",
  "/zh-CN/support/index.html",
]);

function permanentRedirect(context, url, pathname) {
  const target = new URL(pathname, CANONICAL_ORIGIN);
  target.search = url.search;
  return context.redirect(target.toString(), 301);
}

export function middleware(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (SIMPLIFIED_CHINESE_ALIASES.has(url.pathname)) {
    return permanentRedirect(context, url, "/");
  }

  if (SIMPLIFIED_CHINESE_SUPPORT_ALIASES.has(url.pathname)) {
    return permanentRedirect(context, url, "/support/");
  }

  const normalizedPath = url.pathname === "/index.html" ? "/" : url.pathname;
  if (
    url.protocol !== "https:"
    || url.hostname.toLowerCase() !== "www.sportarc.cn"
    || normalizedPath !== url.pathname
  ) {
    return permanentRedirect(context, url, normalizedPath);
  }

  return context.next();
}
