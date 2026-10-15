import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with LanguagesUp.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact">
      <p>Questions, feedback, or a privacy request? We&apos;d love to hear from you.</p>
      <p>
        Email:{" "}
        <a href={`mailto:${site.contactEmail}`} className="font-semibold">
          {site.contactEmail}
        </a>
      </p>
      <p>
        Please note that LanguagesUp does not sell language courses. For questions about a course,
        account, subscription, or billing on an external platform, please contact that provider
        directly.
      </p>
    </InfoPage>
  );
}
