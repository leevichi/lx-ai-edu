"use client";

import type { ReactNode } from "react";
import type { ApplicationReportData } from "@/lib/application-report";
import {
  aiLevelLabel,
  formatReportDate,
  formatReceiptCode,
  preferredDateLabel,
} from "@/lib/application-report";
import { formatCourseDomainLine, formatCourseMeta } from "@/lib/course-display";
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from "@/lib/site-config";

type Props = {
  data: ApplicationReportData;
};

export function ApplicationLookupDetail({ data }: Props) {
  const receipt = formatReceiptCode(data.applicationId);
  const status = data.status
    ? APPLICATION_STATUS_LABELS[data.status as ApplicationStatus]
    : "접수";
  const envText = data.envLabels.length ? data.envLabels.join(", ") : "—";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span>
          접수번호{" "}
          <strong className="font-mono text-slate-900 tracking-wide">{receipt}</strong>
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>접수일시 {formatReportDate(data.createdAt)}</span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>
          처리상태{" "}
          <strong className="text-[#007a66]">{status}</strong>
        </span>
      </div>

      <ReportSection title="1. 신청 기관 정보">
        <PairTable
          rows={[
            [
              { label: "신청기관", value: data.agency },
              {
                label: "담당자",
                value: `${data.contactName} (${data.contactPhone})`,
              },
            ],
            [
              { label: "수강인원", value: `${data.participantCount}명` },
              { label: "교육대상", value: data.educationTarget.trim() || "—" },
            ],
            [
              { label: "희망 교육일", value: preferredDateLabel(data) },
              { label: "교육 장소", value: data.venueLabel || "—" },
            ],
            [
              { label: "교육 환경", value: envText },
              { label: "AI 숙련도", value: aiLevelLabel(data.aiLevel) },
            ],
          ]}
        />
      </ReportSection>

      <ReportSection title="2. 신청 배경 및 학습 목표">
        <PairTable
          rows={[
            [
              { label: "신청 사유", value: data.applicationReason.trim() || "—" },
              { label: "중점 학습", value: data.learningFocus.trim() || "—" },
            ],
          ]}
        />
      </ReportSection>

      <ReportSection title="3. 희망 교육 과정">
        {data.customCurriculum ? (
          <div className="px-4 py-4">
            <p className="mb-2 text-xs font-semibold text-[#007a66]">
              ※ 교육 분야·과목은 담당자와 별도 조율 희망
            </p>
            <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800">
              {data.customCurriculumRequest || "—"}
            </p>
          </div>
        ) : data.courses.length > 0 ? (
          <>
            <p className="border-b border-slate-100 px-4 py-2 text-xs text-slate-500">
              총 {data.courses.length}개 과목 · {data.totalHours}시간 (희망 기준)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-bold text-slate-600">
                    <th className="w-12 px-3 py-2.5">No</th>
                    <th className="w-[28%] px-3 py-2.5">교육 영역</th>
                    <th className="px-3 py-2.5">과목명</th>
                    <th className="w-[22%] px-3 py-2.5">시간·형태</th>
                  </tr>
                </thead>
                <tbody>
                  {data.courses.map((c, i) => (
                    <tr key={c.id} className="border-t border-slate-100">
                      <td className="px-3 py-2.5 text-center font-mono text-slate-500">
                        {i + 1}
                      </td>
                      <td className="px-3 py-2.5 text-[#007a66]">{formatCourseDomainLine(c)}</td>
                      <td className="px-3 py-2.5 font-medium text-slate-900">{c.title}</td>
                      <td className="px-3 py-2.5 text-slate-600">{formatCourseMeta(c)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="px-4 py-6 text-center text-sm text-slate-500">선택된 과목 없음</p>
        )}
      </ReportSection>
    </div>
  );
}

function ReportSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <h3 className="bg-[#009881] px-4 py-2.5 text-sm font-bold text-white">{title}</h3>
      {children}
    </section>
  );
}

function PairTable({
  rows,
}: {
  rows: [{ label: string; value: string }, { label: string; value: string }][];
}) {
  return (
    <div className="overflow-x-auto">
    <table className="w-full min-w-[520px] text-sm">
      <tbody>
        {rows.map((pair, i) => (
          <tr key={i} className="border-t border-slate-100 first:border-t-0">
            <th className="w-[14%] bg-slate-50 px-3 py-2.5 text-left text-xs font-bold text-slate-600 sm:px-4">
              {pair[0].label}
            </th>
            <td className="w-[36%] px-3 py-2.5 text-slate-800 sm:px-4">{pair[0].value}</td>
            <th className="w-[14%] bg-slate-50 px-3 py-2.5 text-left text-xs font-bold text-slate-600 sm:px-4">
              {pair[1].label}
            </th>
            <td className="w-[36%] px-3 py-2.5 text-slate-800 sm:px-4">{pair[1].value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
