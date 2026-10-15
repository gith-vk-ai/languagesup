"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasAnyTracking, tracking } from "@/config/tracking";
import { getConsent, initAnalytics, setConsent, track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    captureAttribution();
    initAnalytics();
    // Reading consent from storage is only possible after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowBanner(hasAnyTracking() && tracking.requireConsent && getConsent() === null);
  }, []);

  useEffect(() => {
    track("PageView", { page_path: pathname });
  }, [pathname]);

  if (!showBanner) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setShowBanner(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl animate-enter rounded-2xl border border-line bg-surface p-4 shadow-lift sm:inset-x-6 sm:p-5"
    >
      <p className="text-sm leading-relaxed text-muted">
        We use cookies to understand how visitors use this site and to measure our ads.{" "}
        <Link href="/cookies/" className="font-medium text-teal-dark underline underline-offset-2">
          Cookie Policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-canvas"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
