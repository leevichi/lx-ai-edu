-- 이미 applications 표가 있을 때 주관식 칸만 추가 (기존 신청 데이터 유지)
alter table public.applications
  add column if not exists application_reason text not null default '',
  add column if not exists learning_focus text not null default '';
