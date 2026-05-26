/** 일일 최대 교육 시간(시간) */
export const MAX_HOURS_PER_DAY = 6;

/** 총 교육 시간 → 필요 일수 (6시간 초과 시 2일차부터 분할) */
export function calcTrainingDays(totalHours: number): number {
  if (totalHours <= 0) return 0;
  return Math.ceil(totalHours / MAX_HOURS_PER_DAY);
}

export function formatCartSummary(
  courseCount: number,
  totalHours: number
): string {
  const days = calcTrainingDays(totalHours);
  const dayLabel = days <= 1 ? "" : `, ${days}일간`;
  return `${courseCount}개 과목, 총 ${totalHours}시간${dayLabel}`;
}
