-- 수강인원·희망일 칸 추가 (기존 신청 데이터 유지)
alter table public.applications
  add column if not exists participant_count integer not null default 1,
  add column if not exists preferred_date date,
  add column if not exists date_flexible boolean not null default false;
