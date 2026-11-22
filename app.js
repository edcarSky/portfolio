(() => {
 const $=s=>document.querySelector(s),cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_URL.includes("PASTE_")&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const client=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 $("#year").textContent=new Date().getFullYear();
 const showVisitorCount=()=>{if(window.goatcounter?.visit_count){window.goatcounter.visit_count({append:"#visitorCount",path:"TOTAL",type:"html",no_branding:true,style:"div{display:inline!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;color:inherit!important;font:inherit!important} #gcvc-views{font-weight:700}" });return true;}return false;};
 let counterAttempts=0;const counterTimer=setInterval(()=>{counterAttempts++;if(showVisitorCount()||counterAttempts>40)clearInterval(counterTimer);},250);
 $("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
 document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
 const themes=["navy","forest","charcoal","burgundy","slate"];
 function applyTheme(name){document.body.dataset.theme=themes.includes(name)?name:"navy";try{localStorage.setItem("edcarsky-theme",document.body.dataset.theme);}catch(e){}}
 let current="navy";try{current=localStorage.getItem("edcarsky-theme")||"navy";}catch(e){}
 applyTheme(current);
 $("#themeRefresh").addEventListener("click",()=>{const choices=themes.filter(x=>x!==document.body.dataset.theme);applyTheme(choices[Math.floor(Math.random()*choices.length)]);});
 function setDoc(prefix,url,name){if(!url)return;const v=$("#"+prefix+"View"),d=$("#"+prefix+"Download");v.href=url;d.href=url;d.setAttribute("download",name||"");v.classList.remove("disabled");d.classList.remove("disabled");$("#"+prefix+"Status").textContent="Latest published version";}
 async function loadPublicContent(){
  if(!client){$("#formMessage").textContent="Inquiry form setup is pending. Please contact me through WhatsApp, Messenger or email for now.";return;}
  const {data:docs}=await client.from("public_documents").select("document_type,public_url,display_name").eq("is_published",true);
  (docs||[]).forEach(doc=>{if(doc.document_type==="cv")setDoc("cv",doc.public_url,doc.display_name);if(doc.document_type==="cover_letter")setDoc("letter",doc.public_url,doc.display_name);});
  const {data:settings}=await client.from("site_settings").select("value").eq("key","profile_photo").maybeSingle();
  if(settings?.value){const hero=$("#heroPhoto");hero.innerHTML="";const img=document.createElement("img");img.src=settings.value;img.alt="Edcar Aguirre Tenedero";img.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:inherit";hero.append(img);}
  const {data:quotes}=await client.from("testimonials").select("display_name,affiliation,company,message").eq("status","approved").order("created_at",{ascending:false}).limit(6);
  if(quotes?.length){$("#testimonials").innerHTML="";quotes.forEach(q=>{const card=document.createElement("article");card.className="testimonial-card";const quote=document.createElement("blockquote");quote.textContent="“"+q.message+"”";const name=document.createElement("b");name.textContent=q.display_name;const meta=document.createElement("small");meta.textContent=[q.affiliation,q.company].filter(Boolean).join(" · ");card.append(quote,name,meta);$("#testimonials").append(card);});}
 }
 
 const inquiryForm=$("#inquiryForm");
 const socialMessage=$("#socialAuthMessage");
 const applySocialProfile=async(user)=>{
  if(!user)return;
  const meta=user.user_metadata||{};
  const name=meta.full_name||meta.name||meta.display_name||[meta.first_name,meta.last_name].filter(Boolean).join(" ");
  if(name&&!inquiryForm.elements.full_name.value)inquiryForm.elements.full_name.value=name;
  if(user.email&&!inquiryForm.elements.email.value)inquiryForm.elements.email.value=user.email;
  if(socialMessage)socialMessage.textContent="Account connected. Supported name and email fields have been filled in. Review them before sending your inquiry.";
 };
 if(client){
  client.auth.getUser().then(({data,error})=>{if(!error)applySocialProfile(data.user);});
  client.auth.onAuthStateChange((event,session)=>{
   if(event==="SIGNED_IN"&&session?.user)applySocialProfile(session.user);
  });
  document.querySelectorAll("[data-oauth-provider]").forEach(button=>{
   button.addEventListener("click",async()=>{
    const provider=button.dataset.oauthProvider;
    if(socialMessage)socialMessage.textContent="Connecting securely to "+(provider==="google"?"Google":"Facebook")+"...";
    const options={redirectTo:window.location.origin+window.location.pathname+"#contact"};
    if(provider==="google")options.scopes="email profile";
    if(provider==="facebook")options.scopes="email public_profile";
    const {error}=await client.auth.signInWithOAuth({provider,options});
    if(error&&socialMessage)socialMessage.textContent="Connection failed: "+error.message+". You may complete the form manually.";
   });
  });
 }else if(socialMessage){
  socialMessage.textContent="Social account connection is not active until Supabase is configured. You may complete the form manually.";
 }
 $("#inquiryForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,msg=$("#formMessage");if(!client){msg.textContent="This form is not connected yet. Use WhatsApp, Messenger or email until backend setup is complete.";return;}const fd=new FormData(form);const payload={full_name:fd.get("full_name").trim(),company:fd.get("company").trim()||null,affiliation:fd.get("affiliation").trim()||null,email:fd.get("email").trim(),phone:fd.get("phone").trim()||null,inquiry_type:fd.get("inquiry_type"),message:fd.get("message").trim(),consent:fd.get("consent")==="on"};const {error}=await client.from("inquiries").insert(payload);if(error){msg.textContent="Your inquiry was not sent. Please use WhatsApp, Messenger or email.";return;}form.reset();msg.textContent="Thank you. Your inquiry was submitted privately.";});
 loadPublicContent();
})();