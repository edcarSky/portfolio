-- edcarSky Job Search & Application Center
-- Public job discovery is served by a public Edge Function.
-- Personal documents and application records remain owner-private.

create table if not exists public.job_documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  label text not null check (char_length(label) between 1 and 140),
  document_type text not null check (document_type in ('cv','cover_letter','certificate','other')),
  storage_path text not null unique,
  original_filename text not null,
  mime_type text not null check (mime_type in ('application/pdf')),
  file_size bigint not null check (file_size > 0 and file_size <= 15728640),
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists job_documents_owner_type_idx
  on public.job_documents(owner_id, document_type, created_at desc);
create unique index if not exists job_documents_one_default_per_type
  on public.job_documents(owner_id, document_type) where is_default = true;

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  source text not null default 'remotive' check (char_length(source) <= 40),
  external_job_id text not null,
  job_title text not null check (char_length(job_title) between 1 and 240),
  company_name text not null check (char_length(company_name) between 1 and 200),
  job_location text,
  job_url text not null check (job_url ~ '^https://'),
  job_description text,
  salary text,
  employment_type text,
  status text not null default 'saved'
    check (status in ('saved','preparing','applied','interview','rejected','offer','closed')),
  applied_at timestamptz,
  cv_document_id uuid references public.job_documents(id) on delete set null,
  cover_letter_document_id uuid references public.job_documents(id) on delete set null,
  cover_letter_notes text check (cover_letter_notes is null or char_length(cover_letter_notes) <= 10000),
  private_notes text check (private_notes is null or char_length(private_notes) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id, source, external_job_id)
);

create index if not exists job_applications_owner_status_idx
  on public.job_applications(owner_id, status, updated_at desc);

alter table public.job_documents enable row level security;
alter table public.job_applications enable row level security;

grant select, insert, update, delete on public.job_documents to authenticated;
grant select, insert, update, delete on public.job_applications to authenticated;

drop policy if exists "Owners manage their job documents" on public.job_documents;
create policy "Owners manage their job documents"
on public.job_documents for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "Owners manage their job applications" on public.job_applications;
create policy "Owners manage their job applications"
on public.job_applications for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('job-application-private','job-application-private',false,15728640,array['application/pdf'])
on conflict (id) do update
set public = false, file_size_limit = 15728640, allowed_mime_types = array['application/pdf'];

drop policy if exists "Owners read their private job documents" on storage.objects;
create policy "Owners read their private job documents"
on storage.objects for select to authenticated
using (
  bucket_id = 'job-application-private'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Owners upload their private job documents" on storage.objects;
create policy "Owners upload their private job documents"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'job-application-private'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Owners update their private job documents" on storage.objects;
create policy "Owners update their private job documents"
on storage.objects for update to authenticated
using (
  bucket_id = 'job-application-private'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'job-application-private'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Owners delete their private job documents" on storage.objects;
create policy "Owners delete their private job documents"
on storage.objects for delete to authenticated
using (
  bucket_id = 'job-application-private'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
