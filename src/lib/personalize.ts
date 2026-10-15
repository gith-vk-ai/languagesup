import { findAnswer, languageName, type QuizAnswers } from "@/config/quiz";

/**
 * Deterministic results copy: the same answers always produce the same text.
 * It reflects what the visitor told us — it is not an assessment or a score.
 */

export type Insight = { title: string; body: string };

export type Results = {
  language: string;
  intro: string;
  insights: Insight[];
  goalLine: string;
  nextStep: string;
  snapshot: { label: string; value: string }[];
};

const intros: Record<string, (lang: string) => string> = {
  restarts: (l) =>
    `You've started ${l} more than once — and you keep coming back. That kind of persistence is worth building on, not starting over from scratch again.`,
  little_progress: (l) =>
    `You've already put real time into ${l}, even if the progress didn't feel like it matched the effort. That gap is common, and it's often about how you practice rather than how capable you are.`,
  basics: (l) =>
    `You already have a foundation in ${l}. The next step isn't learning everything again — it's turning what you know into words you can actually use.`,
  beginner: (l) =>
    `You're at the start of your ${l} journey — a great moment to build habits that focus on real conversation from day one.`,
};

const speakingInsights: Record<string, Insight> = {
  no_sentences: {
    title: "From words to sentences",
    body: "You've already put effort into learning, but turning knowledge into real conversation has been a challenge. Practicing whole phrases you'd actually say — not just single words — could help sentences come together more naturally.",
  },
  understand_more: {
    title: "Closing the gap between understanding and speaking",
    body: "Understanding more than you can say is a sign the knowledge is there. More opportunities to say things out loud could help you build confidence and make that knowledge easier to reach.",
  },
  too_fast: {
    title: "Training your ear",
    body: "Real speech is faster and messier than textbook dialogue. Regular listening to natural, everyday conversations can make native speakers feel less overwhelming over time.",
  },
  nervous: {
    title: "Practicing without pressure",
    body: "Freezing up is incredibly common. Rehearsing conversations in a low-pressure setting first — where mistakes cost nothing — may help you feel calmer when it counts.",
  },
  no_practice: {
    title: "More chances to speak",
    body: "You've had few chances to actually speak. More opportunities to practice speaking, even on your own, could help you build confidence before real conversations.",
  },
  not_yet: {
    title: "Speaking early",
    body: "You haven't tried speaking yet — and that's fine. Starting to say simple phrases out loud early on can make speaking feel normal instead of intimidating later.",
  },
};

const obstacleInsights: Record<string, Insight> = {
  motivation: {
    title: "Keeping momentum",
    body: "Staying consistent has been your biggest challenge. Finding an engaging and manageable routine — with progress you can actually see — may help you maintain momentum.",
  },
  memory: {
    title: "Making it stick",
    body: "Remembering new words and expressions hasn't been easy. Revisiting language through practical situations and regular repetition may help.",
  },
  boring: {
    title: "Learning that feels practical",
    body: "Lessons that feel disconnected from real life are hard to stick with. Learning through everyday situations and the culture behind the language can make study time feel more worthwhile.",
  },
  pronunciation: {
    title: "Sounding more natural",
    body: "Not knowing whether you sound right can hold you back from speaking at all. Listening closely to native audio and comparing your own pronunciation can help you feel more sure of yourself.",
  },
  time: {
    title: "Fitting it into real life",
    body: "Finding time for language learning can be difficult. Short, consistent learning sessions may be easier to maintain than occasional long study sessions.",
  },
  routine: {
    title: "Finding a routine that fits",
    body: "You haven't found a routine that works for you yet. A clear structure that tells you what to do next may make it easier to keep going.",
  },
};

const goalLines: Record<string, string> = {
  travel: "And you know why it matters: traveling and connecting with people when you get there.",
  family: "And you know why it matters: being able to talk with the people closest to you.",
  career: "And you know why it matters: opening doors in your career.",
  culture: "And you know why it matters: enjoying movies, music, and culture as they were meant to be heard.",
  confidence: "And you know why it matters: the confidence of finally being able to say, “I speak it.”",
  enjoyment: "And you know why it matters: the simple joy of learning something new.",
};

const nextSteps: Record<string, string> = {
  ready: "You said you're ready — so it's worth taking a look while the motivation is fresh.",
  if_schedule: "Since your schedule matters, look for an approach you can fit into short sessions on your own time.",
  possibly: "There's no commitment in taking a look and seeing how a different approach works.",
  exploring: "Exploring your options is a smart move — here's one worth adding to your list.",
};

export function buildResults(answers: QuizAnswers): Results {
  const lang = languageName(answers);
  const intro = (intros[answers.history ?? ""] ?? intros.little_progress)(lang);

  const insights: Insight[] = [];
  const speaking = speakingInsights[answers.speaking ?? ""];
  if (speaking) insights.push(speaking);
  const obstacle = obstacleInsights[answers.obstacle ?? ""];
  if (obstacle) insights.push(obstacle);

  const goal = findAnswer("goal", answers.goal);
  const obstacleAnswer = findAnswer("obstacle", answers.obstacle);

  return {
    language: lang,
    intro,
    insights,
    goalLine: goalLines[answers.goal ?? ""] ?? "",
    nextStep: nextSteps[answers.readiness ?? ""] ?? nextSteps.possibly,
    snapshot: [
      { label: "Language", value: findAnswer("language", answers.language)?.label ?? "Not chosen" },
      { label: "Your why", value: goal ? trimPeriod(goal.label) : "—" },
      { label: "Focus area", value: obstacle ? obstacle.title : obstacleAnswer?.label ?? "—" },
    ],
  };
}

function trimPeriod(s: string): string {
  return s.replace(/\.$/, "");
}
