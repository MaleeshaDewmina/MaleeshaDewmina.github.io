/* Tailored editorial covers. Original project screenshots remain in the galleries. */
(() => {
 'use strict';
 const map='<svg class="ed-map" viewBox="0 0 530 175" aria-hidden="true"><path d="M35 133 C120 130 93 50 199 62 S310 140 374 103 S450 54 498 35" class="route-rail"/><path d="M35 133 C120 130 93 50 199 62 S310 140 374 103 S450 54 498 35" class="route-line"/><circle cx="35" cy="133" r="9" class="route-pin"/><circle cx="199" cy="62" r="9" class="route-pin"/><circle cx="374" cy="103" r="9" class="route-pin"/><circle cx="498" cy="35" r="9" class="route-pin"/><text x="18" y="162">ROUTES</text><text x="160" y="41">STOPS</text><text x="341" y="140">SCHEDULES</text></svg>';
 const variants={
  'SRMSS-ASE-Coursework':()=>'<div class="editorial-art editorial-route" role="img" aria-label="Illustrative route map and real SRMSS branding; original app screenshots are in the gallery"><span class="ed-sub">Route management · Project overview</span><img class="ed-route-logo" src="https://raw.githubusercontent.com/MaleeshaDewmina/SRMSS-ASE-Coursework/main/src/SRMSS.Web/wwwroot/images/srmss-mark.png" alt=""><div class="ed-route-title">Smart Routes<br>& Scheduling</div>'+map+'<div class="ed-foot">ASP.NET Core · Fleet & schedules</div></div>',
  'Student_AI_Pro':()=>'<div class="editorial-art editorial-ai" role="img" aria-label="Illustrative student AI assistant cover; original application screenshots are in the gallery"><span class="ed-sub">Student AI Pro · Team project</span><div class="ed-ai-title">Ask.<br>Learn.<br>Explore.</div><div class="ed-ai-note">Conversational student support and learning tools</div><div class="ed-ai-orb" aria-hidden="true">AI</div><div class="ed-ai-chip">✧ AI-powered academic assistant</div><div class="ed-foot">Python · Streamlit · Groq API</div></div>',
  'Dream-Book-Shop-Application':()=>'<div class="editorial-art editorial-analytics" role="img" aria-label="Original book data analysis charts"><span class="ed-sub">Python · Exploratory data analysis</span><div class="ed-art-title">Stories in<br>the data.<small>Book trends & visual insights</small></div><span class="ed-analysis-code">PANDAS / MATPLOTLIB</span><div class="ed-paper ed-paper-main"><img loading="lazy" src="https://raw.githubusercontent.com/MaleeshaDewmina/Dream-Book-Shop-Application/main/docs/language-chart.png" alt=""></div><div class="ed-paper ed-paper-alt"><img loading="lazy" src="https://raw.githubusercontent.com/MaleeshaDewmina/Dream-Book-Shop-Application/main/docs/top-authors-chart.png" alt=""></div><div class="ed-foot">Original charts · Data analysis</div></div>',
  'AI-Chatbots-Student-Motivation-Research':()=>'<div class="editorial-art editorial-research" role="img" aria-label="Original questionnaire and statistical chart"><span class="ed-sub">Quantitative research · AI in education</span><div class="ed-art-title">Motivation<br>& Mindset<small>Investigating AI chatbot feedback</small></div><div class="ed-paper ed-paper-main"><img loading="lazy" src="assets/research/research-questionnaire.png" alt=""></div><div class="ed-paper ed-paper-alt"><img loading="lazy" src="assets/research/research-chart-mindset.png" alt=""></div><div class="ed-foot">Questionnaire · Statistical analysis</div></div>'
 };
 function render(){
   const projects=window.PORTFOLIO_PROJECTS||[];
   const cards=document.querySelectorAll('#project-grid .project-card');
   projects.forEach((p,i)=>{
     if(!variants[p.repo]||!cards[i])return;
     const box=cards[i].querySelector('.project-image');
     if(!box)return;
     Array.from(box.children).filter(c=>!c.classList.contains('project-image-top')).forEach(c=>c.remove());
     box.classList.remove('has-device-cover','no-image');
     box.classList.add('editorial-cover-host');
     box.insertAdjacentHTML('afterbegin',variants[p.repo]());
   });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});
 else render();
})();