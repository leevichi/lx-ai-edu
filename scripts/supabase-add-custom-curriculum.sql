alter table public.applications
  add column if not exists custom_curriculum boolean not null default false;

alter table public.applications
  add column if not exists custom_curriculum_request text not null default '';
