"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, MessageSquareText, Plus, Search, Trash2 } from "lucide-react";
import type { Course } from "@/lib/catalog";
import type { ApplicationReportData } from "@/lib/application-report";
import { AI_LEVEL_OPTIONS } from "@/lib/site-config";
import { formatCourseDomainLine, formatCourseMeta } from "@/lib/course-display";
import { ContactNotice } from "@/components/apply/ContactNotice";
import { ApplicationPdfExport } from "@/components/apply/ApplicationPdfExport";
import { calcTrainingDays, formatCartSummary } from "@/lib/schedule";
import { formatReceiptCode } from "@/lib/receipt";
import { CoursePickerModal } from "@/components/apply/CoursePickerModal";

type Props = {
  agency: string;
  name: string;
  contact: string;
  participantCount: number;
  educationTarget: string;
  preferredDate: string | null;
  dateFlexible: boolean;
  venueLabel: string;
  hasStudentPc: boolean;
  hasInstructorPc: boolean;
  hasProjector: boolean;
  aiLevel: number;
  courses: Course[];
  autoAddedIds: string[];
  totalHours: number;
  submitted: boolean;
  submitting: boolean;
  submitError: string;
  applicationId: string | null;
  essayWarning: string;
  applicationReason: string;
  learningFocus: string;
  customCurriculum: boolean;
  customCurriculumRequest: string;
  reportData: ApplicationReportData | null;
  onBack: () => void;
  onRemoveCourse: (courseId: string) => void;
  onToggleCourse: (courseId: string) => void;
  onFinalSubmit: () => void | Promise<void>;
};

export function CurriculumResult({
  agency,
  name,
  contact,
  participantCount,
  educationTarget,
  preferredDate,
  dateFlexible,
  venueLabel,
  hasStudentPc,
  hasInstructorPc,
  hasProjector,
  aiLevel,
  courses,
  autoAddedIds,
  totalHours,
  submitted,
  submitting,
  submitError,
  applicationId,
  essayWarning,
  applicationReason,
  learningFocus,
  customCurriculum,
  customCurriculumRequest,
  reportData,
  onBack,
  onRemoveCourse,
  onToggleCourse,
  onFinalSubmit,
}: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const title = agency.trim() || "귀 기관";
  const contactName = name.trim() || "담당자";
  const levelInfo = AI_LEVEL_OPTIONS.find((l) => l.level === aiLevel);
  const days = calcTrainingDays(totalHours);
  const summary = customCurriculum
    ? "교육 분야·과목 별도 조율 희망"
    : formatCartSummary(courses.length, totalHours);
  const courseIds = courses.map((c) => c.id);
  const receiptCode = applicationId ? formatReceiptCode(applicationId) : null;
  const canSubmit =
    customCurriculum
      ? customCurriculumRequest.trim().length >= 10
      : courses.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      <AnimatePresence>
        {pickerOpen && !submitted && (
          <CoursePickerModal
            selectedIds={courseIds}
            onToggle={onToggleCourse}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="mb-2 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
            신청 내역 확인
          </h2>
          <p className="text-lg font-semibold text-[#009881]">
            {title} · {contactName} 담당자
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <SummaryItem label="연락처" value={contact || "미입력"} />
            <SummaryItem label="수강인원" value={`${participantCount}명`} />
            <SummaryItem
              label="교육대상"
              value={educationTarget.trim() || "—"}
            />
            <SummaryItem
              label="희망일"
              value={
                dateFlexible
                  ? "날짜 상관없음"
                  : preferredDate
                    ? new Date(preferredDate).toLocaleDateString("ko-KR")
                    : "미입력"
              }
            />
            <SummaryItem label="장소" value={venueLabel || "—"} />
            <SummaryItem
              label="AI 숙련도"
              value={levelInfo ? levelInfo.name : `레벨 ${aiLevel}`}
            />
          </div>
          {(hasStudentPc || hasInstructorPc || hasProjector) && (
            <p className="mt-1 text-xs text-slate-500">
              교육환경:{" "}
              {[
                hasStudentPc && "수강생 PC",
                hasInstructorPc && "강사 PC",
                hasProjector && "빔프로젝터",
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <p className="mt-1 font-medium text-slate-700">{summary}</p>
        </div>
        {!submitted && (
          <button type="button" onClick={onBack} className="btn-brand-secondary shrink-0">
            <ArrowLeft size={18} />
            {customCurriculum ? "신청 내용 수정" : "과목 다시 선택"}
          </button>
        )}
      </div>

      <div className="form-panel rounded-2xl border border-[#009881]/20 bg-[#e6f7f4]/50 p-5 space-y-4">
        <p className="text-sm leading-relaxed text-slate-700">
          아래 과목은 <strong className="text-slate-900">희망 신청 내역</strong>이며, 최종 확정이
          아닙니다. 담당자가 <strong className="text-[#007a66]">유선으로 연락</strong>드린 뒤
          일정·과목·인원을 조율합니다.
        </p>
        <ContactNotice compact />
      </div>

      {(applicationReason.trim() || learningFocus.trim()) && (
        <div className="form-panel space-y-4 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-900">추가 정보</h3>
          {applicationReason.trim() && (
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-500">신청사유</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {applicationReason.trim()}
              </p>
            </div>
          )}
          {learningFocus.trim() && (
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-500">
                중점적으로 배우고 싶은 항목
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {learningFocus.trim()}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">
            {customCurriculum ? "별도 조율 희망 내용" : "희망 교육 과목"}
          </h3>
          {!submitted && !customCurriculum && (
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="btn-brand-secondary py-2 text-sm"
            >
              <Plus size={16} />
              과목 추가
            </button>
          )}
        </div>

        {customCurriculum ? (
          <div className="form-panel rounded-2xl border-2 border-dashed border-[#009881]/35 bg-[#f5fcfa] p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e6f7f4]">
                <MessageSquareText className="text-[#009881]" size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#007a66]">교육 분야·과목 별도 조율</p>
                <p className="text-xs text-slate-500">
                  담당자 연락 시 분야·과목·일정을 함께 설계합니다.
                </p>
              </div>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {customCurriculumRequest.trim() || "—"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="form-panel relative rounded-2xl p-6"
                >
                  {!submitted && (
                    <button
                      type="button"
                      onClick={() => onRemoveCourse(course.id)}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                      aria-label="과목 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="flex gap-4 pr-8">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f7f4] font-mono font-bold text-[#007a66]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#009881]">
                        {formatCourseDomainLine(course)}
                      </p>
                      <h4 className="mt-1 font-bold text-slate-900">{course.title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{formatCourseMeta(course)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {courses.length === 0 && !submitted && (
              <p className="py-6 text-center text-sm text-slate-500">
                과목이 없습니다. [과목 추가]로 선택해 주세요.
              </p>
            )}
          </>
        )}
      </div>

      {!customCurriculum && days > 1 && (
        <p className="text-center text-sm text-slate-600">
          일일 최대 6시간 기준, 약 <strong className="text-slate-900">{days}일</strong>간 교육
          일정으로 구성될 수 있습니다. (최종 일정은 담당자와 조율)
        </p>
      )}

      <div className="form-panel space-y-4 rounded-3xl border-2 border-[#009881]/25 p-8 text-center">
        {submitted ? (
          <>
            <CheckCircle2 className="mx-auto text-[#009881]" size={48} />
            <p className="text-xl font-bold text-slate-900">신청이 접수되었습니다</p>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-600">
              {customCurriculum
                ? "별도 조율 희망 신청이 접수되었습니다. 담당자가 유선으로 연락드려 분야·과목·일정을 함께 설계합니다."
                : "희망 과목이 접수되었습니다. 아래 연락처로도 문의하실 수 있으며, 담당자가 유선으로 연락드립니다."}
            </p>
            <div className="mx-auto max-w-md">
              <ContactNotice compact />
            </div>
            {essayWarning && (
              <p className="mx-auto max-w-md text-sm leading-relaxed text-amber-700">
                {essayWarning}
              </p>
            )}
            {receiptCode && (
              <div className="mx-auto max-w-md rounded-2xl border-2 border-[#009881] bg-[#f0faf8] px-6 py-5">
                <p className="text-sm font-bold tracking-wide text-[#007a66]">접수번호</p>
                <p className="mt-2 font-mono text-4xl font-extrabold tracking-[0.25em] text-slate-900 md:text-5xl">
                  {receiptCode}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  위 접수번호와 신청 시 입력한 연락처로{" "}
                  <Link
                    href="/apply/lookup"
                    className="font-semibold text-[#009881] underline underline-offset-2"
                  >
                    신청 내역을 조회
                  </Link>
                  할 수 있습니다.
                </p>
                <Link
                  href="/apply/lookup"
                  className="btn-brand-secondary mx-auto mt-4 inline-flex items-center gap-2 text-sm"
                >
                  <Search size={16} />
                  접수번호로 조회하기
                </Link>
              </div>
            )}
            {reportData && (
              <ApplicationPdfExport
                data={reportData}
                className="btn-brand-primary mx-auto mt-2 inline-flex w-full max-w-md items-center justify-center gap-2 py-3.5"
              />
            )}
          </>
        ) : (
          <>
            <p className="mx-auto max-w-lg leading-relaxed text-slate-600">
              위 희망 과목으로 신청을 접수하시겠습니까? 이후 담당자가 연락드려 최종 교육 내용을
              확정합니다.
            </p>
            {submitError && <p className="text-sm font-medium text-red-600">{submitError}</p>}
            <button
              type="button"
              onClick={onFinalSubmit}
              disabled={submitting || !canSubmit}
              className="btn-brand-primary mx-auto w-full max-w-md py-4 text-lg disabled:opacity-50"
            >
              {submitting ? "접수 중…" : "최종 신청하기"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
