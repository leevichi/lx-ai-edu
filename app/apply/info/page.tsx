"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ApplyPageShell } from "@/components/layout/ApplyPageShell";
import { PrivacyConsentField } from "@/components/apply/PrivacyConsentField";
import { isValidPhone } from "@/lib/validate-application";
import {
  loadApplyForm,
  saveApplyForm,
  type ApplyFormData,
  type VenueType,
} from "@/lib/apply-storage";

export default function ApplyInfoPage() {
  const router = useRouter();
  const [agency, setAgency] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [educationTarget, setEducationTarget] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [dateFlexible, setDateFlexible] = useState(false);
  const [venue, setVenue] = useState<VenueType | "">("");
  const [venueOther, setVenueOther] = useState("");
  const [hasStudentPc, setHasStudentPc] = useState(false);
  const [hasInstructorPc, setHasInstructorPc] = useState(false);
  const [hasProjector, setHasProjector] = useState(false);
  const [applicationReason, setApplicationReason] = useState("");
  const [learningFocus, setLearningFocus] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [formError, setFormError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadApplyForm();
    if (!saved) return;
    setAgency(saved.agency);
    setContactName(saved.contactName);
    setContactPhone(saved.contactPhone);
    setParticipantCount(String(saved.participantCount || ""));
    setEducationTarget(saved.educationTarget ?? "");
    setPreferredDate(saved.preferredDate ?? "");
    setDateFlexible(saved.dateFlexible);
    setVenue(saved.venue ?? "");
    setVenueOther(saved.venueOther ?? "");
    setHasStudentPc(saved.hasStudentPc ?? false);
    setHasInstructorPc(saved.hasInstructorPc ?? false);
    setHasProjector(saved.hasProjector ?? false);
    setApplicationReason(saved.applicationReason);
    setLearningFocus(saved.learningFocus);
    setPrivacyAgreed(saved.privacyAgreed ?? false);
  }, []);

  const handleNext = () => {
    setFormError("");
    const count = parseInt(participantCount, 10);

    if (!agency.trim()) {
      setFormError("신청기관을 입력해 주세요.");
      return;
    }
    if (!contactName.trim()) {
      setFormError("담당자명을 입력해 주세요.");
      return;
    }
    if (!contactPhone.trim()) {
      setFormError("연락처를 입력해 주세요.");
      return;
    }
    if (!isValidPhone(contactPhone)) {
      setFormError("연락처 형식을 확인해 주세요. (예: 010-1234-5678)");
      return;
    }
    if (!privacyAgreed) {
      setFormError("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    if (!participantCount.trim() || Number.isNaN(count) || count < 1) {
      setFormError("수강인원을 1명 이상 입력해 주세요.");
      return;
    }
    if (!dateFlexible && !preferredDate) {
      setFormError("교육 희망 날짜를 선택하거나 ‘날짜 상관없음’을 선택해 주세요.");
      return;
    }
    if (!venue) {
      setFormError("교육장소를 선택해 주세요.");
      return;
    }
    if (venue === "other" && !venueOther.trim()) {
      setFormError("기타 교육장소를 입력해 주세요.");
      return;
    }
    if (!applicationReason.trim()) {
      setFormError("신청사유를 입력해 주세요.");
      return;
    }
    if (!learningFocus.trim()) {
      setFormError("중점적으로 배우고 싶은 항목을 입력해 주세요.");
      return;
    }

    const data: ApplyFormData = {
      agency: agency.trim(),
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      participantCount: count,
      educationTarget: educationTarget.trim(),
      preferredDate: dateFlexible ? null : preferredDate,
      dateFlexible,
      venue,
      venueOther: venue === "other" ? venueOther.trim() : "",
      hasStudentPc,
      hasInstructorPc,
      hasProjector,
      applicationReason: applicationReason.trim(),
      learningFocus: learningFocus.trim(),
      privacyAgreed,
    };

    saveApplyForm(data);
    router.push("/apply");
  };

  return (
    <ApplyPageShell
      step={1}
      title="신청자 정보"
      description="기관·일정·교육환경 정보를 입력한 뒤 과목 선택 단계로 이동합니다."
    >
      <section className="section-band section-band--white pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-inner !pt-0 max-w-2xl"
        >
          <div className="form-panel space-y-6 p-6 md:p-8">
            <Field label="신청기관" required>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                placeholder="기관명을 입력하세요"
                className="input-light"
              />
            </Field>

            <Field label="담당자명" required>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="담당자 성함"
                className="input-light"
              />
            </Field>

            <Field label="연락처" required>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="input-light"
              />
            </Field>

            <Field label="수강인원" required>
              <input
                type="number"
                min={1}
                value={participantCount}
                onChange={(e) => setParticipantCount(e.target.value)}
                placeholder="예: 10"
                className="input-light"
              />
            </Field>

            <Field label="교육대상">
              <input
                type="text"
                value={educationTarget}
                onChange={(e) => setEducationTarget(e.target.value)}
                placeholder="예: 내부직원, 지역주민 등"
                className="input-light"
              />
            </Field>

            <Field
              label={
                <>
                  교육 희망 날짜{" "}
                  <span className="font-normal text-slate-500">
                    (해당 일정은 희망날짜이며, 담당자 조율을 통해서 확정됩니다.)
                  </span>
                </>
              }
              required={!dateFlexible}
            >
              <div className="space-y-3">
                <div
                  className={`relative ${dateFlexible ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                  onClick={() => {
                    if (dateFlexible) return;
                    const el = dateInputRef.current;
                    if (!el) return;
                    el.focus();
                    if (typeof el.showPicker === "function") {
                      try {
                        el.showPicker();
                      } catch {
                        /* 일부 브라우저 미지원 */
                      }
                    }
                  }}
                >
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    disabled={dateFlexible}
                    min={new Date().toISOString().slice(0, 10)}
                    className="input-light w-full pr-12 disabled:cursor-not-allowed"
                  />
                  <Calendar
                    size={20}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={dateFlexible}
                    onChange={(e) => {
                      setDateFlexible(e.target.checked);
                      if (e.target.checked) setPreferredDate("");
                    }}
                    className="h-5 w-5 rounded border-slate-300 text-[#009881] focus:ring-[#009881]"
                  />
                  <span className="text-sm font-medium text-slate-700">날짜 상관없음</span>
                </label>
              </div>
            </Field>

            <Field label="교육장소" required>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(
                    [
                      { value: "internal" as const, label: "내부강의실" },
                      { value: "external" as const, label: "외부강의실" },
                      { value: "other" as const, label: "기타" },
                    ] as const
                  ).map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                        venue === opt.value
                          ? "choice-selected"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#009881]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="venue"
                        value={opt.value}
                        checked={venue === opt.value}
                        onChange={() => setVenue(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {venue === "other" && (
                  <input
                    type="text"
                    value={venueOther}
                    onChange={(e) => setVenueOther(e.target.value)}
                    placeholder="교육장소를 입력해 주세요"
                    className="input-light"
                  />
                )}
              </div>
            </Field>

            <Field label="교육환경">
              <p className="-mt-1 mb-3 text-xs text-slate-500">
                강의실에 준비 가능한 설비를 선택해 주세요.
              </p>
              <div className="space-y-2">
                <EnvCheck
                  label="수강생 PC 설치 여부"
                  checked={hasStudentPc}
                  onChange={setHasStudentPc}
                />
                <EnvCheck
                  label="강사 PC 설치 여부"
                  checked={hasInstructorPc}
                  onChange={setHasInstructorPc}
                />
                <EnvCheck
                  label="빔프로젝터(강의화면) 설치 여부"
                  checked={hasProjector}
                  onChange={setHasProjector}
                />
              </div>
            </Field>

            <div className="space-y-6 border-t border-slate-200 pt-6">
              <p className="text-sm font-semibold text-slate-700">추가 정보 (주관식)</p>

              <Field label="신청사유" required>
                <textarea
                  value={applicationReason}
                  onChange={(e) => setApplicationReason(e.target.value)}
                  placeholder="교육을 신청하시는 배경·목적을 적어 주세요."
                  rows={4}
                  className="input-light min-h-[100px] resize-y"
                />
              </Field>

              <Field label="중점적으로 배우고 싶은 항목" required>
                <textarea
                  value={learningFocus}
                  onChange={(e) => setLearningFocus(e.target.value)}
                  placeholder="특히 익히고 싶은 역량, 업무 적용 분야 등을 적어 주세요."
                  rows={4}
                  className="input-light min-h-[100px] resize-y"
                />
              </Field>
            </div>

            <PrivacyConsentField checked={privacyAgreed} onChange={setPrivacyAgreed} />

            {formError && (
              <p className="text-center text-sm font-medium text-red-600">{formError}</p>
            )}

            <button type="button" onClick={handleNext} className="btn-brand-primary mt-2 w-full py-4 text-lg">
              다음 — 과목 선택
            </button>
          </div>
        </motion.div>
      </section>
    </ApplyPageShell>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: ReactNode;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="block">
      <span className="mb-2 block text-sm font-semibold leading-relaxed text-slate-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
    </div>
  );
}

function EnvCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:border-[#009881]/30">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-slate-300 text-[#009881] focus:ring-[#009881]"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}
