import { COURSE_MAP, type Course } from "@/lib/catalog";

const AI_BASICS_DOMAIN = "D01";

/** 장바구니에 없는 선행 과목 (카탈로그 기준 전체) */
export function getMissingPrerequisites(
  courseId: string,
  cartIds: string[]
): Course[] {
  const course = COURSE_MAP.get(courseId);
  if (!course) return [];

  const cartSet = new Set(cartIds);
  return course.prerequisiteIds
    .map((id) => COURSE_MAP.get(id))
    .filter((c): c is Course => c !== undefined && !cartSet.has(c.id));
}

/**
 * 팝업에 표시할 선행 과목 (신청자 AI 숙련도 반영)
 * - Lv.1~2: 카탈로그 선행과목 그대로
 * - Lv.3+: 문서 실무(D02) 신청 시 AI 기초(D01) 선행 안내 생략
 * - Lv.4+: 이미지·영상 영역도 D01 선행 안내 생략
 * - Lv.5+: 모든 영역에서 D01 선행 안내 생략
 * - Lv.6~7: 선행 팝업 없음
 */
export function getPrerequisiteWarnings(
  courseId: string,
  cartIds: string[],
  userAiLevel: number
): Course[] {
  if (userAiLevel >= 6) return [];

  const target = COURSE_MAP.get(courseId);
  if (!target) return [];

  let missing = getMissingPrerequisites(courseId, cartIds);

  missing = missing.filter((prereq) => {
    if (prereq.domainId !== AI_BASICS_DOMAIN) return true;

    if (userAiLevel >= 5) return false;

    if (userAiLevel >= 4) {
      return !["D02", "D03", "D04"].includes(target.domainId);
    }

    if (userAiLevel >= 3) {
      return target.domainId !== "D02";
    }

    return true;
  });

  return missing;
}

export function formatPrerequisiteMessage(missing: Course[]): string {
  const names = missing.map((c) => `「${c.title}」`).join(", ");
  return `해당 과목을 수강하시려면 ${names}에 대한 선행학습이 필요합니다. 그래도 신청하시겠습니까?`;
}
