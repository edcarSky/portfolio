-- Applied to Supabase project cslsyziwxpnmgbatebda on 2026-11-23.
-- Remove legacy permissive policies that allowed any authenticated user to access admin records/storage.
drop policy if exists "Owner reads inquiries" on public.inquiries;
drop policy if exists "Owner updates inquiries" on public.inquiries;
drop policy if exists "Owner deletes inquiries" on public.inquiries;
drop policy if exists "Admin uploads portfolio PDFs" on storage.objects;
drop policy if exists "Admin updates portfolio PDFs" on storage.objects;
drop policy if exists "Admin deletes portfolio PDFs" on storage.objects;
drop policy if exists "Admin uploads portfolio images" on storage.objects;
drop policy if exists "Admin updates portfolio images" on storage.objects;
drop policy if exists "Admin deletes portfolio images" on storage.objects;

-- Restore explicit owner-only permissive policies. Existing restrictive policies remain as defense in depth.
drop policy if exists "Portfolio owner manages inquiries" on public.inquiries;
create policy "Portfolio owner manages inquiries" on public.inquiries
for all to authenticated
using (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com')
with check (((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com');

drop policy if exists "Portfolio owner manages portfolio storage" on storage.objects;
create policy "Portfolio owner manages portfolio storage" on storage.objects
for all to authenticated
using (
  bucket_id in ('portfolio-documents', 'portfolio-assets')
  and ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com'
)
with check (
  bucket_id in ('portfolio-documents', 'portfolio-assets')
  and ((select auth.jwt()) ->> 'email') = 'edcarsky@gmail.com'
);
