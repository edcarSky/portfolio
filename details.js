(() => {
  "use strict";
  const descriptions = {
    "Executive & Administrative Support": "More than 20 years of combined experience supporting executives, managers and office teams. Work includes executive assistance, calendar and meeting coordination, correspondence, document preparation, records administration, confidential information handling, follow-ups and day-to-day office support. At Innovative Solutions, supported the CEO and coordinated PMO, HR, sales, IT and logistics matters. Earlier roles included Executive Assistant and Personal Assistant responsibilities at MediVisa, Dar Al Arkan and Fawaz Alhokair. The work requires discretion, accuracy, clear communication and reliable follow-through.",
    "Operations & Project Coordination": "Experience coordinating daily operations and cross-functional work across technology, administration, logistics, HR and customer support. At Innovative Solutions, supported executive office operations and PMO coordination. At MediVisa, assisted claims, operational and compliance workflows. At Dar Al Arkan, supported document control and internal audit processes. At Campus Net Café, handled store operations and IT systems management. Core strengths include tracking actions, organizing records, coordinating stakeholders, preparing reports and keeping operational tasks moving.",
    "IT & Technical Support": "A career foundation in information technology, technical support and business systems. Experience includes IT administration and technical support at Guzman Studio and Asianic, computer operations and payroll systems at Afras, IT and operations support at MediVisa and Innovative Solutions, and store systems management at Campus Net Café. Skills include Windows troubleshooting, desktop and peripheral support, software and hardware assistance, user support, basic web technologies, website administration and coordination with technical teams. Tools and technologies include Microsoft Office, Google Workspace, Windows, WordPress, HTML, CSS, PHP and MySQL.",
    "HR & Document Administration": "Hands-on experience in HR administration, payroll coordination, employee records and document control. At Afras, the role progressed from Applebee’s front-of-house service to Computer Operator and HR Compensation and Payroll Officer duties. At Fawaz Alhokair, supported HR compensation and benefits administration. At Dar Al Arkan, handled executive support and document-control work, including organized records and internal audit support. At MediVisa and Innovative Solutions, provided additional HR and administrative coordination.",
    "Logistics & Customer Operations": "Experience spans customer-facing hospitality, service operations, administrative logistics and coordination. At Applebee’s Riyadh, handled guest service, POS order entry, food and beverage service, table maintenance, payments and cash handling. Other roles involved logistics support, operational coordination, customer communication, inventory-related follow-through and office administration. This combination supports site administration, warehouse and logistics support, hospitality and general operations roles.",
    "Digital Content & Web": "Since 2021, independent digital operations and creator-support activity has included channel management, content publishing, social media workflows, online promotion and website administration. Self-reported activity includes support for 500+ channels, 200+ monetization outcomes and 2,000+ promotional projects. These are creator-program activity figures, not salaried employment figures. Tools include Photoshop, Canva, CapCut, Movavi, Premiere Pro, OBS and Streamlabs, alongside web and social-platform workflows.",
    "Years of combined work experience": "Career history includes local and overseas employment across IT, administration, HR, hospitality, document control, logistics and operations, including approximately 15 years working in Riyadh, Saudi Arabia. Roles include Campus Net Café, Asianic, Guzman Studio, Afras and Applebee’s, Fawaz Alhokair, Dar Al Arkan, MediVisa and Innovative Solutions. From January 2021, independent online and digital operations work followed the pandemic-era shift to remote projects. The current BiTL Software Development Services designation, Business Partner and Executive Technology Advisor from June 2026, is an unpaid advisory engagement supporting a family startup, not salaried employment.",
    "5 Years": "Team edcarSky creator-support activity began in 2021. The work has developed around creator education, channel analytics, organic content promotion, audience development, monetization readiness and channel recovery support. The five-year milestone refers to the period from 2021 through 2026.",
    "500+": "Team edcarSky reports support and management activity involving more than 500 YouTube channels since 2021. This figure describes cumulative creator-support activity and should not be read as 500 active managed accounts at the same time.",
    "200+": "Team edcarSky reports that more than 200 channels received support through monetization-related work. Platform approval and monetization decisions remain with the platform. The figure describes supported outcomes, not a guarantee for future participants.",
    "2,000+": "More than 2,000 channel or content promotion activities have been reported through Team edcarSky organic programs. Promotion focuses on content discovery and distribution. It does not mean guaranteed views, subscribers, watch hours or revenue.",
    "100+": "In 2026, Team edcarSky reported supporting more than 100 demonetized channels through repair and recovery work. Support includes reviewing channel issues, policy-aware guidance and recovery steps. YouTube independently reviews appeals and decides whether monetization is restored.",
    "Verified YouTube Channels": "Selected creator outcomes include clients whose YouTube channels achieved the platform's verification milestone. Verification is decided by YouTube and is not issued or controlled by Team edcarSky.",
    "1.8M+ Views": "A client content milestone reported by Team edcarSky exceeded 1.8 million views. This is an individual campaign or content outcome. Results vary by channel, topic, audience and platform distribution.",
    "8 Months Continuous Earning": "A reported client outcome involved eight consecutive months of earnings while participating in organic programs. This is an individual historical result, not a promise of income or a typical result for every creator.",
    "AA+ Programs": "AA+ is Team edcarSky's proprietary analytics and channel-activation framework. It combines channel and content diagnostics, audience fit, topic research, title and thumbnail packaging, opening-hook review, retention, engagement, traffic-source review, returning-viewer analysis, SEO and monetization readiness. The goal is to help creators understand performance signals and make informed content decisions across YouTube, Facebook, TikTok and other supported platforms. Platforms control their own discovery, ranking and monetization systems. No outcome is guaranteed.",
    "SSP+ Programs": "SSP+ means Social Sharing and Promotion. It provides structured campaign planning, audience discovery, selected-video promotion, social distribution workflows and post-campaign performance review. The approach emphasizes genuine discovery and transparent activity. Team edcarSky does not sell bots, fake subscribers, artificial watch hours or engagement manipulation. Organic and paid activity should be clearly distinguished, and platform systems decide which activity qualifies.",
    "SUB+ / FF+ Programs": "SUB+ and FF+ refer to subscriber and follower/fan audience-development support. The focus is on channel and profile presentation, audience-fit review, content discovery planning, publishing consistency, clear calls to action and performance review across supported platforms. This is not sub-for-sub or follow-for-follow exchange. No purchased followers, bots, automated interactions or guaranteed follower counts are offered. Each platform independently validates its audience and engagement.",
    "WH+ Watchtime Program": "WH+ focuses on watchtime-related content strategy and viewer retention. Support includes topic and format planning, opening hooks, pacing, playlists and series structure, accessible titles and thumbnails, distribution planning and retention analysis. It does not sell or promise watch hours, use forced or incentivized viewing, automated playback, repeated self-views or ad interactions. Platforms determine which views and watch hours qualify for analytics and monetization.",
    "APP+ Programs": "APP+ is part of the Team edcarSky creator-program ecosystem and refers to application-based creator tools, participation features and workflows that support access to services. The program overview is featured in the Team edcarSky v5.1.1 presentation. Specific features, availability and requirements depend on the published program terms.",
    "Free Monetization & Recovery Support": "Practical support for eligible creators preparing for monetization, understanding channel issues and working through demonetization recovery steps. Support includes channel-readiness checks, policy-aware content review, guidance on genuine audience development and help understanding appeal or recovery processes. Platforms make all final eligibility, monetization and appeal decisions.",
    "Team edcarSky Milestones": "Team edcarSky began its creator-support activity in 2021. Reported cumulative milestones include 500+ channels supported, 200+ channels assisted through monetization, 2,000+ promotion activities and 100+ demonetized-channel recovery cases supported in 2026. These are self-reported program activity figures. Individual outcomes vary and platform decisions remain independent.",
    "edcarSky™ g! live": "edcarSky™ g! live is the family-vlog and creator community channel associated with Team edcarSky. Content includes family life, travel around CALABARZON and Quezon Province, local food, culture, nature views and creator-related updates. The channel also documents family milestones, including the Familia Thimawah 100K Creator Award story."
  };
  const modal = document.createElement("div");
  modal.className = "detail-modal";
  modal.id = "portfolioDetailModal";
  modal.hidden = true;
  modal.innerHTML = '<div class="detail-backdrop" data-detail-close></div><section class="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detailModalTitle"><button class="detail-close" type="button" aria-label="Close details" data-detail-close>×</button><span class="detail-eyebrow">EDCARSKY PORTFOLIO · FULL DETAILS</span><h2 id="detailModalTitle"></h2><div class="detail-modal-body" id="detailModalBody"></div></section>';
  document.body.append(modal);
  const titleEl = modal.querySelector("#detailModalTitle");
  const bodyEl = modal.querySelector("#detailModalBody");
  let previousFocus = null;
  function close() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }
  function open(title, description, trigger) {
    previousFocus = trigger || document.activeElement;
    titleEl.textContent = title;
    bodyEl.textContent = description;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".detail-close").focus();
  }
  modal.querySelectorAll("[data-detail-close]").forEach(el => el.addEventListener("click", close));
  modal.querySelector(".detail-close").addEventListener("click", close);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
  const selectors = [
    ".expertise-grid article", ".career-note",
    ".community-milestone-grid article", ".client-success-grid article",
    ".community-teaser", ".join-team-program", ".community-channel-description"
  ];
  document.querySelectorAll(selectors.join(",")).forEach(card => {
    const heading = card.querySelector("h3,strong");
    const title = (heading?.textContent || card.textContent).trim().replace(/\s+/g, " ");
    const key = Object.keys(descriptions).find(k => title.includes(k));
    if (!key) return;
    card.classList.add("detail-clickable");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Read full details: " + key);
    const launch = event => {
      if (event.target.closest("a,button")) return;
      event.preventDefault();
      open(key, descriptions[key], card);
    };
    card.addEventListener("click", launch);
    card.addEventListener("keydown", event => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") launch(event);
    });
    const details = card.querySelector("details.community-more");
    if (details) {
      const summary = details.querySelector("summary");
      summary?.addEventListener("click", event => {
        event.preventDefault();
        open(key, descriptions[key], summary);
      });
    }
  });
  const milestones = document.querySelector(".community-milestone-panel");
  if (milestones) {
    milestones.classList.add("detail-clickable");
    const heading = milestones.querySelector(".community-milestone-heading");
    heading?.setAttribute("role", "button");
    heading?.setAttribute("tabindex", "0");
    heading?.setAttribute("aria-haspopup", "dialog");
    heading?.addEventListener("click", () => open("Team edcarSky Milestones", descriptions["Team edcarSky Milestones"], heading));
    heading?.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open("Team edcarSky Milestones", descriptions["Team edcarSky Milestones"], heading); }});
  }
  document.querySelectorAll(".video-card").forEach(card => {
    const title = card.querySelector("h3")?.textContent.trim();
    if (!title) return;
    const p = card.querySelector(".video-info p")?.textContent.trim() || "";
    const small = card.querySelector(".video-info small")?.textContent.trim() || "";
    card.setAttribute("aria-label", title + ". Opens the featured video.");
  });
})();