import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LanguagesUp handles information collected from visitors.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" updated={site.legalUpdated}>
      <p>
        This Privacy Policy explains what information LanguagesUp.com (&quot;LanguagesUp,&quot;
        &quot;we,&quot; &quot;us&quot;) collects, how it is used, and the choices available to you.
      </p>
      <h2>Information we don&apos;t ask for</h2>
      <p>
        You don&apos;t need to create an account or give us your name or email address to take our
        quiz or see your results.
      </p>
      <h2>Information collected automatically</h2>
      <p>
        Like most websites, our hosting provider (Cloudflare) processes technical information when
        you visit, such as your IP address, browser and device type, pages requested, referring
        page, and time of visit. This is used to deliver the site, keep it secure, and maintain
        performance.
      </p>
      <h2>Quiz answers</h2>
      <p>
        Your quiz answers are stored in your browser&apos;s session storage to show your
        personalized results. Unless you have opted out (see below), your answers are also sent to our
        analytics tools as events (never together with your name or email, which we don&apos;t
        collect) so we can understand which questions resonate and where people drop off. Our quiz is a reflection tool, not a
        scientific or psychological assessment.
      </p>
      <h2>Analytics, advertising, and campaign data</h2>
      <p>
        We may use Google Analytics 4, Google Tag Manager, and the Meta Pixel. If your browser sends
        a Global Privacy Control (GPC) signal, we don&apos;t load these tools. We also read campaign parameters from the link that brought you here (for
        example, UTM tags or ad identifiers) to measure which campaigns perform well. Details are in
        our <a href="/cookies/">Cookie Policy</a>.
      </p>
      <h2>External websites and affiliate links</h2>
      <p>
        Our site links to external websites that we do not operate. Some of these links are
        affiliate links, which may pass a non-personal campaign reference so that a resulting
        purchase can be attributed to us. Once you leave LanguagesUp, the external website&apos;s
        own privacy policy applies.
      </p>
      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We share data only with the service providers
        described above (hosting, analytics, advertising measurement, and affiliate networks) for
        the purposes described in this policy.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example, California or the European Economic Area), you
        may have rights to access, delete, or object to the processing of your personal
        information, and to opt out of targeted advertising, including by enabling Global Privacy
        Control in your browser. Contact us to make a request.
      </p>
      <h2>Children</h2>
      <p>This website is intended for adults and is not directed at children under 16.</p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date above shows when it last changed.</p>
      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </InfoPage>
  );
}
