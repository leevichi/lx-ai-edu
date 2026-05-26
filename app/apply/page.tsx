"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiLevelPicker } from "@/components/apply/AiLevelPicker";
import { DomainCatalog } from "@/components/apply/DomainCatalog";
import { CourseCart } from "@/components/apply/CourseCart";
import { CustomDomainCart } from "@/components/apply/CustomDomainCart";
import { CurriculumResult } from "@/components/apply/CurriculumResult";
import { ApplyPageShell } from "@/components/layout/ApplyPageShell";
import { buildCurriculumFromSelection } from "@/lib/curriculum-builder";
import { ApplySessionNotice } from "@/components/apply/ApplySessionNotice";
import {
  clearApplyForm,
  isApplyFormComplete,
  loadApplyForm,
  venueLabel,
  type ApplyFormData,
} from "@/lib/apply-storage";
import { type Course } from "@/lib/catalog";
import { coursesFromIds, totalHoursFromCourses } from "@/lib/course-list";
import { buildReportFromForm } from "@/lib/build-application-report";
import type { ApplicationReportData } from "@/lib/application-report";

type Step = "select" | "result";

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<ApplyFormData | null>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>("select");
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [aiLevel, setAiLevel] = useState<number | null>(null);
  const [finalCourses, setFinalCourses] = useState<Course[]>([]);
  const [autoAddedIds, setAutoAddedIds] = useState<string[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [essayWarning, setEssayWarning] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [userPickedIdsAtConfirm, setUserPickedIdsAtConfirm] = useState<string[]>(
    []
  );
  const [customDomainMode, setCustomDomainMode] = useState(false);
  const [customRequestText, setCustomRequestText] = useState("");
  const [submittedReport, setSubmittedReport] = useState<ApplicationReportData | null>(
    null
  );

  useEffect(() => {
    const data = loadApplyForm();
    if (!isApplyFormComplete(data)) {
      router.replace("/apply/info");
      return;
    }
    setForm(data);
    setReady(true);
  }, [router]);

  const tryAddCourse = (
    courseId: string,
    currentIds: string[],
    mode: "cart" | "result"
  ) => {
    if (currentIds.includes(courseId)) {
      if (mode === "cart") {
        setCartIds((prev) => prev.filter((id) => id !== courseId));
      } else {
        updateResultCourses(currentIds.filter((id) => id !== courseId));
      }
      return;
    }

    if (aiLevel === null) return;

    const next = [...currentIds, courseId];
    if (mode === "cart") {
      setCartIds(next);
    } else {
      updateResultCourses(next);
    }
  };

  const requestToggle = (courseId: string) => tryAddCourse(courseId, cartIds, "cart");

  const updateResultCourses = (ids: string[]) => {
    const courses = coursesFromIds(ids);
    setFinalCourses(courses);
    setTotalHours(totalHoursFromCourses(courses));
    setAutoAddedIds(ids.filter((id) => !userPickedIdsAtConfirm.includes(id)));
  };

  const handleResultToggle = (courseId: string) => {
    tryAddCourse(courseId, finalCourses.map((c) => c.id), "result");
  };

  const handleResultRemove = (courseId: string) => {
    updateResultCourses(finalCourses.map((c) => c.id).filter((id) => id !== courseId));
  };

  const handleReset = () => setCartIds([]);

  const handleConfirm = () => {
    if (aiLevel === null) {
      alert("AI 숙련도를 선택해 주세요.");
      return;
    }

    if (customDomainMode) {
      if (customRequestText.trim().length < 10) {
        alert("별도 조율 희망 내용을 10자 이상 입력해 주세요.");
        return;
      }
      setUserPickedIdsAtConfirm([]);
      setFinalCourses([]);
      setAutoAddedIds([]);
      setTotalHours(0);
    } else {
      if (cartIds.length === 0) {
        alert("장바구니에 과목을 1개 이상 담아 주세요.");
        return;
      }
      const { courses, autoAddedIds: added, totalHours: hours } =
        buildCurriculumFromSelection(cartIds);
      setUserPickedIdsAtConfirm([...cartIds]);
      setFinalCourses(courses);
      setAutoAddedIds(added);
      setTotalHours(hours);
    }
    setSubmitted(false);
    setSubmitError("");
    setApplicationId(null);
    setStep("result");
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.65 } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep("select");
    setSubmitted(false);
    setSubmitError("");
    setApplicationId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async () => {
    if (aiLevel === null || !form) return;

    setSubmitting(true);
    setSubmitError("");
    setEssayWarning("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          privacy_agreed: form.privacyAgreed,
          company_website: honeypot,
          agency: form.agency,
          contact_name: form.contactName,
          contact_phone: form.contactPhone,
          participant_count: form.participantCount,
          education_target: form.educationTarget,
          preferred_date: form.preferredDate,
          date_flexible: form.dateFlexible,
          venue_type: form.venue,
          venue_other: form.venueOther,
          env_student_pc: form.hasStudentPc,
          env_instructor_pc: form.hasInstructorPc,
          env_projector: form.hasProjector,
          ai_level: aiLevel,
          course_ids: finalCourses.map((c) => c.id),
          courses: finalCourses,
          auto_added_ids: autoAddedIds,
          total_hours: totalHours,
          application_reason: form.applicationReason,
          learning_focus: form.learningFocus,
          custom_curriculum: customDomainMode,
          custom_curriculum_request: customDomainMode ? customRequestText.trim() : "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "신청 저장에 실패했습니다.");
        return;
      }

      const id = data.id ?? null;
      const createdAt = data.created_at as string | undefined;
      if (id) {
        setSubmittedReport(
          buildReportFromForm({
            applicationId: id,
            createdAt,
            form,
            aiLevel,
            courses: finalCourses,
            totalHours,
            customCurriculum: customDomainMode,
            customCurriculumRequest: customRequestText.trim(),
          })
        );
      }
      setApplicationId(id);
      setEssayWarning(data.essay_warning ?? "");
      setSubmitted(true);
      clearApplyForm();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch {
      setSubmitError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready || !form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-slate-500">
        불러오는 중…
      </div>
    );
  }

  return (
    <>
      <ApplyPageShell
        step={step === "select" ? 2 : undefined}
        title={step === "select" ? "교육 과목 선택" : "신청 내역 확인"}
        description={
          step === "select"
            ? `${form.agency} · AI 숙련도와 교육 과목을 선택해 주세요.`
            : "희망 과목을 확인한 뒤 최종 신청해 주세요. 담당자가 연락드려 확정합니다."
        }
      >
        <section className="section-band section-band--white pb-24">
          <div className="section-inner !pt-0 max-w-[1600px]">
            <ApplySessionNotice />
            {step === "select" && (
              <div className="mb-6 flex justify-end">
                <Link href="/apply/info" className="btn-brand-secondary text-sm py-2.5">
                  <ChevronLeft size={16} />
                  신청자 정보 수정
                </Link>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === "select" ? (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_380px]">
                    <div>
                      <AiLevelPicker value={aiLevel} onChange={setAiLevel} />

                      <section className="mt-10 border-t border-slate-200 pt-10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="apply-step-badge">과목</span>
                          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                            교육 분야 · 과목 선택
                          </h2>
                        </div>
                        <p className="mb-4 text-sm text-slate-600">
                          분야를 클릭하면 과목 목록이 열립니다. 같은 과목은 중복 선택할
                          수 없습니다.
                        </p>
                        <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <input
                            type="checkbox"
                            checked={customDomainMode}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setCustomDomainMode(checked);
                              if (checked) setCartIds([]);
                              else setCustomRequestText("");
                            }}
                            className="mt-1 h-5 w-5 rounded border-slate-300 text-[#009881] focus:ring-[#009881]"
                          />
                          <span className="text-sm font-medium text-slate-800">
                            교육분야는 별도 조율하고 싶어요
                          </span>
                        </label>
                        {customDomainMode && (
                          <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-slate-800">
                              희망 교육 내용 (자유 입력)
                            </label>
                            <textarea
                              value={customRequestText}
                              onChange={(e) => setCustomRequestText(e.target.value)}
                              rows={5}
                              placeholder="예: 생성형 AI 기초와 행정 문서 작성, 공문서 요약, 기관 업무에 맞는 실습 위주 교육을 원합니다."
                              className="input-light min-h-[120px] resize-y"
                            />
                            <p className="mt-2 text-xs text-slate-500">
                              10자 이상 입력해 주세요. 담당자가 연락드릴 때 분야·과목을
                              함께 설계합니다.
                            </p>
                          </div>
                        )}
                        <div
                          className={
                            customDomainMode
                              ? "pointer-events-none opacity-40 grayscale"
                              : ""
                          }
                        >
                          <DomainCatalog cartIds={cartIds} onToggle={requestToggle} />
                        </div>
                      </section>
                    </div>

                    <div className="xl:sticky xl:top-24">
                      {customDomainMode ? (
                        <CustomDomainCart
                          requestText={customRequestText}
                          onReset={() => setCustomRequestText("")}
                          onConfirm={handleConfirm}
                        />
                      ) : (
                        <CourseCart
                          cartIds={cartIds}
                          onRemove={(id) =>
                            setCartIds((prev) => prev.filter((x) => x !== id))
                          }
                          onReset={handleReset}
                          onConfirm={handleConfirm}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="text"
                    name="company_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                  />
                  {aiLevel !== null && (
                    <CurriculumResult
                      agency={form.agency}
                      name={form.contactName}
                      contact={form.contactPhone}
                      participantCount={form.participantCount}
                      educationTarget={form.educationTarget}
                      preferredDate={form.preferredDate}
                      dateFlexible={form.dateFlexible}
                      venueLabel={venueLabel(form)}
                      hasStudentPc={form.hasStudentPc}
                      hasInstructorPc={form.hasInstructorPc}
                      hasProjector={form.hasProjector}
                      aiLevel={aiLevel}
                      courses={finalCourses}
                      autoAddedIds={autoAddedIds}
                      totalHours={totalHours}
                      submitted={submitted}
                      submitting={submitting}
                      submitError={submitError}
                      applicationId={applicationId}
                      essayWarning={essayWarning}
                      applicationReason={form.applicationReason}
                      learningFocus={form.learningFocus}
                      customCurriculum={customDomainMode}
                      customCurriculumRequest={customRequestText}
                      reportData={submittedReport}
                      onBack={handleBack}
                      onRemoveCourse={handleResultRemove}
                      onToggleCourse={handleResultToggle}
                      onFinalSubmit={handleFinalSubmit}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </ApplyPageShell>
    </>
  );
}
