import type { Course } from "./catalog";

/** 기관 담당자 화면용 — 내부 ID·레벨 숨김 */
export function formatCourseMeta(course: Course): string {
  return `${course.durationHours}시간 · ${course.format}`;
}

export function formatCourseDomainLine(course: Course): string {
  return course.domainName;
}
