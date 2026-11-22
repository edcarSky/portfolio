(() => {
 const $=s=>document.querySelector(s), cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&!cfg.SUPABASE_URL.includes("PASTE_")&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const sb=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 if(!sb){$("#login").disabled=true;$("#loginMessage").textContent="Add your Supabase project URL and anon key to config.js after setup.";}
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 async function refresh(){
  const {data:docs}=await sb.from("public_documents").select("*").order("updated_at",{ascending:false});
  $("#docList").innerHTML=(docs||[]).map(d=>`<p><b>${esc(d.display_name||d.document_type)}</b> · ${d.is_published?"Published":"Hidden"}<br><a href="${esc(d.public_url)}" target="_blank">View PDF</a></p>`).join("")||"No documents published.";
  const {data:items}=await sb.from("inquiries").select("*").order("created_at",{ascending:false}).limit(100);
  $("#inbox").innerHTML=items?.length?`<table class="admin-table"><thead><tr><th>Contact</th><th>Inquiry</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody>${items.map(x=>`<tr><td><b>${esc(x.full_name)}</b><br>${esc(x.company)}<br>${esc(x.affiliation)}<br>${esc(x.email)}<br>${esc(x.phone)}</td><td>${esc(x.inquiry_type)}<br><small>${new Date(x.created_at).toLocaleString()}</small></td><td>${esc(x.message)}</td><td>${esc(x.status)}</td><td><select data-status="${x.id}"><option>new</option><option>reviewed</option><option>replied</option><option>archived</option></select><button data-save="${x.id}" class="button button-dark">Save</button><button data-testimonial="${x.id}" class="button button-outline-dark">Convert to testimonial</button></td></tr>`).join("")}</tbody></table>`:"No inquiries received.";
  const {data:quotes}=await sb.from("testimonials").select("*").order("created_at",{ascending:false}).limit(100);
  $("#moderation").innerHTML=quotes?.length?`<table class="admin-table"><thead><tr><th>Person / affiliation</th><th>Comment</th><th>Status</th><th>Moderate</th></tr></thead><tbody>${quotes.map(q=>`<tr><td>${esc(q.display_name)}<br>${esc(q.affiliation)}<br>${esc(q.company)}</td><td>${esc(q.message)}</td><td>${esc(q.status)}</td><td><button class="button button-dark" data-approve="${q.id}">Approve</button> <button class="button button-outline-dark" data-hide="${q.id}">Hide</button></td></tr>`).join("")}</tbody></table>`:"No testimonials submitted.";
 }
 $("#login").addEventListener("click",async()=>{const {error}=await sb.auth.signInWithPassword({email:$("#email").value,password:$("#password").value});$("#loginMessage").textContent=error?error.message:"Signed in.";if(!error)show();});
 async function show(){const {data:{session}}=await sb.auth.getSession();if(session){$("#loginPanel").classList.add("hidden");$("#dashboard").classList.remove("hidden");$("#logout").classList.remove("hidden");$("#setupNotice").classList.add("hidden");refresh();}}
 $("#logout").addEventListener("click",async()=>{await sb.auth.signOut();location.reload();});
 $("#uploadDoc").addEventListener("click",async()=>{
  const file=$("#docFile").files[0],type=$("#docType").value,name=$("#docName").value.trim()||file?.name;
  if(!file||file.type!=="application/pdf"){ $("#docMessage").textContent="Choose a PDF file.";return;}
  if(file.size>15*1024*1024){$("#docMessage").textContent="File exceeds 15 MB. Compress it before upload.";return;}
  $("#docMessage").textContent="Uploading...";
  const path=`${type}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;
  const {error:upErr}=await sb.storage.from("portfolio-documents").upload(path,file,{contentType:"application/pdf",upsert:false});
  if(upErr){$("#docMessage").textContent=upErr.message;return;}
  const {data:urlData}=sb.storage.from("portfolio-documents").getPublicUrl(path);
  const {error}=await sb.from("public_documents").upsert({document_type:type,display_name:name,storage_path:path,public_url:urlData.publicUrl,is_published:true,updated_at:new Date().toISOString()},{onConflict:"document_type"});
  $("#docMessage").textContent=error?error.message:"Published. Public portfolio links are updated.";
  if(!error)refresh();
 });
 document.addEventListener("click",async e=>{
  const t=e.target;
  if(t.dataset.save){const sel=document.querySelector(`[data-status="${t.dataset.save}"]`);await sb.from("inquiries").update({status:sel.value}).eq("id",t.dataset.save);refresh();}
  if(t.dataset.approve){await sb.from("testimonials").update({status:"approved"}).eq("id",t.dataset.approve);refresh();}
  if(t.dataset.hide){await sb.from("testimonials").update({status:"hidden"}).eq("id",t.dataset.hide);refresh();}
  if(t.dataset.testimonial){
   const {data:x}=await sb.from("inquiries").select("*").eq("id",t.dataset.testimonial).single();
   if(x){const {error}=await sb.from("testimonials").insert({inquiry_id:x.id,display_name:x.full_name,affiliation:x.affiliation,company:x.company,message:x.message,status:"pending",publication_consent:false});alert(error?error.message:"Draft testimonial created. Obtain publication permission before approving.");refresh();}
  }
 });
 if(sb)show();
})();