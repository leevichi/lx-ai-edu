"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { DOMAINS, COURSES, getDomainDisplayLabel, type Domain } from "@/lib/catalog";
import { DomainCoursesModal } from "@/components/home/DomainCoursesModal";

function getCourseCount(domainId: string) {
  return COURSES.filter((course) => course.domainId === domainId).length;
}

export function HomeDomainGrid() {
  const [openDomain, setOpenDomain] = useState<Domain | null>(null);

  return (
    <section id="domains" className="section-band section-band--white">
      <div className="section-inner">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">교육 영역</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              기관 맞춤형 7개 AI 교육 영역
            </h2>
            <p className="mt-2 text-slate-600">
              영역을 누르면 포함된 교육 과목을 확인할 수 있습니다. 신청은 교육 신청하기에서
              진행합니다.
            </p>
          </div>
          <Link href="/apply/info" className="btn-brand-secondary shrink-0 text-sm md:text-base">
            교육 신청하기
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setOpenDomain(domain)}
              className="trend-card group p-5 text-left transition-all hover:border-[#009881]/40 hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-[#e6f7f4] px-2.5 py-1 text-xs font-semibold text-[#007a66]">
                {getDomainDisplayLabel(domain)}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-[#007a66]">
                {domain.name}
              </h3>
              <p className="mt-2 min-h-11 text-sm leading-relaxed text-slate-600">
                {domain.description}
              </p>
              <p className="mt-4 text-sm font-medium text-[#009881]">
                {getCourseCount(domain.id)}개 과목 · 자세히 보기
              </p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openDomain && (
          <DomainCoursesModal domain={openDomain} onClose={() => setOpenDomain(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
