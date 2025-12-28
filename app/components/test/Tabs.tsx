// app\components\test\Tabs.tsx
"use client";
import { useRouter } from "next/navigation";

export default function Tabs() {
  const router = useRouter();

  return (
    <div className="bg-white py-20 ">
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

        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0  lg:max-w-none lg:flex-row lg:items-end">
          {/* Easy */}
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-(--easy) p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
            <p className="flex-none text-6xl tracking-tight text-(--easy-light) uppercase font-black ">
              Easy
            </p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Хочу просто скласти
              </p>
              <p className="mt-2 text-base/7 text-gray-600 pb-6">
                Базові теми + типові “пастки”. Підійде, якщо хочете чіткий старт
                і план без хаосу.
              </p>
              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/easy")}
                  className="group text-sm/6 font-semibold text-gray-900 "
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full bg-(--easy-light) 
               "
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--easy-light) 
              leading-none
             transition-transform duration-200 ease-out group-hover:translate-x-2"
                  >
                    →
                  </span>
                </button>

                <p className="text-xs text-gray-800">20 питань · 2–3 хв</p>
              </div>
            </div>
          </div>

          {/* Medium */}
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-(--medium)  p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
            <p className="flex-none text-6xl tracking-tight text-(--medium-light) uppercase font-black ">
              Medium
            </p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Хочу високий бал
              </p>
              <p className="mt-2 text-base/7 text-gray-600 pb-6">
                Середній рівень: grammar у форматі НМТ + лексика в контексті та
                reading-стратегії.
              </p>

              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/medium")}
                  className="group text-sm/6 font-semibold text-gray-900 "
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full bg-(--medium-light)
               "
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--medium-light)
             leading-none
             transition-transform duration-200 ease-out group-hover:translate-x-2"
                  >
                    →
                  </span>
                </button>
                <p className="  text-xs text-gray-800">20 питань · 3–4 хв</p>
              </div>
            </div>
          </div>

          {/* Hard */}
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-(--hard) p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
            <p className="flex-none text-6xl tracking-tight text-(--hard-light) uppercase font-black ">
              Hard
            </p>

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-gray-900">
                Ціль 180+ / сильний рівень
              </p>
              <p className="mt-2 text-base/7 text-gray-600 pb-6">
                Складніші конструкції та нюанси. Якщо хочете максимум балів і
                впевненість у “підступних” завданнях.
              </p>

              <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-800/50">
                <button
                  onClick={() => router.push("/quiz/hard")}
                  className="group text-sm/6 font-semibold text-gray-900 "
                >
                  <span
                    className="inline-flex px-2 items-center justify-center rounded-full bg-(--hard-light)
               "
                  >
                    Почати{" "}
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--hard-light)
              leading-none
             transition-transform duration-200 ease-out group-hover:translate-x-2"
                  >
                    →
                  </span>
                </button>

                <p className=" text-xs text-gray-800">20 питань · 4–5 хв</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
