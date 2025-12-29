"use client";

import { useMemo, useState } from "react";
import type { QuizVariant, Question } from "../../lib/quiz/types";
import { questionBank } from "../../lib/quiz";
import QuestionComponent from "./Question";
import ProgressBar from "./ProgressBar";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type QuizResult = {
  questionId: string;
  chosenIndex: 0 | 1 | 2 | 3;
  isCorrect: boolean;
  topic: string;
};

export default function QuizClient({ variant }: { variant: QuizVariant }) {
  const questions = useMemo<Question[]>(() => {
    const bank = questionBank[variant] ?? [];
    return shuffle(bank);
  }, [variant]);

  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const current = questions[idx];

  const handleNext = (payload: {
    chosenIndex: 0 | 1 | 2 | 3;
    isCorrect: boolean;
  }) => {
    if (!current) return;

    const nextResults = [
      ...results,
      {
        questionId: current.id,
        chosenIndex: payload.chosenIndex,
        isCorrect: payload.isCorrect,
        topic: current.topic,
      },
    ];
    setResults(nextResults);

    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const score = results.filter((r) => r.isCorrect).length;

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm font-semibold text-gray-900">
          Немає питань для рівня: {variant}
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-semibold text-gray-900">Результат</h1>
          <p className="mt-2 text-gray-700">
            Правильних відповідей:{" "}
            <span className="font-semibold">{score}</span> / {total}
          </p>

          <button
            type="button"
            onClick={() => {
              setIdx(0);
              setResults([]);
              setDone(false);
            }}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Пройти ще раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20  px-6 ">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* left */}
        <div
          className="w-full rounded-2xl p-6 lg:basis-1/4 lg:flex-none"
          style={{ backgroundColor: `var(--${variant})` }}
        >
          <h1
            className="text-pretty text-4xl font-semibold tracking-tight sm:text-6xl"
            style={{ color: `var(--${variant}-light)` }}
          >
            <span className="uppercase font-black">{variant}</span>
          </h1>

          {/* <p className="mt-2 text-sm text-gray-900/80">
            Questions: <span className="font-semibold">{total}</span>
          </p> */}
        </div>

        {/* right */}
        <div className="w-full lg:basis-3/4">
          <ProgressBar total={total} currentStep={idx + 1} variant={variant} />
          <QuestionComponent
            question={current}
            variant={variant}
            index={idx + 1}
            total={total}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
