/* V3 — grounded screenshot walkthroughs and optional lightweight visual polish. */
(()=>{
 'use strict';
 const allProjects=Array.isArray(window.PORTFOLIO_PROJECTS)?window.PORTFOLIO_PROJECTS:[];
 const $=id=>document.getElementById(id);
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const configs=[
  {index:1,kicker:'ASP.NET MVC / WELLNESS',intro:'Client dashboard → analytics → AI fitness coach screens',
   steps:[{index:0,note:'The client dashboard screenshot shows how the fitness platform presents information to a signed-in user.'},{index:1,note:'The progress analytics screenshot documents a visual reporting view in the project.'},{index:2,note:'The repository includes this AI fitness coach interface screenshot. Open the source image to inspect its actual details.'}]},
  {index:2,kicker:'C# / PHARMACY MANAGEMENT',intro:'Admin overview → inventory → customer ordering',
   steps:[{index:0,note:'The admin dashboard screenshot provides an overview of the desktop application interface.'},{index:13,note:'The medicine management screen is evidence of the project’s inventory-management workflow.'},{index:5,note:'The customer cart screenshot shows a step in the ordering experience.'},{index:4,note:'The checkout screenshot documents the purchase workflow interface.'}]},
  {index:10,kicker:'PHP / E-COMMERCE',intro:'Store homepage → products → item detail → cart',
   steps:[{index:0,note:'A real screenshot from the WDD project report shows the store homepage and category navigation.'},{index:1,note:'The all-products view showcases the website catalogue and its visual layout.'},{index:2,note:'The product detail screenshot shows how an individual product is presented.'},{index:4,note:'The shopping cart screenshot captures another step in the shopping experience.'}]}
 ];
 const grid=$('walkthrough-grid');const dialog=$('walkthrough-dialog');
 if(!grid||!dialog)return;
 const getProject=conf=>allProjects[conf.index];
 let activeConfig=0,activeStep=0,returnFocus=null;
 // Project image content is drawn from the original data; no invented screenshots.
 grid.innerHTML=configs.map((conf,i)=>{
   const p=getProject(conf),image=p?.gallery?.[conf.steps[0].index]?.src||'';
   return `<article class="walkthrough-card" data-tour-card="${i}">
     <div class="walkthrough-visual"><img loading="lazy" decoding="async" src="${escapeHTML(image)}" alt="${escapeHTML(p?.title||'')} project preview"><div class="walkthrough-visual-fallback" aria-hidden="true">${escapeHTML(p?.initials||'◈')}</div><span class="walkthrough-tag">REAL PROJECT SCREENSHOTS</span></div>
     <div class="walkthrough-content"><span class="walkthrough-eyebrow">TOUR 0${i+1} / ${conf.steps.length} SCREENS</span><h3>${escapeHTML(p?.title)}</h3><p>${escapeHTML(conf.intro)}</p><button type="button" class="walkthrough-start" data-tour-open="${i}">Explore walkthrough <span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></button></div>
   </article>`;
 }).join('');
 grid.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.closest('.walkthrough-card')?.setAttribute('data-preview-failed','true')));
 function showStep(){
   const conf=configs[activeConfig],p=getProject(conf),step=conf.steps[activeStep],media=p?.gallery?.[step.index];
   if(!media)return;
   $('tour-dialog-heading').textContent=p.title;
   $('tour-dialog-subtitle').textContent=conf.intro;
   $('tour-step-index').textContent=`SCREEN ${activeStep+1} / ${conf.steps.length} · ${conf.kicker}`;
   $('tour-step-title').textContent=media.label||'Project screenshot';
   $('tour-step-description').textContent=step.note;
   $('tour-image-source').textContent=[media.kind,media.source].filter(Boolean).join(' · ');
   $('tour-image').hidden=false;
   $('tour-image-fallback').hidden=true;
   $('tour-image').src=media.src;
   $('tour-image').alt=media.alt||`${media.label} for ${p.title}`;
   $('tour-open-image').href=media.src;
   $('tour-open-repo').href=p.url;
   $('tour-open-repo').hidden=Boolean(p.private);
   $('tour-progress-fill').style.width=`${100*(activeStep+1)/conf.steps.length}%`;
   $('tour-prev').disabled=activeStep===0;
   $('tour-next').disabled=activeStep===conf.steps.length-1;
   $('tour-next').textContent=activeStep===conf.steps.length-1?'Last screen ✓':'Next screen →';
 }
 $('tour-image').addEventListener('error',()=>{
   $('tour-image').hidden=true;
   $('tour-image-fallback').hidden=false;
 });
 function openTour(i){
   if(!configs[i])return;
   returnFocus=document.activeElement;
   activeConfig=i;activeStep=0;showStep();dialog.showModal();$('tour-close').focus();
 }
 function moveStep(change){
   const next=activeStep+change;
   if(next<0||next>=configs[activeConfig].steps.length)return;
   activeStep=next;showStep();
 }
 grid.addEventListener('click',e=>{const b=e.target.closest('[data-tour-open]');if(b)openTour(Number(b.dataset.tourOpen));});
 $('tour-close').addEventListener('click',()=>dialog.close());
 $('tour-prev').addEventListener('click',()=>moveStep(-1));
 $('tour-next').addEventListener('click',()=>moveStep(1));
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
 dialog.addEventListener('keydown',e=>{
   if(e.target.closest('input,textarea,select'))return;
   if(e.key==='ArrowRight'){e.preventDefault();moveStep(1);}
   if(e.key==='ArrowLeft'){e.preventDefault();moveStep(-1);}
 });
 // A restrained, nonessential pointer glow; off for reduced motion and touch users.
 const interactivePointer=!reducedMotion&&matchMedia('(hover:hover) and (pointer:fine)').matches;
 const hero=document.querySelector('.hero');
 if(interactivePointer&&hero){
   hero.addEventListener('pointermove',e=>{
     const b=hero.getBoundingClientRect();
     hero.style.setProperty('--ambient-x',((e.clientX-b.left)/b.width*100).toFixed(2)+'%');
     hero.style.setProperty('--ambient-y',((e.clientY-b.top)/b.height*100).toFixed(2)+'%');
   },{passive:true});
   hero.addEventListener('pointerleave',()=>{hero.style.removeProperty('--ambient-x');hero.style.removeProperty('--ambient-y');});
   // Modest motion on two primary actions, rather than a cursor that obscures links.
   document.querySelectorAll('.hero-buttons .button').forEach(el=>{
     el.classList.add('magnetic-soft');
     el.addEventListener('pointermove',e=>{
       const b=el.getBoundingClientRect();
       const x=(e.clientX-(b.left+b.width/2))/b.width*10;
       const y=(e.clientY-(b.top+b.height/2))/b.height*10;
       el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
     },{passive:true});
     el.addEventListener('pointerleave',()=>{el.style.transform='';});
     el.addEventListener('blur',()=>{el.style.transform='';});
   });
 }
})();
