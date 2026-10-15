"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { questions, renderPrompt, type QuizAnswers } from "@/config/quiz";
import { track } from "@/lib/analytics";
import { firstOpenStep, loadQuiz, resetQuiz, saveQuiz, type QuizState } from "@/lib/quiz-state";

const ADVANCE_DELAY_MS = 260;
const total = questions.length;

function parseStep(raw: string | null): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= total ? n : null;
}

export function Quiz() {
  const router = useRouter();
  const params = useSearchParams();
  const [state, setState] = useState<QuizState | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const pushedSteps = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);

  // Load the saved session once on mount (storage isn't available during prerender).
  useEffect(() => {
    const saved = loadQuiz();
    if (!saved.started) {
      saved.started = true;
      saveQuiz(saved);
      track("QuizStart");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(saved);
    return () => window.clearTimeout(advanceTimer.current);
  }, []);

  // Never let the URL skip past the first unanswered question.
  const requested = parseStep(params.get("q"));
  const maxStep = state ? firstOpenStep(state.answers) : 1;
  const step = state ? Math.min(requested ?? (state.completed ? 1 : maxStep), maxStep) : null;

  useEffect(() => {
    if (step === null) return;
    if (requested !== step) window.history.replaceState(null, "", `?q=${step}`);
  }, [step, requested]);

  useEffect(() => {
    if (step === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPicked(null);
    track("QuizStepViewed", { step, question_id: questions[step - 1].id });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    const onPop = () => {
      if (pushedSteps.current > 0) pushedSteps.current -= 1;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choose = useCallback(
    (answerId: string) => {
      if (!state || step === null || picked) return;
      const question = questions[step - 1];
      const answers: QuizAnswers = { ...state.answers, [question.id]: answerId };
      const isLast = step === total;
      const next: QuizState = { ...state, answers, completed: isLast || state.completed };
      setPicked(answerId);
      setState(next);
      saveQuiz(next);
      track("QuizAnswered", { step, question_id: question.id, answer_id: answerId });

      advanceTimer.current = window.setTimeout(() => {
        if (isLast) {
          track("QuizCompleted", { ...answers });
          router.push("/results/");
        } else {
          pushedSteps.current += 1;
          window.history.pushState(null, "", `?q=${step + 1}`);
        }
      }, ADVANCE_DELAY_MS);
    },
    [state, step, picked, router],
  );

  const goBack = () => {
    if (step === null || step <= 1) return;
    if (pushedSteps.current > 0) window.history.back();
    else window.history.replaceState(null, "", `?q=${step - 1}`);
  };

  const restart = () => {
    window.clearTimeout(advanceTimer.current);
    resetQuiz();
    const fresh: QuizState = { answers: {}, started: true, completed: false };
    saveQuiz(fresh);
    setState(fresh);
    track("QuizStart", { restart: true });
    window.history.replaceState(null, "", "?q=1");
  };

  // Number keys pick answers: a small speed-up for keyboard users.
  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      const answer = questions[step - 1].answers[n - 1];
      if (answer) choose(answer.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, choose]);

  if (!state || step === null) return <QuizSkeleton />;

  const question = questions[step - 1];
  const selected = picked ?? state.answers[question.id];
  const progress = ((step - 1) / total) * 100;
  const isGrid = question.layout === "grid";

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-between text-sm font-semibold text-muted">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="-ml-2 inline-flex items-center gap-1 rounded-lg px-2 py-1.5 transition hover:text-navy disabled:invisible"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
            <path d="M16 10H5m4-4-4 4 4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span aria-live="polite">
          {step} of {total}
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={step - 1}
      >
        <div
          className="h-full rounded-full bg-teal transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>

      <div key={step} className="mt-8 animate-enter">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-navy outline-none sm:text-3xl"
        >
          {renderPrompt(question.prompt, state.answers)}
        </h1>
        {question.helper && <p className="mt-2 text-muted">{question.helper}</p>}

        <ul className={`mt-6 grid gap-3 ${isGrid ? "grid-cols-2" : "grid-cols-1"}`} role="list">
          {question.answers.map((a) => {
            const isSelected = selected === a.id;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => choose(a.id)}
                  className={[
                    "group flex w-full items-center gap-3 rounded-2xl border-2 bg-surface text-left shadow-card transition duration-150",
                    "hover:-translate-y-0.5 hover:border-teal/60 hover:shadow-lift active:translate-y-0 active:scale-[0.99]",
                    isGrid ? "min-h-24 flex-col justify-center px-3 py-4 text-center" : "min-h-16 px-4 py-3.5",
                    isSelected ? "border-teal bg-teal-soft" : "border-transparent",
                  ].join(" ")}
                >
                  {isGrid ? (
                    <>
                      <span className="text-lg font-bold text-teal-dark">{a.badge}</span>
                      <span className="font-semibold text-navy">{a.label}</span>
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden="true"
                        className={[
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition",
                          isSelected ? "border-teal bg-teal" : "border-line group-hover:border-teal/60",
                        ].join(" ")}
                      >
                        {isSelected && (
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white">
                            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[1.05rem] font-medium leading-snug text-ink">{a.label}</span>
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {(step > 1 || Object.keys(state.answers).length > 0) && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={restart}
            className="rounded-lg px-2 py-1 text-sm text-muted underline-offset-2 hover:text-navy hover:underline"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="mx-auto w-full max-w-xl" aria-busy="true" aria-label="Loading quiz">
      <div className="h-6" />
      <div className="mt-2 h-2 rounded-full bg-line" />
      <div className="mt-8 h-9 w-4/5 rounded-lg bg-line/70" />
      <div className="mt-6 grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="min-h-24 rounded-2xl bg-surface shadow-card" />
        ))}
      </div>
    </div>
  );
}
