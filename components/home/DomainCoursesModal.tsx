"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getCoursesByDomain, getDomainDisplayLabel, type Domain } from "@/lib/catalog";
import { formatCourseMeta } from "@/lib/course-display";

type Props = {
  domain: Domain;
  onClose: () => void;
};

export function DomainCoursesModal({ domain, onClose }: Props) {
  const courses = getCoursesByDomain(domain.id);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-courses-title"
        className="form-panel relative flex max-h-[88vh] w-full flex-col rounded-t-3xl border border-[#009881]/15 shadow-2xl sm:max-w-2xl sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <p className="text-xs font-semibold text-[#009881]">{getDomainDisplayLabel(domain)}</p>
            <h2 id="domain-courses-title" className="mt-1 text-xl font-bold text-slate-900">
              {domain.name}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{domain.description}</p>
            <p className="mt-2 text-xs text-slate-500">{courses.length}개 과목</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
          {courses.map((course) => (
            <article
              key={course.id}
              className="rounded-xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <h3 className="font-bold text-slate-900">{course.title}</h3>
              {course.outcomes && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {course.outcomes}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">{formatCourseMeta(course)}</p>
            </article>
          ))}
        </div>

        <div className="shrink-0 space-y-2 border-t border-slate-200 p-4">
          <Link href="/apply/info" className="btn-brand-primary block w-full py-3 text-center">
            이 과목으로 교육 신청하기
          </Link>
          <button type="button" onClick={onClose} className="btn-brand-secondary w-full py-3">
            닫기
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
