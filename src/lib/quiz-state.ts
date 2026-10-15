import { questions, type QuestionId, type QuizAnswers } from "@/config/quiz";
import { readJson, remove, writeJson } from "./storage";

const KEY = "lu_quiz_v1";

export type QuizState = {
  answers: QuizAnswers;
  started: boolean;
  completed: boolean;
};

const empty: QuizState = { answers: {}, started: false, completed: false };

export function loadQuiz(): QuizState {
  const saved = readJson<QuizState>("session", KEY);
  if (!saved || typeof saved.answers !== "object") return { ...empty, answers: {} };
  // Drop answers whose ids no longer exist in the config.
  const answers: QuizAnswers = {};
  for (const q of questions) {
    const id = saved.answers[q.id];
    if (id && q.answers.some((a) => a.id === id)) answers[q.id] = id;
  }
  return { answers, started: Boolean(saved.started), completed: Boolean(saved.completed) && isComplete(answers) };
}

export function saveQuiz(state: QuizState): void {
  writeJson("session", KEY, state);
}

export function resetQuiz(): void {
  remove("session", KEY);
}

export function isComplete(answers: QuizAnswers): boolean {
  return questions.every((q) => Boolean(answers[q.id]));
}

/** 1-based index of the first unanswered question (or the last one). */
export function firstOpenStep(answers: QuizAnswers): number {
  const i = questions.findIndex((q) => !answers[q.id as QuestionId]);
  return i === -1 ? questions.length : i + 1;
}
