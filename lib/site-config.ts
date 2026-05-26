/** 운영 시 .env.local 로 덮어쓸 수 있는 공개 연락처·안내 */
export const SITE = {
  orgName: "한국국토정보공사",
  platformName: "LX AI 교육 신청 플랫폼",
  contactPhone: process.env.NEXT_PUBLIC_LX_CONTACT_PHONE ?? "033-815-8606",
  contactEmail: process.env.NEXT_PUBLIC_LX_CONTACT_EMAIL ?? "vichi92@lx.or.kr",
  contactHours: "평일 09:00 – 18:00",
  responseDays: "영업일 기준 2~5일",
} as const;

/** 신청 폼 AI 숙련도 — 3단계 (내부 저장값은 대표 레벨) */
export const AI_LEVEL_OPTIONS = [
  {
    level: 2,
    name: "입문",
    desc: "AI를 거의 사용해 본 적 없거나 기초부터 배우고 싶을 때",
  },
  {
    level: 4,
    name: "활용",
    desc: "업무 보조·문서·이미지 등 일상적으로 활용 중일 때",
  },
  {
    level: 6,
    name: "전문",
    desc: "다양한 도구를 능숙하게 쓰거나 심화·실무 중심이 필요할 때",
  },
] as const;

export type ApplicationStatus =
  | "received"
  | "reviewing"
  | "confirmed"
  | "cancelled";

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  received: "접수",
  reviewing: "협의중",
  confirmed: "확정",
  cancelled: "취소",
};
