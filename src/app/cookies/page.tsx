import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How LanguagesUp uses cookies and similar technologies.",
  alternates: { canonical: "/cookies/" },
};

export default function CookiesPage() {
  return (
    <InfoPage title="Cookie Policy" updated={site.legalUpdated}>
      <p>
        This Cookie Policy explains how LanguagesUp.com (&quot;LanguagesUp,&quot; &quot;we,&quot;
        &quot;us&quot;) uses cookies and similar technologies such as browser storage and tracking
        pixels.
      </p>
      <h2>Strictly necessary storage</h2>
      <p>
        Our quiz saves your answers in your browser&apos;s session storage so you can go back and
        forth between questions and see your results. This data stays in your browser and is
        cleared when you close the tab. We also store your cookie choice so we don&apos;t ask again
        on every page.
      </p>
      <h2>Analytics and advertising technologies</h2>
      <p>With your consent where required, we may use:</p>
      <ul>
        <li>
          <strong>Google Analytics 4 / Google Tag Manager</strong> — to understand how visitors use
          the site, for example how many people complete the quiz.
        </li>
        <li>
          <strong>Meta Pixel</strong> — to measure the performance of our ads on Facebook and
          Instagram and to show relevant ads.
        </li>
      </ul>
      <p>
        These tools may receive information such as pages viewed, quiz progress and answers, the
        campaign that brought you here, and when you click through to an external website.
      </p>
      <h2>Affiliate tracking</h2>
      <p>
        When you click an affiliate link, the affiliate network and the destination website may set
        their own cookies to attribute any resulting purchase to us. Those cookies are governed by
        their policies.
      </p>
      <h2>Your choices</h2>
      <p>
        You can accept or decline non-essential cookies in our banner. To change your choice later,
        clear this site&apos;s data in your browser settings and the banner will appear again. You
        can also block or delete cookies through your browser, and opt out of interest-based ads via
        your Meta and Google ad settings.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </InfoPage>
  );
}
