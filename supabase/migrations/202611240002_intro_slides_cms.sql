insert into public.site_content(content_key,section_name,field_label,content,max_chars) values
('slide_title_02','Intro Slide 2 · Professional','Slide heading','Lead. Support. Deliver.',90),
('slide_desc_02','Intro Slide 2 · Professional','Slide description','Executive administration, operations coordination, IT support and digital operations, backed by international work experience and a practical, service-focused approach.',300),
('slide_title_03','Intro Slide 3 · Content Creator','Slide heading','Create. Publish. Grow.',90),
('slide_desc_03','Intro Slide 3 · Content Creator','Slide description','A portfolio of creator projects, video production, social platforms, digital promotion programs and channel development work.',300),
('slide_title_04','Intro Slide 4 · Family','Slide heading','Family. Stories. Milestones.',90),
('slide_desc_04','Intro Slide 4 · Family','Slide description','A personal space for family memories, shared experiences and the Familia Thimawah journey, including our 100K YouTube Creator Award milestone.',300),
('slide_title_05','Intro Slide 5 · Team edcarSky','Slide heading','100% LEGIT, SAFE & ORGANIC.',90),
('slide_desc_05','Intro Slide 5 · Team edcarSky','Slide description','Since 2021, Team edcarSky has developed creator-support programs and organic digital promotion workflows, with milestones documented in its program terms.',300)
on conflict(content_key) do nothing;