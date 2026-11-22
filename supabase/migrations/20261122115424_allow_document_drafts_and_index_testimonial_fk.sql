alter table public.public_documents drop constraint if exists public_documents_document_type_key;
create unique index if not exists public_documents_one_published_per_type on public.public_documents(document_type) where is_published = true;
create index if not exists testimonials_inquiry_id_idx on public.testimonials(inquiry_id);
