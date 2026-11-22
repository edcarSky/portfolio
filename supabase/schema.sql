-- EdcarSky Portfolio v3 Supabase schema
-- Run in Supabase SQL Editor. Create a Supabase project first.
-- Never expose the service_role key in frontend code.

create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) <= 120),
  company text check (char_length(company) <= 160),
  affiliation text check (char_length(affiliation) <= 120),
  email text not null check (char_length(email) <= 254),
  phone text check (char_length(phone) <= 40),
  inquiry_type text not null,
  message text not null check (char_length(message) <= 3000),
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewed','replied','archived'))
);

create table if not exists public.public_documents (
  id uuid primary key default gen_random_uuid(),
  document_type text not null check (document_type in ('cv','cover_letter')),
  display_name text not null,
  storage_path text not null,
  public_url text not null,
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);

create unique index if not exists public_documents_one_published_per_type on public.public_documents(document_type) where is_published = true;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid references public.inquiries(id) on delete set null,
  created_at timestamptz not null default now(),
  display_name text not null,
  affiliation text,
  company text,
  message text not null check (char_length(message) <= 1500),
  status text not null default 'pending' check (status in ('pending','approved','hidden')),
  publication_consent boolean not null default false
);

alter table public.inquiries enable row level security;
alter table public.public_documents enable row level security;
create index if not exists testimonials_inquiry_id_idx on public.testimonials(inquiry_id);

alter table public.testimonials enable row level security;

-- Public visitors can submit inquiries, but cannot read them.
create policy "Visitors submit inquiries" on public.inquiries
for insert to anon, authenticated
with check (consent = true);

-- Only authenticated owner/admin can read and manage inquiry records.
create policy "Owner reads inquiries" on public.inquiries
for select to authenticated using (true);
create policy "Owner updates inquiries" on public.inquiries
for update to authenticated using (true) with check (true);
create policy "Owner deletes inquiries" on public.inquiries
for delete to authenticated using (true);

-- Public can read published document metadata. Only authenticated owner can manage.
create policy "Public reads published documents" on public.public_documents
for select to anon, authenticated using (is_published = true);
create policy "Owner manages documents" on public.public_documents
for all to authenticated using (true) with check (true);

-- Public can read approved testimonials only. Owner manages all moderation.
create policy "Public reads approved testimonials" on public.testimonials
for select to anon, authenticated using (status = 'approved' and publication_consent = true);
create policy "Owner manages testimonials" on public.testimonials
for all to authenticated using (true) with check (true);

-- Storage bucket: public portfolio-documents, public read for published CV/cover letter.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-documents','portfolio-documents',true,15728640,array['application/pdf'])
on conflict (id) do update set public = true, file_size_limit = 15728640, allowed_mime_types = array['application/pdf'];

-- Authenticated admin can upload/update/delete files in this bucket.
create policy "Admin uploads portfolio PDFs" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio-documents');
create policy "Admin updates portfolio PDFs" on storage.objects
for update to authenticated using (bucket_id = 'portfolio-documents') with check (bucket_id = 'portfolio-documents');
create policy "Admin deletes portfolio PDFs" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio-documents');

-- NOTE: Restrict admin accounts in Supabase Auth. Disable public sign-ups after creating your own user.
-- IMPORTANT HARDENING: These authenticated policies assume only your own account is allowed to sign in.
-- For a production multi-user project, add an admin allowlist/role table and verify role in every policy.


-- Public profile photo setting, managed by the authenticated owner.
create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "Public reads profile photo setting" on public.site_settings
for select to anon, authenticated using (key = 'profile_photo');
create policy "Owner manages site settings" on public.site_settings
for all to authenticated using (true) with check (true);

-- Public image bucket for the owner-managed profile photo.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-assets','portfolio-assets',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=5242880,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
create policy "Admin uploads portfolio images" on storage.objects
for insert to authenticated with check (bucket_id='portfolio-assets');
create policy "Admin updates portfolio images" on storage.objects
for update to authenticated using (bucket_id='portfolio-assets') with check (bucket_id='portfolio-assets');
create policy "Admin deletes portfolio images" on storage.objects
for delete to authenticated using (bucket_id='portfolio-assets');

-- Restrict owner-only records and storage to the portfolio owner.
-- Keep public reads limited to published documents and consented approved testimonials.
create policy "Portfolio owner only inquiries select"
on public.inquiries as restrictive for select to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only inquiries update"
on public.inquiries as restrictive for update to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only inquiries delete"
on public.inquiries as restrictive for delete to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only documents select"
on public.public_documents as restrictive for select to authenticated
using (is_published = true or (select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only documents insert"
on public.public_documents as restrictive for insert to authenticated
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only documents update"
on public.public_documents as restrictive for update to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only documents delete"
on public.public_documents as restrictive for delete to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only testimonials select"
on public.testimonials as restrictive for select to authenticated
using ((status = 'approved' and publication_consent = true) or (select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only testimonials insert"
on public.testimonials as restrictive for insert to authenticated
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only testimonials update"
on public.testimonials as restrictive for update to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only testimonials delete"
on public.testimonials as restrictive for delete to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only site settings select"
on public.site_settings as restrictive for select to authenticated
using (key = 'profile_photo' or (select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only site settings insert"
on public.site_settings as restrictive for insert to authenticated
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only site settings update"
on public.site_settings as restrictive for update to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com')
with check ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only site settings delete"
on public.site_settings as restrictive for delete to authenticated
using ((select auth.jwt() ->> 'email') = 'edcarsky@gmail.com');

create policy "Portfolio owner only portfolio storage"
on storage.objects as restrictive for all to authenticated
using (
  bucket_id not in ('portfolio-documents', 'portfolio-assets')
  or (select auth.jwt() ->> 'email') = 'edcarsky@gmail.com'
)
with check (
  bucket_id not in ('portfolio-documents', 'portfolio-assets')
  or (select auth.jwt() ->> 'email') = 'edcarsky@gmail.com'
);

