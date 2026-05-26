import type { ApplicationReportData } from "./application-report";
import type { ApplicationRow } from "./applications";
import type { Course } from "./catalog";
import type { ApplyFormData } from "./apply-storage";
import { venueLabel } from "./apply-storage";

export function envLabelsFromForm(form: ApplyFormData): string[] {
  return [
    form.hasStudentPc && "수강생 PC",
    form.hasInstructorPc && "강사 PC",
    form.hasProjector && "빔프로젝터",
  ].filter(Boolean) as string[];
}

export function buildReportFromForm(args: {
  applicationId: string;
  createdAt?: string;
  status?: ApplicationReportData["status"];
  form: ApplyFormData;
  aiLevel: number;
  courses: Course[];
  totalHours: number;
  customCurriculum: boolean;
  customCurriculumRequest: string;
}): ApplicationReportData {
  return {
    applicationId: args.applicationId,
    createdAt: args.createdAt ?? new Date().toISOString(),
    status: args.status ?? "received",
    agency: args.form.agency,
    contactName: args.form.contactName,
    contactPhone: args.form.contactPhone,
    participantCount: args.form.participantCount,
    educationTarget: args.form.educationTarget,
    preferredDate: args.form.preferredDate,
    dateFlexible: args.form.dateFlexible,
    venueLabel: venueLabel(args.form),
    envLabels: envLabelsFromForm(args.form),
    aiLevel: args.aiLevel,
    applicationReason: args.form.applicationReason,
    learningFocus: args.form.learningFocus,
    courses: args.courses,
    totalHours: args.totalHours,
    customCurriculum: args.customCurriculum,
    customCurriculumRequest: args.customCurriculumRequest,
  };
}

export function buildReportFromRow(row: ApplicationRow): ApplicationReportData {
  const venue =
    row.venue_type === "internal"
      ? "내부강의실"
      : row.venue_type === "external"
        ? "외부강의실"
        : row.venue_type === "other"
          ? row.venue_other || "기타"
          : row.venue_other || "—";

  return {
    applicationId: row.id,
    createdAt: row.created_at,
    status: row.status ?? "received",
    agency: row.agency,
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    participantCount: row.participant_count,
    educationTarget: row.education_target ?? "",
    preferredDate: row.preferred_date,
    dateFlexible: row.date_flexible,
    venueLabel: venue,
    envLabels: [
      row.env_student_pc && "수강생 PC",
      row.env_instructor_pc && "강사 PC",
      row.env_projector && "빔프로젝터",
    ].filter(Boolean) as string[],
    aiLevel: row.ai_level,
    applicationReason: row.application_reason ?? "",
    learningFocus: row.learning_focus ?? "",
    courses: row.courses ?? [],
    totalHours: row.total_hours ?? 0,
    customCurriculum: Boolean(row.custom_curriculum),
    customCurriculumRequest: row.custom_curriculum_request ?? "",
  };
}
