// app/components/test/Results.tsx
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { QuizVariant, Question } from "../../lib/quiz/types";

type QuizResult = {
  questionId: string;
  chosenIndex: 0 | 1 | 2 | 3;
  isCorrect: boolean;
};

type ResultsProps = {
  results: QuizResult[];
  questions: Question[];
  variant: QuizVariant;
  onRestart: () => void;
};

export default function Results({
  results,
  questions,
  variant,
  onRestart,
}: ResultsProps) {
  const router = useRouter();

  const correct = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const percentage = Math.round((correct / total) * 100);

  const getLevel = () => {
    if (percentage >= 90) return "Відмінно! 🎉";
    if (percentage >= 70) return "Добре! 👍";
    if (percentage >= 50) return "Задовільно";
    return "Потрібно попрацювати 📚";
  };

  const getRecommendation = () => {
    if (variant === "easy") {
      if (percentage >= 80) {
        return "Ви готові спробувати рівень Medium!";
      }
      return "Повторіть базові теми перед переходом на наступний рівень.";
    }
    if (variant === "medium") {
      if (percentage >= 80) {
        return "Чудовий результат! Спробуйте рівень Hard.";
      }
      return "Зосередьтеся на граматиці та reading стратегіях.";
    }
    if (percentage >= 80) {
      return "Ви готові до НМТ! Продовжуйте практикуватися.";
    }
    return "Попрацюйте над складними конструкціями та нюансами.";
  };

  const weakTopics = useMemo(() => {
    const topicStats = new Map<string, { correct: number; total: number }>();

    results.forEach((result, i) => {
      const question = questions[i];
      if (!question) return;

      const stats = topicStats.get(question.topic) || { correct: 0, total: 0 };
      stats.total += 1;
      if (result.isCorrect) stats.correct += 1;
      topicStats.set(question.topic, stats);
    });

    return Array.from(topicStats.entries())
      .filter(([_, stats]) => stats.correct / stats.total < 0.7)
      .map(([topic]) => topic)
      .slice(0, 3);
  }, [results, questions]);

  const variantColors = {
    easy: { main: "var(--easy)", light: "var(--easy-light)" },
    medium: { main: "var(--medium)", light: "var(--medium-light)" },
    hard: { main: "var(--hard)", light: "var(--hard-light)" },
  };

  const colors = variantColors[variant];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ваш результат</h2>

          <div className="mt-6">
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full text-5xl font-black"
              style={{ backgroundColor: colors.light }}
            >
              {percentage}%
            </div>

            <p className="mt-4 text-xl font-semibold text-gray-700">
              {correct} з {total} правильних
            </p>

            <p
              className="mt-2 text-lg font-medium"
              style={{ color: colors.main }}
            >
              {getLevel()}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-6">
          <h3 className="font-semibold text-gray-900">Рекомендація:</h3>
          <p className="mt-2 text-gray-700">{getRecommendation()}</p>
        </div>

        {weakTopics.length > 0 && (
          <div className="mt-6 rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900">
              Теми для покращення:
            </h3>
            <ul className="mt-3 space-y-2">
              {weakTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-lg">•</span>
                  <span className="capitalize">{topic.replace(/_/g, " ")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onRestart}
            className="flex-1 rounded-full px-6 py-3 font-semibold text-gray-900 transition-colors hover:opacity-90"
            style={{ backgroundColor: colors.light }}
          >
            Пройти ще раз
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex-1 rounded-full border-2 border-gray-900 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Повернутися на головну
          </button>
        </div>
      </div>

      <details className="rounded-2xl border border-gray-200 bg-white">
        <summary className="cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
          Переглянути детальний розбір
        </summary>

        <div className="space-y-4 border-t border-gray-200 p-6">
          {results.map((result, i) => {
            const question = questions[i];
            if (!question) return null;

            return (
              <div
                key={question.id}
                className="rounded-lg border p-4"
                style={{
                  borderColor: result.isCorrect ? "#10b981" : "#ef4444",
                  backgroundColor: result.isCorrect ? "#f0fdf4" : "#fef2f2",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {i + 1}. {question.prompt}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      Ваша відповідь:{" "}
                      <strong>{question.options[result.chosenIndex]}</strong>
                    </p>
                    {!result.isCorrect && (
                      <p className="mt-1 text-sm text-gray-700">
                        Правильна відповідь:{" "}
                        <strong>
                          {question.options[question.correctIndex]}
                        </strong>
                      </p>
                    )}
                    {question.explanation && (
                      <p className="mt-2 text-sm text-gray-600">
                        💡 {question.explanation}
                      </p>
                    )}
                  </div>
                  <span className="ml-4 text-2xl">
                    {result.isCorrect ? "✅" : "❌"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
