(() => {
 const $=s=>document.querySelector(s), cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&!cfg.SUPABASE_URL.includes("PASTE_")&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const sb=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 if(!sb){$("#login").disabled=true;$("#loginMessage").textContent="Supabase is not configured. Add the project URL and anon/public key to config.js after creating your project.";}
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 async function refresh(){
  const {data:docs,error:docError}=await sb.from("public_documents").select("*").order("updated_at",{ascending:false});
  $("#docList").innerHTML=docError?esc(docError.message):(docs||[]).map(d=>'<p><b>'+esc(d.display_name||d.document_type)+'</b> · '+(d.is_published?"Published":"Hidden")+'<br><a href="'+esc(d.public_url)+'" target="_blank" rel="noopener">View PDF</a></p>').join("")||"No documents published.";
  const {data:items,error:inboxError}=await sb.from("inquiries").select("*").order("created_at",{ascending:false}).limit(100);
  $("#inbox").innerHTML=inboxError?esc(inboxError.message):items?.length?'<table class="admin-table"><thead><tr><th>Contact</th><th>Inquiry</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody>'+items.map(x=>'<tr><td><b>'+esc(x.full_name)+'</b><br>'+esc(x.company)+'<br>'+esc(x.affiliation)+'<br>'+esc(x.email)+'<br>'+esc(x.phone)+'</td><td>'+esc(x.inquiry_type)+'<br><small>'+new Date(x.created_at).toLocaleString()+'</small></td><td>'+esc(x.message)+'</td><td>'+esc(x.status)+'</td><td><select data-status="'+x.id+'"><option>new</option><option>reviewed</option><option>replied</option><option>archived</option></select><button data-save="'+x.id+'" class="button button-dark">Save</button><button data-testimonial="'+x.id+'" class="button button-outline-dark">Convert to testimonial</button></td></tr>').join("")+'</tbody></table>':"No inquiries received.";
  const {data:quotes,error:quoteError}=await sb.from("testimonials").select("*").order("created_at",{ascending:false}).limit(100);
  $("#moderation").innerHTML=quoteError?esc(quoteError.message):quotes?.length?'<table class="admin-table"><thead><tr><th>Person / affiliation</th><th>Comment</th><th>Status</th><th>Moderate</th></tr></thead><tbody>'+quotes.map(q=>'<tr><td>'+esc(q.display_name)+'<br>'+esc(q.affiliation)+'<br>'+esc(q.company)+'</td><td>'+esc(q.message)+'</td><td>'+esc(q.status)+'</td><td><button class="button button-dark" data-approve="'+q.id+'">Approve</button> <button class="button button-outline-dark" data-hide="'+q.id+'">Hide</button></td></tr>').join("")+'</tbody></table>':"No testimonials submitted.";
  const {data:photo}=await sb.from("site_settings").select("value").eq("key","profile_photo").maybeSingle();
  if(photo?.value) $("#profilePreview").innerHTML='<img src="'+esc(photo.value)+'" alt="Current profile photo" style="width:100px;height:100px;object-fit:cover;border-radius:50%">';
 }
 $("#login").addEventListener("click",async()=>{const {error}=await sb.auth.signInWithPassword({email:$("#email").value,password:$("#password").value});$("#loginMessage").textContent=error?error.message:"Signed in.";if(!error)show();});
 async function show(){const {data:{session}}=await sb.auth.getSession();if(session){$("#loginPanel").classList.add("hidden");$("#dashboard").classList.remove("hidden");$("#logout").classList.remove("hidden");$("#setupNotice").classList.add("hidden");refresh();}}
 $("#logout").addEventListener("click",async()=>{await sb.auth.signOut();location.reload();});
 $("#uploadDoc").addEventListener("click",async()=>{
  const file=$("#docFile").files[0],type=$("#docType").value,name=$("#docName").value.trim()||file?.name;
  if(!file||file.type!=="application/pdf"){ $("#docMessage").textContent="Choose a PDF file.";return;}
  if(file.size>15*1024*1024){$("#docMessage").textContent="File exceeds 15 MB. Compress it before upload.";return;}
  $("#docMessage").textContent="Uploading...";
  const path=type+"/"+Date.now()+"-"+file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
  const {error:upErr}=await sb.storage.from("portfolio-documents").upload(path,file,{contentType:"application/pdf",upsert:false});
  if(upErr){$("#docMessage").textContent=upErr.message;return;}
  const {data:urlData}=sb.storage.from("portfolio-documents").getPublicUrl(path);
  const {error}=await sb.from("public_documents").upsert({document_type:type,display_name:name,storage_path:path,public_url:urlData.publicUrl,is_published:true,updated_at:new Date().toISOString()},{onConflict:"document_type"});
  $("#docMessage").textContent=error?error.message:"Published. The public portfolio now links to this PDF.";
  if(!error)refresh();
 });
 $("#uploadProfile").addEventListener("click",async()=>{
  const file=$("#profileFile").files[0],msg=$("#profileMessage");
  if(!file||!["image/jpeg","image/png","image/webp"].includes(file.type)){msg.textContent="Choose a JPG, PNG or WebP image.";return;}
  if(file.size>5*1024*1024){msg.textContent="Image exceeds 5 MB.";return;}
  msg.textContent="Uploading...";
  const path="profile/"+Date.now()+"-"+file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
  const {error:upErr}=await sb.storage.from("portfolio-assets").upload(path,file,{contentType:file.type,upsert:false});
  if(upErr){msg.textContent=upErr.message;return;}
  const {data}=sb.storage.from("portfolio-assets").getPublicUrl(path);
  const {error}=await sb.from("site_settings").upsert({key:"profile_photo",value:data.publicUrl,updated_at:new Date().toISOString()},{onConflict:"key"});
  msg.textContent=error?error.message:"Profile photo published.";
  if(!error)refresh();
 });
 document.addEventListener("click",async e=>{
  const t=e.target;
  if(t.dataset.save){const sel=document.querySelector('[data-status="'+t.dataset.save+'"]');const {error}=await sb.from("inquiries").update({status:sel.value}).eq("id",t.dataset.save);if(error)alert(error.message);refresh();}
  if(t.dataset.approve){const {error}=await sb.from("testimonials").update({status:"approved"}).eq("id",t.dataset.approve);if(error)alert(error.message);refresh();}
  if(t.dataset.hide){const {error}=await sb.from("testimonials").update({status:"hidden"}).eq("id",t.dataset.hide);if(error)alert(error.message);refresh();}
  if(t.dataset.testimonial){const {data:x}=await sb.from("inquiries").select("*").eq("id",t.dataset.testimonial).single();if(x){const {error}=await sb.from("testimonials").insert({inquiry_id:x.id,display_name:x.full_name,affiliation:x.affiliation,company:x.company,message:x.message,status:"pending",publication_consent:false});alert(error?error.message:"Draft created. Obtain publication permission before approval.");refresh();}}
 });
 if(sb)show();
})();