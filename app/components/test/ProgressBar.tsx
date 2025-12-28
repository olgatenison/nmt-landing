// app\components\test\ProgressBar.tsx
import { CheckIcon } from "@heroicons/react/20/solid";

type Variant = "easy" | "medium" | "hard";

type ProgressBarProps = {
  total?: number;
  currentStep: number; // 1..total
  windowSize?: number;
  variant?: Variant; // <-- добавили
  className?: string;
};

function getWindow(total: number, current: number, windowSize = 7) {
  const size = Math.max(3, Math.min(windowSize, total));
  const half = Math.floor(size / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total, start + size - 1);
  start = Math.max(1, end - size + 1);

  const items: Array<number | "dots"> = [];
  if (start > 1) items.push(1, "dots");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total) items.push("dots", total);

  // убрать лишние точки возле краёв
  if (items[1] === "dots" && items[2] === 2) items.splice(1, 1);
  const n = items.length;
  if (items[n - 2] === "dots" && items[n - 3] === total - 1)
    items.splice(n - 2, 1);

  return items;
}

export default function ProgressBar({
  total = 20,
  currentStep,
  windowSize = 7,
  variant = "easy",
  className,
}: ProgressBarProps) {
  const safeCurrent = Math.min(Math.max(currentStep, 1), total);
  const items = getWindow(total, safeCurrent, windowSize);

  // Цвета берём из :root переменных
  const main = `var(--${variant})`; // --easy / --medium / --hard
  const light = `var(--${variant}-light)`; // --easy-light ...

  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="flex items-center gap-2">
        {items.map((item, idx) => {
          if (item === "dots") {
            return (
              <li key={`dots-${idx}`} className="px-1 text-sm text-gray-400">
                …
              </li>
            );
          }

          const stepNumber = item;
          const status =
            stepNumber < safeCurrent
              ? "complete"
              : stepNumber === safeCurrent
              ? "current"
              : "upcoming";

          return (
            <li key={stepNumber} className="relative">
              {status === "complete" ? (
                <span
                  className="flex size-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: main }}
                >
                  <CheckIcon aria-hidden="true" className="size-5 text-white" />
                  <span className="sr-only">Step {stepNumber} complete</span>
                </span>
              ) : status === "current" ? (
                <span
                  className="flex size-8 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: main }}
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: main }}
                  />
                  <span className="sr-only">Step {stepNumber} current</span>
                </span>
              ) : (
                <span
                  className="group flex size-8 items-center justify-center rounded-full border-2 bg-white transition-colors"
                  style={{ borderColor: "rgb(209 213 219)" }} // gray-300
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-transparent transition-colors"
                    style={{}}
                  />
                  <span className="sr-only">Step {stepNumber} upcoming</span>

                  {/* hover подсветка (легкая) */}
                  <style jsx>{`
                    .group:hover > span[aria-hidden="true"] {
                      background: ${light};
                    }
                    .group:hover {
                      border-color: ${main};
                    }
                  `}</style>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-2 text-xs text-gray-500">
        Питання{" "}
        <span className="font-semibold" style={{ color: main }}>
          {safeCurrent}
        </span>{" "}
        з <span className="font-semibold text-gray-900">{total}</span>
      </div>
    </nav>
  );
}
