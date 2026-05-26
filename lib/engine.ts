// 1. 교육 목표 객관식 선택지 (선빛님 피드백 반영)
export const EDUCATIONAL_GOALS = [
  { id: "doc", label: "문서/보고서 초안 작성", value: "문서자동화" },
  { id: "visual", label: "행사 포스터/카드뉴스 제작", value: "홍보물제작" },
  { id: "video", label: "지자체 홍보 영상 제작/편집", value: "영상제작" },
  { id: "data", label: "엑셀 자동화 및 데이터 시각화", value: "데이터분석" },
  {
    id: "coding",
    label: "업무용 보조 프로그램 개발(Cursor)",
    value: "바이브코딩",
  },
  { id: "webapp", label: "대민 서비스용 웹앱/챗봇 제작", value: "웹앱제작" },
  { id: "rpa", label: "반복 행정 업무 자동화(RPA)", value: "RPA" },
  { id: "policy", label: "신규 정책 아이디어 브레인스토밍", value: "정책기획" },
] as const;

// 2. AI 숙련도 7단계 정의
export const AI_LEVELS = [
  { level: 1, name: "입문", desc: "AI 경험 없음" },
  { level: 2, name: "기초", desc: "가끔 사용 (검색)" },
  { level: 3, name: "활용", desc: "업무 보조로 사용" },
  { level: 4, name: "중급", desc: "이미지/문서 요약 적극 활용" },
  { level: 5, name: "상급", desc: "다양한 툴 용도별 활용" },
  { level: 6, name: "전문가", desc: "바이브코딩 및 각종 툴 활용 숙련자" },
  { level: 7, name: "마스터", desc: "API 연동 및 워크플로우 구축" },
] as const;

// 3. 고도화된 교육 모듈 정의 (숙련도 범위 및 태그 매칭)
export interface Module {
  id: string;
  title: string;
  description: string;
  levelRange: [number, number]; // [최소 레벨, 최대 레벨]
  tags: string[];
}

export const AI_MODULES: Module[] = [
  {
    id: "M1",
    title: "생성형 AI 리터러시 & 보안 정책",
    description: "ChatGPT/Gemini 기초 및 공공데이터 보안 가이드",
    levelRange: [1, 3],
    tags: ["기초", "문서자동화", "정책기획"],
  },
  {
    id: "M2",
    title: "실전! 공공 보고서 & 보도자료 초안 자동화",
    description: "LLM을 활용한 기획안 작성 및 문체 교정 실습",
    levelRange: [2, 5],
    tags: ["문서자동화", "정책기획"],
  },
  {
    id: "M3",
    title: "비주얼 팩토리: 미드저니로 만드는 고품질 홍보물",
    description: "공공기관 맞춤형 이미지 생성 프롬프트 및 포스터 제작",
    levelRange: [2, 6],
    tags: ["홍보물제작"],
  },
  {
    id: "M4",
    title: "AI 비디오 랩: 홍보 영상 자동 생성 및 편집",
    description: "Runway/Sora 활용, 기획부터 영상 완성까지",
    levelRange: [3, 7],
    tags: ["영상제작"],
  },
  {
    id: "M5",
    title: "파이썬 없이 하는 AI 데이터 분석 & 시각화",
    description: "엑셀 노가다 탈출! 데이터 전처리 및 인포그래픽",
    levelRange: [3, 6],
    tags: ["데이터분석", "RPA"],
  },
  {
    id: "M6",
    title: "Cursor & 바이브 코딩: 나만의 업무 보조 툴 제작",
    description: "커서 AI로 배우는 노코드/로우코드 애플리케이션 개발",
    levelRange: [4, 7],
    tags: ["바이브코딩", "RPA"],
  },
  {
    id: "M7",
    title: "지능형 대민 서비스 웹앱 & 챗봇 빌딩",
    description: "지자체 FAQ 자동 응대 및 민원 분석 시스템 구축",
    levelRange: [5, 7],
    tags: ["웹앱제작", "바이브코딩"],
  },
  {
    id: "M8",
    title: "AI 시대의 공공 윤리와 저작권 가이드",
    description: "AI 결과물 활용 시 주의점 및 프라이버시 정책",
    levelRange: [1, 7],
    tags: ["정책기획", "기초"],
  },
];

// 4. 커리큘럼 생성 로직 (룰 기반 + AI 느낌의 가중치 적용)
export function generateCurriculum(
  goalIds: string[],
  level: number,
  customNeed: string
) {
  void customNeed;

  // 사용자가 선택한 목표에 해당하는 태그 추출
  const selectedTags: string[] = EDUCATIONAL_GOALS.filter((goal) =>
    goalIds.includes(goal.id)
  ).map((goal) => goal.value);

  // 1차 필터링: 숙련도 범위에 맞고, 선택된 태그 중 하나라도 포함하는 모듈
  const filtered = AI_MODULES.filter(
    (m) =>
      level >= m.levelRange[0] &&
      level <= m.levelRange[1] &&
      m.tags.some((tag) => selectedTags.includes(tag))
  );

  // 2차 정렬: 태그 일치 개수가 많은 순서대로
  filtered.sort((a, b) => {
    const aMatchCount = a.tags.filter((tag) => selectedTags.includes(tag)).length;
    const bMatchCount = b.tags.filter((tag) => selectedTags.includes(tag)).length;
    return bMatchCount - aMatchCount;
  });

  // 필수 모듈 (M1, M8)은 숙련도에 따라 우선 추가
  const coreModules = AI_MODULES.filter(
    (m) => ["M1", "M8"].includes(m.id) && level >= m.levelRange[0]
  );

  // 최종 조합 (최대 4개)
  return [...new Set([...filtered, ...coreModules])].slice(0, 4);
}
