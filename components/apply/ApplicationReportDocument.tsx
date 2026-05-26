"use client";

import { SITE, APPLICATION_STATUS_LABELS, type ApplicationStatus } from "@/lib/site-config";
import {
  type ApplicationReportData,
  aiLevelLabel,
  formatReportDate,
  preferredDateLabel,
  formatReceiptCode,
} from "@/lib/application-report";
import { formatCourseMeta, formatCourseDomainLine } from "@/lib/course-display";

type Props = {
  data: ApplicationReportData;
  className?: string;
};

export function ApplicationReportDocument({ data, className = "" }: Props) {
  const receipt = formatReceiptCode(data.applicationId);
  const status = data.status
    ? APPLICATION_STATUS_LABELS[data.status as ApplicationStatus]
    : "접수";
  const envText = data.envLabels.length ? data.envLabels.join(", ") : "—";
  const reason = data.applicationReason.trim() || "—";
  const focus = data.learningFocus.trim() || "—";

  return (
    <div className={`application-report-doc bg-white text-slate-900 ${className}`}>
      <div className="doc">
        <header className="head">
          <p className="org">{SITE.orgName}</p>
          <h1 className="title">AI 교육 희망 신청서</h1>
          <p className="sub">희망 신청 내역 (최종 일정·과목은 담당자 협의 후 확정)</p>
          <p className="meta-line">
            접수번호 <strong className="meta-code">{receipt}</strong>
            {" · "}접수일시 {formatReportDate(data.createdAt)}
            {" · "}처리상태 <strong>{status}</strong>
          </p>
        </header>

        <h2>1. 신청 기관 정보</h2>
        <table className="info info-pairs">
          <tbody>
            <PairRow
              leftLabel="신청기관"
              leftValue={data.agency}
              rightLabel="담당자"
              rightValue={`${data.contactName} (${data.contactPhone})`}
            />
            <PairRow
              leftLabel="수강인원"
              leftValue={`${data.participantCount}명`}
              rightLabel="교육대상"
              rightValue={data.educationTarget.trim() || "—"}
            />
            <PairRow
              leftLabel="희망 교육일"
              leftValue={preferredDateLabel(data)}
              rightLabel="교육 장소"
              rightValue={data.venueLabel || "—"}
            />
            <PairRow
              leftLabel="교육 환경"
              leftValue={envText}
              rightLabel="AI 숙련도"
              rightValue={aiLevelLabel(data.aiLevel)}
            />
          </tbody>
        </table>

        <h2>2. 신청 배경 및 학습 목표</h2>
        <table className="info info-pairs">
          <tbody>
            <PairRow
              leftLabel="신청 사유"
              leftValue={reason}
              rightLabel="중점 학습"
              rightValue={focus}
            />
          </tbody>
        </table>

        <h2>3. 희망 교육 과정</h2>
        {data.customCurriculum ? (
          <>
            <p className="section-hint">※ 교육 분야·과목은 담당자와 별도 조율 희망</p>
            <div className="custom-box">{data.customCurriculumRequest}</div>
          </>
        ) : data.courses.length > 0 ? (
          <>
            <p className="section-hint">
              총 {data.courses.length}개 과목 · {data.totalHours}시간 (희망 기준)
            </p>
            <table className="courses">
              <thead>
                <tr>
                  <th style={{ width: 28 }}>No</th>
                  <th style={{ width: "22%" }}>교육 영역</th>
                  <th>과목명</th>
                  <th style={{ width: "18%" }}>시간·형태</th>
                </tr>
              </thead>
              <tbody>
                {data.courses.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{formatCourseDomainLine(c)}</td>
                    <td>{c.title}</td>
                    <td>{formatCourseMeta(c)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="section-hint">선택된 과목 없음</p>
        )}

        <div className="note">
          <strong>안내</strong> 본 신청은 LX 교육 담당자 검토·유선 협의 후 최종 확정됩니다. 문의:{" "}
          {SITE.contactPhone} · {SITE.contactEmail}
        </div>

        <footer className="footer">
          {SITE.orgName} {SITE.platformName} · {formatReportDate(data.createdAt)} 출력
        </footer>
      </div>
    </div>
  );
}

function PairRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}) {
  return (
    <tr>
      <th>{leftLabel}</th>
      <td>{leftValue}</td>
      <th>{rightLabel}</th>
      <td>{rightValue}</td>
    </tr>
  );
}
