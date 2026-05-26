import type { ReactNode } from "react";
import { HomeHeader } from "@/components/home/HomeHeader";

type Props = {
  children: ReactNode;
  step?: 1 | 2;
  title: string;
  description?: string;
};

export function ApplyPageShell({ children, step, title, description }: Props) {
  return (
    <>
      <HomeHeader />
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <div className="section-band section-band--soft border-b-0">
          <div className="section-inner !py-10 md:!py-12">
            {step !== undefined && (
              <span className="apply-step-badge mb-3">STEP {step}</span>
            )}
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
            )}
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
