// app/components/test/ProgressBar.tsx
"use client";

type Variant = "easy" | "medium" | "hard";

type ProgressBarProps = {
  total: number;
  currentStep: number; // 1..total
  variant: Variant;
};

export default function ProgressBar({
  total,
  currentStep,
  variant,
}: ProgressBarProps) {
  const main = `var(--${variant})`; // --easy / --medium / --hard
  const light = `var(--${variant}-light)`; // --easy-light ...

  const safeTotal = Math.max(1, total);
  const safeStep = Math.min(Math.max(1, currentStep), safeTotal);
  const percent = (safeStep / safeTotal) * 100;

  return (
    <div className="mb-5 w-full">
      <div
        className="h-3 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
        aria-label="Progress"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-valuenow={safeStep}
      >
        <div
          className="h-full rounded-2xl transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%`, backgroundColor: main }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <span>
          {safeStep} / {safeTotal}
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: light }}
            aria-hidden="true"
          />
          {variant.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
