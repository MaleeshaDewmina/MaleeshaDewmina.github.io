/* Ten project-cover mockups constructed from original portfolio gallery screenshots.
   The cover frames are decorative. Gallery screenshots and original project links remain unchanged. */
(() => {
  "use strict";
  const projects=Array.isArray(window.PORTFOLIO_PROJECTS)?window.PORTFOLIO_PROJECTS:[];
  const catalogue={
    "EduMindAI-Learning-Assistant":{theme:"violet",variant:"panels",primary:0,secondary:2,subtitle:"AI · STUDY SUPPORT"},
    "HealthTrack-Pro":{theme:"teal",variant:"panels",primary:0,secondary:1,subtitle:"FITNESS MANAGEMENT"},
    "SmartMedERP-Pharmacy-Management-System":{theme:"blue",variant:"desktop",primary:0,secondary:1,subtitle:"PHARMACY ERP"},
    "SRMSS-ASE-Coursework":{theme:"sky",variant:"panels",primary:2,secondary:3,subtitle:"ROUTES & SCHEDULING"},
    "Student_AI_Pro":{theme:"indigo",variant:"panels",primary:1,secondary:2,subtitle:"AI STUDENT ASSISTANT"},
    "AI-Chatbots-Student-Motivation-Research":{theme:"lilac",variant:"research",primary:0,secondary:3,subtitle:"ACADEMIC RESEARCH"},
    "Dream-Book-Shop-Application":{theme:"amber",variant:"analytics",primary:0,secondary:1,subtitle:"PYTHON DATA ANALYSIS"},
    "Doctor-Channelling-System":{theme:"slate",variant:"desktop",primary:2,secondary:3,subtitle:"JAVA CONSOLE SYSTEM"},
    "Velvet-Vogue-Clothing-Website":{theme:"rose",variant:"panels",primary:0,secondary:1,subtitle:"E-COMMERCE WEBSITE"},
    "Fresh-Grocers-Online-Ordering-System":{theme:"green",variant:"panels",primary:0,secondary:1,subtitle:"GROCERY WEB PROTOTYPE"}
  };
  const escapeHTML=(value)=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const safeImage=(url)=>{
    if(typeof url!=="string")return "";
    if(/^https:\/\/(?:raw\.githubusercontent\.com|github\.com\/user-attachments\/assets)\/[A-Za-z0-9/._%-]+$/.test(url))return url;
    if(/^assets\/[A-Za-z0-9/._%-]+$/.test(url))return url;
    return "";
  };
  function markup(p,conf){
    const images=Array.isArray(p.gallery)?p.gallery:[];
    const get=(i)=>safeImage(images[i]?.src || "");
    const main=get(conf.primary)||safeImage(p.img);
    const secondary=get(conf.secondary)||get(1)||main;
    if(!main)return "";
    // Panel variants display another real screenshot, not a fabricated mobile UI.
    const variant=conf.variant;
    const text=escapeHTML(p.title);
    const image=(src,alt)=>'<img src="'+escapeHTML(src)+'" alt="'+escapeHTML(alt)+'" loading="lazy" decoding="async">';
    return '<div class="device-cover theme-'+conf.theme+' variant-'+variant+'" role="img" aria-label="Project cover for '+text+' showing real screenshots in a desktop device and a secondary screenshot panel">'+
      '<span class="device-decor-dot" aria-hidden="true"></span><span class="device-decor-spark" aria-hidden="true">✳</span>'+
      '<div class="device-laptop" aria-hidden="true"><div class="device-laptop-display"><span class="device-laptop-camera"></span><div class="device-laptop-screen">'+image(main,p.title+' main project screenshot')+'</div></div><div class="device-laptop-foot"></div></div>'+
      '<div class="device-secondary" aria-hidden="true"><div class="device-secondary-screen">'+image(secondary,p.title+' secondary project screenshot')+'</div></div>'+
      '<div class="device-project-label" aria-hidden="true"><span>'+text+'</span><span>'+escapeHTML(conf.subtitle)+'</span></div>'+
      '</div>';
  }
  function apply(){
    const cards=Array.from(document.querySelectorAll('#project-grid .project-card'));
    projects.forEach((project,index)=>{
      const conf=catalogue[project.repo];
      if(!conf || !cards[index])return;
      const target=cards[index].querySelector('.project-image');
      const cover=markup(project,conf);
      if(!target||!cover)return;
      target.classList.add('has-device-cover');
      target.classList.remove('no-image');
      Array.from(target.children).filter(child=>!child.classList.contains('project-image-top')).forEach(child=>child.remove());
      target.insertAdjacentHTML('afterbegin',cover);
    });
    ["EduMindAI-Learning-Assistant","HealthTrack-Pro","SmartMedERP-Pharmacy-Management-System"].forEach((repo,index)=>{
      const project=projects.find(p=>p.repo===repo);
      const featured=document.querySelectorAll('#featured .featured-card')[index];
      const target=featured?.querySelector('.featured-visual');
      if(!project||!target)return;
      const cover=markup(project,catalogue[repo]);
      if(!cover)return;
      target.classList.add('has-device-cover');
      // Retain the existing small project type label.
      const label=target.querySelector('.feature-visual-label');
      target.replaceChildren();
      target.insertAdjacentHTML('afterbegin',cover);
      if(label)target.appendChild(label);
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});
  else apply();
})();