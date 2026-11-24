(() => {
 const $=s=>document.querySelector(s),cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_URL.includes("PASTE_")&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const client=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 $("#year").textContent=new Date().getFullYear();
 const showVisitorCount=()=>{const target=$("#visitorCount");if(window.goatcounter?.visit_count){target.textContent="";window.goatcounter.visit_count({append:"#visitorCount",path:"TOTAL",type:"html",no_branding:true,style:"div{display:inline!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;color:inherit!important;font:inherit!important} #gcvc-views{font-weight:700}" });return true;}return false;};
 let counterAttempts=0;const counterTimer=setInterval(()=>{counterAttempts++;if(showVisitorCount()){clearInterval(counterTimer);}else if(counterAttempts>=40){clearInterval(counterTimer);$("#visitorCount").textContent="Counter unavailable";}},250);
 $("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
 document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
 const themes=["navy","forest","charcoal","burgundy","slate"];
 function applyTheme(name){document.body.dataset.theme=themes.includes(name)?name:"navy";try{localStorage.setItem("edcarsky-theme",document.body.dataset.theme);}catch(e){}}
 let current="navy";try{current=localStorage.getItem("edcarsky-theme")||"navy";}catch(e){}
 applyTheme(current);
 $("#themeRefresh").addEventListener("click",()=>{const choices=themes.filter(x=>x!==document.body.dataset.theme);applyTheme(choices[Math.floor(Math.random()*choices.length)]);});
 function setDoc(prefix,url,name,status){if(!url)return;const v=$("#"+prefix+"View"),d=$("#"+prefix+"Download");v.href=url;d.href=url;d.removeAttribute("download");v.classList.remove("disabled");d.classList.remove("disabled");if(status)$("#"+prefix+"Status").textContent=status;}
 async function loadPublicContent(){
  const host=$("#testimonials");
  if(client){
   const {data:quotes,error}=await client.from("testimonials").select("display_name,affiliation,company,message").eq("status","approved").eq("publication_consent",true);
   if(error){host.textContent="Testimonials are temporarily unavailable. Read the original LinkedIn recommendations."; }
   else if(!quotes?.length){host.innerHTML='<div class="testimonial-empty"><strong>LinkedIn recommendations</strong><span>Read the original recommendations using the LinkedIn button beside this panel. Additional recommendations will appear here after publication approval.</span></div>';}
   else{
    let current=-1;
    const render=(index)=>{
     if(!quotes.length)return;
     let next=index;
     if(quotes.length>1){while(next===current)next=Math.floor(Math.random()*quotes.length);}
     current=next;
     const q=quotes[current];host.replaceChildren();
     const card=document.createElement("article");card.className="testimonial-card";card.setAttribute("aria-live","polite");
     const heading=document.createElement("div");heading.className="testimonial-label";heading.textContent="TESTIMONIAL";
     const quote=document.createElement("blockquote");quote.textContent="“"+q.message+"”";
     const name=document.createElement("b");name.textContent="— "+q.display_name;
     const meta=document.createElement("small");meta.textContent=[q.affiliation,q.company].filter(Boolean).join(" · ");
     card.append(heading,quote,name,meta);
     const controls=document.createElement("div");controls.className="testimonial-controls";
     const pause=document.createElement("button");pause.type="button";pause.textContent="Pause";pause.setAttribute("aria-pressed","false");
     const nextButton=document.createElement("button");nextButton.type="button";nextButton.textContent="Next";
     controls.append(pause,nextButton);card.append(controls);host.append(card);
     pause.onclick=()=>{if(rotation){clearInterval(rotation);rotation=null;pause.textContent="Play";pause.setAttribute("aria-pressed","true");}else{rotation=setInterval(()=>render(Math.floor(Math.random()*quotes.length)),5000);pause.textContent="Pause";pause.setAttribute("aria-pressed","false");}};
     nextButton.onclick=()=>render(Math.floor(Math.random()*quotes.length));
    };
    render(0);
    let rotation=quotes.length>1?setInterval(()=>render(Math.floor(Math.random()*quotes.length)),5000):null;
   }
  }else{host.textContent="Recommendations will appear here after the approved, consented records are connected. Read the original LinkedIn recommendations in the meantime.";}

  setDoc("cv","cv.html","Edcar-Tenedero-CV","Updated 23 November 2026");
  setDoc("letter","cover-letter.html","Edcar-Tenedero-Cover-Letter","Updated 23 November 2026");
  if(!client){$("#formMessage").textContent="Inquiry form setup is pending. Please contact me through WhatsApp, Messenger or email for now.";return;}
  const {data:docs}=await client.from("public_documents").select("document_type,public_url,display_name").eq("is_published",true);
  (docs||[]).forEach(doc=>{if(doc.document_type==="cv")setDoc("cv",doc.public_url,doc.display_name,"Latest published PDF");if(doc.document_type==="cover_letter")setDoc("letter",doc.public_url,doc.display_name,"Latest published PDF");});
  const {data:settings}=await client.from("site_settings").select("value").eq("key","profile_photo").maybeSingle();
  {const hero=$("#heroPhoto");if(hero){hero.innerHTML="";const img=document.createElement("img");img.src=settings?.value||"assets/edcar-profile.webp";img.alt="Edcar Aguirre Tenedero";img.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:inherit";hero.append(img);}}
  if(settings?.value){
   const headerIcon=$("#headerProfileIcon");
   if(headerIcon)headerIcon.innerHTML='<img src="'+escText(settings.value)+'" alt="Edcar profile" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">';
  }
  const {data:assets}=await client.from("site_settings").select("key,value").in("key",["asset_team_logo","asset_hero_background","asset_watermark","asset_video_thumbnail"]);
  const assetMap=Object.fromEntries((assets||[]).map(x=>[x.key,x.value]));
  if(settings?.value){document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(icon=>{icon.href=settings.value;icon.type="image/png";});}
  if(assetMap.asset_team_logo){document.querySelectorAll(".community-logo-image").forEach(img=>img.src=assetMap.asset_team_logo);document.querySelectorAll(".team-watermark-logo").forEach(img=>img.src=assetMap.asset_team_logo);}else{document.querySelectorAll(".community-logo-image,.team-watermark-logo").forEach(img=>img.hidden=true);}
  {const thumb=document.querySelector(".featured-video .video-thumb img");if(thumb)thumb.src=assetMap.asset_video_thumbnail||"https://img.youtube.com/vi/3TjTSFc8TnQ/hqdefault.jpg";}
  {const bg=assetMap.asset_hero_background||settings?.value;if(bg)document.querySelectorAll(".intro-deck .hero-panel,.team-section").forEach(el=>el.style.backgroundImage='linear-gradient(rgba(12,24,42,.78),rgba(12,24,42,.92)),url("'+bg+'")');}
  {const mark=assetMap.asset_watermark||settings?.value;if(mark)document.querySelectorAll(".team-section").forEach(el=>el.style.setProperty("--team-watermark-image",'url("'+mark+'")'));}
  if(settings?.value){document.querySelectorAll(".profile-placeholder img").forEach(img=>img.src=settings.value);}

 }
 
 const inquiryForm=$("#inquiryForm");
 const socialMessage=$("#socialAuthMessage");
 const inquiryExpand=$("#inquiryExpand");
 const inquiryExtra=$("#inquiryExtra");
 const revealInquiryDetails=()=>{
  if(!inquiryExtra||!inquiryExpand||!inquiryExtra.hidden)return;
  inquiryExtra.hidden=false;
  inquiryExpand.setAttribute("aria-expanded","true");
  inquiryExpand.innerHTML='Hide optional details <span aria-hidden="true">−</span>';
 };
 const hideInquiryDetails=()=>{
  if(!inquiryExtra||!inquiryExpand||inquiryExtra.hidden)return;
  inquiryExtra.hidden=true;
  inquiryExpand.setAttribute("aria-expanded","false");
  inquiryExpand.innerHTML='Add details or connect an account <span aria-hidden="true">＋</span>';
 };
 inquiryExpand?.addEventListener("click",()=>inquiryExtra?.hidden?revealInquiryDetails():hideInquiryDetails());
 inquiryForm?.querySelector(".inquiry-primary")?.addEventListener("focusin",revealInquiryDetails);
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
 document.querySelectorAll(".video-thumb img").forEach(img=>img.addEventListener("error",()=>img.closest(".video-thumb")?.classList.add("is-fallback"),{once:true}));
 loadPublicContent().then(renderTestimonials);
 applyEditableContent();

 async function renderTestimonials(){
  const host=$("#testimonials");if(!host)return;
  if(!client){host.textContent="Testimonials are temporarily unavailable.";return;}
  const {data,error}=await client.from("testimonials").select("display_name,affiliation,company,message").eq("status","approved").eq("publication_consent",true).order("created_at",{ascending:false});
  if(error){host.textContent="Testimonials are temporarily unavailable.";return;}
  if(!data?.length){host.innerHTML='<div class="testimonial-empty"><strong>Testimonials are being prepared.</strong><span>Approved recommendations will appear here after publication permission is confirmed.</span></div>';return;}
  host.innerHTML=data.map((q,i)=>'<article class="testimonial-card"><div class="testimonial-label">TESTIMONIAL '+String(i+1).padStart(2,"0")+'</div><blockquote>'+escText(q.message.slice(0,210))+(q.message.length>210?'…':'')+'</blockquote><b>— '+escText(q.display_name)+'</b><small>'+escText([q.affiliation,q.company].filter(Boolean).join(" · "))+'</small><button type="button" class="testimonial-read" data-testimonial-index="'+i+'">Read full testimonial</button></article>').join("");
  host.querySelectorAll("[data-testimonial-index]").forEach(btn=>btn.addEventListener("click",()=>{
   const q=data[Number(btn.dataset.testimonialIndex)],modal=$("#testimonialModal");
   $("#testimonialModalQuote").textContent="“"+q.message+"”";
   $("#testimonialModalAuthor").textContent="— "+q.display_name+([q.affiliation,q.company].filter(Boolean).length?" · "+[q.affiliation,q.company].filter(Boolean).join(" · "):"");
   modal.hidden=false;document.body.classList.add("modal-open");$("#testimonialModalTitle").focus();
  }));
 }
 function escText(value){return String(value??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
 document.querySelectorAll("[data-close-testimonial]").forEach(x=>x.addEventListener("click",()=>{$("#testimonialModal").hidden=true;document.body.classList.remove("modal-open");}));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#testimonialModal")&&!$("#testimonialModal").hidden){$("#testimonialModal").hidden=true;document.body.classList.remove("modal-open");}});
 async function applyEditableContent(){
  if(!client)return;
  const {data}=await client.from("site_content").select("content_key,content");
  (data||[]).forEach(item=>{
   const target=document.querySelector('[data-content-key="'+item.content_key+'"]');
   if(target&&item.content)target.textContent=item.content;
  });
 }
 function visitorId(){
  try{let id=localStorage.getItem("edcarsky-visitor-id");if(!id){id=crypto.randomUUID();localStorage.setItem("edcarsky-visitor-id",id);}return id;}catch(e){return null;}
 }
 async function logConsentedVisit(){
  if(!client||localStorage.getItem("edcarsky-analytics-consent")!=="accepted")return;
  const id=visitorId();if(!id)return;
  const marker="edcarsky-logged-"+location.pathname;
  if(sessionStorage.getItem(marker))return;
  const {error}=await client.from("visitor_events").insert({visitor_id:id,page_path:location.pathname,referrer:document.referrer||null,user_agent:navigator.userAgent,event_type:"page_view"});
  if(!error)sessionStorage.setItem(marker,"1");
 }
 const consent=$("#analyticsConsent");
 if(consent&&client){
  const choice=localStorage.getItem("edcarsky-analytics-consent");
  if(!choice)consent.hidden=false;
  $("#acceptAnalytics")?.addEventListener("click",()=>{localStorage.setItem("edcarsky-analytics-consent","accepted");consent.hidden=true;logConsentedVisit();});
  $("#rejectAnalytics")?.addEventListener("click",()=>{localStorage.setItem("edcarsky-analytics-consent","rejected");consent.hidden=true;});
  if(choice==="accepted")logConsentedVisit();
 }

})();