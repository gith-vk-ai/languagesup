import type { Metadata } from "next";
import { Results } from "@/components/Results";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Your Quiz Results",
  robots: { index: false, follow: true },
};

export default function ResultsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 px-4 pb-16 pt-2">
        <Results />
      </main>
      <SiteFooter />
    </>
  );
}
