-- 신청 상태·개인정보 동의 시각 (기존 applications 표에 추가)
alter table public.applications
  add column if not exists status text not null default 'received';

alter table public.applications
  add column if not exists privacy_agreed_at timestamptz;

create index if not exists applications_status_idx
  on public.applications (status);
