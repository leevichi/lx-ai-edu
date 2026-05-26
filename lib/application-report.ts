import type { Course } from "./catalog";
import type { ApplicationStatus } from "./site-config";
import { formatReceiptCode } from "./receipt";

export { formatReceiptCode };
import { AI_LEVEL_OPTIONS } from "./site-config";

export type ApplicationReportData = {
  applicationId: string;
  createdAt?: string;
  status?: ApplicationStatus;
  agency: string;
  contactName: string;
  contactPhone: string;
  participantCount: number;
  educationTarget: string;
  preferredDate: string | null;
  dateFlexible: boolean;
  venueLabel: string;
  envLabels: string[];
  aiLevel: number;
  applicationReason: string;
  learningFocus: string;
  courses: Course[];
  totalHours: number;
  customCurriculum: boolean;
  customCurriculumRequest: string;
};

export function aiLevelLabel(level: number): string {
  return AI_LEVEL_OPTIONS.find((o) => o.level === level)?.name ?? `레벨 ${level}`;
}

export function formatReportDate(iso?: string | null): string {
  if (!iso) return new Date().toLocaleString("ko-KR");
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function preferredDateLabel(data: ApplicationReportData): string {
  if (data.dateFlexible) return "날짜 상관없음 (담당자 협의)";
  if (!data.preferredDate) return "—";
  try {
    return new Date(data.preferredDate).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return data.preferredDate;
  }
}

export function buildReportTitle(data: ApplicationReportData): string {
  return `LX_AI교육희망신청_${data.agency}_${formatReceiptCode(data.applicationId)}`;
}
