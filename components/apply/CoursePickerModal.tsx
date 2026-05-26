"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { DOMAINS, getCoursesByDomain, getDomainDisplayLabel } from "@/lib/catalog";
import { formatCourseMeta } from "@/lib/course-display";

type Props = {
  selectedIds: string[];
  onToggle: (courseId: string) => void;
  onClose: () => void;
};

export function CoursePickerModal({ selectedIds, onToggle, onClose }: Props) {
  const sortedDomains = [...DOMAINS].sort((a, b) => a.order - b.order);
  const [activeDomainId, setActiveDomainId] = useState(sortedDomains[0]?.id ?? "");
  const cartSet = new Set(selectedIds);
  const activeCourses = getCoursesByDomain(activeDomainId);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="닫기"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-panel relative flex max-h-[90vh] w-full flex-col rounded-t-3xl border border-[#009881]/15 shadow-2xl sm:max-w-3xl sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-bold text-slate-900">과목 추가</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-100 px-4 pb-1 pt-3">
          {sortedDomains.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDomainId(d.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                activeDomainId === d.id
                  ? "bg-[#009881] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {getDomainDisplayLabel(d)}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
          {activeCourses.map((course) => {
            const inList = cartSet.has(course.id);
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onToggle(course.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  inList
                    ? "border-[#009881] bg-[#e6f7f4]"
                    : "border-slate-200 hover:border-[#009881]/35"
                }`}
              >
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{course.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatCourseMeta(course)}</p>
                  </div>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      inList ? "bg-[#009881] text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {inList ? <Check size={14} /> : <Plus size={14} />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="shrink-0 border-t border-slate-200 p-4">
          <button type="button" onClick={onClose} className="btn-brand-primary w-full py-3">
            완료 ({selectedIds.length}개 선택)
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
