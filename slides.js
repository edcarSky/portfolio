(() => {
 const hero=document.querySelector("main .hero");
 if(!hero)return;
 const main=hero.parentElement;
 const originalGrid=hero.querySelector(".hero-grid");
 const originalBottom=hero.querySelector(".hero-bottom");
 const deck=document.createElement("section");
 deck.className="intro-deck";
 deck.id="welcome";
 deck.setAttribute("aria-label","Five-part edcarSky portfolio introduction");
 hero.classList.add("deck-slide","is-active");
 hero.dataset.slide="1";
 deck.append(hero);
 const slides=[
  {name:"Professional",kicker:"02 / PROFESSIONAL PROFILE",title:"Lead. Support.<br><em>Deliver.</em>",desc:"Executive administration, operations coordination, IT support and digital operations, backed by international work experience and a practical, service-focused approach.",primary:"Explore professional profile",href:"#professional",secondary:"View CV & documents",href2:"#documents",number:"02"},
  {name:"Content Creator",kicker:"03 / DIGITAL CONTENT CREATOR",title:"Create. Publish.<br><em>Grow.</em>",desc:"A portfolio of creator projects, video production, social platforms, digital promotion programs and channel development work.",primary:"View creator projects",href:"#creator",secondary:"Find my channels",href2:"#social",number:"03"},
  {name:"Family",kicker:"04 / FAMILY & LIFE",title:"Family. Stories.<br><em>Milestones.</em>",desc:"A personal space for family memories, shared experiences and the Familia Thimawah journey, including our 100K YouTube Creator Award milestone.",primary:"Watch family milestone",href:"https://www.youtube.com/watch?v=XgGOPt9qHso",secondary:"Read our journey",href2:"#journey",number:"04"},
  {name:"Team edcarSky",kicker:"05 / TEAM EDCARSKY",title:"100% LEGIT,<br><em>SAFE & ORGANIC.</em>",desc:"Since 2021, Team edcarSky has developed creator-support programs and organic digital promotion workflows, with milestones documented in its program terms.",primary:"View Team achievements",href:"#team-edcarsky",secondary:"Ask about the programs",href2:"https://m.me/edcarSkyglive",number:"05"}
 ];
 slides.forEach((s,i)=>{
  const panel=document.createElement("section");
  panel.className="hero deck-slide";
  panel.dataset.slide=String(i+2);
  panel.setAttribute("aria-label",s.name+" introduction");
  panel.innerHTML='<div class="hero-grid"><div class="hero-copy deck-copy"><div class="deck-kicker">'+s.kicker+'</div><h1 class="deck-title">'+s.title+'</h1><p class="deck-description">'+s.desc+'</p><div class="deck-actions"><a class="button button-light" href="'+s.href+'">'+s.primary+' <span>↗</span></a><a class="button button-outline" href="'+s.href2+'">'+s.secondary+'</a></div></div><aside class="hero-panel"><div class="panel-top"><span>EDCARSKY™ PORTFOLIO</span><span class="panel-icon">✳</span></div><div class="profile-placeholder"><img src="assets/edcar-profile.webp" alt="Edcar Aguirre Tenedero"><small>'+s.name+'</small></div><h2>'+s.name+'</h2><p>Edcar Aguirre Tenedero</p><div class="panel-stats"><div><b>'+s.number+'</b><small>Portfolio section</small></div><div><b>2021</b><small>Digital journey</small></div><div><b>PH</b><small>Philippines</small></div></div></aside></div>';
  deck.append(panel);
 });
 const controls=document.createElement("div");
 controls.className="deck-controls";
 controls.setAttribute("role","group");
 controls.setAttribute("aria-label","Introduction slide controls");
 controls.innerHTML='<button type="button" class="deck-arrow" data-direction="-1" aria-label="Previous slide">‹</button>'+[1,2,3,4,5].map(n=>'<button type="button" class="deck-dot" data-index="'+(n-1)+'" aria-label="Go to slide '+n+'">'+String(n).padStart(2,"0")+'</button>').join("")+'<span class="deck-status" aria-live="polite">01 / 05</span><button type="button" class="deck-arrow" data-direction="1" aria-label="Next slide">›</button>';
 deck.append(controls);
 main.insertBefore(deck,main.firstElementChild);
 let active=0;
 const all=[...deck.querySelectorAll(".deck-slide")];
 const dots=[...controls.querySelectorAll(".deck-dot")];
 const status=controls.querySelector(".deck-status");
 function show(index){
  active=(index+all.length)%all.length;
  all.forEach((node,i)=>{node.classList.toggle("is-active",i===active);node.setAttribute("aria-hidden",i===active?"false":"true");});
  dots.forEach((dot,i)=>dot.setAttribute("aria-current",i===active?"true":"false"));
  status.textContent=String(active+1).padStart(2,"0")+" / 05";
 }
 controls.addEventListener("click",e=>{
  const dot=e.target.closest("[data-index]");
  const arrow=e.target.closest("[data-direction]");
  if(dot)show(Number(dot.dataset.index));
  if(arrow)show(active+Number(arrow.dataset.direction));
 });
 deck.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){show(active+1)}else if(e.key==="ArrowLeft"){show(active-1)}});
 let touchX=0;
 deck.addEventListener("touchstart",e=>{touchX=e.changedTouches[0].clientX},{passive:true});
 deck.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>65)show(active+(dx<0?1:-1))},{passive:true});
 show(0);
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const deckInterval=6000;
 let autoSlide=null;
 const stopAuto=()=>{if(autoSlide){clearInterval(autoSlide);autoSlide=null;}};
 const startAuto=()=>{if(reduceMotion||autoSlide)return;autoSlide=setInterval(()=>show(active+1),deckInterval);};
 const restartAuto=()=>{stopAuto();startAuto();};
 controls.addEventListener("click",e=>{if(e.target.closest("[data-index],[data-direction]"))restartAuto();});
 deck.addEventListener("mouseenter",stopAuto);
 deck.addEventListener("mouseleave",startAuto);
 deck.addEventListener("focusin",stopAuto);
 deck.addEventListener("focusout",e=>{if(!deck.contains(e.relatedTarget))startAuto();});
 deck.addEventListener("touchstart",stopAuto,{passive:true});
 deck.addEventListener("touchend",()=>{stopAuto();startAuto();},{passive:true});
 startAuto();
 const nav=document.querySelector("#mainNav");
 if(nav&&!nav.querySelector('a[href="#team-edcarsky"]')){const a=document.createElement("a");a.href="#team-edcarsky";a.textContent="Team edcarSky";nav.insertBefore(a,nav.querySelector(".nav-cta"));}
 if(!document.querySelector("#team-edcarsky")){
  const team=document.createElement("section");
  team.id="team-edcarsky";
  team.className="team-section";
  team.innerHTML='<div class="team-inner"><img class="team-watermark-logo" src="assets/edcarsky-glive-logo.webp" alt="" aria-hidden="true"><div class="section-kicker">TEAM EDCARSKY™ · SINCE 2021</div><div class="team-heading"><h2>100% LEGIT,<br><em>SAFE & ORGANIC.</em></h2><p data-content-key="team_intro">Creator support, digital promotion and program development built around organic participation, platform policies and sustainable channel activity.</p></div><div class="team-stats"><article class="team-stat"><b>5 Years</b><span>Continuous service since 2021, as stated in the August 2026 program terms</span></article><article class="team-stat"><b>200+</b><span>YouTube channels reported as monetized</span></article><article class="team-stat"><b>3,000+</b><span>Channels reported as assisted through monetization and organic growth programs</span></article><article class="team-stat"><b>~500</b><span>Active and former members reported in the program terms</span></article></div><div class="team-programs"><article class="team-program"><h3>AA+ Programs</h3><p>Creator-support workflows, program operations and digital growth tools.</p></article><article class="team-program"><h3>SSP+ Programs</h3><p>Social sharing and promotional support workflows across digital platforms.</p></article><article class="team-program"><h3>APP+ Programs</h3><p>Application-based creator tools and program features documented in Team edcarSky presentations.</p></article><article class="team-program"><h3>Team edcarSky v5.1.1</h3><p>Program version featured in the Team edcarSky promotional presentation.</p></article></div><div class="team-note">Milestone figures are reproduced from Team edcarSky's August 2026 program terms and are presented as program-reported figures, not independently audited results. The source describes nearly 500 active and former members, not 500+ active clients. Monetization approval, revenue and platform outcomes are not guaranteed and remain subject to each platform&#39;s decisions and the creator&#39;s activity and policy compliance.</div><div class="deck-actions"><a class="button button-dark" href="https://m.me/edcarSkyglive" target="_blank" rel="noopener">Contact Team edcarSky ↗</a><a class="button button-outline-dark" href="https://www.youtube.com/watch?v=JRnKG9kY1cI" target="_blank" rel="noopener">Watch Team introduction ↗</a></div></div>';
  const social=document.querySelector("#social");
  if(social)main.insertBefore(team,social);else main.append(team);
 }
})();
