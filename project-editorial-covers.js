/* V2: simple editorial visuals; all project details stay in the card body.
   Original galleries, links and titles remain untouched. */
(() => {
  'use strict';
  const routeSvg = '<svg class="route-graphic" viewBox="0 0 500 230" aria-hidden="true"><path class="road" d="M40 180 C115 170 108 100 185 108 S284 181 344 129 S427 65 468 52"/><path class="route" d="M40 180 C115 170 108 100 185 108 S284 181 344 129 S427 65 468 52"/><circle cx="40" cy="180" r="10"/><circle cx="185" cy="108" r="10"/><circle cx="344" cy="129" r="10"/><circle class="end" cx="468" cy="52" r="12"/></svg>';
  const mapIcon = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" aria-hidden="true"><path d="M24 42s14-14 14-25a14 14 0 1 0-28 0c0 11 14 25 14 25Z"/><circle cx="24" cy="17" r="5"/></svg>';
  const chartIcon = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" aria-hidden="true"><path d="M7 42V27M24 42V13M41 42V20"/></svg>';
  const bookIcon = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 11C18 7 11 7 5 9v28c6-2 13-2 19 2 6-4 13-4 19-2V9c-6-2-13-2-19 2z"/><path d="M24 11v28"/></svg>';
  const covers = {
    'Student_AI_Pro': '<div class="editorial-art editorial-ai" role="img" aria-label="Minimal AI-themed illustration rather than an application screenshot"><div class="ai-orbit" aria-hidden="true"><strong>AI</strong></div><span class="ai-spark one" aria-hidden="true">✳</span><span class="ai-spark two" aria-hidden="true">✦</span><span class="ai-dot one" aria-hidden="true"></span><span class="ai-dot two" aria-hidden="true"></span></div>',
    'Dream-Book-Shop-Application': '<div class="editorial-art editorial-analytics" role="img" aria-label="Actual Python chart of book language distribution from the project"><span class="data-mark" aria-hidden="true">'+chartIcon+'</span><div class="editorial-sheet"><img src="https://raw.githubusercontent.com/MaleeshaDewmina/Dream-Book-Shop-Application/main/docs/language-chart.png" alt="" loading="lazy" decoding="async"></div></div>',
    'AI-Chatbots-Student-Motivation-Research': '<div class="editorial-art editorial-research" role="img" aria-label="Original research questionnaire screenshot"><span class="research-mark" aria-hidden="true">'+bookIcon+'</span><div class="editorial-sheet"><img src="assets/research/research-questionnaire.png" alt="" loading="lazy" decoding="async"></div></div>'
  };
  function render() {
    const projects=Array.isArray(window.PORTFOLIO_PROJECTS)?window.PORTFOLIO_PROJECTS:[];
    const cards=document.querySelectorAll('#project-grid .project-card');
    projects.forEach((project,i) => {
      const art=covers[project.repo];
      const card=cards[i];
      if(!art || !card)return;
      const image=card.querySelector('.project-image');
      if(!image)return;
      Array.from(image.children).filter(el=>!el.classList.contains('project-image-top')).forEach(el=>el.remove());
      image.classList.remove('has-device-cover','no-image');
      image.classList.add('editorial-cover-host');
      image.insertAdjacentHTML('afterbegin',art);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();