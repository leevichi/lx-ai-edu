export interface Module {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level: number[]; // [sensitivity lower bound, upper bound]
}

export const AI_MODULES: Module[] = [
  {
    id: "M1",
    title: "AI 리터러시 & 공공 보안",
    description: "ChatGPT/Gemini 기초 및 공공데이터 보안 가이드",
    tags: ["기초", "문서"],
    level: [1, 3],
  },
  {
    id: "M2",
    title: "비주얼 콘텐츠 제작",
    description: "미드저니/DALL-E 활용 홍보 포스터 제작",
    tags: ["홍보"],
    level: [2, 7],
  },
  {
    id: "M3",
    title: "공공 홍보 영상 마스터",
    description: "Runway/Sora 활용 지자체 홍보 영상 자동 생성",
    tags: ["영상", "홍보"],
    level: [3, 7],
  },
  {
    id: "M4",
    title: "스마트 오피스 자동화",
    description: "AI 기반 보고서 초안 및 엑셀 데이터 자동화",
    tags: ["효율", "문서", "엑셀"],
    level: [2, 6],
  },
  {
    id: "M5",
    title: "AI 바이브 코딩 (Cursor)",
    description: "커서 AI를 활용한 업무용 보조 프로그램 제작",
    tags: ["웹앱", "코딩"],
    level: [4, 7],
  },
  // ... 추가 모듈 확장 가능
];

export function generateCurriculum(
  goals: string[],
  level: number,
  customNeed: string
) {
  void customNeed;

  // 1. 목표 기반 필터링
  const selected = AI_MODULES.filter(
    (module) =>
      module.tags.some((tag) => goals.includes(tag)) || module.level[0] <= level
  );

  // 2. 최대 4개 모듈로 최적화 조합
  return selected.slice(0, 4);
}
