-- EdcarSky portfolio CMS and privacy-conscious visitor analytics
create table if not exists public.site_content (
  content_key text primary key,
  section_name text not null,
  field_label text not null,
  content text not null default '',
  max_chars integer not null default 500 check (max_chars between 1 and 5000),
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
create policy "Public reads site content" on public.site_content for select to anon, authenticated using (true);
create policy "Owner manages site content" on public.site_content for all to authenticated
using (((select auth.jwt())->>'email')='edcarsky@gmail.com')
with check (((select auth.jwt())->>'email')='edcarsky@gmail.com');

create table if not exists public.visitor_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id uuid not null,
  page_path text not null,
  referrer text,
  user_agent text,
  event_type text not null default 'page_view' check (event_type in ('page_view','account_connected','consent_updated'))
);
alter table public.visitor_events enable row level security;
grant insert on public.visitor_events to anon, authenticated;
grant select on public.visitor_events to authenticated;
create policy "Visitors log page views" on public.visitor_events for insert to anon, authenticated
with check (event_type in ('page_view','account_connected','consent_updated'));
create policy "Owner reads visitor events" on public.visitor_events for select to authenticated
using (((select auth.jwt())->>'email')='edcarsky@gmail.com');
create index if not exists visitor_events_created_at_idx on public.visitor_events(created_at desc);
create index if not exists visitor_events_visitor_id_idx on public.visitor_events(visitor_id);

drop policy if exists "Public reads profile photo setting" on public.site_settings;
drop policy if exists "Portfolio owner only site settings select" on public.site_settings;
create policy "Public reads published portfolio asset settings" on public.site_settings
for select to anon, authenticated using (key in ('profile_photo','asset_team_logo','asset_hero_background','asset_watermark','asset_video_thumbnail'));
create policy "Portfolio owner only site settings select" on public.site_settings as restrictive
for select to anon, authenticated using (
 (key in ('profile_photo','asset_team_logo','asset_hero_background','asset_watermark','asset_video_thumbnail'))
 or ((select auth.jwt())->>'email')='edcarsky@gmail.com'
);

insert into public.site_content(content_key,section_name,field_label,content,max_chars) values
('hero_title','Welcome','Main heading','Work. Create. Connect.',80),
('hero_description','Welcome','Introduction','Professional operations, technology, digital content and family stories.',240),
('professional_intro','Professional','Section introduction','Over 20 years of combined overseas and local experience, including approximately 15 years working in Riyadh, Saudi Arabia.',300),
('creator_intro','Creator','Section introduction','Promotional videos, digital projects and moments from the channels I manage.',300),
('journey_intro','My Journey','Section introduction','A record of the lessons, places, people, family milestones and creative projects that shape my journey.',300),
('team_intro','Team edcarSky','Section introduction','Creator support, digital promotion and program development built around organic participation and platform-policy awareness.',300),
('contact_intro','Contact','Section introduction','Have a role, project, idea or useful feedback? Share the opportunity or question you want to discuss.',300),
('social_intro','Social Channels','Section introduction','My online presence grew from years of sharing work, learning new tools, building creator communities and documenting family milestones.',400),
('documents_intro','Documents','Section introduction','Review my updated professional CV and general cover letter. Open either document online, then use Print / Save as PDF to keep a copy.',350),
('community_intro','Community','Section introduction','Join creators and channel owners who value real audiences, useful analytics and responsible video promotion.',350),
('testimonial_intro','Testimonials','Section introduction','Read professional feedback here without leaving this portfolio. Select a testimonial to open the full comment in a popup.',300),
('footer_tagline','Footer','Tagline','Professional portfolio · Digital creator · Family storyteller',120)
on conflict(content_key) do nothing;
