import { hasAnyTracking, tracking } from "@/config/tracking";
import { getAttribution } from "./attribution";
import { readJson, writeJson } from "./storage";

/**
 * Funnel events. There is intentionally no purchase/conversion event:
 * sales are only confirmed by the affiliate network's own reporting.
 */
export type EventName =
  | "PageView"
  | "QuizStart"
  | "QuizStepViewed"
  | "QuizAnswered"
  | "QuizCompleted"
  | "ResultsViewed"
  | "OutboundAffiliateClick";

export type EventParams = Record<string, string | number | boolean | undefined>;

// GA4 recommends snake_case event names; page_view is GA4's own name.
const ga4Names: Record<EventName, string> = {
  PageView: "page_view",
  QuizStart: "quiz_start",
  QuizStepViewed: "quiz_step_viewed",
  QuizAnswered: "quiz_answered",
  QuizCompleted: "quiz_completed",
  ResultsViewed: "results_viewed",
  OutboundAffiliateClick: "outbound_affiliate_click",
};

type Consent = "granted" | "denied";
const CONSENT_KEY = "lu_consent_v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
  }
}

let loaded = false;
const pending: Array<[EventName, EventParams]> = [];

export function getConsent(): Consent | null {
  return readJson<Consent>("local", CONSENT_KEY);
}

export function setConsent(value: Consent): void {
  writeJson("local", CONSENT_KEY, value);
  if (value === "granted") {
    loadProviders();
    flush();
  } else {
    pending.length = 0;
  }
}

function gpcEnabled(): boolean {
  return (
    tracking.honorGlobalPrivacyControl &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}

function trackingAllowed(): boolean {
  if (!hasAnyTracking() || gpcEnabled()) return false;
  return !tracking.requireConsent || getConsent() === "granted";
}

/** Call once on app start. Loads providers if consent allows it. */
export function initAnalytics(): void {
  if (trackingAllowed()) {
    loadProviders();
    flush();
  }
}

export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined" || !hasAnyTracking()) return;
  const payload = { ...getAttribution(), ...params };
  if (!trackingAllowed()) {
    // Hold events from this page view in case the visitor accepts the banner.
    if (tracking.requireConsent && !gpcEnabled() && getConsent() !== "denied" && pending.length < 50) {
      pending.push([name, payload]);
    }
    return;
  }
  send(name, payload);
}

function flush(): void {
  while (pending.length) {
    const [name, params] = pending.shift()!;
    send(name, params);
  }
}

function send(name: EventName, params: EventParams): void {
  if (tracking.gtmId) {
    window.dataLayer?.push({ event: name, ...params });
  }
  if (tracking.ga4Id && window.gtag) {
    const ga = name === "PageView"
      ? { page_location: window.location.href, page_title: document.title, ...params }
      : params;
    window.gtag("event", ga4Names[name], ga);
  }
  if (tracking.metaPixelId && window.fbq) {
    if (name === "PageView") window.fbq("track", "PageView");
    else window.fbq("trackCustom", name, params);
  }
}

function loadScript(src: string): void {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadProviders(): void {
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];

  if (tracking.gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tracking.gtmId)}`);
  }

  if (tracking.ga4Id) {
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", tracking.ga4Id, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.ga4Id)}`);
  }

  if (tracking.metaPixelId && !window.fbq) {
    type FbqStub = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: unknown;
    };
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as FbqStub;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    (window as unknown as { _fbq: unknown })._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", tracking.metaPixelId);
  }
}
