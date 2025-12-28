// src/lib/quiz/index.ts
import { easyQuestions } from "./questions.easy";
import { mediumQuestions } from "./questions.medium";
import { hardQuestions } from "./questions.hard";

export const questionBank = {
  easy: easyQuestions,
  medium: mediumQuestions,
  hard: hardQuestions,
};
