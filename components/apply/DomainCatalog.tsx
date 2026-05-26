"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Plus, X } from "lucide-react";
import {
  DOMAINS,
  getCoursesByDomain,
  getDomainDisplayLabel,
  type Course,
  type Domain,
} from "@/lib/catalog";
import { formatCourseMeta } from "@/lib/course-display";

type Props = {
  cartIds: string[];
  onToggle: (courseId: string) => void;
};

export function DomainCatalog({ cartIds, onToggle }: Props) {
  const [openDomain, setOpenDomain] = useState<Domain | null>(null);
  const cartSet = new Set(cartIds);

  const domainCartCount = (domainId: string) =>
    getCoursesByDomain(domainId).filter((c) => cartSet.has(c.id)).length;

  return (
    <>
      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.sort((a, b) => a.order - b.order).map((domain, idx) => {
          const count = domainCartCount(domain.id);
          const courseTotal = getCoursesByDomain(domain.id).length;
          return (
            <motion.button
              key={domain.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => setOpenDomain(domain)}
              className="trend-card group p-6 text-left transition-all hover:border-[#009881]/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-[#009881]">
                  {getDomainDisplayLabel(domain)}
                </span>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-400 group-hover:text-[#009881]"
                />
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{domain.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{domain.description}</p>
              <p className="mt-4 text-xs text-slate-500">
                {courseTotal}개 과목
                {count > 0 && (
                  <span className="ml-2 font-semibold text-[#009881]">· {count}개 선택됨</span>
                )}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {openDomain && (
          <DomainCourseModal
            domain={openDomain}
            cartIds={cartIds}
            onClose={() => setOpenDomain(null)}
            onToggle={onToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function DomainCourseModal({
  domain,
  cartIds,
  onClose,
  onToggle,
}: {
  domain: Domain;
  cartIds: string[];
  onClose: () => void;
  onToggle: (courseId: string) => void;
}) {
  const courses = getCoursesByDomain(domain.id);
  const cartSet = new Set(cartIds);

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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="form-panel relative flex max-h-[88vh] w-full flex-col rounded-t-3xl border border-[#009881]/15 shadow-2xl sm:max-w-2xl sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <p className="text-xs font-semibold text-[#009881]">{getDomainDisplayLabel(domain)}</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{domain.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{domain.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto p-4 sm:p-6">
          {courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              inCart={cartSet.has(course.id)}
              onToggle={() => onToggle(course.id)}
            />
          ))}
        </div>

        <div className="shrink-0 border-t border-slate-200 p-4">
          <button type="button" onClick={onClose} className="btn-brand-primary w-full py-3">
            선택 완료
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CourseRow({
  course,
  inCart,
  onToggle,
}: {
  course: Course;
  inCart: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
        inCart
          ? "border-[#009881] bg-[#e6f7f4]"
          : "border-slate-200 bg-white hover:border-[#009881]/35"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-slate-500">
          {course.isCore && <span className="font-semibold text-amber-600">핵심 과목</span>}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            inCart ? "bg-[#009881] text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          {inCart ? <Check size={14} /> : <Plus size={14} />}
        </span>
      </div>
      <h4 className="mt-2 font-bold text-slate-900">{course.title}</h4>
      <p className="mt-1 line-clamp-2 text-xs text-slate-600">{course.outcomes}</p>
      <p className="mt-2 text-xs text-slate-500">{formatCourseMeta(course)}</p>
    </button>
  );
}
