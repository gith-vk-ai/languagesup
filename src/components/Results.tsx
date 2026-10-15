"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buildResults, type Results as ResultsData } from "@/lib/personalize";
import { track } from "@/lib/analytics";
import { isComplete, loadQuiz, resetQuiz } from "@/lib/quiz-state";
import { AffiliateCta } from "./AffiliateCta";

export function Results() {
  const router = useRouter();
  const [data, setData] = useState<ResultsData | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const { answers } = loadQuiz();
    if (!isComplete(answers)) {
      router.replace("/quiz/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(buildResults(answers));
    if (!tracked.current) {
      tracked.current = true;
      track("ResultsViewed", { ...answers });
    }
  }, [router]);

  if (!data) {
    return <div className="mx-auto min-h-[60vh] max-w-2xl" aria-busy="true" />;
  }

  const retake = () => {
    resetQuiz();
    router.push("/quiz/");
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <section className="animate-rise">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">Your results</p>
        <h1 className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[2.6rem]">
          Your Next Attempt Could Be Different.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Learning a new language can be challenging, especially when traditional study methods
          don&apos;t translate into real conversations.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Based on your answers, you may benefit from exploring a more practical approach that
          includes opportunities for listening, speaking, and consistent practice.
        </p>
      </section>

      <dl className="mt-8 grid animate-rise grid-cols-1 gap-3 [animation-delay:80ms] sm:grid-cols-3">
        {data.snapshot.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-surface px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{s.label}</dt>
            <dd className="mt-1 font-bold leading-snug text-navy">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-8 animate-rise rounded-3xl bg-surface p-6 shadow-card [animation-delay:160ms] sm:p-8">
        <h2 className="text-xl font-extrabold text-navy">What your answers tell us</h2>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink">{data.intro}</p>
        <div className="mt-6 space-y-5">
          {data.insights.map((i) => (
            <div key={i.title} className="flex gap-4">
              <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-teal" />
              <div>
                <h3 className="font-bold text-navy">{i.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{i.body}</p>
              </div>
            </div>
          ))}
        </div>
        {data.goalLine && (
          <p className="mt-6 border-l-4 border-sun pl-4 font-semibold leading-snug text-navy">{data.goalLine}</p>
        )}
      </section>

      <section className="mt-8 animate-rise rounded-3xl bg-navy p-6 text-white [animation-delay:240ms] sm:p-8">
        <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
          Ready to Explore a Different Way to Learn?
        </h2>
        <p className="mt-3 leading-relaxed text-white/80">
          Discover an interactive language-learning platform and see whether its approach fits your
          goals and lifestyle. {data.nextStep}
        </p>
        <div className="mt-6">
          <AffiliateCta placement="results" tone="dark" />
        </div>
        <p className="mt-4 text-xs text-white/60">
          You&apos;ll be taken to an independent third-party website that is not operated by LanguagesUp.
        </p>
      </section>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={retake}
          className="rounded-lg px-2 py-1 text-sm text-muted underline-offset-2 hover:text-navy hover:underline"
        >
          Retake the quiz
        </button>
      </div>
    </div>
  );
}
