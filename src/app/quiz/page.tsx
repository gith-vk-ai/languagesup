import type { Metadata } from "next";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { Quiz, QuizSkeleton } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "What's Holding Your Language Learning Back?",
  description: "A free 60-second quiz for anyone who has tried learning a language and still struggles to speak it.",
  alternates: { canonical: "/quiz/" },
};

export default function QuizPage() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-xl items-center px-4 py-4">
        <Logo />
      </header>
      <main id="main" className="flex-1 px-4 pb-16 pt-2">
        <Suspense fallback={<QuizSkeleton />}>
          <Quiz />
        </Suspense>
      </main>
    </>
  );
}
