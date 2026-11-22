(() => {
 const $ = s => document.querySelector(s);
 const cfg = window.PORTFOLIO_CONFIG || {};
 const configured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes("PASTE_") && !cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const client = configured && window.supabase ? window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY) : null;
 $("#year").textContent = new Date().getFullYear();
 $("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
 document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
 function setDoc(prefix,url){
   if(!url) return;
   const v=$("#"+prefix+"View"), d=$("#"+prefix+"Download");
   v.href=url; d.href=url; d.setAttribute("download","");
   v.classList.remove("disabled"); d.classList.remove("disabled");
 }
 async function loadPublicContent(){
   if(!client) { $("#formMessage").textContent="Inquiry form setup is pending. Please contact me through WhatsApp, Messenger or email for now."; return; }
   const {data:docs}=await client.from("public_documents").select("document_type,public_url,display_name").eq("is_published",true);
   (docs||[]).forEach(doc=>{ if(doc.document_type==="cv") setDoc("cv",doc.public_url); if(doc.document_type==="cover_letter") setDoc("letter",doc.public_url); });
   const {data:quotes}=await client.from("testimonials").select("display_name,affiliation,company,message").eq("status","approved").order("created_at",{ascending:false}).limit(6);
   if(quotes && quotes.length){ $("#testimonials").innerHTML=""; quotes.forEach(q=>{const card=document.createElement("article");card.className="testimonial-card";const quote=document.createElement("blockquote");quote.textContent="“"+q.message+"”";const name=document.createElement("b");name.textContent=q.display_name;const meta=document.createElement("small");meta.textContent=[q.affiliation,q.company].filter(Boolean).join(" · ");card.append(quote,name,meta);$("#testimonials").append(card);});}
 }
 $("#inquiryForm").addEventListener("submit",async e=>{
   e.preventDefault(); const form=e.currentTarget; const msg=$("#formMessage");
   if(!client){msg.textContent="This form is not connected yet. Use WhatsApp, Messenger or email until the owner completes backend setup.";return;}
   const fd=new FormData(form); const payload={full_name:fd.get("full_name").trim(),company:fd.get("company").trim()||null,affiliation:fd.get("affiliation").trim()||null,email:fd.get("email").trim(),phone:fd.get("phone").trim()||null,inquiry_type:fd.get("inquiry_type"),message:fd.get("message").trim(),consent:fd.get("consent")==="on"};
   const {error}=await client.from("inquiries").insert(payload);
   if(error){msg.textContent="Your inquiry was not sent. Please use WhatsApp, Messenger or email.";return;}
   form.reset();msg.textContent="Thank you. Your inquiry was submitted privately."; 
 });
 loadPublicContent();
})();