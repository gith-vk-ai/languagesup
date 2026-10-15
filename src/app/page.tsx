import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function QuizCta({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="/quiz/"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-7 py-4 text-lg font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-teal-dark active:translate-y-0 sm:w-auto"
      >
        Discover What&apos;s Holding Me Back
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 transition group-hover:translate-x-0.5">
          <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="mt-3 text-center text-sm text-muted sm:text-left">
        Free 60-second quiz • No signup required
      </p>
    </div>
  );
}

function ConversationIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-sm animate-rise [animation-delay:150ms]">
      <div className="absolute -inset-3 -z-10 rounded-[2rem] sm:-inset-6 sm:rounded-[2.5rem] bg-gradient-to-br from-teal-soft via-white to-[#fdf0dc]" />
      <div className="rounded-3xl border border-line bg-surface p-5 shadow-lift">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <span className="h-2 w-2 rounded-full bg-teal" /> A real conversation
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-canvas px-4 py-3">
          <p className="font-semibold text-navy">¿Y tú, qué hiciste el fin de semana?</p>
          <p className="mt-0.5 text-xs text-muted">“So, what did you do this weekend?”</p>
        </div>
        <div className="ml-auto mt-3 w-fit rounded-2xl rounded-tr-md bg-teal px-4 py-3 text-white">
          <p className="font-semibold">Eh… yo… um…</p>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3">
          <span className="text-2xl">💭</span>
          <p className="text-sm text-muted">
            “I <em>studied</em> this. Why can&apos;t I remember how to say it?”
          </p>
        </div>
      </div>
    </div>
  );
}

const familiar = [
  {
    icon: "📱",
    title: "The app streak",
    body: "You kept the streak alive for weeks — then life got busy, and it quietly ended.",
  },
  {
    icon: "🗂️",
    title: "The vocabulary pile",
    body: "You learned hundreds of words, yet putting a simple sentence together still feels slow.",
  },
  {
    icon: "😶",
    title: "The freeze",
    body: "Someone answered you at normal speed, and suddenly everything you studied disappeared.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="mx-auto grid w-full max-w-5xl items-center gap-12 px-4 pb-14 pt-6 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-20 md:pt-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
              Why does language learning feel so hard?
            </p>
            <h1 className="mt-3 text-balance text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
              Started Learning a Language More Than Once… But Still Can&apos;t Speak It?
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              You&apos;ve learned words, practiced grammar, and maybe even tried a few apps. But when
              it&apos;s time for a real conversation, the words just don&apos;t come.
            </p>
            <p className="mt-5 border-l-4 border-sun pl-4 text-lg font-semibold leading-snug text-navy">
              Maybe the problem isn&apos;t your ability. Maybe it&apos;s the way you&apos;ve been learning.
            </p>
            <QuizCta className="mt-8" />
          </div>
          <ConversationIllustration />
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Sound familiar?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {familiar.map((f) => (
                <div key={f.title} className="rounded-2xl border border-line bg-canvas p-5">
                  <div className="text-2xl" aria-hidden="true">{f.icon}</div>
                  <h3 className="mt-3 font-bold text-navy">{f.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{f.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-ink">
              <p>
                Many language learners spend time studying without getting enough opportunities to
                practice real communication.
              </p>
              <p>
                A different approach could make the learning experience more practical, engaging,
                and easier to stick with.
              </p>
              <p className="font-semibold text-navy">
                Take our short quiz to explore what may be holding you back — and what you could try
                differently.
              </p>
            </div>
            <QuizCta className="mt-8" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
