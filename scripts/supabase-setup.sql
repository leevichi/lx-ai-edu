-- Supabase 대시보드 → SQL Editor → New query → 전체 붙여넣기 → Run
-- (기존에 만든 '신청목록' 표와 별개로, 코드가 쓰는 표 이름은 applications 입니다)
--
-- ⚠️ Table Editor에서 applications 를 직접 만든 적이 있으면
--    create table if not exists 는 칸을 고쳐 주지 않습니다.
--    그때는 supabase-reset-applications.sql 을 실행하세요.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  agency text not null default '',
  contact_name text not null default '',
  contact_phone text not null default '',
  participant_count integer not null default 1,
  education_target text not null default '',
  preferred_date date,
  date_flexible boolean not null default false,
  venue_type text not null default '',
  venue_other text not null default '',
  env_student_pc boolean not null default false,
  env_instructor_pc boolean not null default false,
  env_projector boolean not null default false,
  ai_level integer not null,
  course_ids text[] not null default '{}',
  courses jsonb not null default '[]'::jsonb,
  auto_added_ids text[] not null default '{}',
  total_hours integer not null default 0,
  application_reason text not null default '',
  learning_focus text not null default '',
  status text not null default 'received',
  privacy_agreed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

alter table public.applications enable row level security;

-- 브라우저(anon)에서 표를 직접 읽거나 쓰지 못하게 막음 → API(서버)만 service_role로 접근
