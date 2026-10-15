/**
 * Analytics providers. Leave an ID empty to disable that provider.
 * Use EITHER `gtmId` (and configure GA4 inside GTM) OR `ga4Id` directly —
 * enabling both with the same GA4 property double-counts events.
 */
export const tracking = {
  metaPixelId: "",
  ga4Id: "",
  gtmId: "",

  /**
   * When true, no tracking script loads until the visitor accepts the cookie
   * banner. The banner is only shown when at least one provider is enabled.
   */
  requireConsent: true,

  /** URL / campaign parameters captured on landing and attached to events. */
  attributionParams: [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "campaign_id",
    "adset_id",
    "ad_id",
    "placement",
    "fbclid",
    "gclid",
  ],
} as const;

export function hasAnyTracking(): boolean {
  return Boolean(tracking.metaPixelId || tracking.ga4Id || tracking.gtmId);
}
