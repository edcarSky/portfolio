-- Restrict private job records and files to the portfolio owner account.
drop policy if exists "Portfolio owner only job documents" on public.job_documents;
create policy "Portfolio owner only job documents"
on public.job_documents as restrictive for all to authenticated
using (
  owner_id = (select auth.uid())
  and ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
)
with check (
  owner_id = (select auth.uid())
  and ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
);

drop policy if exists "Portfolio owner only job applications" on public.job_applications;
create policy "Portfolio owner only job applications"
on public.job_applications as restrictive for all to authenticated
using (
  owner_id = (select auth.uid())
  and ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
)
with check (
  owner_id = (select auth.uid())
  and ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
);

drop policy if exists "Portfolio owner only private job storage" on storage.objects;
create policy "Portfolio owner only private job storage"
on storage.objects as restrictive for all to authenticated
using (
  bucket_id <> 'job-application-private'
  or (
    ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
)
with check (
  bucket_id <> 'job-application-private'
  or (
    ((select auth.jwt())->>'email') = 'edcarsky@gmail.com'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
);
