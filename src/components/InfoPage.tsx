import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export function InfoPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 pt-4 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>}
        <div className="prose-lu mt-6 text-ink">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
