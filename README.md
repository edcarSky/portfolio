# edcarSky™ Portfolio

Live site: https://edcarsky.github.io/portfolio/
Repository: https://github.com/edcarSky/portfolio
Analytics: https://edcarsky.goatcounter.com/

## Architecture
- Static frontend: HTML, CSS and vanilla JavaScript, hosted with GitHub Pages.
- Backend: Supabase Auth, PostgreSQL, Row Level Security and Storage.
- Analytics: GoatCounter.
- Main branch: main.

## Intro deck update (23 November 2026)
The opening hero now uses a five-part responsive introduction:
1. Welcome / personal brand.
2. Professional profile.
3. Digital content creator.
4. Family and Familia Thimawah.
5. Team edcarSky.

The deck supports previous/next controls, numbered slide navigation, keyboard arrows and touch swipe. Existing professional, creator, journey, social, document, inquiry and testimonial sections remain in the page.

## Team edcarSky figures
The Team section uses the figures recorded in the August 2026 Team edcarSky program terms: 200+ monetized YouTube channels, 3,000+ channels assisted, nearly 500 active and former members, and five years of service since 2021. These are program-reported figures, not independently audited results. The source says nearly 500 active and former members, not 500+ active clients. No monetization approval, revenue or platform outcome is guaranteed.

## Supabase
Project ref: cslsyziwxpnmgbatebda
Project URL: https://cslsyziwxpnmgbatebda.supabase.co

Frontend config.js contains only the publishable browser key. Never add service_role or secret keys to the repository.

The database security hardening applied on 23 November 2026 removes legacy broad authenticated-user policies for inquiries and portfolio storage and restores owner-only policies for edcarsky@gmail.com. The SQL runbook is in supabase/security-hardening-2026-11-23.sql. RLS and security advisor checks were reviewed after the change.

## Owner admin
Open /admin.html. Owner account email enforced by database policies: edcarsky@gmail.com.
The owner still needs to verify sign-in, upload a profile photo, upload and publish the CV/cover letter, and add consented testimonials. Do not treat an existing dashboard UI as proof these operations have passed an end-to-end test.

## Local preview
Serve the repository root with a local HTTP server, for example:
python -m http.server 8000
Then open http://localhost:8000/portfolio/ or the local root path as appropriate.

## Deployment verification
A GitHub commit confirms source was written to main. It does not, by itself, prove that GitHub Pages completed deployment or that Supabase, OAuth, GoatCounter, external video thumbnails and uploads work on the public site. Verify each integration separately.


## Job Search & Application Center (24 November 2026)
- Public search page: `job-search.html`, linked from the main navigation and owner dashboard.
- Live providers: Remotive (worldwide remote vacancies), Arbeitnow Europe and Arbeitnow UK. Coverage depends on each provider's inventory; it is not a complete index of every country's onsite jobs.
- External search shortcuts: Google Jobs, LinkedIn, Indeed and Jooble. Applications on external platforms remain subject to their own accounts and application steps.
- Supabase Edge Function: `jobs-search`, public read-only search endpoint. No third-party API secret is stored in browser code.
- Private tables: `job_documents` and `job_applications`, with RLS ownership checks and restrictive owner-email checks for `edcarsky@gmail.com`. Anonymous role has no table privileges.
- Private PDF bucket: `job-application-private`, private, 15 MB PDF limit, storage paths begin with the authenticated owner UUID.
- The existing published CV record remains unchanged in `public_documents`. The Job Center includes an owner-only action to copy it into the private application library.
- Application records store job details, source URL, selected CV/cover letter references, notes and status. The owner must submit applications on the employer's original website unless that employer offers an authorized integration.
- Owner access is restricted in the UI to `edcarsky@gmail.com`; database RLS is keyed to `auth.uid()`.
- Browser end-to-end search, sign-in, private upload and application-save tests are still required before marking the feature fully verified.
