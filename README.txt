EDCARSKY™ PERSONAL & PROFESSIONAL PORTFOLIO — VERSION 3.1

WHAT'S INCLUDED
- Responsive hybrid creator + corporate portfolio.
- Five supplied featured YouTube videos plus family vlog channel.
- Facebook, TikTok, Instagram and YouTube links.
- WhatsApp click-to-chat and Facebook Messenger links.
- Professional profile, journey and skill sections.
- CV and general cover letter public viewer/download links.
- Owner dashboard at /admin.html for PDF publishing and profile photo upload.
- Private employer/client inquiry form and owner inbox.
- Testimonial moderation. Public testimonials require approval and publication consent.
- Privacy notice template.
- Supabase SQL schema and frontend configuration template.
- GoatCounter visitor tracking and visitor-count display integration.
- Five formal color themes with a footer refresh control.

VERSION 3.1 UPDATE STATUS
The source files include the requested frontend changes. Supabase-backed uploads and sign-in still require the owner's own Supabase project URL, anon key, SQL setup, and owner account. GoatCounter's visible visitor count also requires the site's GoatCounter setting "Allow adding visitor counts on your website" to be enabled. The visitor counter uses GoatCounter's visit_count integration. The theme selector works locally in the visitor's browser and stores the selected theme there.

IMPORTANT STATUS
The static website is built. The private dashboard and inquiry inbox become operational only after you create and configure a Supabase project, run the SQL, create your owner login, and add the project URL and anon key to config.js. No account credentials are included. Do not put a Supabase service_role key in the website.

FREE DEPLOYMENT OPTION: GITHUB PAGES
1. Extract this ZIP.
2. Create/open your GitHub repository.
3. Upload all files and folders to the repository root, preserving the supabase folder.
4. Open Settings > Pages.
5. Select Deploy from a branch, branch main, folder /(root), Save.
6. Wait for GitHub Pages to publish the site.
7. Your site URL will be shown in the Pages settings.

BACKEND SETUP: SUPABASE FREE TIER
1. Create a project at https://supabase.com/
2. Open SQL Editor and run supabase/schema.sql.
3. Go to Authentication > Providers / Sign-in settings. Create your owner user through the dashboard or invite flow. Do not enable public signups for visitors.
4. In Authentication settings, turn off public sign-ups after creating your owner account. Use a strong unique password and MFA if available.
5. Open Project Settings > API. Copy Project URL and anon/public key only.
6. Paste them into config.js:
   SUPABASE_URL: "https://YOURPROJECT.supabase.co"
   SUPABASE_ANON_KEY: "YOUR_ANON_PUBLIC_KEY"
7. Commit config.js to GitHub. The anon key is intended for browser use; Row Level Security policies protect records. Never publish service_role/secret keys.
8. Open https://YOUR-SITE/admin.html and sign in with your owner account.
9. Upload your CV and general cover letter as PDFs. They will be published to the public document area.
10. Submit a test inquiry from the public website and confirm it appears only in the private admin inbox.

SECURITY AND PRIVACY CHECKLIST
- Disable public signups. Only your own account should be able to authenticate.
- Enable MFA if available.
- Keep the service_role key private and out of GitHub.
- Review RLS policies before collecting real personal information.
- The supplied SQL grants authenticated users broad owner-like management access. This is safe only when public signups are disabled and only your account is authorized. For a team admin, add explicit admin roles and stricter policies.
- CV and cover letter PDFs are public once published. Remove personal details you do not want public.
- Inquiries are private; visitors have insert-only access and cannot read submissions.
- Testimonials stay pending/hidden until you approve them. Get explicit permission before publishing identifying information or a quotation.
- The privacy notice is a starter template. Complete the service-provider details, retention period and contact procedure. Review compliance with RA 10173 and its IRR before going live.
- A static GitHub Pages site cannot keep administrator credentials secret or process uploads itself. Supabase provides the authentication, database and storage backend.

DOCUMENT UPLOAD BEHAVIOR
Upload a new PDF in the admin dashboard. The public document record is replaced and the public link changes to the new file. Old files are not automatically deleted; review them in Supabase Storage and remove them when no longer needed.

PROFILE PHOTO
The homepage currently uses an initials placeholder. To add a photo, upload a square image such as assets/profile.jpg, then edit the heroPhoto element in index.html to use:
<img src="assets/profile.jpg" alt="Edcar Aguirre Tenedero">
Do not upload private or sensitive images.

CONTENT ACCURACY
Review career titles, dates, education and skills against your latest CV before publishing. The site intentionally avoids inventing employment details or performance statistics. Add exact verified details and social analytics only when ready.

AI PROMPT FOR FUTURE DEVELOPMENT
"Upgrade this existing EdcarSky v3 portfolio without removing any supplied YouTube, Facebook, TikTok, Instagram, WhatsApp or Messenger links. Preserve the hybrid premium editorial design, responsive behavior, accessible navigation, and all existing page sections. Keep GitHub Pages as the static frontend and Supabase as backend. Never expose service_role keys or admin credentials. Keep inquiry records private under RLS, use owner-only document publishing, and require explicit publication consent plus manual owner approval for testimonials. Add features incrementally, validate mobile layouts, test every link and form, and provide exact deployment instructions."
