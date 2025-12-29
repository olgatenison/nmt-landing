// app/components/test/Question.tsx
"use client";

import { useId, useState } from "react";
import type {
  Question as QuizQuestion,
  QuizVariant,
} from "../../lib/quiz/types";

type Props = {
  question: QuizQuestion;
  onNext: (payload: { chosenIndex: 0 | 1 | 2 | 3; isCorrect: boolean }) => void;
  showInstantFeedback?: boolean;
  index?: number;
  total?: number;
  variant?: QuizVariant;
  onSkip?: () => void;
};

function QuestionContent({
  question,
  onNext,
  showInstantFeedback = false,
  index,
  total,
  variant = "easy",
  onSkip,
}: Props) {
  const groupName = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const main = `var(--${variant})`;
  const light = `var(--${variant}-light)`;

  const isCorrect = selected === question.correctIndex;

  const handleNext = () => {
    if (selected === null) return;

    if (!showInstantFeedback) {
      onNext({
        chosenIndex: selected as 0 | 1 | 2 | 3,
        isCorrect: selected === question.correctIndex,
      });
      return;
    }

    if (!submitted) setSubmitted(true);
    else {
      onNext({
        chosenIndex: selected as 0 | 1 | 2 | 3,
        isCorrect: selected === question.correctIndex,
      });
    }
  };

  return (
    <fieldset className="rounded-2xl border border-gray-200  p-6 w-full mx-auto bg-gray-100">
      <p className="mt-2 text-xl font-semibold text-gray-900">
        {question.prompt}
      </p>

      <div className="mt-6 space-y-3">
        {question.options.map((opt, i) => {
          const checked = selected === i;
          const optionId = `${groupName}-${question.id}-${i}`;

          const showFeedback =
            showInstantFeedback && submitted && selected !== null;
          const isRightOption = i === question.correctIndex;
          const isChosen = i === selected;

          const base =
            "flex items-start gap-3 rounded-xl border px-4 py-3 transition cursor-pointer";
          const normal = "border-gray-200 hover:bg-gray-50";
          const active = "bg-gray-50";
          // const correct = "border-emerald-500 bg-emerald-50";
          // const wrong = "border-rose-500 bg-rose-50";

          const rowClass = !showFeedback
            ? checked
              ? classNames(base, active)
              : classNames(base, normal)
            : isChosen && isRightOption;
          // ? classNames(base, correct)
          // : isChosen && !isRightOption
          // ? classNames(base, wrong)
          // : isRightOption
          // ? classNames(base, correct)
          // : classNames(base, normal);

          return (
            <label
              key={optionId}
              htmlFor={optionId}
              className={rowClass}
              style={
                !showFeedback && checked ? { borderColor: main } : undefined
              }
            >
              {/* real input (a11y), hidden but focusable */}
              <input
                id={optionId}
                name={groupName}
                type="radio"
                checked={checked}
                onChange={() => {
                  setSelected(i);
                  if (submitted) setSubmitted(false);
                }}
                className="sr-only"
              />

              {/* custom radio UI */}
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: checked ? main : "#a2a2a2", // gray-300
                  backgroundColor: checked ? main : "#FFFFFF",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: checked ? "#FFFFFF" : "transparent",
                  }}
                />
              </span>

              <span className="text-base leading-6 text-gray-900">{opt}</span>
            </label>
          );
        })}
      </div>

      {/* {showInstantFeedback && submitted && selected !== null && (
        <div className="mt-4">
          <p
            className={
              isCorrect ? "text-sm text-emerald-700" : "text-sm text-rose-700"
            }
            aria-live="polite"
          >
            {isCorrect ? "Правильно ✅" : "Неправильно ❌"}
          </p>
          {question.explanation && (
            <p className="mt-1 text-sm text-gray-600">{question.explanation}</p>
          )}
        </div>
      )} */}

      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
        {/* <p className="text-xs text-gray-500">
          {question.type.toUpperCase()} · {question.topic}
        </p> */}
        {/* question */}
        <div className="flex items-start justify-between gap-2">
          <legend className="text-base  text-gray-400">Питання</legend>

          {typeof index === "number" && typeof total === "number" && (
            <span className="text-base text-gray-400 font-semibold">
              {index} / {total}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={selected === null}
            onClick={handleNext}
            className="group text-sm/6 font-semibold text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="inline-flex py-3 px-5 items-center justify-center rounded-full"
              style={{ backgroundColor: light }}
            >
              {showInstantFeedback && submitted ? "Далі" : "Наступне"}{" "}
            </span>

            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full leading-none text-lg
               transition-transform duration-200 ease-out group-hover:translate-x-2"
              style={{ backgroundColor: light }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </fieldset>
  );
}

export default function Question(props: Props) {
  return <QuestionContent key={props.question.id} {...props} />;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
