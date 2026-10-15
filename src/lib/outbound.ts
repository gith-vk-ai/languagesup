import { affiliate, isAffiliateLive } from "@/config/affiliate";
import { getAttribution } from "./attribution";

/** Builds the outbound URL from config plus optional sub-ID passthrough. */
export function outboundUrl(): string {
  const live = isAffiliateLive();
  const url = new URL(live ? affiliate.liveUrl : affiliate.previewUrl);

  for (const [k, v] of Object.entries(affiliate.staticParams)) url.searchParams.set(k, v);

  if (live && affiliate.subId.param) {
    const attribution = getAttribution();
    const value = affiliate.subId.fields
      .map((f) => attribution[f])
      .filter(Boolean)
      .join(affiliate.subId.separator)
      .replace(/[^A-Za-z0-9_\-.]/g, "")
      .slice(0, affiliate.subId.maxLength);
    if (value) url.searchParams.set(affiliate.subId.param, value);
  }
  return url.toString();
}
