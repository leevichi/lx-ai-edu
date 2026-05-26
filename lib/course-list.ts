import { COURSE_MAP, DOMAINS, type Course } from "@/lib/catalog";

export function coursesFromIds(ids: string[]): Course[] {
  const domainOrder = new Map(DOMAINS.map((d) => [d.id, d.order]));
  return ids
    .map((id) => COURSE_MAP.get(id))
    .filter((c): c is Course => Boolean(c))
    .sort((a, b) => {
      const dd =
        (domainOrder.get(a.domainId) ?? 0) - (domainOrder.get(b.domainId) ?? 0);
      if (dd !== 0) return dd;
      return a.order - b.order;
    });
}

export function totalHoursFromCourses(courses: Course[]): number {
  return courses.reduce((sum, c) => sum + c.durationHours, 0);
}
