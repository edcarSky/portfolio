# edcarSky Portfolio Project Dossier
Updated: 23 November 2026, 06:05 UTC
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
