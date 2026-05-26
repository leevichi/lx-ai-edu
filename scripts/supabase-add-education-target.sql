alter table public.applications
  add column if not exists education_target text not null default '';
