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
