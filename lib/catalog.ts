// Auto-generated from LX_교육과정_7영역_템플릿_v2_채움.xlsx
export interface Domain {
  id: string;
  name: string;
  order: number;
  description: string;
  levelMin: number;
  levelMax: number;
  linkedGoalIds: string[];
}

export interface Course {
  id: string;
  domainId: string;
  domainName: string;
  order: number;
  title: string;
  levelMin: number;
  levelMax: number;
  durationHours: number;
  format: string;
  practiceRatio: number;
  tags: string[];
  outcomes: string;
  prerequisiteIds: string[];
  excludeWithIds: string[];
  isCore: boolean;
}

export const DOMAINS: Domain[] = [
  {
    "id": "D01",
    "name": "AI 기초영역",
    "order": 1,
    "description": "생성형 AI 개념, 공공기관 AI 활용 원칙, 보안·윤리 기초",
    "levelMin": 1,
    "levelMax": 3,
    "linkedGoalIds": [
      "policy",
      "doc"
    ]
  },
  {
    "id": "D02",
    "name": "문서 실무영역",
    "order": 2,
    "description": "보고서·보도자료·회의록·기획안 등 문서 업무 자동화",
    "levelMin": 2,
    "levelMax": 6,
    "linkedGoalIds": [
      "doc"
    ]
  },
  {
    "id": "D03",
    "name": "이미지 콘텐츠 영역",
    "order": 3,
    "description": "포스터·카드뉴스·SNS 이미지",
    "levelMin": 2,
    "levelMax": 6,
    "linkedGoalIds": [
      "visual"
    ]
  },
  {
    "id": "D04",
    "name": "영상콘텐츠 영역",
    "order": 4,
    "description": "홍보영상·숏폼·편집",
    "levelMin": 3,
    "levelMax": 7,
    "linkedGoalIds": [
      "video"
    ]
  },
  {
    "id": "D05",
    "name": "데이터 분석 영역",
    "order": 5,
    "description": "엑셀 자동화, 시각화",
    "levelMin": 3,
    "levelMax": 6,
    "linkedGoalIds": [
      "data",
      "rpa"
    ]
  },
  {
    "id": "D06",
    "name": "바이브코딩 영역",
    "order": 6,
    "description": "Cursor 업무툴·웹앱",
    "levelMin": 4,
    "levelMax": 7,
    "linkedGoalIds": [
      "coding",
      "webapp"
    ]
  },
  {
    "id": "D07",
    "name": "지역주민 맞춤 교육 영역",
    "order": 7,
    "description": "평생교육 등 지역주민 대상 AI교육 과정 운영시",
    "levelMin": 1,
    "levelMax": 5,
    "linkedGoalIds": [
      "policy"
    ]
  }
];

export const COURSES: Course[] = [
  {
    "id": "D01-01",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 1,
    "title": "생성형 AI 입문과 공공 활용 이해",
    "levelMin": 1,
    "levelMax": 2,
    "durationHours": 2,
    "format": "혼합",
    "practiceRatio": 60,
    "tags": [
      "BASIC"
    ],
    "outcomes": "생성형 AI의 기본 개념과 공공·생활 분야 활용사례를 이해하고 본인에게 필요한 활용 분야를 설명할 수 있다.",
    "prerequisiteIds": [],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D01-02",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 2,
    "title": "AI 도구 비교와 선택 실습",
    "levelMin": 1,
    "levelMax": 3,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 70,
    "tags": [
      "BASIC"
    ],
    "outcomes": "ChatGPT, Gemini, Claude, Perplexity 등 주요 AI 도구의 차이를 이해하고 목적에 맞는 도구를 선택할 수 있다.",
    "prerequisiteIds": [
      "D01-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D01-03",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 3,
    "title": "프롬프트 기초 실습",
    "levelMin": 1,
    "levelMax": 3,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "BASIC"
    ],
    "outcomes": "역할, 목적, 조건, 출력형식을 넣어 원하는 답변을 얻는 기본 프롬프트를 작성할 수 있다.",
    "prerequisiteIds": [
      "D01-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D01-04",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 4,
    "title": "프롬프트 엔지니어링 심화",
    "levelMin": 3,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "BASIC",
      "DOC"
    ],
    "outcomes": "업무 맥락, 평가기준, 예시, 재질문을 활용하여 답변 품질을 개선하는 고급 프롬프트를 설계할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D01-05",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 5,
    "title": "공공기관 AI 보안·윤리·저작권",
    "levelMin": 1,
    "levelMax": 4,
    "durationHours": 2,
    "format": "혼합",
    "practiceRatio": 50,
    "tags": [
      "BASIC"
    ],
    "outcomes": "개인정보, 민감자료, 저작권, 출처 표기 등 AI 사용 시 유의사항을 체크리스트로 정리할 수 있다.",
    "prerequisiteIds": [
      "D01-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D01-06",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 6,
    "title": "AI 답변 검증과 출처 확인",
    "levelMin": 2,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 70,
    "tags": [
      "BASIC"
    ],
    "outcomes": "AI 답변의 오류 가능성을 이해하고 검색, 공식자료, 출처 비교를 통해 사실 여부를 검토할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D01-07",
    "domainId": "D01",
    "domainName": "AI 기초영역",
    "order": 7,
    "title": "나만의 AI 활용전략 수립",
    "levelMin": 2,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "BASIC",
      "LIFE"
    ],
    "outcomes": "개인·업무·생활 목적에 맞는 AI 활용 시나리오와 단계별 실행계획을 작성할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-01",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 1,
    "title": "AI 글쓰기 기본",
    "levelMin": 2,
    "levelMax": 4,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC",
      "BASIC"
    ],
    "outcomes": "공지문, 안내문, 설명문을 목적에 맞게 작성하고 문장 중복과 어색한 표현을 교정할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-02",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 2,
    "title": "보고서·계획안 작성 실무",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC"
    ],
    "outcomes": "추진배경, 추진목적, 세부계획, 기대효과를 포함한 1~2쪽 보고서 또는 계획안 초안을 작성할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D02-03",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 3,
    "title": "결과보고서·실적보고 작성",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC"
    ],
    "outcomes": "추진실적, 성과, 문제점, 향후계획을 구조화하여 결과보고서 초안을 작성할 수 있다.",
    "prerequisiteIds": [
      "D02-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-04",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 4,
    "title": "회의록·요약문 자동화",
    "levelMin": 2,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC"
    ],
    "outcomes": "회의 메모나 녹취 내용을 기반으로 회의록, 결정사항, 향후 조치사항을 정리할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-05",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 5,
    "title": "보도자료·홍보문 작성",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC",
      "IMG"
    ],
    "outcomes": "행사·교육·사업 내용을 보도자료, SNS 홍보문, 카드뉴스 문안 형태로 전환할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-06",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 6,
    "title": "AI 활용 PPT 기획·초안 제작",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC"
    ],
    "outcomes": "발표 목적에 맞는 목차, 슬라이드 구성, 핵심 메시지, 발표대본 초안을 제작할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-07",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 7,
    "title": "발표대본·강의안 작성",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 75,
    "tags": [
      "DOC"
    ],
    "outcomes": "대상자 수준에 맞는 발표대본, 강의안, 설명문을 작성하고 쉬운 표현으로 다듬을 수 있다.",
    "prerequisiteIds": [
      "D02-06"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D02-08",
    "domainId": "D02",
    "domainName": "문서 실무영역",
    "order": 8,
    "title": "업무매뉴얼·체크리스트 제작",
    "levelMin": 3,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DOC"
    ],
    "outcomes": "업무 절차를 단계별 매뉴얼과 체크리스트로 정리하여 신규 담당자도 따라할 수 있는 자료를 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-01",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 1,
    "title": "이미지 생성 AI 입문",
    "levelMin": 2,
    "levelMax": 4,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "IMG"
    ],
    "outcomes": "이미지 생성 AI의 기본 사용법을 익히고 목적에 맞는 이미지 시안을 직접 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D03-02",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 2,
    "title": "이미지 프롬프트 설계와 스타일 제어",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "IMG",
      "BASIC"
    ],
    "outcomes": "구도, 배경, 색감, 분위기, 비율을 반영한 이미지 프롬프트를 작성할 수 있다.",
    "prerequisiteIds": [
      "D03-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-03",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 3,
    "title": "카드뉴스 제작 실습",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "IMG",
      "DOC"
    ],
    "outcomes": "정보를 핵심 문장으로 요약하고 카드뉴스 3~5장 분량의 시각 콘텐츠를 제작할 수 있다.",
    "prerequisiteIds": [
      "D02-05"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-04",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 4,
    "title": "포스터·홍보물 제작",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "IMG",
      "DOC"
    ],
    "outcomes": "교육·행사·모집 안내용 포스터와 홍보 이미지를 제작할 수 있다.",
    "prerequisiteIds": [
      "D03-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-05",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 5,
    "title": "SNS·블로그 비주얼 콘텐츠 제작",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "IMG",
      "LIFE"
    ],
    "outcomes": "인스타그램, 블로그, 밴드 등에 활용할 홍보 이미지와 썸네일을 제작할 수 있다.",
    "prerequisiteIds": [
      "D03-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-06",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 6,
    "title": "로고·브랜드 가이드 제작",
    "levelMin": 3,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "IMG"
    ],
    "outcomes": "로고 시안, 슬로건, 색상, 글꼴 방향을 포함한 간단한 브랜드 가이드를 제작할 수 있다.",
    "prerequisiteIds": [
      "D03-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D03-07",
    "domainId": "D03",
    "domainName": "이미지 콘텐츠 영역",
    "order": 7,
    "title": "이미지 편집·보정·배경 제거",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "IMG"
    ],
    "outcomes": "배경 제거, 합성, 색감 보정, 해상도 개선 등 기본 이미지 편집 작업을 수행할 수 있다.",
    "prerequisiteIds": [
      "D03-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-01",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 1,
    "title": "영상 콘텐츠 기획과 구성",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 2,
    "format": "혼합",
    "practiceRatio": 65,
    "tags": [
      "VID",
      "DOC"
    ],
    "outcomes": "영상의 목적, 대상, 메시지, 장면 흐름을 정리한 영상 기획안을 작성할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D04-02",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 2,
    "title": "숏폼 영상 대본·스토리보드 작성",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "VID",
      "DOC"
    ],
    "outcomes": "쇼츠·릴스용 짧은 대본과 장면별 스토리보드를 작성할 수 있다.",
    "prerequisiteIds": [
      "D04-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-03",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 3,
    "title": "AI 영상 생성 실습",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VID",
      "IMG"
    ],
    "outcomes": "텍스트 또는 이미지 기반 AI 영상 생성 도구를 활용하여 짧은 영상 시안을 제작할 수 있다.",
    "prerequisiteIds": [
      "D04-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-04",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 4,
    "title": "영상 편집 기초",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VID"
    ],
    "outcomes": "컷 편집, 자막, 배경음악, 전환 효과를 활용하여 짧은 영상을 완성할 수 있다.",
    "prerequisiteIds": [
      "D04-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-05",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 5,
    "title": "AI 자막·내레이션·더빙 제작",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "VID"
    ],
    "outcomes": "자동 자막, TTS, 내레이션, 더빙 기능을 활용하여 영상 전달력을 높일 수 있다.",
    "prerequisiteIds": [
      "D04-04"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-06",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 6,
    "title": "기관·행사 홍보영상 제작",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 5,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VID",
      "DOC"
    ],
    "outcomes": "기관 사업, 교육, 지역행사 내용을 바탕으로 1분 내외 홍보영상을 제작할 수 있다.",
    "prerequisiteIds": [
      "D04-04"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D04-07",
    "domainId": "D04",
    "domainName": "영상콘텐츠 영역",
    "order": 7,
    "title": "숏폼 콘텐츠 완성·업로드 패키징",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "VID",
      "IMG"
    ],
    "outcomes": "영상 제목, 설명문, 해시태그, 썸네일을 구성하여 업로드 가능한 숏폼 콘텐츠 패키지를 만들 수 있다.",
    "prerequisiteIds": [
      "D04-04"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-01",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 1,
    "title": "데이터 분석 입문",
    "levelMin": 3,
    "levelMax": 4,
    "durationHours": 2,
    "format": "혼합",
    "practiceRatio": 60,
    "tags": [
      "DATA"
    ],
    "outcomes": "데이터의 기본 구조와 분석 흐름을 이해하고 업무 질문을 분석 과제로 바꿀 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-02",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 2,
    "title": "엑셀 데이터 정리와 전처리",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "DATA"
    ],
    "outcomes": "필터, 정렬, 중복 제거, 열 분리 등 분석 전 필요한 데이터 정리 작업을 수행할 수 있다.",
    "prerequisiteIds": [
      "D05-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-03",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 3,
    "title": "AI로 엑셀 데이터 분석하기",
    "levelMin": 3,
    "levelMax": 5,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "DATA",
      "BASIC"
    ],
    "outcomes": "AI를 활용하여 증감률, 순위, 비율, 패턴을 해석하고 분석 요약표를 만들 수 있다.",
    "prerequisiteIds": [
      "D05-02"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D05-04",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 4,
    "title": "설문조사·만족도 분석",
    "levelMin": 3,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DATA",
      "DOC"
    ],
    "outcomes": "설문 응답 데이터를 정리하고 문항별 결과, 만족도, 개선의견을 분석할 수 있다.",
    "prerequisiteIds": [
      "D05-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-05",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 5,
    "title": "민원·통계 데이터 시각화",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DATA"
    ],
    "outcomes": "민원·통계 데이터를 그래프와 표로 시각화하여 핵심 흐름을 설명할 수 있다.",
    "prerequisiteIds": [
      "D05-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-06",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 6,
    "title": "대시보드 기초 제작",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 6,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "DATA"
    ],
    "outcomes": "주요 지표를 한 화면에 정리한 간단한 대시보드를 제작하고 설명할 수 있다.",
    "prerequisiteIds": [
      "D05-05"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D05-07",
    "domainId": "D05",
    "domainName": "데이터 분석 영역",
    "order": 7,
    "title": "데이터 기반 보고서 작성",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "DATA",
      "DOC"
    ],
    "outcomes": "분석 결과를 근거, 해석, 시사점, 개선방안이 포함된 보고서 문장으로 정리할 수 있다.",
    "prerequisiteIds": [
      "D05-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-01",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 1,
    "title": "바이브코딩 체험과 웹페이지 제작",
    "levelMin": 4,
    "levelMax": 5,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VIBE"
    ],
    "outcomes": "Cursor 등 AI 코딩 도구를 활용하여 간단한 웹페이지를 만들고 공유 링크로 확인할 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D06-02",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 2,
    "title": "AI로 웹페이지 만들기",
    "levelMin": 4,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VIBE",
      "IMG"
    ],
    "outcomes": "제목, 이미지, 버튼, 메뉴, 섹션이 포함된 개인·기관 소개 웹페이지를 제작할 수 있다.",
    "prerequisiteIds": [
      "D06-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-03",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 3,
    "title": "홍보용 랜딩페이지 제작",
    "levelMin": 4,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VIBE",
      "DOC",
      "IMG"
    ],
    "outcomes": "교육, 행사, 상품, 기관 홍보용 단일 랜딩페이지를 기획·제작·공유할 수 있다.",
    "prerequisiteIds": [
      "D06-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-04",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 4,
    "title": "신청·접수 페이지 제작",
    "levelMin": 5,
    "levelMax": 6,
    "durationHours": 4,
    "format": "실습",
    "practiceRatio": 85,
    "tags": [
      "VIBE",
      "DOC"
    ],
    "outcomes": "교육신청, 행사접수, 문의접수 흐름을 담은 입력폼 기반 웹페이지를 제작할 수 있다.",
    "prerequisiteIds": [
      "D06-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-05",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 5,
    "title": "인터랙티브 미니 웹앱 제작",
    "levelMin": 5,
    "levelMax": 6,
    "durationHours": 5,
    "format": "실습",
    "practiceRatio": 90,
    "tags": [
      "VIBE"
    ],
    "outcomes": "입력값, 선택버튼, 조건별 결과 출력 기능이 있는 계산기·진단도구·추천도구를 제작할 수 있다.",
    "prerequisiteIds": [
      "D06-02"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-06",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 6,
    "title": "업무지원 웹앱 제작",
    "levelMin": 5,
    "levelMax": 7,
    "durationHours": 6,
    "format": "실습",
    "practiceRatio": 90,
    "tags": [
      "VIBE",
      "DOC"
    ],
    "outcomes": "체크리스트, 자동 문구 생성, 업무 절차 안내 기능을 포함한 업무용 미니 웹앱을 제작할 수 있다.",
    "prerequisiteIds": [
      "D06-05"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-07",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 7,
    "title": "데이터 조회·시각화 웹앱 제작",
    "levelMin": 6,
    "levelMax": 7,
    "durationHours": 6,
    "format": "실습",
    "practiceRatio": 90,
    "tags": [
      "VIBE",
      "DATA"
    ],
    "outcomes": "표 데이터를 기반으로 검색, 필터, 간단한 그래프 기능을 제공하는 조회·시각화 웹앱을 제작할 수 있다.",
    "prerequisiteIds": [
      "D06-05"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D06-08",
    "domainId": "D06",
    "domainName": "바이브코딩 영역",
    "order": 8,
    "title": "바이브코딩 프로젝트 실습",
    "levelMin": 6,
    "levelMax": 7,
    "durationHours": 8,
    "format": "실습",
    "practiceRatio": 90,
    "tags": [
      "VIBE"
    ],
    "outcomes": "개인 또는 팀별 주제를 선정하여 웹앱을 기획, 제작, 개선, 배포하고 결과물을 발표할 수 있다.",
    "prerequisiteIds": [
      "D06-05"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D07-01",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 1,
    "title": "AI로 생활정보 찾기",
    "levelMin": 1,
    "levelMax": 3,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 75,
    "tags": [
      "LIFE",
      "BASIC"
    ],
    "outcomes": "병원, 약국, 교통, 날씨, 정책정보 등 생활정보를 AI와 검색도구로 빠르게 찾을 수 있다.",
    "prerequisiteIds": [
      "D01-01"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D07-02",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 2,
    "title": "스마트폰 AI 활용과 디지털 안전",
    "levelMin": 1,
    "levelMax": 4,
    "durationHours": 2,
    "format": "실습",
    "practiceRatio": 75,
    "tags": [
      "LIFE",
      "BASIC"
    ],
    "outcomes": "음성입력, 번역, 사진검색, 일정관리 기능을 활용하고 피싱·가짜정보를 구분할 수 있다.",
    "prerequisiteIds": [
      "D01-01"
    ],
    "excludeWithIds": [],
    "isCore": true
  },
  {
    "id": "D07-03",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 3,
    "title": "AI로 여행·여가 계획 만들기",
    "levelMin": 1,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "LIFE"
    ],
    "outcomes": "여행지, 동선, 맛집, 예산, 준비물 정보를 정리한 1일 여행계획표를 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D07-04",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 4,
    "title": "AI로 건강·식단·장보기 관리",
    "levelMin": 1,
    "levelMax": 4,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 75,
    "tags": [
      "LIFE"
    ],
    "outcomes": "운동, 식단, 장보기 목록을 개인 상황에 맞게 정리한 생활관리 체크리스트를 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D07-05",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 5,
    "title": "AI로 메모·학습·독서 정리",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 80,
    "tags": [
      "LIFE",
      "BASIC"
    ],
    "outcomes": "메모, 강의자료, 독서 내용을 요약하고 복습용 질문과 학습노트를 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  },
  {
    "id": "D07-06",
    "domainId": "D07",
    "domainName": "지역주민 맞춤 교육 영역",
    "order": 6,
    "title": "AI로 팀 협업과 일정관리",
    "levelMin": 2,
    "levelMax": 5,
    "durationHours": 3,
    "format": "실습",
    "practiceRatio": 75,
    "tags": [
      "LIFE",
      "DOC"
    ],
    "outcomes": "회의 준비, 역할 분담, 일정표, 할 일 목록을 AI로 정리하여 팀 협업 자료를 만들 수 있다.",
    "prerequisiteIds": [
      "D01-03"
    ],
    "excludeWithIds": [],
    "isCore": false
  }
];

export const COURSE_MAP = new Map(COURSES.map((c) => [c.id, c]));

export function getCoursesByDomain(domainId: string): Course[] {
  return COURSES.filter((c) => c.domainId === domainId).sort(
    (a, b) => a.order - b.order
  );
}

/** 화면 표시용 영역 라벨 (D01 → 분야1) */
export function getDomainDisplayLabel(domain: Pick<Domain, "order">): string {
  return `분야${domain.order}`;
}
