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
