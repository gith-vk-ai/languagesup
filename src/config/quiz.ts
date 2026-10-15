/**
 * Quiz content. Order matters: the first three questions are deliberately
 * effortless and positive (pick a language, picture the goal, say whether
 * you've tried before) so visitors commit before the reflective questions.
 *
 * `{language}` in a prompt is replaced with the language picked in step 1.
 * Answer `id`s are stable keys used by analytics and personalization — change
 * labels freely, but keep ids unless you also update `src/lib/personalize.ts`.
 */

export type Answer = {
  id: string;
  label: string;
  /** Short accent shown above the label (e.g. a greeting). */
  badge?: string;
  /** Text substituted for `{language}` in later prompts. */
  languageName?: string;
};

export type Question = {
  id: QuestionId;
  prompt: string;
  helper?: string;
  layout?: "grid" | "list";
  answers: Answer[];
};

export type QuestionId =
  | "language"
  | "goal"
  | "history"
  | "speaking"
  | "obstacle"
  | "readiness";

export const questions: Question[] = [
  {
    id: "language",
    prompt: "Which language would you love to speak?",
    helper: "Pick one to get started.",
    layout: "grid",
    answers: [
      { id: "spanish", badge: "¡Hola!", label: "Spanish", languageName: "Spanish" },
      { id: "french", badge: "Bonjour !", label: "French", languageName: "French" },
      { id: "italian", badge: "Ciao!", label: "Italian", languageName: "Italian" },
      { id: "german", badge: "Hallo!", label: "German", languageName: "German" },
      { id: "japanese", badge: "こんにちは", label: "Japanese", languageName: "Japanese" },
      { id: "portuguese", badge: "Olá!", label: "Portuguese", languageName: "Portuguese" },
      { id: "korean", badge: "안녕하세요", label: "Korean", languageName: "Korean" },
      { id: "other", badge: "…", label: "Another language", languageName: "a new language" },
    ],
  },
  {
    id: "goal",
    prompt: "Imagine you already speak {language}. What would it make possible for you?",
    layout: "list",
    answers: [
      { id: "travel", label: "Traveling and connecting with people abroad." },
      { id: "family", label: "Communicating with family, friends, or a partner." },
      { id: "career", label: "New career and professional opportunities." },
      { id: "culture", label: "Enjoying movies, music, and culture without translation." },
      { id: "confidence", label: "Feeling more confident and accomplished." },
      { id: "enjoyment", label: "Simply enjoying the experience of learning something new." },
    ],
  },
  {
    id: "history",
    prompt: "Have you tried learning {language} before?",
    layout: "list",
    answers: [
      { id: "restarts", label: "Yes, several times — but I keep starting over." },
      { id: "little_progress", label: "Yes, but I never made much progress." },
      { id: "basics", label: "I've learned some basics, but speaking is still difficult." },
      { id: "beginner", label: "Not really — I'm just getting started." },
    ],
  },
  {
    id: "speaking",
    prompt: "What usually happens when you try to speak?",
    layout: "list",
    answers: [
      { id: "no_sentences", label: "I know some words, but I can't put sentences together." },
      { id: "understand_more", label: "I understand more than I can actually say." },
      { id: "too_fast", label: "Native speakers talk too fast for me to follow." },
      { id: "nervous", label: "I get nervous and forget what I've learned." },
      { id: "no_practice", label: "I haven't had many opportunities to practice speaking." },
      { id: "not_yet", label: "I'm a beginner and haven't tried speaking yet." },
    ],
  },
  {
    id: "obstacle",
    prompt: "What's been your biggest obstacle to making progress?",
    layout: "list",
    answers: [
      { id: "motivation", label: "I lose motivation after a while." },
      { id: "memory", label: "I struggle to remember what I've learned." },
      { id: "boring", label: "Traditional lessons feel boring or impractical." },
      { id: "pronunciation", label: "I'm never sure my pronunciation sounds right." },
      { id: "time", label: "I don't have enough time to study consistently." },
      { id: "routine", label: "I haven't found a learning routine that works for me." },
    ],
  },
  {
    id: "readiness",
    prompt:
      "If you could explore a more practical way to learn, would you give {language} another try?",
    layout: "list",
    answers: [
      { id: "ready", label: "Absolutely — I'm ready to start." },
      { id: "if_schedule", label: "Yes, if it fits my schedule." },
      { id: "possibly", label: "Possibly — I'd like to see how it works." },
      { id: "exploring", label: "I'm still exploring my options." },
    ],
  },
];

export type QuizAnswers = Partial<Record<QuestionId, string>>;

export function findAnswer(questionId: QuestionId, answerId: string | undefined) {
  const q = questions.find((x) => x.id === questionId);
  return q?.answers.find((a) => a.id === answerId);
}

export function languageName(answers: QuizAnswers): string {
  return findAnswer("language", answers.language)?.languageName ?? "a new language";
}

export function renderPrompt(prompt: string, answers: QuizAnswers): string {
  return prompt.replaceAll("{language}", languageName(answers));
}
