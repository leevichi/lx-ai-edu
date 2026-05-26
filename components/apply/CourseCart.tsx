"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { COURSE_MAP, type Course } from "@/lib/catalog";
import { formatCourseMeta } from "@/lib/course-display";
import { formatCartSummary } from "@/lib/schedule";

type Props = {
  cartIds: string[];
  onRemove: (id: string) => void;
  onReset: () => void;
  onConfirm: () => void;
};

export function CourseCart({ cartIds, onRemove, onReset, onConfirm }: Props) {
  const items = cartIds
    .map((id) => COURSE_MAP.get(id))
    .filter((c): c is Course => Boolean(c));

  const totalHours = items.reduce((sum, c) => sum + c.durationHours, 0);
  const summary = formatCartSummary(cartIds.length, totalHours);

  return (
    <motion.div className="form-panel flex min-h-[480px] flex-col rounded-3xl border border-[#009881]/15 p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e6f7f4]">
          <ShoppingCart className="text-[#009881]" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">교육 장바구니</h3>
          <p className="mt-0.5 text-sm font-semibold text-[#007a66]">{summary}</p>
          <p className="mt-1 text-xs text-slate-500">동일 과목 중복 불가 · 일일 최대 6시간</p>
        </div>
      </div>

      <div className="max-h-[50vh] flex-1 space-y-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-320px)]">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-sm leading-relaxed text-slate-500"
            >
              AI 숙련도 선택 후
              <br />
              듣고 싶은 과목을 클릭해 담아 주세요.
            </motion.p>
          ) : (
            items.map((course, idx) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24, scale: 0.95 }}
                transition={{ delay: idx * 0.03 }}
                className="group flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-[#009881]/35"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e6f7f4] font-mono text-xs font-bold text-[#007a66]">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#009881]">
                    {course.domainName}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                    {course.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{formatCourseMeta(course)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(course.id)}
                  className="shrink-0 rounded-lg p-2 text-slate-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                  aria-label="제거"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-3 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={onReset}
          disabled={cartIds.length === 0}
          className="btn-brand-secondary flex flex-1 items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={18} />
          초기화
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={cartIds.length === 0}
          className="btn-brand-primary flex-[1.4] py-3.5 font-bold disabled:cursor-not-allowed disabled:opacity-40"
        >
          확정
        </button>
      </div>
    </motion.div>
  );
}
