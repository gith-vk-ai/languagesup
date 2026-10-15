"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { affiliate, isAffiliateLive } from "@/config/affiliate";
import { track } from "@/lib/analytics";
import { outboundUrl } from "@/lib/outbound";

/** CTA label variants kept here for future A/B tests. */
export const ctaVariants = {
  a: "See What's Possible",
  b: "Explore a Different Approach",
} as const;

export function AffiliateCta({
  variant = "a",
  placement,
  tone = "light",
}: {
  variant?: keyof typeof ctaVariants;
  placement: string;
  tone?: "light" | "dark";
}) {
  const subtle = tone === "dark" ? "text-white/60" : "text-muted";
  // Built after mount so the sub-ID can include the visitor's campaign data.
  const [href, setHref] = useState<string>(isAffiliateLive() ? affiliate.liveUrl : affiliate.previewUrl);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHref(outboundUrl());
  }, []);

  return (
    <div>
      <a
        href={href}
        target={affiliate.openInNewTab ? "_blank" : undefined}
        rel="sponsored noopener"
        onClick={() =>
          track("OutboundAffiliateClick", {
            placement,
            cta_variant: variant,
            destination_mode: isAffiliateLive() ? "live" : "preview",
            provider: affiliate.provider,
          })
        }
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-7 py-4 text-lg font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-teal-dark active:translate-y-0 sm:w-auto"
      >
        {ctaVariants[variant]}
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 transition group-hover:translate-x-0.5">
          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {affiliate.openInNewTab && <span className="sr-only">(opens in a new tab)</span>}
      </a>
      <p className={`mt-3 text-xs leading-relaxed ${subtle}`}>
        Disclosure: We may earn a commission if you purchase through links on this website, at no
        additional cost to you.{" "}
        <Link href="/affiliate-disclosure/" className="underline underline-offset-2">
          Learn more
        </Link>
      </p>
    </div>
  );
}
