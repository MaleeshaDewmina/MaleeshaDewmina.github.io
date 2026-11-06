/* Interactive additions — native browser APIs only; safe for Live Server and GitHub Pages. */
(() => {
  'use strict';
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = (str) => String(str ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function jumpTo(sectionId) {
    const node = document.getElementById(sectionId);
    if (!node) return;
    const nav = $('#nav-links');
    const toggle = $('#menu-toggle');
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    toggle?.setAttribute('aria-label','Open navigation');
    node.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
    try { history.replaceState(null,'','#'+sectionId); } catch(_) {}
  }
  function jumpToProject(index) {
    if (!projects[index]) return;
    const library = document.getElementById('project-library-details');
    if (library) library.open = true;
    // Clear filters first so the chosen card is visible.
    $('[data-filter="all"]')?.click();
    const search = $('#project-search');
    if (search) { search.value=''; search.dispatchEvent(new Event('input',{bubbles:true})); }
    const cards = $$('.project-card', $('#project-grid'));
    const card = cards[index];
    if (!card) { jumpTo('projects');return; }
    card.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'center'});
    card.tabIndex = -1;
    card.focus({preventScroll:true});
    card.classList.add('project-attention');
    window.setTimeout(() => card.classList.remove('project-attention'), 1600);
  }

  const caseStudies = {
    edumind: {
      pi:0,kind:'01 / AI + EDUCATION',title:'EduMind AI',
      summary:'A final-year research prototype exploring personalised AI feedback, student motivation and a growth-mindset learning experience.',
      challenge:'Students need timely learning support that goes beyond simply giving an answer. My research explores how personalised feedback could encourage motivation and constructive learning habits.',
      approach:'Structure the project around the learning experience and its evaluation: understand user needs, build an AI-assisted prototype and investigate responses to personalised feedback.',
      implementation:'A Python / Flask and MySQL-based approach with AI-assisted feedback via the Groq API. The study also includes a research evaluation component.',
      reflection:'Ongoing research: the next steps are to refine the prototype, evaluate the feedback experience and report findings with appropriate research limitations.',
      role:'Individual · final-year BEng Software Engineering research',
      outcome:'Research prototype in development. This is not a claim of measured learning gains.'
    },
    healthtrack: {
      pi:1,kind:'02 / WEB PLATFORM',title:'HealthTrack Pro',
      summary:'A role-based fitness platform designed around workout planning, nutrition support and progress tracking.',
      challenge:'A fitness management workflow needs a coherent experience for clients and trainers, with records and progress views that fit different roles.',
      approach:'Organise the application around client, trainer and administrator flows, including dashboards, health records and workout-related features.',
      implementation:'ASP.NET MVC and C# with Entity Framework and SQL Server. The project includes role-based interactions and AI-related fitness features documented in the repository.',
      reflection:'A useful exercise in aligning interface design, application structure and persistent data across user roles.',
      role:'Academic web application',
      outcome:'Functional scope is documented in the public project repository; no external usage metrics are claimed.'
    },
    smartmed: {
      pi:2,kind:'03 / DESKTOP SOFTWARE',title:'SmartMed Pharmacy ERP',
      summary:'A pharmacy management desktop application bringing together medicine, supplier, order and inventory workflows.',
      challenge:'Pharmacy administration involves connected records and permissions: a reliable system needs a clear way to manage medicines, stock and operational tasks.',
      approach:'Break the application into presentation, service and repository responsibilities, and build a role-aware workflow for common pharmacy management tasks.',
      implementation:'C# Windows Forms, Microsoft SQL Server, password hashing and a layered application structure. Management screens cover medicine, supplier, category and order workflows.',
      reflection:'Practical experience designing larger desktop applications with responsibility separation and thoughtful database-backed workflows.',
      role:'Academic ERP-style desktop project',
      outcome:'Features and their documented status should be checked against the public repository README.'
    }
  };
  const caseDialog = $('#case-dialog');
  const caseContent = $('#case-dialog-content');
  let caseReturnFocus = null;
  function openCaseStudy(key) {
    const c = caseStudies[key];
    if (!c) return;
    const p = projects[c.pi] || {};
    caseReturnFocus = document.activeElement;
    const tags = (p.tags || []).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
    const galleryButton = p.gallery?.length ? `<button type="button" class="case-action secondary" data-case-gallery="${c.pi}">View ${p.gallery.length} project visuals <svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button>` : '';
    const githubButton = !p.private && /^https:\/\/github\.com\//.test(p.url||'') ? `<a class="case-action" href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer">Explore on GitHub <svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a>` : `<span class="case-private-note">The research repository is private.</span>`;
    const storySection = (heading,text) => `<section><h3>${escapeHTML(heading)}</h3><p>${escapeHTML(text)}</p></section>`;
    caseContent.innerHTML = `<div class="case-hero"><div class="case-kicker">✳︎ ${escapeHTML(c.kind)}</div><h2 id="case-heading">${escapeHTML(c.title)}</h2><p>${escapeHTML(c.summary)}</p></div><div class="case-content"><div class="case-tags">${tags}</div><div class="case-story-grid">${storySection('The challenge',c.challenge)}${storySection('My approach',c.approach)}${storySection('Implementation',c.implementation)}${storySection('Learning and next steps',c.reflection)}</div><div class="case-role-note"><strong>Context</strong> · ${escapeHTML(c.role)}<br><span>${escapeHTML(c.outcome)}</span></div><div class="case-actions">${githubButton}${galleryButton}</div></div>`;
    caseDialog.showModal();
    $('#case-close')?.focus();
  }
  $$('[data-case-open]').forEach(button => button.addEventListener('click', () => openCaseStudy(button.dataset.caseOpen)));
  $('#case-close')?.addEventListener('click', () => caseDialog.close());
  caseDialog?.addEventListener('click', e => { if (e.target === caseDialog) caseDialog.close(); });
  caseDialog?.addEventListener('close', () => { if(caseReturnFocus?.isConnected) caseReturnFocus.focus(); });
  caseContent?.addEventListener('click', e => {
    const galleryButton = e.target.closest('[data-case-gallery]');
    if(!galleryButton)return;
    const index = galleryButton.dataset.caseGallery;
    caseDialog.close();
    const originalGalleryButton = $(`[data-gallery-open="${index}"]`);
    if (originalGalleryButton) window.setTimeout(() => originalGalleryButton.click(), 40);
  });
  const smartmedVisual = $('#smartmed-feature-visual');
  if (smartmedVisual && projects[2]?.img) {
    const photo = document.createElement('img');
    photo.loading='lazy';photo.decoding='async';photo.src=projects[2].img;
    photo.alt=projects[2].img_alt || 'SmartMed project screenshot';
    photo.addEventListener('load', () => { $('.smartmed-symbol',smartmedVisual)?.remove(); });
    photo.addEventListener('error', () => photo.remove());
    smartmedVisual.classList.add('featured-visual-image');
    smartmedVisual.prepend(photo);
  }

  // Skills explorer grounded in the published project's documented technology tags.
  const skills = [
    {label:'Python',icon:'Py',match:/^Python$/i,description:'Python in AI-based learning and data-processing projects.'},
    {label:'C#',icon:'C#',match:/^C#$/i,description:'C# across desktop tools and ASP.NET applications.'},
    {label:'SQL Server',icon:'DB',match:/^SQL Server$/i,description:'Relational persistence and business-oriented application data.'},
    {label:'MySQL',icon:'MY',match:/^MySQL$/i,description:'MySQL-backed websites, data models and learning tools.'},
    {label:'ASP.NET',icon:'⌘',match:/ASP\.NET/i,description:'Web applications built with ASP.NET MVC or ASP.NET Core.'},
    {label:'PHP',icon:'<?',match:/^PHP$/i,description:'PHP applications with database-backed business workflows.'},
    {label:'Java',icon:'Ja',match:/^Java$/i,description:'Console programming and algorithm-focused application workflows.'},
    {label:'JavaScript',icon:'JS',match:/^JavaScript$/i,description:'Dynamic web pages and front-end interactions.'},
    {label:'Flask',icon:'Fl',match:/^Flask$/i,description:'Lightweight Python web development for the learning assistant research prototype.'},
    {label:'AI tools',icon:'AI',match:/AI integration|Groq API|AI in education/i,description:'Working with AI APIs, AI-enabled features and education-focused research.'},
    {label:'Data analysis',icon:'Σ',match:/Pandas|Matplotlib|Statistics|SPSS|CSV/i,description:'Interpreting and visualising research and catalogue data.'},
    {label:'Systems design',icon:'◎',match:/Systems design|Layered design|ER modelling|Algorithms/i,description:'Planning architectures, data models and algorithms before implementation.'}
  ];
  let activeSkill = 0;
  const skillChipGrid = $('#skills-chip-grid');
  $('#skills-count').textContent = `${skills.length} technologies`;
  skillChipGrid.innerHTML = skills.map((skill,i) => `<button class="skill-chip" type="button" data-skill-index="${i}" aria-pressed="${i===0}">${escapeHTML(skill.label)}</button>`).join('');
  function setSkill(index) {
    const skill = skills[index];
    if(!skill)return;
    activeSkill=index;
    $$('[data-skill-index]',skillChipGrid).forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.skillIndex)===index)));
    const matches=projects.map((p,i)=>({p,i})).filter(({p})=>(p.tags||[]).some(tag=>skill.match.test(tag)));
    $('#skill-result-title').textContent=skill.label;
    $('#skill-result-description').textContent=skill.description;
    $('#skill-match-count').textContent=`${matches.length} ${matches.length===1?'project':'projects'}`;
    $('#skill-projects').innerHTML=matches.length?matches.map(({p,i})=>`<button class="skill-project-link" type="button" data-project-jump="${i}"><span><strong>${escapeHTML(p.title)}</strong><small>${escapeHTML(p.type || 'Project')} · ${escapeHTML((p.tags||[]).filter(tag=>skill.match.test(tag)).join(', '))}</small></span><span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></button>`).join(''):'<p class="skills-none">No documented projects matched this skill yet.</p>';
  }
  skillChipGrid.addEventListener('click', e => { const chip=e.target.closest('[data-skill-index]');if(chip)setSkill(Number(chip.dataset.skillIndex)); });
  $('#skill-projects').addEventListener('click',e=>{const button=e.target.closest('[data-project-jump]');if(button)jumpToProject(Number(button.dataset.projectJump));});
  setSkill(0);

  // Command palette: keyboard navigation, matching projects, sections and actions.
  const commandDialog = $('#command-dialog');
  const commandInput = $('#command-input');
  const commandResults = $('#command-results');
  const sectionCommands = [
    ['Home', 'Back to the introduction','home','⌂'],
    ['Featured case studies','Explore three in-depth projects','featured','✳︎'],
    ['All projects','Filter, search and browse 13 projects','projects','▦'],
    ['Screenshot walkthroughs','Explore three real project tours','walkthroughs','▶'],
    ['Currently building','See what I’m exploring now','now','◉'],
    ['About me','Background and interests','about','☺'],
    ['Skills explorer','Pick a technology and see related projects','skills-explorer','⌘'],
    ['Experience','Work experience and responsibilities','experience','◷'],
    ['Education','Software engineering studies','education','✎'],
    ['Career journey','Explore my timeline','career-journey','◷'],
    ['Achievements','Milestones and recognition','milestones','★'],
    ['Developer terminal','Try a playful simulated terminal','terminal','>_'],
    ['Contact form','Get in touch with me','contact','✉']
  ];
  const commands = [
    ...sectionCommands.map(([title,subtitle,target,icon])=>({title,subtitle,icon,run:()=>jumpTo(target)})),
    {title:'Toggle light / dark mode',subtitle:'Change the site theme',icon:'☼',run:()=>$('#theme-toggle')?.click()},
    {title:'Download CV',subtitle:'Open my PDF résumé',icon:'↓',run:()=>window.open('Maleesha_Perera_Modern_Creative_CV.pdf','_blank','noopener,noreferrer')},
    {title:'View GitHub',subtitle:'Browse my public repositories',icon:'→',run:()=>window.open('https://github.com/MaleeshaDewmina','_blank','noopener,noreferrer')},
    ...Object.entries(caseStudies).map(([key,c])=>({title:`Case study: ${c.title}`,subtitle:'Open detailed project context',icon:'✦',run:()=>openCaseStudy(key)})),
    ...projects.map((p,i)=>({title:p.title,subtitle:'Open in project library · '+(p.tags||[]).join(', '),icon:'▣',run:()=>jumpToProject(i)}))
  ];
  let shownCommands=[];
  let selectedCommand=0;
  let commandReturnFocus=null;
  let commandActionInvoked=false;
  function renderCommands() {
    const term=commandInput.value.trim().toLowerCase();
    const parts=term.split(/\s+/).filter(Boolean);
    shownCommands=commands.filter(c=>parts.every(part=>(c.title+' '+c.subtitle).toLowerCase().includes(part))).slice(0,11);
    selectedCommand=0;
    commandResults.innerHTML=shownCommands.length?shownCommands.map((c,i)=>`<button type="button" class="command-result" role="option" data-command-index="${i}" aria-selected="${i===0}" data-active="${i===0}"><span class="command-result-symbol" aria-hidden="true">${escapeHTML(c.icon)}</span><span class="command-result-content"><strong>${escapeHTML(c.title)}</strong><small>${escapeHTML(c.subtitle)}</small></span><span class="command-result-arrow" aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></button>`).join(''):'<div class="command-empty">No matching commands. Try “projects”, “skills” or “contact”.</div>';
  }
  function activateCommand(index) {
    const command=shownCommands[index];
    if(!command)return;
    commandActionInvoked=true;
    commandDialog.close();
    command.run();
  }
  function setSelectedCommand(index) {
    if(!shownCommands.length)return;
    selectedCommand=(index+shownCommands.length)%shownCommands.length;
    $$('[data-command-index]',commandResults).forEach((button,i)=>{
      button.dataset.active=String(i===selectedCommand);
      button.setAttribute('aria-selected',String(i===selectedCommand));
    });
    $(`[data-command-index="${selectedCommand}"]`,commandResults)?.scrollIntoView({block:'nearest'});
  }
  function openCommand() {
    if(commandDialog.open)return;
    if($('#gallery-dialog')?.open||caseDialog?.open)return;
    commandReturnFocus=document.activeElement;
    commandActionInvoked=false;
    commandInput.value='';
    renderCommands();
    commandDialog.showModal();
    commandInput.focus();
  }
  $('#command-launch')?.addEventListener('click',openCommand);
  $('#hero-command')?.addEventListener('click',openCommand);
  $('#command-close')?.addEventListener('click',()=>commandDialog.close());
  commandDialog?.addEventListener('click',e=>{if(e.target===commandDialog)commandDialog.close();});
  commandDialog?.addEventListener('close',()=>{if(!commandActionInvoked&&commandReturnFocus?.isConnected)commandReturnFocus.focus();commandActionInvoked=false;});
  commandInput?.addEventListener('input',renderCommands);
  commandResults?.addEventListener('click',e=>{const button=e.target.closest('[data-command-index]');if(button)activateCommand(Number(button.dataset.commandIndex));});
  commandDialog?.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();if(commandDialog.open)commandDialog.close();return;}
    if(e.key==='ArrowDown'){e.preventDefault();setSelectedCommand(selectedCommand+1);}
    else if(e.key==='ArrowUp'){e.preventDefault();setSelectedCommand(selectedCommand-1);}
    else if(e.key==='Enter'){e.preventDefault();activateCommand(selectedCommand);}
  });
  document.addEventListener('keydown',e=>{
    if ((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k') {
      e.preventDefault();
      if(commandDialog.open)commandDialog.close();else openCommand();
    }
  });

  // Simulated terminal with cancellable typewriter intro; never evals or executes user text.
  const terminalLog = $('#terminal-log');
  const terminalInput = $('#terminal-input');
  const terminalCommands = {
    help: 'Commands: whoami · stack · focus · projects · contact · theme · clear · help',
    whoami: 'Maleesha Dewmina Perera\nSoftware Engineering undergraduate · Sri Lanka\nI build thoughtful software, AI experiments and tools for learning.',
    stack: 'Languages: Python, C#, Java, JavaScript, PHP\nPlatforms: Flask, ASP.NET MVC, WinForms, Streamlit\nData: SQL Server, MySQL, SQLite',
    focus: 'Current focus: EduMind AI\nExploring personalised feedback, motivation and growth mindset.',
    projects: 'Opening the project library…',
    contact: 'Opening the contact section…',
    theme: 'Switching colour theme…',
    clear: ''
  };
  let terminalTimers=[];
  let terminalIntroStarted=false;
  let terminalNonce=0;
  function terminalCancelAnimation(){terminalNonce++;terminalTimers.forEach(id=>clearTimeout(id));terminalTimers=[];}
  function terminalAppend(text,kind='output'){
    const line=document.createElement('p');line.className='terminal-line '+kind;line.textContent=text;
    terminalLog.appendChild(line);terminalLog.scrollTop=terminalLog.scrollHeight;return line;
  }
  function terminalRun(value,manual=true){
    const text=String(value||'').trim().slice(0,60);
    if(!text)return;
    if(manual)terminalCancelAnimation();
    const command=text.toLowerCase();
    terminalAppend('visitor@portfolio:~$ '+text,'prompt');
    if(command==='clear'){terminalLog.replaceChildren();return;}
    if(!Object.prototype.hasOwnProperty.call(terminalCommands,command)){
      terminalAppend('Unknown command. Try “help” to see available commands.','error');return;
    }
    terminalAppend(terminalCommands[command], command==='whoami'?'accent':'output');
    if(manual && command==='projects')window.setTimeout(()=>jumpTo('projects'),180);
    if(manual && command==='contact')window.setTimeout(()=>jumpTo('contact'),180);
    if(manual && command==='theme')$('#theme-toggle')?.click();
  }
  function terminalIntro(){
    terminalCancelAnimation();terminalLog.replaceChildren();terminalIntroStarted=true;
    if(reducedMotion){terminalRun('whoami',false);terminalAppend('Tip: try help, stack, projects or contact.');return;}
    const token=terminalNonce;
    const line=terminalAppend('visitor@portfolio:~$ ','prompt');
    const word='whoami';let i=0;
    const tick=()=>{
      if(token!==terminalNonce)return;
      if(i<word.length){line.textContent+=word[i++];terminalTimers.push(setTimeout(tick,85));}
      else terminalTimers.push(setTimeout(()=>{
        if(token!==terminalNonce)return;
        terminalAppend(terminalCommands.whoami,'accent');
        terminalAppend('Tip: try help, stack, projects or contact.');
      },300));
    };
    terminalTimers.push(setTimeout(tick,440));
  }
  $('#terminal-form')?.addEventListener('submit',e=>{
    e.preventDefault();terminalRun(terminalInput.value);terminalInput.value='';terminalInput.focus();
  });
  $$('[data-terminal-cmd]').forEach(button=>button.addEventListener('click',()=>{
    terminalRun(button.dataset.terminalCmd);terminalInput.focus();
  }));
  $('#terminal-replay')?.addEventListener('click',terminalIntro);
  if('IntersectionObserver' in window){
    const terminalObserver=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)&&!terminalIntroStarted){terminalIntro();terminalObserver.disconnect();}
    },{threshold:.12});terminalObserver.observe($('.terminal-window'));
  } else terminalIntro();

  // Contact form (usable locally). By default compose a mailto draft; optional Formspree endpoint.
  const contactForm = $('#contact-form');
  const contactFeedback = $('#form-feedback');
  const contactFields = [$('#contact-name'),$('#contact-email'),$('#contact-subject'),$('#contact-message')];
  function showContactFeedback(text,kind='neutral'){
    contactFeedback.textContent=text;
    contactFeedback.dataset.kind=kind;
  }
  function readContact(){
    return {
      name: $('#contact-name').value.trim(),
      email: $('#contact-email').value.trim(),
      subject: $('#contact-subject').value,
      message: $('#contact-message').value.trim()
    };
  }
  function validateContact(){
    contactFields.forEach(field=>field.removeAttribute('aria-invalid'));
    const d=readContact();
    for (const field of contactFields) {
      if(!field.checkValidity()||!field.value.trim()) {
        field.setAttribute('aria-invalid','true');field.focus();
        showContactFeedback(field.validationMessage||'Please complete all required fields.','error');return null;
      }
    }
    if(d.message.length<10){$('#contact-message').focus();$('#contact-message').setAttribute('aria-invalid','true');showContactFeedback('Please add a message of at least 10 characters.','error');return null;}
    return d;
  }
  contactFields.forEach(field=>field?.addEventListener('input',()=>{field.removeAttribute('aria-invalid');showContactFeedback('');}));
  function composeMailto(data){
    const title=`Portfolio enquiry — ${data.subject}`;
    const body=`Hi Maleesha,\n\n${data.message}\n\nFrom: ${data.name}\nReply to: ${data.email}`;
    return {subject:title,body,href:`mailto:maleeshadewmina@gmail.com?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`};
  }
  function copyText(value){
    if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(value);
    return new Promise((resolve,reject)=>{
      const helper=document.createElement('textarea');helper.value=value;helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);
      helper.focus();helper.select();let ok=false;try{ok=document.execCommand('copy');}finally{helper.remove();}
      ok?resolve():reject(new Error('Clipboard copy unavailable'));
    });
  }
  $('#contact-copy-message')?.addEventListener('click',async()=>{
    const data=validateContact();if(!data)return;
    const mail=composeMailto(data);
    try {await copyText(`To: maleeshadewmina@gmail.com\nSubject: ${mail.subject}\n\n${mail.body}`);showContactFeedback('Message copied. Paste it into your preferred email app to send.','success');}
    catch(_){showContactFeedback('Could not copy automatically. You can select the text fields and copy them manually.','error');}
  });
  // Formspree AJAX submission. Native HTML POST remains available without JS.
  const formspreeEndpoint = 'https://formspree.io/f/mnppwwan';
  contactForm?.addEventListener('submit', async e=>{
    e.preventDefault();
    const data=validateContact();
    if(!data || contactForm.elements.namedItem('_honey')?.value) return;
    const submitButton=$('#contact-submit');
    const buttonMarkup=submitButton?.innerHTML;
    if(submitButton){submitButton.disabled=true;submitButton.textContent='Sending…';}
    showContactFeedback('Sending your message…','neutral');
    try {
      const formData=new FormData(contactForm);
      const response=await fetch(formspreeEndpoint,{
        method:'POST',
        body:formData,
        headers:{'Accept':'application/json'}
      });
      const result=await response.json().catch(()=>null);
      if(!response.ok || (Array.isArray(result?.errors)&&result.errors.length)){
        const issue=Array.isArray(result?.errors)
          ? result.errors.map(x=>x.message).filter(Boolean).join(' ')
          : '';
        showContactFeedback(
          issue ? `Form service: ${issue} Your message is still here; please try again or use Copy message.`
                : 'The service could not accept this message. It is still here; please try again or use Copy message.',
          'error'
        );
        return;
      }
      showContactFeedback('Message submitted successfully! Thank you for reaching out.','success');
      contactForm.reset();
    } catch(_) {
      showContactFeedback('The contact service could not be reached. Your message is still here; please use Copy message or the email link.','error');
    } finally {
      if(submitButton){submitButton.disabled=false;submitButton.innerHTML=buttonMarkup;}
    }
  });

  // Subtle pointer-following highlight. Never affects touch or reduced-motion users.
  if(!reducedMotion && matchMedia('(hover:hover) and (pointer:fine)').matches){
    $$('[data-spotlight]').forEach(element=>{
      element.addEventListener('pointermove',e=>{
        const b=element.getBoundingClientRect();
        element.style.setProperty('--spot-x',`${e.clientX-b.left}px`);
        element.style.setProperty('--spot-y',`${e.clientY-b.top}px`);
      },{passive:true});
    });
  }
})();
