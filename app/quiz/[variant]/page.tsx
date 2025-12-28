// app/quiz/[variant]/page.tsx
import { notFound } from "next/navigation";
import type { QuizVariant } from "../../lib/quiz/types";
import QuizClient from "@/app/components/test/QuizClient";

const allowed = new Set<QuizVariant>(["easy", "medium", "hard"]);

export default async function Page({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const v = (variant ?? "").toLowerCase();

  if (!allowed.has(v as QuizVariant)) return notFound();

  return (

        <QuizClient variant={v as QuizVariant} />
 
  );

}
