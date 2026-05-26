# 교육 과목 카탈로그 (`lib/catalog.ts`)

`catalog.ts`는 `LX_교육과정_7영역_템플릿_v2_채움.xlsx` 기준으로 생성된 정적 데이터입니다.

## 수정 절차

1. 엑셀 템플릿에서 영역·과목 수정  
2. (프로젝트에 변환 스크립트가 있다면) 실행해 `lib/catalog.ts` 재생성  
3. `npm run build`로 타입·빌드 확인  
4. 홈 영역 그리드·신청 모달에 자동 반영 (`DOMAINS`, `COURSES`)

화면 표시용 영역 라벨은 DB ID(`D01`…)와 별도로 `getDomainDisplayLabel()` → **분야1~7** 을 사용합니다.

## 레거시 모듈

- `lib/engine.ts`, `lib/curriculum.ts` — 초기 프로토타입용. 신청 플로우는 `catalog.ts` + `curriculum-builder.ts` 를 사용합니다.
