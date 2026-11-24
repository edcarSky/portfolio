(() => {
 const $ = (s) => document.querySelector(s);
 const cfg = window.PORTFOLIO_CONFIG || {};
 const ready = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase;
 const sb = ready ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
 const ownerEmail = "edcarsky@gmail.com";
 const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 let jobs = [];
 let documents = [];
 let selectedJob = null;
 let owner = null;

 function updateExternalLinks() {
   const q = encodeURIComponent([$("#jobQuery").value.trim(), $("#jobLocation").value.trim()].filter(Boolean).join(" "));
   const urls = {
     google: "https://www.google.com/search?ibp=htl;jobs&q=" + q,
     linkedin: "https://www.linkedin.com/jobs/search/?keywords=" + q,
     indeed: "https://www.indeed.com/jobs?q=" + q,
     jooble: "https://ph.jooble.org/SearchResult?ukw=" + q
   };
   document.querySelectorAll("[data-source]").forEach(a => a.href = urls[a.dataset.source]);
 }
 function renderJobs() {
   const host = $("#jobResults");
   $("#resultCount").textContent = jobs.length ? jobs.length + " listings" : "";
   if (!jobs.length) { host.innerHTML = ""; return; }
   host.innerHTML = jobs.map((j, i) => '<article class="job-card"><div class="job-company">' + esc(j.company) + '</div><h3>' + esc(j.title) + '</h3><div class="job-meta"><span>' + esc(j.location) + '</span>' + (j.employment_type ? '<span>' + esc(j.employment_type) + '</span>' : '') + (j.salary ? '<span>' + esc(j.salary) + '</span>' : '') + '</div><p class="job-description">' + esc(j.description || "Open the original listing to review the full role description and requirements.") + '</p><div class="job-meta"><span>Source: ' + esc(j.source) + '</span>' + (j.published_at ? '<span>Posted ' + esc(new Date(j.published_at).toLocaleDateString()) + '</span>' : '') + '</div><div class="job-actions"><a class="apply-link" href="' + esc(j.url) + '" target="_blank" rel="noopener noreferrer">View job & apply ↗</a>' + (owner ? '<button class="save-job" type="button" data-prepare="' + i + '">Save & prepare</button>' : '') + '</div></article>').join("");
   host.querySelectorAll("[data-prepare]").forEach(b => b.addEventListener("click", () => openPrepare(jobs[Number(b.dataset.prepare)])));
 }
 async function searchJobs(event) {
   event?.preventDefault();
   const query = $("#jobQuery").value.trim();
   const location = $("#jobLocation").value.trim();
   updateExternalLinks();
   if (query.length < 2) { $("#searchMessage").textContent = "Enter at least two characters."; return; }
   const button = $("#searchButton");
   button.disabled = true; button.textContent = "Searching...";
   $("#searchMessage").textContent = "Checking current listings from the remote-jobs source...";
   $("#resultsHeading").textContent = "Results for " + query;
   jobs = []; renderJobs();
   if (!sb) { $("#searchMessage").textContent = "Search service is not configured. Use the external job-board links below."; button.disabled = false; button.textContent = "Search jobs →"; return; }
   const { data, error } = await sb.functions.invoke("jobs-search", { body: { query, location, limit: 40 } });
   button.disabled = false; button.textContent = "Search jobs →";
   if (error || data?.error) { $("#searchMessage").textContent = data?.error || "The job search service is unavailable. Use the external job-board links."; return; }
   jobs = data.jobs || [];
   $("#searchMessage").textContent = jobs.length ? "Showing live remote vacancies. Open the original listing to confirm the employer's requirements, closing date and application method." : "No matching remote listings were returned. Try a broader keyword or search another job board.";
   renderJobs();
 }
 $("#searchForm").addEventListener("submit", searchJobs);
 $("#jobQuery").addEventListener("input", updateExternalLinks);
 $("#jobLocation").addEventListener("input", updateExternalLinks);
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
   renderJobs(); loadDocuments(); loadApplications();
 }
 async function loadDocuments() {
   const { data, error } = await sb.from("job_documents").select("*").order("created_at", { ascending: false });
   if (error) { $("#documentList").textContent = error.message; return; }
   documents = data || [];
   const cv = documents.filter(d => d.document_type === "cv");
   const cover = documents.filter(d => d.document_type === "cover_letter");
   $("#applicationCv").innerHTML = '<option value="">No CV selected</option>' + cv.map(d => '<option value="' + d.id + '">' + esc(d.label) + (d.is_default ? " · Default" : "") + '</option>').join("");
   $("#applicationCover").innerHTML = '<option value="">No cover letter selected</option>' + cover.map(d => '<option value="' + d.id + '">' + esc(d.label) + (d.is_default ? " · Default" : "") + '</option>').join("");
   $("#documentList").innerHTML = documents.length ? documents.map(d => '<div class="document-item"><strong>' + esc(d.label) + (d.is_default ? " · Default" : "") + '</strong><small>' + esc(d.document_type.replace("_"," ")) + ' · ' + (d.file_size / 1048576).toFixed(2) + ' MB</small><button type="button" data-download-doc="' + d.id + '">Open private PDF</button> <button type="button" data-default-doc="' + d.id + '">Set as default</button></div>').join("") : '<p class="message">No private documents uploaded yet.</p>';
   $("#documentList").querySelectorAll("[data-download-doc]").forEach(b => b.addEventListener("click", () => openPrivateDocument(b.dataset.downloadDoc)));
   $("#documentList").querySelectorAll("[data-default-doc]").forEach(b => b.addEventListener("click", () => setDefaultDocument(b.dataset.defaultDoc)));
 }
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
   const { error } = await sb.from("job_applications").upsert({
     owner_id: owner.id, source: "remotive", external_job_id: String(selectedJob.id),
     job_title: selectedJob.title, company_name: selectedJob.company, job_location: selectedJob.location,
     job_url: selectedJob.url, job_description: selectedJob.description, salary: selectedJob.salary || null,
     employment_type: selectedJob.employment_type || null, status: "saved",
     cv_document_id: $("#applicationCv").value || null,
     cover_letter_document_id: $("#applicationCover").value || null,
     private_notes: $("#applicationNotes").value.trim() || null, updated_at: new Date().toISOString()
   }, { onConflict: "owner_id,source,external_job_id" });
   if (error) { msg.textContent = error.message; return; }
   msg.textContent = "Job saved to your private application tracker.";
   loadApplications();
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
     const { error: updateError } = await sb.from("job_applications").update({ status, applied_at: status === "applied" ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq("id", id);
     if (updateError) $("#applicationList").insertAdjacentHTML("afterbegin", '<p class="message">' + esc(updateError.message) + '</p>');
     else loadApplications();
   }));
 }
 sb?.auth.onAuthStateChange((_event, session) => {
   if (session?.user?.email?.toLowerCase() === ownerEmail) { owner = session.user; showWorkspace(); }
 });
 loadOwner();
})();