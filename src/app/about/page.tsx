import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description: "LanguagesUp is an independent website for adults who want to give language learning another try.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <InfoPage title="About LanguagesUp">
      <p>
        LanguagesUp is an independent educational website for adults who have tried learning a
        language — maybe more than once — and still find real conversations hard.
      </p>
      <p>
        If that sounds like you, you&apos;re in very good company. Plenty of motivated, capable
        learners collect vocabulary and grammar without getting enough chances to actually speak.
        We believe a lack of progress doesn&apos;t automatically mean a lack of ability, and that
        the way you practice matters.
      </p>
      <h2>What we do</h2>
      <p>
        Our short quiz helps you reflect on what has gotten in the way so far and what you might
        try differently. At the end, you can choose to explore an external language-learning
        platform and decide for yourself whether its approach fits your goals.
      </p>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t review, rank, or compare language courses.</li>
        <li>We don&apos;t sell courses ourselves, and we don&apos;t operate the external websites we link to.</li>
        <li>We don&apos;t promise fluency or specific results — learning a language takes time and practice.</li>
        <li>Our quiz is a reflection tool, not a scientific or psychological assessment.</li>
      </ul>
      <h2>How we&apos;re funded</h2>
      <p>
        Some links on this site are affiliate links. If you make a purchase after following one, we
        may earn a commission at no additional cost to you. See our{" "}
        <Link href="/affiliate-disclosure/">Affiliate Disclosure</Link> for details.
      </p>
    </InfoPage>
  );
}
