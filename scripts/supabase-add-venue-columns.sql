alter table public.applications
  add column if not exists venue_type text not null default '',
  add column if not exists venue_other text not null default '',
  add column if not exists env_student_pc boolean not null default false,
  add column if not exists env_instructor_pc boolean not null default false,
  add column if not exists env_projector boolean not null default false;
