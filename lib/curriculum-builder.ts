import { COURSE_MAP, DOMAINS, type Course } from "./catalog";

/** 선택한 과목만 영역·순서 정렬 (선행 과목 자동 포함 없음) */
export function buildCurriculumFromSelection(selectedIds: string[]): {
  courses: Course[];
  autoAddedIds: string[];
  totalHours: number;
} {
  const domainOrder = new Map(DOMAINS.map((d) => [d.id, d.order]));

  const courses = selectedIds
    .map((id) => COURSE_MAP.get(id))
    .filter((c): c is Course => Boolean(c))
    .sort((a, b) => {
      const domainDiff =
        (domainOrder.get(a.domainId) ?? 0) - (domainOrder.get(b.domainId) ?? 0);
      if (domainDiff !== 0) return domainDiff;
      return a.order - b.order;
    });

  const totalHours = courses.reduce((sum, c) => sum + c.durationHours, 0);

  return { courses, autoAddedIds: [], totalHours };
}
