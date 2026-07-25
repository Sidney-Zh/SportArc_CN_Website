const SUPPORTED = ["en", "zh-CN", "zh-TW", "de", "fr", "ja", "ko"];
const CANONICAL_ORIGIN = "https://www.sportarc.cn";

function normalizeLanguage(value) {
  if (!value) return null;
  const code = value.toLowerCase();
  if (
    code.startsWith("zh-hant")
    || code.startsWith("zh-tw")
    || code.startsWith("zh-hk")
    || code.startsWith("zh-mo")
  ) {
    return "zh-TW";
  }
  if (code.startsWith("zh")) return "zh-CN";
  if (code.startsWith("ja")) return "ja";
  if (code.startsWith("ko")) return "ko";
  if (code.startsWith("de")) return "de";
  if (code.startsWith("fr")) return "fr";
  if (code.startsWith("en")) return "en";
  return null;
}

function fromAcceptLanguage(header) {
  if (!header) return null;
  return header
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .map(normalizeLanguage)
    .find(Boolean) || null;
}

function fromCountry(country) {
  const code = (country || "").toUpperCase();
  if (["CN", "SG"].includes(code)) return "zh-CN";
  if (["TW", "HK", "MO"].includes(code)) return "zh-TW";
  if (code === "JP") return "ja";
  if (code === "KR") return "ko";
  if (["DE", "AT", "CH"].includes(code)) return "de";
  if (["FR", "BE", "LU", "MC"].includes(code)) return "fr";
  return null;
}

export function middleware(context) {
  const { request, redirect, geo } = context;
  const url = new URL(request.url);

  if (url.hostname.toLowerCase() === "sportarc.cn") {
    return redirect(`${CANONICAL_ORIGIN}${url.pathname}${url.search}`, 301);
  }

  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return context.next();
  }

  const language = fromAcceptLanguage(request.headers.get("Accept-Language"))
    || fromCountry(geo && geo.countryCodeAlpha2)
    || "en";
  const target = SUPPORTED.includes(language) ? language : "en";
  return redirect(`${url.origin}/${target}/`, 302);
}
