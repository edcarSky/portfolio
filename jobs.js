(() => {
 const $ = (s) => document.querySelector(s);
 const cfg = window.PORTFOLIO_CONFIG || {};
 const ready = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase;
 const sb = ready ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
 const ownerEmail = "edcarsky@gmail.com";
 const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 let jobs = [];
 let allJobs = [];
 let documents = [];
 let selectedJob = null;
 let visibleCount = 10;
 let selectedJobIndex = 0;
 let owner = null;
 let publicCv = null;

 function updateExternalLinks() {
   const include = splitTerms($("#includeJobTerms")?.value).join(" ");
   const excludeJobs = splitTerms($("#excludeJobTerms")?.value).map(x => "-" + x).join(" ");
   const excludePlaces = splitTerms($("#excludeCountries")?.value).map(x => "-" + x).join(" ");
   const q = encodeURIComponent([$("#jobQuery").value.trim(), include, $("#jobLocation").value.trim(), excludeJobs, excludePlaces].filter(Boolean).join(" "));
   const urls = {
     google: "https://www.google.com/search?ibp=htl;jobs&q=" + q,
     linkedin: "https://www.linkedin.com/jobs/search/?keywords=" + q,
     indeed: "https://www.indeed.com/jobs?q=" + q,
     jooble: "https://ph.jooble.org/SearchResult?ukw=" + q
   };
   document.querySelectorAll("[data-source]").forEach(a => a.href = urls[a.dataset.source]);
 }
 const regionCountries = {
   "southeast-asia": ["philippines","indonesia","malaysia","singapore","thailand","vietnam","brunei","cambodia","laos","myanmar","timor-leste"],
   "east-asia": ["china","japan","south korea","korea","taiwan","hong kong","mongolia","macau"],
   "south-asia": ["india","pakistan","bangladesh","sri lanka","nepal","bhutan","maldives","afghanistan"],
   "middle-east": ["saudi arabia","united arab emirates","uae","qatar","kuwait","bahrain","oman","jordan","israel","iraq","iran","lebanon","yemen","syria","turkey","türkiye"],
   "europe": ["europe","united kingdom","uk","england","scotland","wales","ireland","germany","france","netherlands","belgium","luxembourg","switzerland","austria","italy","spain","portugal","poland","czechia","czech republic","slovakia","hungary","romania","bulgaria","greece","sweden","norway","denmark","finland","iceland","estonia","latvia","lithuania","ukraine","serbia","croatia","slovenia","albania","cyprus","malta"],
   "north-america": ["united states","usa","u.s.","canada","mexico","puerto rico"],
   "south-america": ["brazil","argentina","chile","colombia","peru","ecuador","uruguay","paraguay","bolivia","venezuela","guyana","suriname"],
   "africa": ["south africa","nigeria","kenya","egypt","ghana","morocco","algeria","tunisia","ethiopia","uganda","tanzania","rwanda","senegal","ivory coast","cote d'ivoire","cameroon","zambia","zimbabwe","botswana"],
   "oceania": ["australia","new zealand","fiji","papua new guinea","samoa","tonga","vanuatu"]
 };
 const splitTerms = value => String(value || "").split(/[,;\n]/).map(x => x.trim().toLowerCase()).filter(Boolean);
 const normalize = value => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 function applyFilters() {
   const includeCountries = splitTerms($("#jobLocation").value).map(normalize);
   const excludeCountries = splitTerms($("#excludeCountries").value).map(normalize);
   const includeTerms = splitTerms($("#includeJobTerms").value).map(normalize);
   const excludeTerms = splitTerms($("#excludeJobTerms").value).map(normalize);
   const region = $("#jobRegion").value;
   jobs = allJobs.filter(job => {
     const place = normalize(job.location);
     const searchable = normalize([job.title,job.company,job.description,job.category,job.employment_type,...(job.tags||[])].join(" "));
     if (includeCountries.length && !includeCountries.some(country => place.includes(country))) return false;
     if (excludeCountries.some(country => place.includes(country))) return false;
     if (region && !(regionCountries[region]||[]).some(country => place.includes(normalize(country)))) return false;
     if (includeTerms.length && !includeTerms.some(term => searchable.includes(term))) return false;
     if (excludeTerms.some(term => searchable.includes(term))) return false;
     return true;
   });
   visibleCount = 10;
   selectedJobIndex = 0;
   renderJobs();
   if (allJobs.length) {
     $("#searchMessage").textContent = jobs.length
       ? "Worldwide results by default. Showing the first " + Math.min(10,jobs.length) + " of " + jobs.length + " matching listings. Select a listing to read its details on the right."
       : "No listings match the selected filters. Remove an exclusion or choose a broader region, country or keyword.";
   }
 }
 function renderJobs() {
   const host = $("#jobResults");
   const shown = jobs.slice(0,visibleCount);
   $("#resultCount").textContent = jobs.length ? jobs.length + " matching · " + Math.min(visibleCount,jobs.length) + " shown" : (allJobs.length ? "0 matching" : "");
   if (!jobs.length) {
     host.innerHTML = "";
     $("#jobDetail").innerHTML = '<div class="job-detail-empty">No matching jobs. Clear or broaden your filters to see more listings.</div>';
     $("#moreJobsButton").hidden = true;
     return;
   }
   if (selectedJobIndex >= jobs.length) selectedJobIndex = 0;
   const selected = jobs[selectedJobIndex];
   host.innerHTML = shown.map((j,i) => {
     const index = jobs.indexOf(j);
     return '<button type="button" class="job-listing" data-job-index="' + index + '" aria-pressed="' + (index===selectedJobIndex) + '"><div class="list-company">' + esc(j.company) + '</div><h3>' + esc(j.title) + '</h3><div class="list-meta"><span>' + esc(j.location) + '</span>' + (j.salary ? '<span>' + esc(j.salary) + '</span>' : '') + '</div><div class="list-bottom"><span class="list-source">' + esc(j.source) + (j.published_at ? ' · ' + esc(new Date(j.published_at).toLocaleDateString()) : '') + '</span>' + (j.employment_type ? '<span class="list-type">' + esc(j.employment_type) + '</span>' : '') + '</div></button>';
   }).join("");
   host.querySelectorAll("[data-job-index]").forEach(b => b.addEventListener("click", () => {
     selectedJobIndex = Number(b.dataset.jobIndex);
     renderJobs();
   }));
   const detail = $("#jobDetail");
   detail.innerHTML = '<div class="detail-source">' + esc(selected.source) + '</div><h3>' + esc(selected.title) + '</h3><div class="detail-company">' + esc(selected.company) + '</div><div class="detail-meta"><span>' + esc(selected.location) + '</span>' + (selected.employment_type ? '<span>' + esc(selected.employment_type) + '</span>' : '') + (selected.salary ? '<span>' + esc(selected.salary) + '</span>' : '') + (selected.published_at ? '<span>Posted ' + esc(new Date(selected.published_at).toLocaleDateString()) + '</span>' : '') + (selected.remote ? '<span>Remote</span>' : '') + '</div><div class="detail-description">' + esc(selected.description || "Open the original listing to review the complete role description and requirements.") + '</div><div class="detail-actions"><a class="detail-apply" href="' + esc(selected.url) + '" target="_blank" rel="noopener noreferrer">View job & apply ↗</a>' + (owner ? '<button class="detail-save" type="button" id="detailSaveJob">Save & prepare</button>' : '') + '</div>';
   const save = $("#detailSaveJob");
   if (save) save.addEventListener("click", () => openPrepare(selected));
   $("#moreJobsButton").hidden = jobs.length <= visibleCount;
   $("#moreJobsButton").textContent = "More results · show next " + Math.min(10,jobs.length-visibleCount);
 }
 $("#moreJobsButton").addEventListener("click", () => {
   visibleCount += 10;
   renderJobs();
 });
 async function searchJobs(event) {
   event?.preventDefault();
   const query = $("#jobQuery").value.trim();
   updateExternalLinks();
   if (query.length < 2) { $("#searchMessage").textContent = "Enter at least two characters."; return; }
   const button = $("#searchButton");
   button.disabled = true; button.textContent = "Searching...";
   $("#searchMessage").textContent = "Checking current listings from connected job sources...";
   $("#resultsHeading").textContent = "Results for " + query;
   jobs = []; allJobs = []; renderJobs();
   if (!sb) { $("#searchMessage").textContent = "Search service is not configured. Use the external job-board links below."; button.disabled = false; button.textContent = "Search jobs →"; return; }
   const { data, error } = await sb.functions.invoke("jobs-search", { body: { query, location: "", limit: 50 } });
   button.disabled = false; button.textContent = "Search jobs →";
   if (error || data?.error) { $("#searchMessage").textContent = data?.error || "The job search service is unavailable. Use the external job-board links."; return; }
   allJobs = data.jobs || [];
   if (allJobs.length) applyFilters();
   else { jobs = []; renderJobs(); $("#searchMessage").textContent = "No listings were returned by the connected providers for this keyword. Try a broader title or use the external job-board links."; }
   const sourceNames = Object.entries(data.sources || {}).filter(([,status]) => status === "available").map(([name]) => name).join(", ");
   if (sourceNames) $("#searchMessage").textContent += " Sources: " + sourceNames + ".";
 }
 $("#searchForm").addEventListener("submit", searchJobs);
 $("#jobQuery").addEventListener("input", updateExternalLinks);
 $("#jobLocation").addEventListener("input", updateExternalLinks);
 ["#jobRegion","#excludeCountries","#includeJobTerms","#excludeJobTerms"].forEach(selector => {
   $(selector).addEventListener("input", applyFilters);
   $(selector).addEventListener("change", applyFilters);
 });
 $("#jobLocation").addEventListener("change", applyFilters);
 $("#clearJobFilters").addEventListener("click", () => {
   ["#jobRegion","#jobLocation","#excludeCountries","#includeJobTerms","#excludeJobTerms"].forEach(selector => $(selector).value = "");
   updateExternalLinks(); applyFilters();
 });
 document.querySelectorAll("[data-query]").forEach(b => b.addEventListener("click", () => { $("#jobQuery").value = b.dataset.query; searchJobs(); }));
 updateExternalLinks();

 async function loadOwner() {
   if (!sb) { $("#ownerMessage").textContent = "Supabase connection is not configured."; return; }
   const { data: { user } } = await sb.auth.getUser();
   if (user?.email?.toLowerCase() === ownerEmail) { owner = user; showWorkspace(); }
 }
 $("#ownerSignIn").addEventListener("click", async () => {
   if (!sb) return;
   $("#ownerMessage").textContent = "Signing in...";
   const { data, error } = await sb.auth.signInWithPassword({ email: $("#ownerEmail").value.trim(), password: $("#ownerPassword").value });
   if (error) { $("#ownerMessage").textContent = error.message; return; }
   if (data.user?.email?.toLowerCase() !== ownerEmail) { await sb.auth.signOut(); $("#ownerMessage").textContent = "This private workspace is restricted to the portfolio owner."; return; }
   owner = data.user; $("#ownerMessage").textContent = ""; showWorkspace();
 });
 $("#ownerSignOut").addEventListener("click", async () => { await sb.auth.signOut(); owner = null; documents = []; $("#ownerWorkspace").classList.add("hidden"); $("#ownerLogin").classList.remove("hidden"); jobs = jobs; renderJobs(); });
 function showWorkspace() {
   $("#ownerLogin").classList.add("hidden"); $("#ownerWorkspace").classList.remove("hidden");
   $("#ownerWelcome").textContent = "Signed in as " + owner.email;
   renderJobs(); loadDocuments(); loadApplications(); loadAtsVersions();
 }
 async function loadDocuments() {
   const { data, error } = await sb.from("job_documents").select("*").order("created_at", { ascending: false });
   if (error) { $("#documentList").textContent = error.message; return; }
   documents = data || [];
   const cv = documents.filter(d => d.document_type === "cv");
   const cover = documents.filter(d => d.document_type === "cover_letter");
   $("#atsSourcePdf").innerHTML = '<option value="">Select an uploaded private CV</option>' + cv.map(d => '<option value="' + d.id + '">' + esc(d.label) + '</option>').join("");
   $("#applicationCv").innerHTML = '<option value="">No CV selected</option>' + cv.map(d => '<option value="' + d.id + '">' + esc(d.label) + (d.is_default ? " · Default" : "") + '</option>').join("");
   $("#applicationCover").innerHTML = '<option value="">No cover letter selected</option>' + cover.map(d => '<option value="' + d.id + '">' + esc(d.label) + (d.is_default ? " · Default" : "") + '</option>').join("");
   $("#documentList").innerHTML = documents.length ? documents.map(d => '<div class="document-item"><strong>' + esc(d.label) + (d.is_default ? " · Default" : "") + '</strong><small>' + esc(d.document_type.replace("_"," ")) + ' · ' + (d.file_size / 1048576).toFixed(2) + ' MB</small><button type="button" data-download-doc="' + d.id + '">Open private PDF</button> <button type="button" data-default-doc="' + d.id + '">Set as default</button></div>').join("") : '<p class="message">No private documents uploaded yet.</p>';
   $("#documentList").querySelectorAll("[data-download-doc]").forEach(b => b.addEventListener("click", () => openPrivateDocument(b.dataset.downloadDoc)));
   $("#documentList").querySelectorAll("[data-default-doc]").forEach(b => b.addEventListener("click", () => setDefaultDocument(b.dataset.defaultDoc)));
 }
 $("#importPublicCv").addEventListener("click", async () => {
   const msg = $("#documentMessage");
   if (!owner || !publicCv) return;
   msg.textContent = "Copying your existing published CV into private storage...";
   const { data: file, error: downloadError } = await sb.storage.from("portfolio-documents").download(publicCv.storage_path);
   if (downloadError || !file) { msg.textContent = downloadError?.message || "Could not download the existing CV."; return; }
   const safeName = (publicCv.display_name || "Existing-CV.pdf").replace(/[^a-zA-Z0-9._-]/g, "_");
   const path = owner.id + "/cv/imported-" + Date.now() + "-" + safeName;
   const { error: uploadError } = await sb.storage.from("job-application-private").upload(path, file, { contentType: "application/pdf", upsert: false });
   if (uploadError) { msg.textContent = uploadError.message; return; }
   const makeDefault = !documents.some(d => d.document_type === "cv" && d.is_default);
   const { error } = await sb.from("job_documents").insert({ owner_id: owner.id, label: publicCv.display_name, document_type: "cv", storage_path: path, original_filename: publicCv.display_name, mime_type: "application/pdf", file_size: file.size, is_default: makeDefault });
   if (error) { await sb.storage.from("job-application-private").remove([path]); msg.textContent = error.message; return; }
   msg.textContent = "Existing CV copied into your private application library. The public portfolio copy remains unchanged.";
   loadDocuments();
 });
 $("#uploadDocument").addEventListener("click", async () => {
   const file = $("#documentFile").files[0], type = $("#documentType").value, label = $("#documentLabel").value.trim() || file?.name || "";
   const msg = $("#documentMessage");
   if (!owner) { msg.textContent = "Sign in first."; return; }
   if (!file || file.type !== "application/pdf") { msg.textContent = "Choose a PDF file."; return; }
   if (file.size > 15 * 1024 * 1024) { msg.textContent = "Maximum file size is 15 MB."; return; }
   msg.textContent = "Uploading to private storage...";
   const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
   const path = owner.id + "/" + type + "/" + Date.now() + "-" + safeName;
   const { error: uploadError } = await sb.storage.from("job-application-private").upload(path, file, { contentType: "application/pdf", upsert: false });
   if (uploadError) { msg.textContent = uploadError.message; return; }
   if ($("#documentDefault").checked) {
     const { error: resetError } = await sb.from("job_documents").update({ is_default: false }).eq("document_type", type);
     if (resetError) { await sb.storage.from("job-application-private").remove([path]); msg.textContent = resetError.message; return; }
   }
   const { error } = await sb.from("job_documents").insert({ owner_id: owner.id, label, document_type: type, storage_path: path, original_filename: file.name, mime_type: "application/pdf", file_size: file.size, is_default: $("#documentDefault").checked });
   if (error) { await sb.storage.from("job-application-private").remove([path]); msg.textContent = error.message; return; }
   msg.textContent = "Private PDF uploaded.";
   $("#documentFile").value = ""; $("#documentLabel").value = ""; $("#documentDefault").checked = false;
   loadDocuments();
 });
 async function openPrivateDocument(id) {
   const doc = documents.find(d => d.id === id); if (!doc) return;
   const { data, error } = await sb.storage.from("job-application-private").createSignedUrl(doc.storage_path, 60);
   if (error) { $("#documentMessage").textContent = error.message; return; }
   window.open(data.signedUrl, "_blank", "noopener");
 }
 async function setDefaultDocument(id) {
   const doc = documents.find(d => d.id === id); if (!doc) return;
   const { error: resetError } = await sb.from("job_documents").update({ is_default: false }).eq("document_type", doc.document_type);
   if (resetError) { $("#documentMessage").textContent = resetError.message; return; }
   const { error } = await sb.from("job_documents").update({ is_default: true }).eq("id", id);
   $("#documentMessage").textContent = error ? error.message : "Default document updated.";
   loadDocuments();
 }
 function openPrepare(job) {
   selectedJob = job;
   $("#prepareTitle").textContent = job.title;
   $("#prepareJobMeta").textContent = job.company + " · " + job.location;
   const defaultCv = documents.find(d => d.document_type === "cv" && d.is_default);
   const defaultCover = documents.find(d => d.document_type === "cover_letter" && d.is_default);
   $("#applicationCv").value = defaultCv?.id || "";
   $("#applicationCover").value = defaultCover?.id || "";
   $("#applicationNotes").value = "";
   $("#prepareMessage").textContent = "";
   $("#prepareDialog").showModal();
 }
 $("#saveApplication").addEventListener("click", async () => {
   if (!owner || !selectedJob) return;
   const msg = $("#prepareMessage");
   const sourceKey = String(selectedJob.source || "job_source").toLowerCase().replace(/[^a-z0-9_-]/g, "_").slice(0, 40);
   const { error } = await sb.from("job_applications").insert({
     owner_id: owner.id, source: sourceKey, external_job_id: String(selectedJob.id),
     job_title: selectedJob.title, company_name: selectedJob.company, job_location: selectedJob.location,
     job_url: selectedJob.url, job_description: selectedJob.description, salary: selectedJob.salary || null,
     employment_type: selectedJob.employment_type || null, status: "saved",
     cv_document_id: $("#applicationCv").value || null,
     cover_letter_document_id: $("#applicationCover").value || null,
     private_notes: $("#applicationNotes").value.trim() || null, updated_at: new Date().toISOString()
   });
   if (error) { msg.textContent = error.code === "23505" ? "This job is already in your tracker. Update its existing status below." : error.message; return; }
   msg.textContent = "Job saved to your private application tracker.";
   loadApplications();
 });

 async function extractAtsPdf() {
   const doc = documents.find(d => d.id === $("#atsSourcePdf").value);
   const msg = $("#atsMessage");
   if (!doc) { msg.textContent = "Select a private CV PDF first."; return; }
   if (!window.pdfjsLib) { msg.textContent = "PDF text reader did not load. Paste the CV text manually."; return; }
   msg.textContent = "Opening private PDF and extracting text...";
   const { data, error } = await sb.storage.from("job-application-private").createSignedUrl(doc.storage_path, 90);
   if (error) { msg.textContent = error.message; return; }
   try {
     pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
     const pdf = await pdfjsLib.getDocument(data.signedUrl).promise;
     const pages = [];
     for (let n=1; n<=pdf.numPages; n++) {
       const page = await pdf.getPage(n);
       const content = await page.getTextContent();
       pages.push(content.items.map(item => item.str || "").join(" "));
     }
     const text = pages.join("\n\n");
     if (text.trim().length < 300) throw new Error("This PDF appears scanned or image-only. Use OCR or paste its text manually.");
     $("#atsSourceText").value = text.slice(0,60000);
     msg.textContent = "Text extracted from " + doc.label + ". Check the text for missing characters and details before generating.";
   } catch (e) { msg.textContent = e.message || "Could not extract text from this PDF."; }
 }
 $("#atsExtractPdf").addEventListener("click", extractAtsPdf);

 async function runAts(mode) {
   if (!owner) return;
   const sourceCv = $("#atsSourceText").value.trim();
   const targetTitle = $("#atsTargetTitle").value.trim();
   const jobDescription = $("#atsJobDescription").value.trim();
   const consent = $("#atsGoogleConsent").checked;
   const msg = $("#atsMessage");
   if (sourceCv.length < 300) { msg.textContent = "Load your original CV and check that its extracted text is complete."; return; }
   if (!targetTitle) { msg.textContent = "Enter the target job title."; return; }
   if (!consent) { msg.textContent = "Review and tick the Google Gemini Free data-processing consent before sending CV data."; return; }
   if (mode === "tailor" && jobDescription.length < 80) { msg.textContent = "Paste the full job description before tailoring."; return; }
   const buttons = [$("#atsRefresh"),$("#atsTailor")];
   buttons.forEach(b=>b.disabled=true);
   msg.textContent = "Preparing ATS document with Gemini Free. Your original CV is not overwritten.";
   try {
     const { data: profile, error: profileError } = await sb.from("cv_profiles").upsert({
       owner_id: owner.id, profile_name: "Master CV", source_text: sourceCv,
       target_title: targetTitle, target_description: jobDescription || null,
       source_updated_at: new Date().toISOString(), updated_at: new Date().toISOString()
     }, { onConflict: "owner_id" }).select().single();
     if (profileError) throw profileError;
     const { data: sessionData } = await sb.auth.getSession();
     const { data, error } = await sb.functions.invoke("ats-cv-assistant", {
       body: { mode, sourceCv, targetTitle, company: $("#atsCompany").value.trim(), jobDescription, updates: $("#atsUpdates").value.trim(), googleAiDataConsent: consent },
       headers: { Authorization: "Bearer " + sessionData.session.access_token }
     });
     if (error) throw new Error(data?.error || error.message);
     if (data?.error) throw new Error(data.error);
     $("#atsCvOutput").value = data.cv_text || "";
     $("#atsCoverOutput").value = data.cover_letter_text || "";
     $("#atsAnalysis").textContent = JSON.stringify(data.keyword_analysis || {}, null, 2) + (data.notes?.length ? "\n\nNotes to verify:\n" + data.notes.join("\n") : "");
     $("#atsOutput").classList.remove("hidden");
     const label = (mode === "tailor" ? "Tailored · " : "ATS refreshed · ") + targetTitle + " · " + new Date().toLocaleDateString();
     const { error: versionError } = await sb.from("cv_versions").insert({
       owner_id: owner.id, profile_id: profile.id, version_type: mode === "tailor" ? "job_tailored" : "master_refresh",
       version_label: label, target_job_title: targetTitle, target_company: $("#atsCompany").value.trim() || null,
       job_description: mode === "tailor" ? jobDescription : null, cv_text: data.cv_text,
       cover_letter_text: data.cover_letter_text || null, keyword_analysis: data.keyword_analysis || {}, model_name: data.model || "gemini-3.8-flash"
     });
     if (versionError) throw versionError;
     msg.textContent = "Generated and saved a new version. Review it below. The original CV and previous versions remain unchanged.";
     loadAtsVersions();
   } catch (e) {
     msg.textContent = e.message || "ATS generation failed. No paid fallback was used.";
   } finally { buttons.forEach(b=>b.disabled=false); }
 }
 $("#atsRefresh").addEventListener("click",()=>runAts("refresh"));
 $("#atsTailor").addEventListener("click",()=>runAts("tailor"));
 $("#atsDownloadCv").addEventListener("click",()=>{
   const content = $("#atsCvOutput").value.trim();
   if (!content) return;
   const htmlDoc = "<html><head><meta charset='utf-8'><style>body{font-family:Arial,sans-serif;font-size:10.5pt;line-height:1.35;white-space:pre-wrap;margin:0.7in}</style></head><body>" + esc(content).replace(/\n/g,"<br>") + "</body></html>";
   const blob = new Blob([htmlDoc],{type:"application/msword"});
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a"); a.href=url; a.download="Edcar-ATS-CV.doc"; a.click(); URL.revokeObjectURL(url);
 });
 async function loadAtsVersions() {
   if (!owner) return;
   const { data: masterProfile } = await sb.from("cv_profiles").select("source_text,target_title,target_description").eq("owner_id",owner.id).maybeSingle();
   if (masterProfile) { $("#atsSourceText").value = masterProfile.source_text || ""; $("#atsTargetTitle").value = masterProfile.target_title || ""; $("#atsJobDescription").value = masterProfile.target_description || ""; }
   const { data, error } = await sb.from("cv_versions").select("id,version_label,version_type,created_at").order("created_at",{ascending:false}).limit(20);
   if (error) { $("#atsVersions").textContent=error.message; return; }
   $("#atsVersions").innerHTML = (data||[]).map(v=>'<div class="document-item"><strong>'+esc(v.version_label)+'</strong><small>'+esc(v.version_type.replace("_"," "))+' · '+new Date(v.created_at).toLocaleString()+'</small><button type="button" data-ats-version="'+v.id+'">Load version</button></div>').join("") || "No saved ATS versions yet.";
   $("#atsVersions").querySelectorAll("[data-ats-version]").forEach(b=>b.addEventListener("click",async()=>{
     const {data:version,error}=await sb.from("cv_versions").select("*").eq("id",b.dataset.atsVersion).single();
     if(error){$("#atsMessage").textContent=error.message;return;}
     $("#atsCvOutput").value=version.cv_text||"";$("#atsCoverOutput").value=version.cover_letter_text||"";
     $("#atsAnalysis").textContent=JSON.stringify(version.keyword_analysis||{},null,2);
     $("#atsOutput").classList.remove("hidden");$("#atsMessage").textContent="Loaded saved version. The master CV source remains unchanged.";
   }));
 }
 $("#tailorFromJob").addEventListener("click",()=>{
   if(!selectedJob)return;
   $("#atsTargetTitle").value=selectedJob.title||"";
   $("#atsCompany").value=selectedJob.company||"";
   $("#atsJobDescription").value=selectedJob.description||"";
   $("#prepareDialog").close();
   $("#atsStudio").scrollIntoView({behavior:"smooth",block:"start"});
   $("#atsMessage").textContent="Job details transferred. Confirm the full description and source CV, then select Tailor CV + Cover Letter for This Job.";
 });

 async function loadApplications() {
   const { data, error } = await sb.from("job_applications").select("*").order("updated_at", { ascending: false });
   if (error) { $("#applicationList").textContent = error.message; return; }
   const list = data || [];
   const counts = ["saved","preparing","applied","interview","offer","rejected","closed"].map(s => '<span>' + s + ': ' + list.filter(x => x.status === s).length + '</span>').join("");
   $("#trackerSummary").innerHTML = counts;
   $("#applicationList").innerHTML = list.length ? list.map(x => '<div class="application-item"><strong>' + esc(x.job_title) + '</strong><small>' + esc(x.company_name) + ' · ' + esc(x.job_location) + '</small><small><a href="' + esc(x.job_url) + '" target="_blank" rel="noopener">Original listing ↗</a> · Added ' + new Date(x.created_at).toLocaleDateString() + '</small><select data-status-id="' + x.id + '">' + ["saved","preparing","applied","interview","offer","rejected","closed"].map(s => '<option value="' + s + '"' + (x.status === s ? " selected" : "") + '>' + s + '</option>').join("") + '</select></div>').join("") : '<p class="message">No saved jobs yet. Search above and choose Save & prepare.</p>';
   $("#applicationList").querySelectorAll("[data-status-id]").forEach(sel => sel.addEventListener("change", async () => {
     const status = sel.value, id = sel.dataset.statusId;
     const patch = { status, updated_at: new Date().toISOString() }; if (status === "applied") patch.applied_at = new Date().toISOString(); const { error: updateError } = await sb.from("job_applications").update(patch).eq("id", id);
     if (updateError) $("#applicationList").insertAdjacentHTML("afterbegin", '<p class="message">' + esc(updateError.message) + '</p>');
     else loadApplications();
   }));
 }
 sb?.auth.onAuthStateChange((_event, session) => {
   if (session?.user?.email?.toLowerCase() === ownerEmail) { owner = session.user; showWorkspace(); }
 });
 loadOwner();
})();