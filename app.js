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
  if(assetMap.asset_team_logo){document.querySelectorAll(".community-logo-image").forEach(img=>img.src=assetMap.asset_team_logo);document.querySelectorAll(".team-watermark-logo").forEach(img=>img.src=assetMap.asset_team_logo);}
  {const thumb=document.querySelector("#mainChannelThumbnail");if(thumb&&assetMap.asset_video_thumbnail)thumb.src=assetMap.asset_video_thumbnail;}
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
 loadPublicContent();
 renderTestimonials();
 applyEditableContent();

 async function renderTestimonials(){
  const host=$("#testimonials");
  if(!host)return;
  const linkedinUrl="https://www.linkedin.com/in/edcarsky/details/recommendations/?detailScreenTabIndex=2";
  let archived=[];
  try{
   const response=await fetch("testimonials.json?v=20261124-1",{cache:"no-store"});
   if(response.ok){
    const rows=await response.json();
    archived=(Array.isArray(rows)?rows:[]).filter(q=>q.visibility==="On"&&q.name&&q.text).map(q=>({
     display_name:q.name,
     affiliation:q.role||"",
     company:"",
     message:q.text,
     date:q.date||"",
     truncated:!!q.truncated,
     source:"LinkedIn"
    }));
   }
  }catch(error){console.warn("LinkedIn recommendation archive unavailable",error);}
  let approved=[];
  if(client){
   const {data,error}=await client.from("testimonials")
    .select("display_name,affiliation,company,message,created_at")
    .eq("status","approved").eq("publication_consent",true)
    .order("created_at",{ascending:false});
   if(!error&&Array.isArray(data)){
    approved=data.filter(q=>q.display_name&&q.message).map(q=>({
     display_name:q.display_name,
     affiliation:q.affiliation||"",
     company:q.company||"",
     message:q.message,
     date:"",
     truncated:false,
     source:"Website"
    }));
   }
  }
  const seen=new Set();
  const quotes=[...archived,...approved].filter(q=>{
   const key=(q.display_name+"|"+q.message).toLowerCase();
   if(seen.has(key))return false;
   seen.add(key);return true;
  });
  if(!quotes.length){
   host.innerHTML='<div class="testimonial-empty"><strong>Professional recommendations</strong><span>The saved LinkedIn recommendation archive is temporarily unavailable. Please use the original LinkedIn recommendations page.</span><a href="'+linkedinUrl+'" target="_blank" rel="noopener">Open LinkedIn recommendations ↗</a></div>';
   return;
  }
  let deck=[],lastIndex=-1,rotationTimer=null,paused=false;
  const refillDeck=()=>{
   deck=quotes.map((_,i)=>i).filter(i=>i!==lastIndex);
   for(let i=deck.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
   }
  };
  const nextIndex=()=>{
   if(!deck.length)refillDeck();
   return deck.pop();
  };
  const schedule=()=>{
   if(paused||quotes.length<2)return;
   clearTimeout(rotationTimer);
   rotationTimer=setTimeout(()=>render(nextIndex()),5000+Math.floor(Math.random()*2001));
  };
  const render=(index)=>{
   clearTimeout(rotationTimer);
   lastIndex=index;
   const q=quotes[index];
   const card=document.createElement("article");
   card.className="testimonial-card testimonial-card-selectable";
   card.setAttribute("aria-live","polite");
   card.setAttribute("role","button");
   card.tabIndex=0;
   const heading=document.createElement("div");
   heading.className="testimonial-label";
   heading.textContent=q.truncated?"LINKEDIN RECOMMENDATION · EXCERPT":"LINKEDIN RECOMMENDATION";
   const quoteMark=document.createElement("span");
   quoteMark.className="testimonial-quote-mark";
   quoteMark.setAttribute("aria-hidden","true");
   quoteMark.textContent="“";
   const quote=document.createElement("blockquote");
   quote.textContent=q.message;
   const name=document.createElement("b");
   name.textContent=q.display_name;
   const meta=document.createElement("small");
   meta.textContent=[q.affiliation,q.company,q.date].filter(Boolean).join(" · ");
   const modal=$("#testimonialModal");
   const openFullComment=()=>{
    if(!modal)return;
    clearTimeout(rotationTimer);
    $("#testimonialModalTitle").textContent="Recommendation from "+q.display_name;
    $("#testimonialModalQuote").textContent=q.message;
    $("#testimonialModalAuthor").textContent=[q.display_name,q.affiliation,q.company,q.date,q.truncated?"LinkedIn excerpt":"LinkedIn recommendation"].filter(Boolean).join(" · ");
    modal.hidden=false;
    document.body.classList.add("modal-open");
    modal.querySelector(".testimonial-modal-close")?.focus();
   };
   card.setAttribute("aria-label","Open full professional feedback from "+q.display_name);
   card.addEventListener("click",openFullComment);
   card.addEventListener("keydown",event=>{
    if(event.target!==card)return;
    if(event.key==="Enter"||event.key===" "){event.preventDefault();openFullComment();}
   });
   const controls=document.createElement("div");
   controls.className="testimonial-controls";
   controls.addEventListener("click",event=>event.stopPropagation());
   controls.addEventListener("keydown",event=>event.stopPropagation());
   const pauseButton=document.createElement("button");
   pauseButton.type="button";
   pauseButton.textContent=paused?"Resume rotation":"Pause rotation";
   pauseButton.setAttribute("aria-pressed",String(paused));
   pauseButton.addEventListener("click",()=>{
    paused=!paused;
    pauseButton.textContent=paused?"Resume rotation":"Pause rotation";
    pauseButton.setAttribute("aria-pressed",String(paused));
    if(paused)clearTimeout(rotationTimer);else schedule();
   });
   const nextButton=document.createElement("button");
   nextButton.type="button";
   nextButton.textContent="Next recommendation";
   nextButton.addEventListener("click",()=>render(nextIndex()));
   const sourceLink=document.createElement("a");
   sourceLink.href=linkedinUrl;
   sourceLink.target="_blank";
   sourceLink.rel="noopener";
   sourceLink.textContent="View on LinkedIn ↗";
   sourceLink.className="testimonial-source-link";
   controls.append(pauseButton,nextButton,sourceLink);
   const readHint=document.createElement("span");
   readHint.className="testimonial-read-hint";
   readHint.textContent="Select to read full comment ↗";
   card.append(heading,quoteMark,quote,name,meta,readHint,controls);
   host.replaceChildren(card);
   schedule();
  };
  render(nextIndex());
 }
 function escText(value){return String(value??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
 const closeTestimonialModal=()=>{
  const modal=$("#testimonialModal");
  if(modal&&!modal.hidden){
   modal.hidden=true;
   document.body.classList.remove("modal-open");
   document.dispatchEvent(new Event("testimonial-modal-closed"));
  }
 };
 document.querySelectorAll("[data-close-testimonial]").forEach(x=>x.addEventListener("click",closeTestimonialModal));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeTestimonialModal();});
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