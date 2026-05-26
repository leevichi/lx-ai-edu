-- applications 표 칸 이름이 코드와 다를 때 (Table Editor에서 직접 만든 경우)
-- SQL Editor에서 이 파일 전체 실행 → 기존 applications 데이터는 삭제됩니다 (비어 있으면 문제 없음)

drop table if exists public.applications;

create table public.applications (
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
  created_at timestamptz not null default now()
);

create index applications_created_at_idx on public.applications (created_at desc);

alter table public.applications enable row level security;
