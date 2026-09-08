(function () {
  "use strict";

  const GTM_CONTAINER_ID = "GTM-5K9BC5RT";
  const CN_APP_STORE_ID = "6754019000";
  const CONSENT_COOKIE_NAME = "sportarc_cn_cookie_consent";
  const CONSENT_COOKIE_VERSION = "v1";
  const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
  const CONSENT_GRANTED = "analytics";
  const CONSENT_DENIED = "necessary";
  const SUPPORTED_LOCALES = new Set(["zh-CN"]);

  const COPY = {
    "zh-CN": {
      title: "Cookie 设置",
      description: "我们使用 Cookie 保障网站运行、了解使用情况并改进体验。请查看我们的",
      necessaryOnly: "仅使用必要 Cookie",
      allowAll: "全部允许",
      settings: "Cookie 设置",
      privacy: "隐私政策",
      choice: "。您可以选择全部允许，或仅使用必要 Cookie。",
      detailTitle: "Cookie 设置",
      detailDescription: "选择 迹时运动 可以使用的可选 Cookie。您可以随时更改选择。",
      necessaryTitle: "必要 Cookie",
      necessaryStatus: "始终启用",
      necessaryDescription: "用于记住您的 Cookie 选择，并安全地提供网站服务。",
      analyticsTitle: "分析 Cookie",
      analyticsDescription:
        "Google Analytics 统计访问和点击，并将浏览器、Cookie 和使用情况数据发送给 Google 在中国大陆境外处理。您可随时关闭。",
      analyticsToggle: "允许分析 Cookie",
      save: "保存选择",
      close: "关闭 Cookie 设置",
    },
  };

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  function readStoredConsent() {
    const prefix = `${CONSENT_COOKIE_NAME}=`;
    const value = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix))
      ?.slice(prefix.length);
    let decoded = "";
    try { decoded = value ? decodeURIComponent(value) : ""; } catch (_error) { return null; }
    if (decoded === `${CONSENT_COOKIE_VERSION}.${CONSENT_GRANTED}`) return CONSENT_GRANTED;
    if (decoded === `${CONSENT_COOKIE_VERSION}.${CONSENT_DENIED}`) return CONSENT_DENIED;
    return null;
  }

  function storeConsent(value) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(`${CONSENT_COOKIE_VERSION}.${value}`)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;

  }

  let currentConsent = readStoredConsent();
  let gtmRequested = false;

  function updateGoogleConsent(value) {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: value === CONSENT_GRANTED ? "granted" : "denied",
    });
  }

  function loadGTM() {
    if (gtmRequested || currentConsent !== CONSENT_GRANTED) return;
    gtmRequested = true;

    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
    script.dataset.sportarcGtm = GTM_CONTAINER_ID;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  function pageLocale() {
    const bodyLocale = document.body?.dataset.locale;
    if (SUPPORTED_LOCALES.has(bodyLocale)) return bodyLocale;
    const htmlLocale = document.documentElement.lang;
    return SUPPORTED_LOCALES.has(htmlLocale) ? htmlLocale : "zh-CN";
  }

  function pageType() {
    return document.body?.dataset.page || "legal";
  }

  function ctaLocation(link) {
    if (link.dataset.ctaLocation) return link.dataset.ctaLocation;
    if (pageType() === "support") return "support_nav";
    if (link.classList.contains("mobile-store-link")) return "mobile_nav";
    if (link.closest(".nav-actions")) return "desktop_nav";
    if (link.closest(".hero-copy")) return "hero";
    if (link.closest(".footer-cta")) return "closing";
    return "other";
  }

  function isChinaAppStoreLink(link) {
    if (!link) return false;

    try {
      const url = new URL(link.href, document.baseURI);
      return url.hostname === "apps.apple.com" && url.pathname.endsWith(`/id${CN_APP_STORE_ID}`);
    } catch (_error) {
      return false;
    }
  }

  function trackAppStoreClick(event) {
    const link = event.target.closest?.("a[href]");
    if (!isChinaAppStoreLink(link) || currentConsent !== CONSENT_GRANTED) return;

    window.dataLayer.push({
      event: "app_store_click",
      cta_location: ctaLocation(link),
      page_locale: pageLocale(),
      page_type: pageType(),
      link_url: link.href,
    });
  }

  function mountConsentControls(requiresExplicitConsent) {
    const locale = pageLocale();
    const copy = COPY[locale] || COPY["zh-CN"];
    let returnFocus = null;
    let openedFromSettings = false;

    const panel = document.createElement("section");
    panel.className = "analytics-consent";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "analytics-consent-title");
    panel.setAttribute("aria-describedby", "analytics-consent-description");
    panel.hidden = currentConsent !== null || !requiresExplicitConsent;
    panel.innerHTML = `
      <div class="analytics-consent__inner">
        <div class="analytics-consent__content">
          <div class="analytics-consent__view" data-consent-summary>
            <h2 id="analytics-consent-title">${copy.title}</h2>
            <p id="analytics-consent-description">${copy.description} <a href="/privacy/#website-analytics">${copy.privacy}</a>${copy.choice}</p>
          </div>
          <div class="analytics-consent__view analytics-consent__view--details" data-consent-details hidden>
            <h2>${copy.detailTitle}</h2>
            <p id="analytics-consent-detail-description">${copy.detailDescription}</p>
            <div class="analytics-consent__categories">
              <div class="analytics-consent__category">
                <div>
                  <h3>${copy.necessaryTitle}</h3>
                  <p>${copy.necessaryDescription}</p>
                </div>
                <span class="analytics-consent__status">${copy.necessaryStatus}</span>
              </div>
              <div class="analytics-consent__category">
                <div>
                  <h3>${copy.analyticsTitle}</h3>
                  <p>${copy.analyticsDescription}</p>
                </div>
                <label class="analytics-consent__switch">
                  <span class="analytics-consent__sr-only">${copy.analyticsToggle}</span>
                  <input type="checkbox" data-consent-analytics-toggle>
                  <span class="analytics-consent__switch-track" aria-hidden="true"></span>
                </label>
              </div>
            </div>
            <a href="/privacy/#website-analytics">${copy.privacy}</a>
          </div>
        </div>
        <div class="analytics-consent__actions" data-consent-summary-actions>
          <button class="analytics-consent__button" type="button" data-consent-necessary>${copy.necessaryOnly}</button>
          <button class="analytics-consent__button" type="button" data-consent-allow>${copy.allowAll}</button>
        </div>
        <div class="analytics-consent__actions analytics-consent__actions--details" data-consent-details-actions hidden>
          <button class="analytics-consent__button" type="button" data-consent-necessary>${copy.necessaryOnly}</button>
          <button class="analytics-consent__button" type="button" data-consent-save>${copy.save}</button>
        </div>
        <button class="analytics-consent__close" type="button" aria-label="${copy.close}" data-consent-close hidden>
          <span aria-hidden="true"></span>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    const settingsButton = document.createElement("button");
    settingsButton.className = "analytics-settings-button";
    settingsButton.type = "button";
    settingsButton.textContent = copy.settings;
    settingsButton.setAttribute("aria-haspopup", "dialog");

    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) {
      footerBottom.appendChild(settingsButton);
    } else {
      const legalContainer = document.querySelector("body > .container");
      if (legalContainer) {
        const row = document.createElement("p");
        row.className = "analytics-settings-row";
        row.appendChild(settingsButton);
        legalContainer.appendChild(row);
      } else {
        settingsButton.classList.add("analytics-settings-button--floating");
        document.body.appendChild(settingsButton);
      }
    }

    const summary = panel.querySelector("[data-consent-summary]");
    const details = panel.querySelector("[data-consent-details]");
    const summaryActions = panel.querySelector("[data-consent-summary-actions]");
    const detailsActions = panel.querySelector("[data-consent-details-actions]");
    const analyticsToggle = panel.querySelector("[data-consent-analytics-toggle]");
    const closeButton = panel.querySelector("[data-consent-close]");

    function setDetailsVisible(isVisible) {
      summary.hidden = isVisible;
      summaryActions.hidden = isVisible;
      details.hidden = !isVisible;
      detailsActions.hidden = !isVisible;
      panel.classList.toggle("analytics-consent--details", isVisible);
      panel.setAttribute(
        "aria-labelledby",
        isVisible ? "analytics-consent-detail-title" : "analytics-consent-title",
      );
      panel.setAttribute("aria-describedby", isVisible ? "analytics-consent-detail-description" : "analytics-consent-description");
      const detailHeading = details.querySelector("h2");
      if (detailHeading) detailHeading.id = "analytics-consent-detail-title";
    }

    function closePanel() {
      panel.hidden = true;
      returnFocus?.focus();
      returnFocus = null;
      openedFromSettings = false;
    }

    function showSettings() {
      returnFocus = settingsButton;
      openedFromSettings = true;
      analyticsToggle.checked = currentConsent === CONSENT_GRANTED;
      closeButton.hidden = false;
      setDetailsVisible(true);
      panel.hidden = false;
      analyticsToggle.focus();
    }

    function applyConsent(value) {
      const hadLoadedGTM = gtmRequested;
      currentConsent = value;
      storeConsent(currentConsent);
      updateGoogleConsent(currentConsent);
      if (currentConsent === CONSENT_GRANTED) {
        loadGTM();
        closePanel();
        return;
      }
      if (hadLoadedGTM) {
        window.location.reload();
        return;
      }
      closePanel();
    }

    settingsButton.addEventListener("click", showSettings);

    panel.querySelectorAll("[data-consent-necessary]").forEach((button) => {
      button.addEventListener("click", () => applyConsent(CONSENT_DENIED));
    });

    panel.querySelectorAll("[data-consent-allow]").forEach((button) => {
      button.addEventListener("click", () => applyConsent(CONSENT_GRANTED));
    });

    panel.querySelector("[data-consent-save]")?.addEventListener("click", () => {
      applyConsent(analyticsToggle.checked ? CONSENT_GRANTED : CONSENT_DENIED);
    });

    closeButton.addEventListener("click", closePanel);

    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !openedFromSettings) return;
      event.preventDefault();
      closePanel();
    });
  }

  function initializeConsent() {
    if (currentConsent === CONSENT_GRANTED) {
      updateGoogleConsent(CONSENT_GRANTED);
      loadGTM();
    }
    // Mainland site: only an explicit saved choice can enable Google tags.
    mountConsentControls(true);
  }

  document.addEventListener("click", trackAppStoreClick, true);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeConsent, { once: true });
  } else {
    initializeConsent();
  }
})();
