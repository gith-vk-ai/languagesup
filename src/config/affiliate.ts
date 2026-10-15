/**
 * Outbound affiliate destination — the single place to change where the
 * results-page CTA sends visitors.
 *
 * - `liveUrl`: the approved affiliate link (e.g. the CJ Affiliate link for
 *   Rocket Languages). Leave empty until the real link is available; never
 *   put a guessed or made-up tracking URL here.
 * - `previewUrl`: plain, non-affiliate destination used while `liveUrl` is
 *   empty, or whenever the site runs with NEXT_PUBLIC_AFFILIATE_MODE=preview.
 */
export const affiliate = {
  provider: "cj", // informational: which network the live link belongs to
  liveUrl: "",
  previewUrl: "https://www.rocketlanguages.com/",
  openInNewTab: true,

  /**
   * Optional sub-ID passthrough. Set `param` to the query parameter the
   * network supports for click-level tracking (check the network's docs for
   * the approved link format before enabling). `null` disables it.
   * The value is built from the visitor's captured campaign data.
   */
  subId: {
    param: null as string | null,
    fields: ["utm_campaign", "utm_content", "ad_id"] as const,
    separator: "_",
    maxLength: 100,
  },

  /** Extra static query parameters appended to the outbound URL. */
  staticParams: {} as Record<string, string>,
} as const;

export function isAffiliateLive(): boolean {
  if (process.env.NEXT_PUBLIC_AFFILIATE_MODE === "preview") return false;
  return affiliate.liveUrl.trim().length > 0;
}
