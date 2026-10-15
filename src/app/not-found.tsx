import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export default function NotFound() {
  return (
    <InfoPage title="Page not found">
      <p>Sorry, we couldn&apos;t find that page.</p>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </InfoPage>
  );
}
