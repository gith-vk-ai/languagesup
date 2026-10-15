import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How LanguagesUp may earn commissions from links to external websites.",
  alternates: { canonical: "/affiliate-disclosure/" },
};

export default function AffiliateDisclosurePage() {
  return (
    <InfoPage title="Affiliate Disclosure" updated={site.legalUpdated}>
      <p>
        LanguagesUp.com is an independent website. Some links on this site — including the button
        at the end of our quiz — are affiliate links. If you click one and later make a purchase on
        the external website, we may earn a commission at no additional cost to you.
      </p>
      <h2>What this means for you</h2>
      <ul>
        <li>You never pay more because you came from LanguagesUp.</li>
        <li>
          LanguagesUp does not operate, own, or control the external websites we link to. Their
          products, prices, trials, and policies are set by them, and their own terms and privacy
          policies apply once you leave our site.
        </li>
        <li>
          We do not publish product reviews, rankings, or comparisons, and nothing on this site is a
          guarantee of any learning outcome.
        </li>
      </ul>
      <h2>Affiliate networks</h2>
      <p>
        We may work with affiliate networks such as CJ Affiliate. When you click an affiliate link,
        the network and the destination website may use cookies or similar technologies to record
        that the visit came from us, so that a commission can be attributed if a purchase is made.
        See our <a href="/privacy/">Privacy Policy</a> and <a href="/cookies/">Cookie Policy</a> for more.
      </p>
      <h2>Questions</h2>
      <p>
        Contact us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </InfoPage>
  );
}
