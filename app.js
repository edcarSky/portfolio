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
   else if(!quotes?.length){host.innerHTML='<div class="testimonial-empty">Recommendations are being prepared for publication. You may read the original LinkedIn recommendations using the link beside this section.</div>';}
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
  if(settings?.value){const hero=$("#heroPhoto");hero.innerHTML="";const img=document.createElement("img");img.src=settings.value;img.alt="Edcar Aguirre Tenedero";img.style.cssText="width:100%;height:100%;object-fit:cover;border-radius:inherit";hero.append(img);}

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
 document.querySelectorAll(".video-thumb img").forEach(img=>img.addEventListener("error",()=>img.closest(".video-thumb")?.classList.add("is-fallback"),{once:true}));
 loadPublicContent();
})();