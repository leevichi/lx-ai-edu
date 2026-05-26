"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { AI_LEVEL_OPTIONS } from "@/lib/site-config";

type Props = {
  value: number | null;
  onChange: (level: number) => void;
};

export function AiLevelPicker({ value, onChange }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="form-panel mb-10 rounded-3xl border border-[#009881]/15 p-6 md:p-8"
    >
      <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-6">
        <div className="rounded-2xl border border-[#009881]/20 bg-[#e6f7f4] p-3 text-[#009881]">
          <BrainCircuit className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            교육대상자의 현재 AI 숙련도
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            가장 가까운 단계를 하나 선택해 주세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {AI_LEVEL_OPTIONS.map((item) => (
          <motion.button
            key={item.level}
            type="button"
            onClick={() => onChange(item.level)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-2xl border-2 p-5 text-left transition-all ${
              value === item.level
                ? "border-[#009881] bg-[#e6f7f4] shadow-sm"
                : "border-slate-200 bg-white hover:border-[#009881]/40"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-lg font-bold text-[#009881]">{item.name}</span>
              {value === item.level && (
                <CheckCircle2 className="text-[#009881]" size={20} />
              )}
            </div>
            <p className="text-sm leading-snug text-slate-600">{item.desc}</p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
