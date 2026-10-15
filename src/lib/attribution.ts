import { tracking } from "@/config/tracking";
import { readJson, writeJson } from "./storage";

const KEY = "lu_attribution_v1";

export type Attribution = Record<string, string>;

/**
 * Captures campaign parameters from the landing URL. The first set seen in a
 * session wins, so internal navigation never overwrites the ad that brought
 * the visitor in.
 */
export function captureAttribution(): Attribution {
  const existing = readJson<Attribution>("session", KEY);
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {};
  for (const name of tracking.attributionParams) {
    const value = params.get(name);
    if (value) data[name] = value.slice(0, 200);
  }
  if (document.referrer) {
    try {
      const ref = new URL(document.referrer);
      if (ref.hostname !== window.location.hostname) data.referrer_host = ref.hostname;
    } catch {
      // ignore malformed referrers
    }
  }
  data.landing_path = window.location.pathname;
  writeJson("session", KEY, data);
  return data;
}

export function getAttribution(): Attribution {
  return readJson<Attribution>("session", KEY) ?? {};
}
