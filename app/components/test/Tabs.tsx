// app/components/test/Tabs.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Tabs() {
  const router = useRouter();

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl/16 max-w-3xl">
            Оберіть рівень діагностики НМТ
          </h2>
          <p className="mt-6 text-base/7 text-gray-600 max-w-xl">
            Пройдіть 20 питань у стилі НМТ і отримайте результат одразу:
            орієнтовний рівень, слабкі теми та рекомендація формату підготовки.
          </p>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-end">
          {/* Easy */}
          <div
            className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start"
            style={{ backgroundColor: "var(--easy)" }}
          >
            {/* декоративный “лейбл” как обычный элемент */}
            <div className="flex-none">
              <Image
                width={260}
                height={66}
                src="/EASY.svg"
                alt=""
                aria-hidden="true"
                className="h-10 w-auto opacity-80"
              />
            </div>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Хочу просто скласти{" "}
                <span className="sr-only">(рівень: Easy)</span>
              </p>
              <p className="mt-2 text-base/7 text-gray-800 pb-6">
                Базові теми + типові “пастки”. Підійде, якщо хочете чіткий старт
                і план без хаосу.
              </p>

              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/easy")}
                  className="group text-sm/6 font-semibold text-gray-900"
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--easy-light)" }}
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full leading-none
                               transition-transform duration-200 ease-out group-hover:translate-x-2"
                    style={{ backgroundColor: "var(--easy-light)" }}
                  >
                    →
                  </span>
                </button>

                <p className="text-xs text-gray-800">20 питань · 2–3 хв</p>
              </div>
            </div>
          </div>

          {/* Medium */}
          <div
            className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44"
            style={{ backgroundColor: "var(--medium)" }}
          >
            <div className="flex-none">
              <Image
                width={410}
                height={66}
                src="/MEDIUM.svg"
                alt=""
                aria-hidden="true"
                className="h-10 w-auto opacity-80"
              />
            </div>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Хочу високий бал{" "}
                <span className="sr-only">(рівень: Medium)</span>
              </p>
              <p className="mt-2 text-base/7 text-gray-800 pb-6">
                Середній рівень: grammar у форматі НМТ + лексика в контексті та
                reading-стратегії.
              </p>

              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/medium")}
                  className="group text-sm/6 font-semibold text-gray-900"
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--medium-light)" }}
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full leading-none
                               transition-transform duration-200 ease-out group-hover:translate-x-2"
                    style={{ backgroundColor: "var(--medium-light)" }}
                  >
                    →
                  </span>
                </button>

                <p className="text-xs text-gray-800">20 питань · 3–4 хв</p>
              </div>
            </div>
          </div>

          {/* Hard */}
          <div
            className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28"
            style={{ backgroundColor: "var(--hard)" }}
          >
            <div className="flex-none">
              <Image
                width={285}
                height={66}
                src="/HARD.svg"
                alt=""
                aria-hidden="true"
                className="h-10 w-auto opacity-80"
              />
            </div>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Ціль 180+ / сильний рівень{" "}
                <span className="sr-only">(рівень: Hard)</span>
              </p>
              <p className="mt-2 text-base/7 text-gray-800 pb-6">
                Складніші конструкції та нюанси. Якщо хочете максимум балів і
                впевненість у “підступних” завданнях.
              </p>

              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/hard")}
                  className="group text-sm/6 font-semibold text-gray-900"
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--hard-light)" }}
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full leading-none
                               transition-transform duration-200 ease-out group-hover:translate-x-2"
                    style={{ backgroundColor: "var(--hard-light)" }}
                  >
                    →
                  </span>
                </button>

                <p className="text-xs text-gray-800">20 питань · 4–5 хв</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
