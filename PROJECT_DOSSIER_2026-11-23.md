# edcarSky Portfolio Project Dossier
Updated: 26 November 2026
Repository: https://github.com/edcarSky/portfolio
Branch: main
Live site: https://edcarsky.github.io/portfolio/

## Latest change: Community section
Added a Community navigation item after My Journey and before Contact. Added a responsive Community section before Contact with:
- Brand statement: “100% LEGIT, SAFE & ORGANIC”.
- AA+ Programs overview: channel analytics review, topic opportunity, audience fit, title/thumbnail packaging, first 30 seconds, retention, engagement, satisfaction, traffic sources, new/returning viewers, SEO and promotion-readiness observations.
- SSP+ Programs overview: campaign planning for up to 30 selected videos, audience discovery, paid/organic distinction and post-promotion review.
- Anti-artificial-engagement statement: no bots, fake accounts, artificial views, subscribers, followers, watch time, likes, comments or engagement.
- Platform independence and limitations: no claim of official platform endorsement; no guaranteed reach, retention, revenue, watch hours, subscribers, followers or monetization approval.
- Team-reported historical milestones: 200+ monetized YouTube channels, 3,000+ channels assisted, approximately 500 active/former members, service since 2021. Clearly labeled as not independently audited and not guarantees.
- Links to YouTube, Facebook, TikTok, Instagram, Messenger and WhatsApp, plus selected program videos and Daily LIVE.

## Brand asset status
The exact owner-supplied red “edcarSky g! live” logo has not been recovered as an image file. The prior reference was https://prnt.sc/ITN3TEzNoex-, but the reference page was not retrievable in this session. The new Community section currently displays a large text brand lockup and explicitly labels it as a temporary text lockup, not the official logo. Do not mark the official logo requirement PASS until the original asset is installed. The repository tree has no logo/profile photo asset; assets/ contains only PUT_PROFILE_PHOTO_HERE.txt.

## Social links used
- YouTube: https://www.youtube.com/channel/UCoz2lfYpVjxYmBp2Z9MZ25g/
- Facebook: https://www.facebook.com/edcarSkyglive
- TikTok: https://www.tiktok.com/@edcarsky
- Instagram: https://www.instagram.com/edcarsky/
- Messenger: https://www.m.me/edcarSkyglive
- WhatsApp: https://wa.me/639177832874
- Daily LIVE: https://youtu.be/Lr1EhZJfoXM
- Team introduction: https://www.youtube.com/watch?v=JRnKG9kY1cI
- SSP+ program tactics: https://www.youtube.com/watch?v=XAaHeeI-HCg
- SSP+/APP+ overview: https://www.youtube.com/watch?v=sDT89IbMLt0

## Feature verification matrix
| Feature | Status | Evidence / limitation |
|---|---|---|
| Community nav item | PASS - source | index.html navigation contains #community between #journey and #contact. |
| Community section | PASS - source | index.html contains AA+, SSP+, policy, milestone, social and video blocks before Contact. |
| Responsive Community styling | PASS - source | styles.css includes desktop, tablet and mobile breakpoints. |
| Official red G Live logo | BLOCKED | Exact supplied logo image not in repo; temporary text lockup is not the official artwork. |
| Public social links | PASS - source | All six supplied links are present in Community section. Link destinations not independently tested by browser in this session. |
| AA+ / SSP+ claims | PASS - wording review | Describes analytics and promotion; avoids guarantees and false official-platform endorsement. |
| Team milestones | QUALIFIED | User-supplied/team-reported historic figures; clearly labeled unaudited, not guarantees. |
| CV and cover letter pages | PASS - source | cv.html and cover-letter.html exist; index links to them. Public browser rendering still needs verification. |
| Supabase CV/cover-letter PDF records | NOT PRESENT / NOT VERIFIED | No published PDF records/files were found in prior Supabase inspection. HTML pages are the current fallback, not uploaded PDFs. |
| Admin owner account | BLOCKED | No Auth user for edcarsky@gmail.com was found in prior check. Do not claim Admin login/upload works. |
| Supabase Storage upload | NOT TESTED | No owner-authenticated Admin upload session completed. |
| Contact form | BLOCKED | Supabase config/OAuth/database end-to-end submission not verified. Use WhatsApp, Messenger or email as current contact alternatives. |
| Google/Facebook OAuth | NOT TESTED | UI exists; provider credentials/callback and end-to-end login remain unverified. |
| TikTok/Instagram/X OAuth | UNAVAILABLE | UI indicates unsupported/disabled provider integrations. |
| Testimonials | PARTIAL | Code queries only approved rows with publication_consent=true; actual approved consented data and live carousel behavior not verified. |
| Visitor counter | NOT VERIFIED | GoatCounter TOTAL endpoint/configuration still needs live validation. |
| Main channel custom thumbnail | BLOCKED | No exact custom thumbnail asset in repository; current video card still uses existing thumbnail URL pattern. |
| Desktop/mobile browser QA | NOT TESTED | Source-level review only; no real browser screenshots or automated viewport tests in this session. |
| Live deployment | PENDING VERIFICATION | Previous deployment for commit 8fad24a succeeded. New Community commits require a fresh Actions run check. |
| Offline ZIP | NOT CREATED | Must be built from the exact latest deployed commit and checked before providing a download link. |

## Relevant historical program notes
- AA+ is documented as a 30-day analytics review framework.
- SSP+ is documented as promotion planning for up to 30 selected videos.
- Recorded package examples from 11 November 2026: 30 selected videos with 1,000 push units each at PHP 8,000, or 500 units each at PHP 5,000. These are campaign allocations, not guaranteed views, watch time, subscribers, followers or monetization.
- Historical internal performance claims include 200+ monetized channels, 3,000+ channels assisted, approximately 500 active/former members and service since 2021. These must always be labeled as team-reported unless independently documented.
- Individual reported results, including 10 consecutive months of monthly revenue and a channel case moving from zero revenue to organic earnings after promotion, must not be presented as typical or guaranteed outcomes.
- Program terms preserve that platforms control validation, retention, recommendations and monetization decisions.

## Latest source commits
- 28b7301235dbd70100c8b2e4ff99a1007f4d44da — Add Community section and official social links.
- 828c7d9cda2639f48ecae391afd7c39b2dd96bb1 — Style responsive Community section.

## Next verification actions
1. Check GitHub Pages Actions run for the latest commit and wait for success.
2. Verify the live homepage, navigation anchor, Community section and Contact anchor on desktop and mobile.
3. Recover the original official G Live logo image and install it as a large asset. Do not recreate or substitute it.
4. Test all social links and video destinations.
5. Finish Supabase owner Auth account setup through Supabase Authentication, then test Admin login, document upload, publish flow and public CV/cover-letter fallback.
6. Test inquiry submission, approved/consented testimonials, OAuth providers and GoatCounter.
7. Generate the offline ZIP from the exact deployed commit, inspect archive contents and verify the download path before sharing.


## Community copy revision — 23 November 2026, 06:10 UTC
The Community section was shortened into three scan-friendly teaser cards: AA+ Programs, SSP+ Programs, and Connect & Learn. Each card uses native expandable “Click for more” details, so the page shows a short SEO-friendly introduction first and reveals program details only when a visitor opens the disclosure. The top introduction now invites visitors to follow the community and directs questions to the automated AI assistant on the Facebook Page Messenger.

Messenger CTA: https://www.m.me/edcarSkyglive. The owner confirms the Facebook Page Messenger AI assistant is configured to answer inquiries. The page copy identifies it as the automated assistant, but end-to-end Messenger bot behavior was not tested in this source update.

Latest Community commits:
- b3d2607d88ed1af74ed899fcd9a852fffe738c81 — shorten Community copy and add expandable details plus Messenger AI CTA.
- 22e0c6dac59bfbfa44db514a66de5ba7e4cd4bb3 — compact card and responsive disclosure styling.

Verification: source fetched after update; confirmed three teaser cards, three native details/summary controls, Messenger CTA and social links. Browser interaction and mobile rendering remain NOT TESTED. Existing platform policy and no-guarantee qualifications remain inside expandable details and compact commitment note.

## Verification audit and visual sequence correction — 23 November 2026

### Section background sequence
- Corrected the Community outer section from dark to light so the page alternates consistently after the dark Documents section.
- Kept the Community brand panel dark as an intentional internal contrast.
- Updated the stylesheet cache token in index.html to styles.css?v=20261123-3.
- Source commits: 5352c2b8a70f4366dc5d74353e1769dfcb588aa4 (CSS), e29e202d2299ef0c382bfc1e3d9b4552876a0ed4 (HTML cache token).
- Latest Pages deployment run at audit time: 45122908731, in progress. Do not mark this visual correction live until the run completes successfully.

### Supabase verification
- Project cslsyziwxpnmgbatebda is ACTIVE_HEALTHY, PostgreSQL 17.
- Public tables present: inquiries, public_documents, testimonials, site_settings. RLS is enabled on all four.
- Storage buckets present: portfolio-documents (PDF, 15 MB limit) and portfolio-assets (JPG/PNG/WebP, 5 MB limit).
- Security advisor: no findings.
- Performance advisor: one INFO unused index on testimonials.inquiry_id_idx; one WARN multiple permissive INSERT policies on inquiries (visitor insert plus owner-management policy). This is a performance advisory, not a confirmed security exposure. Review policy consolidation separately.
- Database currently has zero inquiry, public_documents and testimonial rows. site_settings contains profile_photo but its value is empty.
- Auth query returned no owner user for edcarsky@gmail.com. Admin login is therefore not ready for owner use until the account is created/invited and sign-in is verified.

### Feature audit status
- Source present: hero, creator videos, professional profile, journey, social links, CV/cover-letter HTML pages, Community teaser cards with expandable details, Messenger AI CTA, inquiry form markup, testimonials host, GoatCounter counter hook, theme selector, admin dashboard UI, PDF upload code and profile-image upload code.
- Not end-to-end verified: GoatCounter counter display, external video thumbnails, contact form submission, Google/Facebook OAuth, testimonials carousel, admin login, document upload/publish, profile image upload, and responsive browser QA.
- CV and cover-letter fallback pages exist in repository. Supabase PDF records do not exist yet.
- Only placeholder asset currently exists under assets/: PUT_PROFILE_PHOTO_HERE.txt. No supplied profile photo, watermark, logo artwork or custom icon artwork has been added.
- The favicon is still the generic ET SVG; official profile/icon/logo artwork remains pending user upload.


## Live deployment and offline package update — 23 November 2026, 06:42 UTC

### User direction on Community background #7
- User clarified: if the red/touch-of-red treatment is already present, do not make another color change before the user has personally viewed the live site.
- Preserve the current Community/theme background styling pending the user's visual review. The existing Community brand panel already contains red accents (red glow, red brand text, and red-highlighted headings/labels). The theme-specific Community outer backgrounds remain the five light variants in styles.css.
- No additional red background change was made in this update. Do not describe background #7 as newly changed.

### Latest verified public deployment before this dossier update
- Main branch commit: 5b6df7d45e84e7c63bbdf0b44332024ee6c0780b.
- GitHub Pages run: 45125009149.
- Result: completed, conclusion success, 23 November 2026 06:35 UTC.
- This deployment includes the public contact address correction and Community theme-aware background/compact spacing changes.
- Public URL: https://edcarsky.github.io/portfolio/
- Browser visual QA remains NOT TESTED. User has not yet confirmed the rendered live appearance.

### Current user-requested package work
- Update this dossier to reflect the deployment and the user's instruction not to change red styling again until visual review.
- Prepare a fresh offline ZIP from the same latest source revision after dossier commit, verify archive integrity and record the exact commit SHA.
- Do not label the offline ZIP current until it is generated from the final updated repository revision and verified.


## Job Search & Application Center — 24 November 2026
Configuration selected by owner: worldwide coverage, public job discovery, hybrid application preparation and external apply links.

### Source and backend changes
- GitHub PR #1 merged into `main`; merge commit: `2d8153300c3a6db9d04e1a6231d3739d7b64aac9`.
- New public page: `job-search.html`, responsive stylesheet `jobs.css`, client logic `jobs.js`.
- Main portfolio navigation and owner Admin header link to the Job Search Center.
- Supabase Edge Function `jobs-search` is ACTIVE, version 2, with JWT verification disabled for public read-only search. It validates keyword input, fetches providers server-side, normalizes descriptions, validates HTTPS application URLs, deduplicates results and returns provider availability.
- Current API sources: Remotive worldwide remote listings, Arbeitnow Europe and Arbeitnow UK. Arbeitnow attribution links are displayed. The provider set does not represent all local/on-site vacancies worldwide.
- External search shortcuts: Google Jobs, LinkedIn, Indeed and Jooble.
- The public page never exposes CV files or application history. The owner-only area uses Supabase Auth and checks the owner email before showing private functions.

### Database and privacy
- Added `job_documents` and `job_applications`, both with RLS enabled and owner_id = auth.uid() policies.
- Added private Storage bucket `job-application-private`, 15 MB PDF limit, owner-folder policies for select/insert/update/delete.
- Revoked anon table privileges on both new tables. Verified authenticated SELECT grants remain and anon SELECT grants are false.
- Existing public CV record in `public_documents` was not changed. The Job Center includes an owner-only action to copy the published CV into the private application bucket.
- Existing public portfolio document bucket and profile assets were not modified.
- Migration versions: `20261124090149`, `20261124090250`, `20261124090301`, `20261124090458`.
- Security advisor after initial migration: no new table or storage policy findings; existing warning remains for leaked-password protection disabled. Performance advisor showed the existing inquiry multiple-permissive-policy warning plus two unindexed application-document foreign keys; indexes were added in migration `20261124090301`.

### Verification matrix
| Item | Status | Evidence |
|---|---|---|
| Existing GitHub repo audited | PASS | Source and project tree inspected on main. |
| Existing Supabase project | PASS | ACTIVE_HEALTHY, PostgreSQL 17. |
| New database tables | PASS | Both tables present with RLS enabled. |
| Anonymous table access | PASS | anon SELECT privilege false for both tables. |
| Private PDF bucket | PASS | Bucket exists, public=false, PDF-only, 15 MB. |
| Owner RLS policies | PASS | Policies verified against auth.uid() and owner folder prefix. |
| Edge Function deployment | PASS | jobs-search ACTIVE, version 2, verify_jwt=false. |
| Existing public CV preserved | PASS | Existing published CV row remains unchanged. |
| Existing CV import action | SOURCE ADDED | Browser upload/import still needs owner session test. |
| Live API responses in browser | NOT TESTED | Edge Function source/deployment verified; no browser invocation performed. |
| Owner login and PDF upload | NOT TESTED | Requires browser session and owner password. |
| Application save/status workflow | NOT TESTED | Requires browser end-to-end test. |
| GitHub Pages deployment | PASS | Pages build and deploy run `45361879058` completed successfully for merge commit `2d8153300c3a6db9d04e1a6231d3739d7b64aac9`. |
| Global onsite vacancy coverage | PARTIAL | Current live API coverage is worldwide remote plus Europe and UK regional listings. Add further providers for other local markets. |

Source is merged and the GitHub Pages deployment succeeded. Public browser rendering and owner-session workflows still need a direct device test. Do not claim exhaustive global onsite coverage or automatic submission to external employer systems.


## Follow-up repair — Job filters, header profile icon, slides and YouTube thumbnail (24 November 2026)
- Job Search Center now includes region selection for Southeast Asia, East Asia, South Asia, Middle East, Europe, North America, South America, Africa and Oceania.
- Added include-country, exclude-country, include-job-keyword and exclude-job-keyword filters. Multiple values are comma- or semicolon-separated.
- Filters operate on the provider results returned for the current search. The initial provider result pool is capped at 50 and still does not represent all local/onsite jobs worldwide.
- Fixed two literal escaped newline sequences in `jobs.js` that would otherwise cause a JavaScript parse error.
- Main homepage previously linked `slides.css` but did not load `slides.js`. Added the script, restoring the five-slide intro controller, auto-advance every six seconds, arrows, dots and touch swipe.
- Updated the creator slide's secondary CTA to open the user's main YouTube channel: `https://www.youtube.com/channel/UCoz2lfYpVjxYmBp2Z9MZ25g/`.
- Supabase `site_settings.profile_photo` contains a published profile image URL. Homepage now applies this image to the header icon, favicon/apple-touch icon and intro profile panels.
- The local featured thumbnail asset was missing from GitHub. Replaced it with the official YouTube thumbnail fallback for the existing featured video ID `3TjTSFc8TnQ`.
- Located the original composite brand upload in public Supabase Storage: `profile/1795471858442-icon_logo_profile_photo_bg_watermarks.jpg`. Added an Admin button to load that existing image into the cropper. Owner selects the desired target type and crop position, then publishes a separate 1:1 profile/logo/watermark or 16:9 background/video thumbnail.
- Current `site_settings` has `profile_photo` only. Separate Team logo, hero background, watermark and custom video thumbnail values are not yet published. The existing YouTube thumbnail is the safe fallback.
- Syntax validation passed for `jobs.js`, `app.js`, `slides.js` and `admin.js`. Latest GitHub Pages deployment is pending verification.


## Full project dossier update — 26 November 2026

This section is the current status authority for changes and checks completed after the earlier 23–24 November entries. Older entries below remain as historical records; where an earlier status conflicts with this update, use the newer status here.

### 1. Homepage structure and brand presentation

- The homepage uses the main sections Creator, Professional, My Journey, Community, Find Me Online, Contact and Professional Feedback, with the five-slide hero controller loaded from slides.js.
- Hero slide controller: source present. It supports automatic slide changes, previous/next controls, dots and touch gestures. The YouTube CTA points to the main edcarSky channel.
- Main brand line: “100% LEGIT, SAFE & ORGANIC”.
- The official edcarSky g! live artwork is now present in the repository at assets/edcarsky-glive-logo.webp. This supersedes the earlier note that only a temporary text lockup was available.
- The profile image is present at assets/edcar-profile.webp. The channel thumbnail asset is present at assets/channel-thumbnail.webp.
- Profile watermark styling is applied to both Professional and Find Me Online sections, positioned on the left with low opacity. Source confirms the CSS selectors and asset reference. Final appearance still requires browser QA.
- The YouTube thumbnail uses a contain treatment to preserve the full supplied image and text. Source styling disables hover zoom for the channel thumbnail. Browser rendering still requires visual confirmation.

### 2. Section 05 — FIND ME ONLINE

Heading and subtitle:
“Different platforms. One connected story.”

Five social icons are arranged in one row on desktop and retained in a five-icon compact row on mobile:
1. YouTube — https://www.youtube.com/channel/UCoz2lfYpVjxYmBp2Z9MZ25g/
2. Facebook — https://www.facebook.com/edcarSkyglive
3. TikTok — https://www.tiktok.com/@edcarsky
4. Instagram — https://www.instagram.com/edcarsky/
5. X — https://x.com/edcarSky

Source verification on 26 November confirms five social icon elements and five-column CSS rules at desktop and mobile breakpoints. The latest CSS deployment still needs Pages completion and browser visual QA.

### 3. Section 09 — PROFESSIONAL FEEDBACK

The section is designed as a two-column desktop layout:
- Left: “09 / PROFESSIONAL FEEDBACK”, “Words from people I've worked with.” and the introduction.
- Right: one testimonial card at a time.

The introduction now reads:
“Read professional feedback here without leaving this portfolio. Select a testimonial to open the full comment in a popup.”

Interaction added:
- Selecting the testimonial card opens the existing modal and displays the stored comment, author, role/company and date where available.
- Keyboard Enter and Space activate the card.
- Escape, the close button and the modal backdrop close the popup.
- Automatic rotation remains randomized every 5–7 seconds and resumes after the popup closes.
- Pause rotation, Resume rotation, Next recommendation and the LinkedIn source link remain available.
- Mobile layout stacks the introduction above the testimonial card.

Data source and accuracy:
- The renderer reads visible LinkedIn recommendation archive entries from testimonials.json and approved website testimonials only when publication_consent=true.
- Entries marked truncated are explicitly labelled as excerpts. The popup displays the complete text stored in the portfolio archive, but it does not turn an archived excerpt into the full original LinkedIn recommendation.
- The Supabase site_content row testimonial_intro was checked and already contains the requested new introduction. Static HTML was updated to match it.

Source verification completed:
- index.html contains the requested introduction and modal fields.
- app.js contains card click and keyboard activation, modal population, close handlers and rotation-resume event.
- styles.css contains the desktop two-column layout and mobile stacked breakpoint.
- Browser interaction and rendered layout remain pending until the Pages deployment and visual QA complete.

Latest Section 09 commits:
- 6327d0bb92ef0296e6dfb8750667151544495ae9 — update Professional Feedback introduction.
- 577103a9723672f8d72df2736ef1d219a4cf64ca — fix two-column layout and modal card styling.
- 812d533339f2ffe48085786820789a9258785093 — resume rotation after popup closes and refine card accessibility.

### 4. Community and creator services

The Community section now presents Team edcarSky as an organic creator-support service across YouTube, Facebook, TikTok and other digital platforms.

Program copy includes:
- AA+: proprietary analytics and channel-activation framework, channel diagnostics, audience and content performance review, SEO, retention and genuine activity signals.
- SSP+: organic promotion and social distribution support.
- APP+: application-based creator tools and program features.
- Free monetization assistance and channel-readiness guidance.
- Organic subscriber and watch-hour support through genuine audience development.
- Support for demonetized channel recovery, including the user-stated 100+ channels fixed/recovered in 2026.

Milestones supplied by the owner:
- Service since 2021, five years continuous service.
- 200+ YouTube channels monetized.
- 3,000+ channels assisted through monetization and organic growth programs.
- Approximately 500 active and former Team edcarSky members.
- 100+ demonetized channels fixed/recovered in 2026.

These are owner/team-supplied historical achievements, not independently audited figures. Website copy avoids guarantees of monetization, revenue, reach, ranking or platform approval. The Tagalog “mumu services” note remains a separate warning against cheap artificial or untrusted engagement services.

### 5. Job Search & Application Center

Current source and backend:
- job-search.html, jobs.css and jobs.js are present.
- Supabase Edge Function jobs-search is ACTIVE, version 2, public read-only search.
- Current provider coverage includes worldwide remote listings through Remotive and regional Europe/UK listings through Arbeitnow, plus external search shortcuts.
- Region filters, include/exclude country and job-keyword filters, external application links and owner-only application tracking are included in source.
- Private job documents and application records use RLS and owner-folder storage policies as documented in the 24 November section.

Outstanding owner correction:
- Default search is worldwide when the user leaves location and region filters blank.
- Results use a compact list/detail layout, with a compact vertical list on the left and selected job details on the right on desktop; mobile stacks the list and details.
- Initial visible count is 10. The More results control reveals the next 10 listings.
- Source inspection on 26 November confirms these acceptance criteria are implemented. Mark as SOURCE VERIFIED; desktop/mobile browser QA remains pending.
- Do not claim complete worldwide on-site coverage. Provider coverage is not every country or local job board.

### 6. Supabase and owner administration

- Supabase project: edcarsky-portfolio, project ref cslsyziwxpnmgbatebda, Singapore region, PostgreSQL 17.
- Existing Edge Functions include ats-cv-assistant and jobs-search. jobs-search is confirmed ACTIVE, version 2.
- The owner account was subsequently created after the earlier “No owner account yet” screen. This is based on the owner's confirmation. A successful fresh login and full admin session still require browser testing.
- Admin source includes owner authentication, document upload and profile image upload paths. These functions are not marked operational until an owner login, upload, publish and public-download test completes.
- Storage assets and public document publication require a full owner-session test.
- Keep service-role/secret keys server-side. Never commit Gemini or Supabase secret keys to GitHub or public browser JavaScript.
- Gemini portfolio assistant integration is deferred until the owner resumes the API setup. It is not marked complete.

### 7. Current feature status matrix

| Feature | Current status | Evidence / next action |
|---|---|---|
| Homepage section structure | SOURCE VERIFIED | Inspect live layout after deployment. |
| Five-slide hero | SOURCE PRESENT | Confirm slide behavior in browser. |
| Official g! live logo asset | SOURCE VERIFIED | assets/edcarsky-glive-logo.webp exists and is referenced by the Community section. |
| Profile photo asset | SOURCE VERIFIED | assets/edcar-profile.webp exists. |
| Channel thumbnail asset | SOURCE VERIFIED | assets/channel-thumbnail.webp exists. |
| Professional watermark | SOURCE VERIFIED | CSS applies profile image watermark to Professional and Find Me Online. |
| Section 05 five social icons | SOURCE VERIFIED | Five icons and five-column desktop/mobile rules confirmed. |
| Section 09 left/right layout | SOURCE VERIFIED | Two-column desktop grid; stacked mobile layout. |
| Section 09 popup | SOURCE VERIFIED | Card click, keyboard activation, modal fields and close handlers confirmed. |
| Testimonial rotation | SOURCE VERIFIED | 5–7 second randomized rotation; pause/next controls retained; resume after close added. |
| Testimonial original completeness | PARTIAL | Archive excerpts remain labelled as excerpts; source archive needs complete text if the full original is required. |
| Community service copy | SOURCE + CMS VERIFIED | HTML and Supabase testimonial intro CMS row checked; Community intro CMS copy updated in earlier work. |
| Job Search worldwide default | SOURCE PRESENT | Backend provider coverage is limited to connected sources. |
| Job Search compact list/detail view | SOURCE VERIFIED | Compact list, desktop detail pane, mobile stacking; browser QA pending. |
| Job Search minimum 10 initial results | SOURCE VERIFIED | visibleCount starts at 10; More increments by 10; browser QA pending. |
| Job Search region and exclude filters | SOURCE PRESENT | Browser test required. |
| Owner Auth | ACCOUNT CREATED, LOGIN TEST PENDING | Owner confirmation; perform fresh login test. |
| Admin uploads and publishing | PENDING | Complete authenticated upload and public download test. |
| Contact form | PENDING END-TO-END TEST | Test inquiry insert, privacy and owner notification flow. |
| OAuth providers | NOT VERIFIED | Provider credentials and callback tests remain open. |
| Visitor counter | NOT VERIFIED | Confirm GoatCounter/API count in live browser. |
| ATS CV assistant | DEPLOYED SOURCE / FUNCTION PRESENT | Validate current ATS output against a current ATS-readable CV and job description. |
| Gemini portfolio assistant | DEFERRED | Owner will resume API setup later. |
| Desktop/mobile visual QA | PENDING | Inspect actual deployed site at desktop and mobile widths. |
| GitHub Pages deployment for 26 Nov changes | PENDING | Latest workflow runs are queued/in progress; do not call these changes live until a successful run is confirmed. |
| Offline ZIP | PENDING | Build from the exact successful deployed commit, inspect ZIP integrity and verify the final file path before sharing. |

### 8. Latest GitHub source commits

Section 05 / Find Me Online:
- cf92ef4eef0248e1d74dbf64cb160cd0d679a640 — add X social link.
- 9314dc317ee69351ec94ea275bfbc4e22cabca56 — fit five social platform icons in one responsive row.

Section 09 / Professional Feedback:
- 6327d0bb92ef0296e6dfb8750667151544495ae9 — update feedback introduction.
- 577103a9723672f8d72df2736ef1d219a4cf64ca — desktop two-column layout, mobile stacking and selectable card styling.
- 812d533339f2ffe48085786820789a9258785093 — accessible popup activation and rotation resume behavior.

### 9. Deployment and next execution order

At the time of this update, GitHub Actions shows:
- run 45709523783 for app.js commit 812d533339f2ffe48085786820789a9258785093: queued.
- run 45709484791 for CSS commit 577103a9723672f8d72df2736ef1d219a4cf64ca: in progress.
- Earlier social CSS deployment run 45708942898 completed successfully for commit 9314dc317ee69351ec94ea275bfbc4e22cabca56.

Required next actions:
1. Re-check Actions until the newest Pages deployment completes successfully.
2. Verify the live Section 05 five-icon row and Section 09 desktop left/right layout, popup, close behavior and mobile stacking.
3. Fix Job Search compact-only presentation and ensure at least 10 initial results with a working More control.
4. Run owner login, admin upload/publish, contact form, testimonials and visitor counter end-to-end tests.
5. Resume Gemini integration only when the owner supplies/authorizes the required API setup.
6. Build the offline ZIP from the exact deployed commit and verify its integrity before sharing.

Do not claim a live update, working admin, complete testimonial source text, full worldwide vacancy coverage or a verified offline package until each item has its own evidence.


### Cache refresh after Section 09 interaction update — 26 November 2026
- Updated homepage asset references to styles.css?v=20261126-6 and app.js?v=20261126-3 so returning visitors request the updated two-column layout and popup interaction rather than stale cached files.
- Source commit: 6b8ba08fdb73dd4308516cf2f334bd843de2817d.
- GitHub Pages deployment for this cache refresh is queued/pending; live behavior remains unverified.


## Deployment confirmation and cross-device requirement — 26 November 2026, 08:16 PHT

### Live deployment
- GitHub Pages workflow run: 45709644132.
- Deployment commit: 610a4f824cdbd17b2583dd657a254f1a7ea04e60.
- Workflow result: completed successfully.
- Build job: success.
- Upload artifact: success.
- Deploy to GitHub Pages: success.
- This confirms the Section 05 social link/layout, Section 09 introduction, two-column desktop styling, mobile stacking, popup interaction and cache references were included in the successful Pages deployment.
- Public URL: https://edcarsky.github.io/portfolio/index.html
- Source and Pages deployment are confirmed. Independent visual inspection of the public page was not completed in this session because the live URL could not be fetched through the available browser/network path. Do not confuse a successful Pages workflow with a completed visual QA pass.

### Mandatory desktop + mobile quality standard
Effective immediately, every portfolio change must be reviewed for both desktop and mobile before it is marked complete. This applies to all public sections, Admin, Job Search & Application Center, CV and cover letter pages, forms, cards, menus, modals, image crops, icon rows, tables, and interactive controls.

Minimum QA checks:
1. Desktop: wide viewport layout, readable hierarchy, spacing, alignment, image sizing/cropping, no overflow, correct columns and hover/focus behavior.
2. Mobile: narrow viewport layout, readable font sizes, no horizontal scrolling, no clipped text, touch-friendly controls, correct stacking, image scaling and no overlapping fixed/watermark elements.
3. Interaction parity: navigation, links, forms, modal open/close, keyboard behavior, carousel controls and pagination/load-more behavior.
4. Content parity: no hidden text, broken assets, clipped labels, duplicated logos or CMS-overwritten copy.
5. Regression: recheck adjacent sections and page navigation after CSS/HTML changes.
6. Evidence: record viewport sizes and test results. Mark a feature “Working” only after source review and desktop/mobile browser verification. If browser verification is unavailable, use “Source verified; visual QA pending.”

### Status update
- Section 05 / Find Me Online: source verified and included in successful Pages deployment. Five icons: YouTube, Facebook, TikTok, Instagram and X.
- Section 09 / Professional Feedback: source verified and included in successful Pages deployment. Two-column desktop layout, stacked mobile layout, full stored comment popup, keyboard activation and rotation resume logic.
- GitHub Pages deployment for commit 610a4f824cdbd17f8d72df2736ef1d219a4cf64ca: SUCCESS. (Use the exact run head SHA shown by GitHub Actions: 610a4f824cdbd17e6dfb8750667151544495ae9.)
- Live browser visual QA: PENDING.
- Offline ZIP: PENDING.
- Job Search compact-only layout and minimum 10 initial results: OPEN / NEXT; source inspection did not establish these acceptance criteria as met.


### Job Search acceptance criteria source verification — 26 November 2026
- jobs.js initializes visibleCount = 10.
- The search request asks jobs-search for up to 50 listings.
- applyFilters() resets visibleCount to 10.
- renderJobs() renders jobs.slice(0, visibleCount).
- More results increments visibleCount by 10.
- Default location and region filters are blank; search sends location: "" and the UI message states worldwide results by default.
- jobs.css renders a compact vertical list and adjacent detail panel on desktop, with a single-column stacked layout at the mobile breakpoint.
- Include/exclude country, region, include keyword and exclude keyword filters are present.
- Status: SOURCE VERIFIED. Browser test for actual result count, provider response, desktop rendering and mobile stacking remains PENDING.
