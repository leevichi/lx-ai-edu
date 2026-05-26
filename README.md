# LX AI 교육 신청 플랫폼

한국국토정보공사 기관·지역 맞춤형 AI 교육 **희망 신청** 웹 애플리케이션 (Next.js 16).

## 로컬 실행

```bash
npm install
cp .env.example .env.local
# .env.local 에 Supabase·ADMIN_PASSWORD·연락처·알림 설정
npm run dev
```

- 홈: http://localhost:3000  
- 신청 STEP 1: `/apply/info`  
- 신청 STEP 2: `/apply`  
- 관리자: `/admin`  

## Supabase SQL (순서)

1. `scripts/supabase-setup.sql` — `applications` 테이블 생성  
2. 기존 DB에 칸 추가만: `scripts/supabase-add-status-privacy.sql`  
3. 주관식 칸 없을 때: `scripts/supabase-add-essay-columns.sql` (프로젝트에 있으면)

## 환경 변수

`.env.example` 참고.

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버 API 전용 |
| `ADMIN_PASSWORD` | `/admin` 로그인 |
| `NEXT_PUBLIC_LX_CONTACT_*` | 신청 완료·FAQ 연락처 |
| `NOTIFY_WEBHOOK_URL` | 신청 시 웹훅 (Slack 등) |
| `RESEND_API_KEY` + `NOTIFY_EMAIL_TO` | 신청 시 이메일 |

## 교육 과목 데이터

- 소스: `lib/catalog.ts` (엑셀 템플릿에서 생성)  
- 재생성 방법: `docs/CATALOG.md`  

## 스크립트

```bash
npm run lint
npm run build
npm test
```

## 배포

Vercel 등에 배포 시 `.env`에 위 변수를 동일하게 설정합니다. `public/hero/hero-title.png`·`public/education/*.jpg`는 저장소에 포함하거나 배포 후 업로드하세요.
