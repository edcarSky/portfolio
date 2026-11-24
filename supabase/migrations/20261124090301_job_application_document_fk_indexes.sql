-- Cover the two document foreign keys used by the application tracker.
create index if not exists job_applications_cv_document_id_idx on public.job_applications(cv_document_id);
create index if not exists job_applications_cover_letter_document_id_idx on public.job_applications(cover_letter_document_id);
