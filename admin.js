(() => {
 const $=s=>document.querySelector(s), cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&!cfg.SUPABASE_URL.includes("PASTE_")&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const sb=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 if(!sb){$("#login").disabled=true;$("#loginMessage").textContent="Supabase is not configured. Add the project URL and anon/public key to config.js after creating your project.";}
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 async function refresh(){
  const {data:docs,error:docError}=await sb.from("public_documents").select("*").order("updated_at",{ascending:false});
  $("#docList").innerHTML=docError?esc(docError.message):(docs||[]).map(d=>'<div><b>'+esc(d.display_name||d.document_type)+'</b> · '+(d.is_published?"Published":"Hidden draft")+'<br><a href="'+esc(d.public_url)+'" target="_blank" rel="noopener">View PDF</a> · <a href="'+esc(d.public_url)+'" download>Download</a><br><button class="button button-dark" data-toggle-doc="'+esc(d.id)+'" data-doc-type="'+esc(d.document_type)+'" data-published="'+String(!!d.is_published)+'">'+(d.is_published?"Unpublish":"Publish")+'</button> <button class="button button-outline-dark" data-delete-doc="'+esc(d.id)+'">Delete</button></div>').join("")||"No documents uploaded.";
  const {data:items,error:inboxError}=await sb.from("inquiries").select("*").order("created_at",{ascending:false}).limit(100);
  $("#inbox").innerHTML=inboxError?esc(inboxError.message):items?.length?'<table class="admin-table"><thead><tr><th>Contact</th><th>Inquiry</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody>'+items.map(x=>'<tr><td><b>'+esc(x.full_name)+'</b><br>'+esc(x.company)+'<br>'+esc(x.affiliation)+'<br>'+esc(x.email)+'<br>'+esc(x.phone)+'</td><td>'+esc(x.inquiry_type)+'<br><small>'+new Date(x.created_at).toLocaleString()+'</small></td><td>'+esc(x.message)+'</td><td>'+esc(x.status)+'</td><td><select data-status="'+x.id+'"><option>new</option><option>reviewed</option><option>replied</option><option>archived</option></select><button data-save="'+x.id+'" class="button button-dark">Save</button><button data-testimonial="'+x.id+'" class="button button-outline-dark">Convert to testimonial</button></td></tr>').join("")+'</tbody></table>':"No inquiries received.";
  const {data:quotes,error:quoteError}=await sb.from("testimonials").select("*").order("created_at",{ascending:false}).limit(100);
  $("#moderation").innerHTML=quoteError?esc(quoteError.message):quotes?.length?'<table class="admin-table"><thead><tr><th>Person / affiliation</th><th>Comment</th><th>Status</th><th>Moderate</th></tr></thead><tbody>'+quotes.map(q=>'<tr><td>'+esc(q.display_name)+'<br>'+esc(q.affiliation)+'<br>'+esc(q.company)+'</td><td>'+esc(q.message)+'</td><td>'+esc(q.status)+'</td><td><button class="button button-dark" data-approve="'+q.id+'">Approve &amp; publish</button> <button class="button button-outline-dark" data-hide="'+q.id+'">Hide</button></td></tr>').join("")+'</tbody></table>':"No testimonials submitted.";
  const {data:photo}=await sb.from("site_settings").select("value").eq("key","profile_photo").maybeSingle();
  if(photo?.value) $("#profilePreview").innerHTML='<img src="'+esc(photo.value)+'" alt="Current profile photo" style="width:100px;height:100px;object-fit:cover;border-radius:50%">';
 }
 $("#login").addEventListener("click",async()=>{const {error}=await sb.auth.signInWithPassword({email:$("#email").value,password:$("#password").value});$("#loginMessage").textContent=error?error.message:"Signed in.";if(!error)show();});
 async function show(){const {data:{session}}=await sb.auth.getSession();if(session){$("#loginPanel").classList.add("hidden");$("#dashboard").classList.remove("hidden");$("#logout").classList.remove("hidden");$("#setupNotice").classList.add("hidden");refresh();}}
 $("#logout").addEventListener("click",async()=>{await sb.auth.signOut();location.reload();});
 let previewUrl=null;
 $("#docFile").addEventListener("change",()=>{
  const file=$("#docFile").files[0],box=$("#docPreview");
  if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null;}
  if(!file){box.textContent="Choose a PDF to preview it here before upload.";return;}
  if(file.type!=="application/pdf"){box.textContent="This file is not a PDF.";return;}
  previewUrl=URL.createObjectURL(file);
  box.innerHTML="<b>"+esc(file.name)+"</b> · "+(file.size/1048576).toFixed(2)+" MB<iframe title=\"Local PDF preview\" src=\""+previewUrl+"\" style=\"width:100%;height:420px;border:1px solid #d7dee8;border-radius:8px;margin-top:8px\"></iframe>";
 });
 $("#uploadDoc").addEventListener("click",async()=>{
  const file=$("#docFile").files[0],type=$("#docType").value,name=$("#docName").value.trim()||file?.name;
  if(!file||file.type!=="application/pdf"){$("#docMessage").textContent="Choose a PDF file.";return;}
  if(file.size>15*1024*1024){$("#docMessage").textContent="File exceeds 15 MB.";return;}
  $("#docMessage").textContent="Uploading hidden draft...";
  const path=type+"/"+Date.now()+"-"+file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
  const {error:upErr}=await sb.storage.from("portfolio-documents").upload(path,file,{contentType:"application/pdf",upsert:false});
  if(upErr){$("#docMessage").textContent=upErr.message;return;}
  const {data:urlData}=sb.storage.from("portfolio-documents").getPublicUrl(path);
  const {error}=await sb.from("public_documents").insert({document_type:type,display_name:name,storage_path:path,public_url:urlData.publicUrl,is_published:false,updated_at:new Date().toISOString()});
  if(error){await sb.storage.from("portfolio-documents").remove([path]);$("#docMessage").textContent=error.message;return;}
  $("#docMessage").textContent="Hidden draft uploaded. Publish it from the document list after review.";
  $("#docFile").value="";$("#docPreview").textContent="Draft uploaded. Use View PDF in the document list to review it.";
  if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null;}
  refresh();
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
  if(t.dataset.toggleDoc){const publish=t.dataset.published!=="true";if(publish){const {error:priorError}=await sb.from("public_documents").update({is_published:false,updated_at:new Date().toISOString()}).eq("document_type",t.dataset.docType).eq("is_published",true);if(priorError){alert(priorError.message);return;}}const {error}=await sb.from("public_documents").update({is_published:publish,updated_at:new Date().toISOString()}).eq("id",t.dataset.toggleDoc);if(error)alert(error.message);refresh();}
  if(t.dataset.deleteDoc){if(!confirm("Delete this document and its stored PDF?"))return;const {data:d,error:readError}=await sb.from("public_documents").select("storage_path").eq("id",t.dataset.deleteDoc).maybeSingle();if(readError||!d){alert(readError?.message||"Document not found.");return;}const {error}=await sb.from("public_documents").delete().eq("id",t.dataset.deleteDoc);if(error){alert(error.message);return;}const {error:fileError}=await sb.storage.from("portfolio-documents").remove([d.storage_path]);if(fileError)alert("Record deleted, but storage cleanup failed: "+fileError.message);refresh();}
  if(t.dataset.save){const sel=document.querySelector('[data-status="'+t.dataset.save+'"]');const {error}=await sb.from("inquiries").update({status:sel.value}).eq("id",t.dataset.save);if(error)alert(error.message);refresh();}
  if(t.dataset.approve){if(!confirm("Confirm that this person gave permission to publish their name, affiliation/company and testimonial publicly. Continue only after you have verified permission."))return;const {error}=await sb.from("testimonials").update({status:"approved",publication_consent:true}).eq("id",t.dataset.approve);if(error)alert("Publication failed: "+error.message);else alert("Testimonial approved and marked for public display.");refresh();}
  if(t.dataset.hide){const {error}=await sb.from("testimonials").update({status:"hidden"}).eq("id",t.dataset.hide);if(error)alert(error.message);refresh();}
  if(t.dataset.testimonial){const {data:x}=await sb.from("inquiries").select("*").eq("id",t.dataset.testimonial).single();if(x){const {error}=await sb.from("testimonials").insert({inquiry_id:x.id,display_name:x.full_name,affiliation:x.affiliation,company:x.company,message:x.message,status:"pending",publication_consent:false});alert(error?error.message:"Draft created. Obtain publication permission before approval.");refresh();}}
 });

 async function loadCms(){
  const host=$("#contentEditor");
  const {data,error}=await sb.from("site_content").select("*").order("section_name").order("field_label");
  if(error){host.textContent="Content editor unavailable: "+error.message;return;}
  host.innerHTML=(data||[]).map(x=>'<div class="cms-field" style="border:1px solid #e1e7ef;border-radius:8px;padding:12px;margin:10px 0"><label>'+esc(x.section_name)+" · "+esc(x.field_label)+'<textarea data-cms-key="'+esc(x.content_key)+'" maxlength="'+x.max_chars+'" rows="3" style="min-height:65px">'+esc(x.content)+'</textarea><small class="hint"><span data-cms-count="'+esc(x.content_key)+'">'+(x.content||"").length+'</span> / '+x.max_chars+' characters</small></label><button class="button button-dark" data-cms-save="'+esc(x.content_key)+'">Save this field</button></div>').join("")||"No editable fields configured.";
 }
 async function loadAssetList(){
  const keys=["profile_photo","asset_team_logo","asset_hero_background","asset_watermark","asset_video_thumbnail"];
  const {data,error}=await sb.from("site_settings").select("key,value,updated_at").in("key",keys);
  const host=$("#assetList");
  if(error){host.textContent=error.message;return;}
  host.innerHTML=(data||[]).map(x=>'<div style="display:flex;align-items:center;gap:10px;margin:9px 0"><img src="'+esc(x.value)+'" alt="" style="width:64px;height:48px;object-fit:cover;border-radius:5px"><span><b>'+esc(x.key)+'</b><br><small>'+new Date(x.updated_at).toLocaleString()+'</small></span></div>').join("")||"No uploaded brand assets yet.";
 }
 async function loadVisitorStats(){
  const host=$("#visitorStats");
  const since=new Date(Date.now()-30*86400000).toISOString();
  const {count,error}=await sb.from("visitor_events").select("id",{count:"exact",head:true}).gte("created_at",since).eq("event_type","page_view");
  if(error){host.textContent="Visitor analytics unavailable: "+error.message;return;}
  const {data, error:rowsError}=await sb.from("visitor_events").select("created_at,visitor_id,page_path,referrer,user_agent").gte("created_at",since).order("created_at",{ascending:false}).limit(50);
  if(rowsError){host.textContent=rowsError.message;return;}
  const unique=new Set((data||[]).map(x=>x.visitor_id)).size;
  host.innerHTML='<div class="admin-grid"><div><b>'+count+'</b><br><small>Consented page views, last 30 days</small></div><div><b>'+unique+'</b><br><small>Distinct anonymous visitor IDs in latest 50 events</small></div></div><table class="admin-table"><thead><tr><th>Date</th><th>Visitor</th><th>Page</th><th>Referrer</th><th>Browser</th></tr></thead><tbody>'+(data||[]).map(x=>'<tr><td>'+new Date(x.created_at).toLocaleString()+'</td><td><code>'+esc(String(x.visitor_id).slice(0,8))+'</code></td><td>'+esc(x.page_path)+'</td><td>'+esc(x.referrer||"Direct")+'</td><td>'+esc((x.user_agent||"").slice(0,90))+'</td></tr>').join("")+'</tbody></table>';
 }
 $("#contentEditor").addEventListener("input",e=>{const t=e.target;if(t.matches("[data-cms-key]")){const n=$("#contentEditor [data-cms-count='"+t.dataset.cmsKey+"']");if(n)n.textContent=t.value.length;}});
 $("#contentEditor").addEventListener("click",async e=>{const b=e.target.closest("[data-cms-save]");if(!b)return;const key=b.dataset.cmsSave,field=$("#contentEditor [data-cms-key='"+key+"']");if(!field)return;const {error}=await sb.from("site_content").update({content:field.value,updated_at:new Date().toISOString()}).eq("content_key",key);$("#contentMessage").textContent=error?error.message:"Saved: "+key;});
 let assetFile=null,assetUrl=null;
 const stage=$("#cropStage"),assetType=$("#assetType");
 const ratioFor=type=>["profile_photo","team_logo","watermark"].includes(type)?1:16/9;
 function updateCropStage(){
  if(!assetFile||!assetUrl)return;
  const ratio=ratioFor(assetType.value);
  stage.style.aspectRatio=String(ratio);
  stage.innerHTML='<img id="cropImage" src="'+assetUrl+'" alt="Crop preview" style="width:100%;height:100%;object-fit:cover;object-position:'+$("#cropX").value+'% '+$("#cropY").value+'%;transform:scale('+($("#cropZoom").value/100)+');transform-origin:center">';
 }
 $("#assetFile").addEventListener("change",()=>{
  const file=$("#assetFile").files[0];assetFile=file||null;
  if(assetUrl)URL.revokeObjectURL(assetUrl);
  assetUrl=assetFile?URL.createObjectURL(assetFile):null;
  if(!assetFile){stage.textContent="Choose an image to preview and crop";return;}
  if(!["image/jpeg","image/png","image/webp"].includes(assetFile.type)){assetFile=null;stage.textContent="Use JPG, PNG or WebP.";return;}
  updateCropStage();
 });
 ["cropX","cropY","cropZoom","assetType"].forEach(id=>$("#"+id).addEventListener("input",updateCropStage));
 $("#uploadAsset").addEventListener("click",async()=>{
  const msg=$("#assetMessage");if(!assetFile){msg.textContent="Choose an image first.";return;}
  msg.textContent="Preparing crop...";
  const img=new Image();img.src=assetUrl;await img.decode();
  const ratio=ratioFor(assetType.value),zoom=Number($("#cropZoom").value)/100;
  let cw=img.naturalWidth, ch=cw/ratio;if(ch>img.naturalHeight){ch=img.naturalHeight;cw=ch*ratio;}
  cw/=zoom;ch/=zoom;
  const fx=Number($("#cropX").value)/100,fy=Number($("#cropY").value)/100;
  const sx=Math.max(0,Math.min(img.naturalWidth-cw,fx*img.naturalWidth-cw/2));
  const sy=Math.max(0,Math.min(img.naturalHeight-ch,fy*img.naturalHeight-ch/2));
  const canvas=document.createElement("canvas");canvas.width=ratio===1?900:1280;canvas.height=Math.round(canvas.width/ratio);
  canvas.getContext("2d").drawImage(img,sx,sy,cw,ch,0,0,canvas.width,canvas.height);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/webp",0.84));
  if(!blob){msg.textContent="Image crop failed.";return;}
  const type=assetType.value,key=type==="profile_photo"?"profile_photo":"asset_"+type;
  const path="brand/"+type+"-"+Date.now()+".webp";
  const {error:upErr}=await sb.storage.from("portfolio-assets").upload(path,blob,{contentType:"image/webp",upsert:false});
  if(upErr){msg.textContent=upErr.message;return;}
  const {data:urlData}=sb.storage.from("portfolio-assets").getPublicUrl(path);
  const {error}=await sb.from("site_settings").upsert({key,value:urlData.publicUrl,updated_at:new Date().toISOString()},{onConflict:"key"});
  msg.textContent=error?error.message:"Cropped image published successfully.";
  if(!error){loadAssetList();if(type==="profile_photo")refresh();}
 });
 const oldShow=show;
 show=async function(){await oldShow();await loadCms();await loadAssetList();await loadVisitorStats();};

 if(sb)show();
})();