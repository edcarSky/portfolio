-- Keep personal application records unavailable to anonymous Data API clients.
revoke all privileges on table public.job_documents, public.job_applications from anon;
grant select, insert, update, delete on table public.job_documents, public.job_applications to authenticated;
