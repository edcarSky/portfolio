drop policy if exists "Public reads published documents" on public.public_documents;
create policy "Public reads published documents" on public.public_documents for select to anon using (is_published = true);
drop policy if exists "Owner manages documents" on public.public_documents;
create policy "Owner manages documents" on public.public_documents for all to authenticated
using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com')
with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');

drop policy if exists "Public reads approved testimonials" on public.testimonials;
create policy "Public reads approved testimonials" on public.testimonials for select to anon
using (status = 'approved' and publication_consent = true);
drop policy if exists "Owner manages testimonials" on public.testimonials;
create policy "Owner manages testimonials" on public.testimonials for all to authenticated
using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com')
with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');

drop policy if exists "Public reads profile photo setting" on public.site_settings;
create policy "Public reads profile photo setting" on public.site_settings for select to anon using (key = 'profile_photo');
drop policy if exists "Owner manages site settings" on public.site_settings;
create policy "Owner manages site settings" on public.site_settings for all to authenticated
using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com')
with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');

alter policy "Portfolio owner only inquiries select" on public.inquiries using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only inquiries update" on public.inquiries using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com') with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only inquiries delete" on public.inquiries using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only documents select" on public.public_documents using (is_published = true or ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only documents insert" on public.public_documents with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only documents update" on public.public_documents using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com') with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only documents delete" on public.public_documents using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only testimonials select" on public.testimonials using ((status = 'approved' and publication_consent = true) or ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only testimonials insert" on public.testimonials with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only testimonials update" on public.testimonials using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com') with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only testimonials delete" on public.testimonials using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only site settings select" on public.site_settings using (key = 'profile_photo' or ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only site settings insert" on public.site_settings with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only site settings update" on public.site_settings using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com') with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only site settings delete" on public.site_settings using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
alter policy "Portfolio owner only portfolio storage" on storage.objects
using (bucket_id not in ('portfolio-documents','portfolio-assets') or ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com')
with check (bucket_id not in ('portfolio-documents','portfolio-assets') or ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');
