(function () {
  "use strict";

  const GTM_CONTAINER_ID = "GTM-5K9BC5RT";
  const CN_APP_STORE_ID = "6754019000";
  const CONSENT_COOKIE_NAME = "sportarc_cn_cookie_consent";
  const CONSENT_COOKIE_VERSION = "v1";
  const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
  const CONSENT_GRANTED = "analytics";
  const CONSENT_DENIED = "necessary";
  const SUPPORTED_LOCALES = new Set(["en", "zh-CN", "zh-TW", "de", "fr", "ja", "ko"]);

  const COPY = {
    en: {
      title: "We use cookies",
      description: "With your permission, we use cookies to analyse website visits and improve the site. You can decline or change your choice at any time.",
      necessaryOnly: "Use necessary cookies only",
      customize: "View details",
      allowAll: "Allow all",
      settings: "Cookie settings",
      privacy: "Cookie and privacy details",
      detailTitle: "Cookie settings",
      detailDescription:
        "Choose which optional cookies 迹时运动 may use. You can change your choice at any time.",
      necessaryTitle: "Necessary",
      necessaryStatus: "Always active",
      necessaryDescription:
        "Required to remember your cookie choice and provide the website securely.",
      analyticsTitle: "Analytics",
      analyticsDescription:
        "Google Analytics measures visits and clicks and sends browser, cookie and usage data to Google for processing outside mainland China. You can disable it at any time.",
      analyticsToggle: "Allow analytics cookies",
      save: "Save preferences",
      close: "Close cookie settings",
    },
    "zh-CN": {
      title: "我们使用 Cookie",
      description: "经您同意，我们使用 Cookie 分析网站访问情况，帮助改进网站。您可以拒绝或随时更改选择。",
      necessaryOnly: "仅使用必要 Cookie",
      customize: "查看详情",
      allowAll: "全部允许",
      settings: "Cookie 设置",
      privacy: "Cookie 与隐私详情",
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
    "zh-TW": {
      title: "我們使用 Cookie",
      description: "經您同意，我們使用 Cookie 分析網站瀏覽情況，幫助改善網站。您可以拒絕或隨時變更選擇。",
      necessaryOnly: "僅使用必要 Cookie",
      customize: "查看詳情",
      allowAll: "全部允許",
      settings: "Cookie 設定",
      privacy: "Cookie 與隱私詳情",
      detailTitle: "Cookie 設定",
      detailDescription: "選擇 迹时运动 可以使用的可選 Cookie。您可以隨時變更選擇。",
      necessaryTitle: "必要 Cookie",
      necessaryStatus: "永遠啟用",
      necessaryDescription: "用於記住您的 Cookie 選擇，並安全地提供網站服務。",
      analyticsTitle: "分析 Cookie",
      analyticsDescription:
        "Google Analytics 統計瀏覽和點擊，並將瀏覽器、Cookie 和使用情況資料傳送給 Google 在中國大陸境外處理。您可隨時關閉。",
      analyticsToggle: "允許分析 Cookie",
      save: "儲存選擇",
      close: "關閉 Cookie 設定",
    },
    de: {
      title: "Wir verwenden Cookies",
      description: "Mit deiner Zustimmung verwenden wir Cookies, um Websitebesuche auszuwerten und die Website zu verbessern. Du kannst ablehnen oder deine Auswahl jederzeit ändern.",
      necessaryOnly: "Nur notwendige Cookies",
      customize: "Details ansehen",
      allowAll: "Alle zulassen",
      settings: "Cookie-Einstellungen",
      privacy: "Cookie- und Datenschutzdetails",
      detailTitle: "Cookie-Einstellungen",
      detailDescription:
        "Wähle aus, welche optionalen Cookies 迹时运动 verwenden darf. Du kannst deine Auswahl jederzeit ändern.",
      necessaryTitle: "Notwendig",
      necessaryStatus: "Immer aktiv",
      necessaryDescription:
        "Erforderlich, um deine Cookie-Auswahl zu speichern und die Website sicher bereitzustellen.",
      analyticsTitle: "Analyse",
      analyticsDescription:
        "Google Analytics erfasst Besuche und Klicks. Browser-, Cookie- und Nutzungsdaten werden von Google außerhalb Festlandchinas verarbeitet. Du kannst die Analyse jederzeit deaktivieren.",
      analyticsToggle: "Analyse-Cookies zulassen",
      save: "Auswahl speichern",
      close: "Cookie-Einstellungen schließen",
    },
    fr: {
      title: "Nous utilisons des cookies",
      description: "Avec votre accord, nous utilisons des cookies pour analyser les visites et améliorer le site. Vous pouvez refuser ou modifier votre choix à tout moment.",
      necessaryOnly: "Cookies nécessaires uniquement",
      customize: "Voir les détails",
      allowAll: "Tout accepter",
      settings: "Paramètres des cookies",
      privacy: "Cookies et confidentialité",
      detailTitle: "Paramètres des cookies",
      detailDescription:
        "Choisissez les cookies facultatifs que 迹时运动 peut utiliser. Vous pouvez modifier votre choix à tout moment.",
      necessaryTitle: "Nécessaires",
      necessaryStatus: "Toujours actifs",
      necessaryDescription:
        "Nécessaires pour mémoriser votre choix et fournir le site de manière sécurisée.",
      analyticsTitle: "Analyse",
      analyticsDescription:
        "Google Analytics mesure les visites et les clics et transmet les données du navigateur, des cookies et d’utilisation à Google pour un traitement hors de Chine continentale. Vous pouvez le désactiver à tout moment.",
      analyticsToggle: "Autoriser les cookies d’analyse",
      save: "Enregistrer les préférences",
      close: "Fermer les paramètres des cookies",
    },
    ja: {
      title: "Cookie を使用しています",
      description: "同意いただいた場合、Cookie を使用してアクセス状況を分析し、サイトの改善に役立てます。拒否したり、いつでも設定を変更したりできます。",
      necessaryOnly: "必要な Cookie のみ",
      customize: "詳細を見る",
      allowAll: "すべて許可",
      settings: "Cookie 設定",
      privacy: "Cookie とプライバシーの詳細",
      detailTitle: "Cookie 設定",
      detailDescription:
        "迹时运动 が使用できる任意の Cookie を選択します。選択内容はいつでも変更できます。",
      necessaryTitle: "必要な Cookie",
      necessaryStatus: "常に有効",
      necessaryDescription:
        "Cookie の選択内容を保存し、ウェブサイトを安全に提供するために必要です。",
      analyticsTitle: "アクセス解析",
      analyticsDescription:
        "Google Analytics は閲覧とクリックを計測し、ブラウザ、Cookie、利用状況のデータを Google に送信して中国本土外で処理します。いつでも無効にできます。",
      analyticsToggle: "解析 Cookie を許可",
      save: "選択を保存",
      close: "Cookie 設定を閉じる",
    },
    ko: {
      title: "쿠키를 사용합니다",
      description: "동의하시면 쿠키를 사용해 방문 현황을 분석하고 웹사이트를 개선합니다. 거부하거나 언제든지 선택을 변경할 수 있습니다.",
      necessaryOnly: "필수 쿠키만 사용",
      customize: "자세히 보기",
      allowAll: "모두 허용",
      settings: "쿠키 설정",
      privacy: "쿠키 및 개인정보 안내",
      detailTitle: "쿠키 설정",
      detailDescription:
        "迹时运动가 사용할 수 있는 선택적 쿠키를 선택하세요. 언제든지 선택을 변경할 수 있습니다.",
      necessaryTitle: "필수 쿠키",
      necessaryStatus: "항상 활성화",
      necessaryDescription:
        "쿠키 선택을 기억하고 웹사이트를 안전하게 제공하는 데 필요합니다.",
      analyticsTitle: "분석 쿠키",
      analyticsDescription:
        "Google Analytics는 방문과 클릭을 측정하며 브라우저, 쿠키 및 이용 데이터를 Google로 전송하여 중국 본토 밖에서 처리합니다. 언제든지 끌 수 있습니다.",
      analyticsToggle: "분석 쿠키 허용",
      save: "선택 저장",
      close: "쿠키 설정 닫기",
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
    const copy = COPY[locale] || COPY.en;
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
        <div class="analytics-consent__brand" aria-hidden="true">
          <img src="/assets/AppIcon_cornor-128.png" alt="" width="48" height="48">
          <span>迹时运动</span>
        </div>
        <div class="analytics-consent__content">
          <div class="analytics-consent__view" data-consent-summary>
            <h2 id="analytics-consent-title">${copy.title}</h2>
            <p id="analytics-consent-description">${copy.description}</p>
            <a href="/privacy/#website-analytics">${copy.privacy}</a>
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
          <button class="analytics-consent__button" type="button" data-consent-customize>${copy.customize}</button>
          <button class="analytics-consent__button" type="button" data-consent-allow>${copy.allowAll}</button>
        </div>
        <div class="analytics-consent__actions analytics-consent__actions--details" data-consent-details-actions hidden>
          <button class="analytics-consent__button" type="button" data-consent-necessary>${copy.necessaryOnly}</button>
          <button class="analytics-consent__button" type="button" data-consent-save>${copy.save}</button>
          <button class="analytics-consent__button" type="button" data-consent-allow>${copy.allowAll}</button>
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

    panel.querySelector("[data-consent-customize]")?.addEventListener("click", () => {
      analyticsToggle.checked = false;
      setDetailsVisible(true);
      analyticsToggle.focus();
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
