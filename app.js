(() => {
 const $=s=>document.querySelector(s),cfg=window.PORTFOLIO_CONFIG||{};
 const configured=cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_URL.includes("PASTE_")&&!cfg.SUPABASE_ANON_KEY.includes("PASTE_");
 const client=configured&&window.supabase?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
 $("#year").textContent=new Date().getFullYear();
 const visitorCounter=$("#visitorCount");
 const loadVisitorCount=async()=>{
  if(!visitorCounter)return;
  visitorCounter.textContent="Loading";
  try{
   const response=await fetch("https://edcarsky.goatcounter.com/counter/TOTAL.json",{mode:"cors",cache:"no-store"});
   if(!response.ok)throw new Error("Public counter endpoint returned "+response.status);
   const data=await response.json();
   if(typeof data.count!=="string"&&typeof data.count!=="number")throw new Error("Counter response is missing count");
   visitorCounter.textContent=String(data.count);
  }catch(error){
   let attempts=0;
   const retry=setInterval(()=>{
    attempts++;
    if(window.goatcounter?.visit_count){
     clearInterval(retry);visitorCounter.replaceChildren();
     try{window.goatcounter.visit_count({append:"#visitorCount",path:"TOTAL",type:"html",no_branding:true});}
     catch(e){visitorCounter.textContent="Counter unavailable";}
    }else if(attempts>=30){
     clearInterval(retry);visitorCounter.textContent="Enable public counter";
     visitorCounter.title="In GoatCounter settings, enable Allow adding visitor counts on your website.";
    }
   },200);
  }
 };
 loadVisitorCount();
 $("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
 document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));
 const themes=["navy","forest","charcoal","burgundy","slate"];
 function applyTheme(name){document.body.dataset.theme=themes.includes(name)?name:"navy";try{localStorage.setItem("edcarsky-theme",document.body.dataset.theme);}catch(e){}}
 let current="navy";try{current=localStorage.getItem("edcarsky-theme")||"navy";}catch(e){}
 applyTheme(current);
 $("#themeRefresh").addEventListener("click",()=>{const choices=themes.filter(x=>x!==document.body.dataset.theme);applyTheme(choices[Math.floor(Math.random()*choices.length)]);});
 async function loadPublicContent(){
  if(!client){$("#formMessage").textContent="Inquiry form setup is pending. Please contact me through WhatsApp, Messenger or email for now.";return;}
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
 
 const documentAuthModal=$("#documentAuthModal");
 let requestedDocument={type:null,action:null};
 const documentAuthStatus=$("#documentAuthStatus");
 const documentAuthResult=$("#documentAuthResult");
 const deliverDocument=async(intent)=>{
  if(!client||!intent?.type||!intent?.action)return;
  if(documentAuthResult){documentAuthResult.hidden=true;documentAuthResult.removeAttribute("href");}
  if(documentAuthStatus)documentAuthStatus.textContent="Checking your sign-in and preparing a time-limited document link...";
  const {data:{user},error:userError}=await client.auth.getUser();
  if(userError||!user){
   if(documentAuthStatus)documentAuthStatus.textContent="Please sign in with Google or Facebook to continue.";
   return;
  }
  const {data:doc,error:docError}=await client.from("public_documents")
   .select("document_type,display_name,storage_path")
   .eq("document_type",intent.type).eq("is_published",true).maybeSingle();
  if(docError||!doc){
   if(documentAuthStatus)documentAuthStatus.textContent=intent.type==="cover_letter"?"The cover letter file is not uploaded to private document storage yet. Please check back after the owner publishes it.":"The requested document is not published yet.";
   return;
  }
  const options=intent.action==="download"?{download:doc.display_name}:undefined;
  const {data:signed,error:signedError}=await client.storage.from("portfolio-documents").createSignedUrl(doc.storage_path,180,options);
  if(signedError||!signed?.signedUrl){
   if(documentAuthStatus)documentAuthStatus.textContent="The document link could not be created. Please try again or contact the portfolio owner.";
   return;
  }
  if(documentAuthResult){
   documentAuthResult.href=signed.signedUrl;
   documentAuthResult.textContent=intent.action==="download"?"Download "+(intent.type==="cv"?"CV":"Cover Letter")+" ↓":"Open "+(intent.type==="cv"?"CV":"Cover Letter")+" ↗";
   documentAuthResult.hidden=false;
  }
  if(documentAuthStatus)documentAuthStatus.textContent="Identity verified. This private document link expires in 3 minutes.";
 };
 const openDocumentAuth=(type,action)=>{
  requestedDocument={type,action};
  if(!documentAuthModal)return;
  const label=type==="cv"?"Curriculum Vitae":"Professional Cover Letter";
  $("#documentAuthTitle").textContent=(action==="download"?"Connect to download your ":"Connect to view your ")+label+".";
  $("#documentAuthDescription").textContent="Connect with Google, Facebook, TikTok or Instagram to verify your identity before viewing or downloading this document. Your social account is not displayed publicly.";
  if(documentAuthStatus)documentAuthStatus.textContent="One account is enough. You do not need to connect all platforms.";
  documentAuthModal.hidden=false;
  document.body.classList.add("modal-open");
  documentAuthModal.querySelector(".document-auth-close")?.focus();
  if(client)client.auth.getUser().then(({data,error})=>{if(!error&&data?.user)deliverDocument(requestedDocument);});
 };
 document.querySelectorAll("[data-document-action]").forEach(button=>{
  button.addEventListener("click",()=>openDocumentAuth(button.dataset.documentType,button.dataset.documentAction));
 });
 const closeDocumentAuth=()=>{
  if(documentAuthModal&&!documentAuthModal.hidden){
   documentAuthModal.hidden=true;
   document.body.classList.remove("modal-open");
  }
 };
 document.querySelectorAll("[data-close-document-auth]").forEach(button=>button.addEventListener("click",closeDocumentAuth));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")closeDocumentAuth();});
 document.querySelectorAll("[data-doc-oauth-provider]").forEach(button=>{
  button.addEventListener("click",async()=>{
   const provider=button.dataset.docOauthProvider;
   if(button.disabled)return;
   if(!client){
    if(documentAuthStatus)documentAuthStatus.textContent="Secure social sign-in is not active until Supabase is configured.";
    return;
   }
   if(!["google","facebook","linkedin_oidc","custom:tiktok","custom:instagram"].includes(provider)){
    if(documentAuthStatus)documentAuthStatus.textContent="This provider is not supported by the current sign-in configuration.";
    return;
   }
   if(documentAuthStatus)documentAuthStatus.textContent="Connecting securely. Complete the sign-in on the provider page.";
   try{sessionStorage.setItem("edcarsky-document-intent",JSON.stringify(requestedDocument));}catch(e){}
   const options={redirectTo:window.location.origin+window.location.pathname+"#documents"};
   if(provider==="google")options.scopes="email profile";
   if(provider==="facebook")options.scopes="email public_profile";
   if(provider==="linkedin_oidc")options.scopes="openid profile email";
   const {error}=await client.auth.signInWithOAuth({provider,options});
   if(error&&documentAuthStatus)documentAuthStatus.textContent="Sign-in could not start: "+error.message;
  });
 });
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
   if(event==="SIGNED_IN"&&session?.user){
    applySocialProfile(session.user);
    let intent=null;
    try{intent=JSON.parse(sessionStorage.getItem("edcarsky-document-intent")||"null");sessionStorage.removeItem("edcarsky-document-intent");}catch(e){}
    if(intent&&documentAuthModal){
     requestedDocument=intent;
     documentAuthModal.hidden=false;
     document.body.classList.add("modal-open");
     Promise.resolve().then(()=>deliverDocument(intent));
    }
   }
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
 const portfolioUrl="https://edcarsky.github.io/portfolio/";
 const starterMessage="Hi Edcar, I am here at your Professional Online Portfolio. I have a question to ask.";
 const copyStarterMessage=async()=>{try{await navigator.clipboard.writeText(starterMessage);return true;}catch(e){return false;}};
 document.querySelectorAll("[data-copy-message]").forEach(link=>link.addEventListener("click",async()=>{if(await copyStarterMessage())link.title="Message copied. Paste it into the chat if it does not appear automatically.";}));
 const aiToggle=$("#aiDemoToggle"),aiPanel=$("#aiDemoPanel"),shareToggle=$("#sharePortfolioToggle"),sharePanel=$("#sharePortfolioPanel");
 const aiChatForm=$("#aiChatForm"),aiChatInput=$("#aiChatInput"),aiChatMessages=$("#aiChatMessages"),aiChatStatus=$("#aiChatStatus"),aiChatSend=$("#aiChatSend"),aiChatClose=$("#aiChatClose");
 let aiChatHistory=[];
 const addAiChatMessage=(role,message)=>{const bubble=document.createElement("div");bubble.className="ai-chat-bubble "+role;bubble.textContent=message;aiChatMessages?.append(bubble);if(aiChatMessages)aiChatMessages.scrollTop=aiChatMessages.scrollHeight;};
 const openAiChat=()=>{if(!aiPanel)return;aiPanel.hidden=false;if(sharePanel)sharePanel.hidden=true;aiChatInput?.focus();};
 aiToggle?.addEventListener("click",()=>aiPanel?.hidden?openAiChat():(aiPanel.hidden=true));
 aiChatClose?.addEventListener("click",()=>{if(aiPanel)aiPanel.hidden=true;});
 aiChatForm?.addEventListener("submit",async event=>{
  event.preventDefault();
  const message=aiChatInput?.value.trim()||"";
  if(!message||!client||!aiChatSend)return;
  addAiChatMessage("user",message);aiChatInput.value="";aiChatSend.disabled=true;
  if(aiChatStatus)aiChatStatus.textContent="Thinking...";
  try{
   const {data,error}=await client.functions.invoke("portfolio-ai-chat",{body:{message,history:aiChatHistory}});
   if(error)throw error;
   if(data?.error)throw new Error(data.error);
   const answer=String(data?.answer||"I did not receive a response. Please try again.");
   aiChatHistory.push({role:"user",text:message},{role:"model",text:answer});aiChatHistory=aiChatHistory.slice(-8);
   addAiChatMessage("bot",answer);
   if(aiChatStatus)aiChatStatus.textContent="Connected · "+(data.model||"Gemini")+". Public information only.";
  }catch(error){
   const detail=String(error?.message||"");
   const friendly=detail.includes("GEMINI_API_KEY")||detail.includes("Gemini is not connected")?"AI service setup is incomplete. The owner needs to add the Gemini API key to Supabase Edge Function Secrets.":detail.includes("429")||detail.toLowerCase().includes("quota")?"Gemini Free Tier limit reached. Please try again later. No paid service will be used.":"The AI service did not respond. Please try again later.";
   addAiChatMessage("bot",friendly);
   if(aiChatStatus)aiChatStatus.textContent="Request not completed.";
  }finally{aiChatSend.disabled=false;aiChatInput?.focus();}
 });
 shareToggle?.addEventListener("click",async()=>{
   if(aiPanel)aiPanel.hidden=true;
   const shareData={title:"edcarSky Professional Online Portfolio",text:"Visit edcarSky Professional Online Portfolio.",url:portfolioUrl};
   if(navigator.share){
     try{await navigator.share(shareData);if(sharePanel)sharePanel.hidden=true;}
     catch(error){if(error?.name!=="AbortError"&&sharePanel)sharePanel.hidden=false;}
   }else if(sharePanel){sharePanel.hidden=!sharePanel.hidden;}
 });
 $("#copyPortfolioLink")?.addEventListener("click",async()=>{const button=$("#copyPortfolioLink");try{await navigator.clipboard.writeText(portfolioUrl);button.textContent="Link copied";}catch(e){button.textContent="Copy unavailable in this browser";}});
 document.addEventListener("click",event=>{if(!event.target.closest(".floating-contact")){if(aiPanel)aiPanel.hidden=true;if(sharePanel)sharePanel.hidden=true;}});
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
  document.addEventListener("testimonial-modal-closed",schedule);
  const render=(index)=>{
   clearTimeout(rotationTimer);
   lastIndex=index;
   const q=quotes[index];
   const card=document.createElement("article");
   card.className="testimonial-card testimonial-card-selectable";
   card.setAttribute("aria-live","polite");
   card.setAttribute("role","group");
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