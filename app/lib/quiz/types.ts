// app/lib/quiz/types.ts
export type QuizVariant = "easy" | "medium" | "hard";

export type QuestionType = "grammar" | "vocab" | "reading";

export type Question = {
  id: string;
  variant: QuizVariant;
  type: QuestionType;
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation?: string;
};
