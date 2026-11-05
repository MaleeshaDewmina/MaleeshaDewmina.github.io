/* Interactive portfolio — vanilla JavaScript, no build tools or dependencies. */
(() => {
  'use strict';
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeExternal = (value) => /^https:\/\/(github\.com|raw\.githubusercontent\.com|www\.github\.com)\//i.test(value || '') ? value : 'https://github.com/MaleeshaDewmina';
  const motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme: user-selected preference is retained across local previews.
  const themeButton = $('#theme-toggle');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('maleesha-theme'); } catch (_) {}
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    try { localStorage.setItem('maleesha-theme', theme); } catch (_) {}
  }
  setTheme(initialTheme);
  themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  // Mobile navigation.
  const mobileMenu = $('#menu-toggle');
  const navLinks = $('#nav-links');
  function closeMenu() {
    navLinks.classList.remove('open');
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Open navigation');
  }
  mobileMenu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mobileMenu.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) closeMenu(); });

  // Lightweight scroll effects, with one passive listener.
  const progress = $('#scroll-progress');
  const toTop = $('#back-to-top');
  let scrollPending = false;
  function refreshScroll() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = Math.min(100, (window.scrollY / maxScroll) * 100) + '%';
    toTop.classList.toggle('shown', window.scrollY > 650);
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(refreshScroll); }
  }, {passive: true});
  window.addEventListener('resize', refreshScroll, {passive: true});
  refreshScroll();
  toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: motionOff ? 'auto' : 'smooth'}));
  $('#year').textContent = String(new Date().getFullYear());

  // Scroll reveal: elements remain visible without IntersectionObserver.
  let revealObserver = null;
  if ('IntersectionObserver' in window && !motionOff) {
    revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    }, {threshold: .06, rootMargin: '0px 0px 30px 0px'});
  }
  function reveal(elements) {
    elements.forEach(element => {
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('visible');
    });
  }
  reveal($$('.reveal'));

  // Small optional pointer interaction on the portrait (not a JS animation loop).
  const visual = $('#hero-visual');
  const frame = $('.portrait-frame', visual);
  if (!motionOff && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    visual.addEventListener('pointermove', e => {
      const rect = visual.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - .5) * 11;
      const y = ((e.clientY - rect.top) / rect.height - .5) * -9;
      frame.style.transform = `rotate(3deg) rotateX(${y.toFixed(1)}deg) rotateY(${x.toFixed(1)}deg)`;
    });
    visual.addEventListener('pointerleave', () => { frame.style.transform = ''; });
  }

  // Render all existing project entries and keep every associated gallery reference.
  const grid = $('#project-grid');
  const resultLine = $('#results-line');
  const search = $('#project-search');
  const empty = $('#project-empty');
  const filters = $$('.filter-chip');
  $('#project-total').textContent = String(projects.length);
  $('#all-count').textContent = String(projects.length);
  let currentFilter = 'all';
  let currentSearch = '';

  const cardTemplate = (p, i) => {
    const gallery = Array.isArray(p.gallery) ? p.gallery : [];
    const hasCover = Boolean(p.img);
    const badge = p.private ? 'PRIVATE RESEARCH' : String(p.type || 'PROJECT');
    const src = escapeHTML(p.img || '');
    const visualMarkup = hasCover ? `<img src="${src}" alt="${escapeHTML(p.img_alt || `${p.title} project screenshot`)}" loading="lazy" decoding="async">` : `<div class="project-abstract tone-${escapeHTML(p.tone || 'slate')}"><span class="abstract-initials">${escapeHTML(p.initials || 'MP')}</span></div>`;
    const tags = (p.tags || []).slice(0, 4).map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
    const points = (p.highlights || []).map(point => `<li>${escapeHTML(point)}</li>`).join('');
    const repo = safeExternal(p.url);
    const mainAction = p.private ? `<span class="project-private">Research repository is private <span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></span>` : `<a class="project-action" href="${escapeHTML(repo)}" target="_blank" rel="noopener noreferrer">Explore code <span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></a>`;
    const galleryAction = gallery.length ? `<button class="project-action project-action-secondary" type="button" data-gallery-open="${i}" aria-label="View ${escapeHTML(p.title)} project gallery">Gallery <span aria-hidden="true"><svg class="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></button>` : '';
    const details = points ? `<details class="project-details"><summary>Project highlights</summary><ul>${points}</ul></details>` : '';
    return `<article class="project-card reveal" data-category="${escapeHTML((p.cat || []).join(' '))}" data-search="${escapeHTML([p.title,p.desc,p.type,(p.tags||[]).join(' ')].join(' ').toLowerCase())}">
      <div class="project-image${hasCover ? '' : ' no-image'}">${visualMarkup}<div class="project-image-top"><span class="project-index">${String(i + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</span><span class="project-pill">${escapeHTML(badge)}</span></div></div>
      <div class="project-card-body"><h3 class="project-card-title">${escapeHTML(p.title)}</h3><p class="project-card-desc">${escapeHTML(p.desc)}</p><div class="project-tags">${tags}</div>${details}</div>
      <div class="project-bottom">${mainAction}${galleryAction}</div>
    </article>`;
  };
  grid.innerHTML = projects.map(cardTemplate).join('');
  const cards = $$('.project-card', grid);
  reveal(cards);
  // Offline or GitHub unavailable: keep a professional, reliable fallback.
  $$('.project-image img', grid).forEach(img => img.addEventListener('error', () => {
    const wrapper = img.closest('.project-image');
    const index = cards.indexOf(wrapper.closest('.project-card'));
    const p = projects[index];
    img.remove();
    wrapper.classList.add('no-image');
    wrapper.insertAdjacentHTML('afterbegin', `<div class="project-abstract tone-${escapeHTML(p.tone || 'slate')}"><span class="abstract-initials">${escapeHTML(p.initials || 'MP')}</span></div>`);
  }, {once: true}));

  function applyFilters() {
    let shown = 0;
    cards.forEach(card => {
      const categoryMatch = currentFilter === 'all' || card.dataset.category.split(' ').includes(currentFilter);
      const searchMatch = !currentSearch || card.dataset.search.includes(currentSearch);
      const visible = categoryMatch && searchMatch;
      card.hidden = !visible;
      if (visible) shown++;
    });
    resultLine.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} showing`;
    empty.hidden = shown !== 0;
  }
  function setFilter(category) {
    currentFilter = category;
    filters.forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    applyFilters();
  }
  filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  search.addEventListener('input', () => { currentSearch = search.value.trim().toLowerCase(); applyFilters(); });
  $('#reset-filters').addEventListener('click', () => { search.value = ''; currentSearch = ''; setFilter('all'); search.focus(); });
  applyFilters();
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.target.closest('input,textarea,[contenteditable]') && !$('#gallery-dialog').open) {
      e.preventDefault(); search.focus();
    }
  });

  // Interactive gallery: arrows, thumbnails, Escape, click-outside, focus restoration.
  const dialog = $('#gallery-dialog');
  const stageImage = $('#gallery-image');
  const stage = $('.gallery-stage', dialog);
  let activeProject = -1;
  let activeImage = 0;
  let lastFocus = null;
  const gallery = () => projects[activeProject]?.gallery || [];
  function showImage() {
    const items = gallery();
    if (!items.length) return;
    activeImage = (activeImage + items.length) % items.length;
    const media = items[activeImage];
    const project = projects[activeProject];
    $('#gallery-heading').textContent = project.title;
    $('#gallery-index').textContent = `Image ${activeImage + 1} of ${items.length}`;
    $('#gallery-caption').textContent = media.label || 'Project screenshot';
    $('#gallery-credit').textContent = [media.kind, media.source].filter(Boolean).join(' · ');
    stage.classList.remove('image-error');
    stageImage.hidden = false;
    stageImage.src = media.src;
    stageImage.alt = media.alt || media.label || 'Project screenshot';
    $('#gallery-original').href = media.src;
    $('#gallery-original').hidden = !/^(https:\/\/|assets\/)/.test(media.src);
    $('#gallery-prev').disabled = items.length <= 1;
    $('#gallery-next').disabled = items.length <= 1;
    $$('#gallery-thumbnails button').forEach((btn, i) => {
      btn.classList.toggle('selected', i === activeImage);
      btn.setAttribute('aria-pressed', String(i === activeImage));
    });
    const chosen = $$('#gallery-thumbnails button')[activeImage];
    if (chosen) chosen.scrollIntoView({block:'nearest', inline:'nearest', behavior:'auto'});
  }
  stageImage.addEventListener('error', () => {
    stage.classList.add('image-error');
    stageImage.hidden = true;
  });
  function openGallery(pi) {
    if (!projects[pi] || !(projects[pi].gallery || []).length) return;
    lastFocus = document.activeElement;
    activeProject = pi;
    activeImage = 0;
    $('#gallery-thumbnails').innerHTML = gallery().map((item, i) => `<button type="button" data-thumb="${i}" aria-label="Show image ${i + 1}: ${escapeHTML(item.label || 'Image')}"><img src="${escapeHTML(item.src)}" alt="" loading="lazy"></button>`).join('');
    dialog.showModal();
    showImage();
    $('#gallery-close').focus();
  }
  function closeGallery() {
    if (dialog.open) dialog.close();
    if (lastFocus && lastFocus.isConnected) lastFocus.focus();
  }
  grid.addEventListener('click', e => {
    const button = e.target.closest('[data-gallery-open]');
    if (button) openGallery(Number(button.dataset.galleryOpen));
  });
  $('#gallery-close').addEventListener('click', closeGallery);
  $('#gallery-prev').addEventListener('click', () => {activeImage--;showImage();});
  $('#gallery-next').addEventListener('click', () => {activeImage++;showImage();});
  $('#gallery-thumbnails').addEventListener('click', e => {
    const thumb = e.target.closest('[data-thumb]');
    if (thumb) {activeImage = Number(thumb.dataset.thumb);showImage();}
  });
  dialog.addEventListener('click', e => { if (e.target === dialog) closeGallery(); });
  dialog.addEventListener('close', () => {stageImage.removeAttribute('src');if(lastFocus?.isConnected)lastFocus.focus();});
  document.addEventListener('keydown', e => {
    if (!dialog.open) return;
    if (e.key === 'ArrowLeft') {e.preventDefault();activeImage--;showImage();}
    if (e.key === 'ArrowRight') {e.preventDefault();activeImage++;showImage();}
  });

  // Small, genuine interactive 'focus' panel.
  const focus = {
    ai: {number:'01 / 03',glyph:'✳︎',title:'Technology that helps people learn.',description:'I’m exploring how AI-assisted feedback and thoughtful software can make learning experiences more personal, supportive and motivating.',color:'#bfb4f8'},
    apps: {number:'02 / 03',glyph:'⌘',title:'Useful software, from idea to interface.',description:'I enjoy connecting UI, application logic and databases to solve a real problem and make everyday workflows a little simpler.',color:'#b9e5db'},
    people: {number:'03 / 03',glyph:'✦',title:'Making technical ideas easier to share.',description:'From workshops to helping peers, I like turning complex topics into practical explanations and encouraging people to give technology a try.',color:'#e4eeb4'}
  };
  const focusTabs = $$('.focus-tab');
  const focusPanel = $('#focus-panel');
  function updateFocus(key) {
    const item = focus[key];if(!item)return;
    focusTabs.forEach(tab => {const selected=tab.dataset.focus===key;tab.classList.toggle('selected',selected);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
    $('#focus-number').textContent=item.number;
    $('#focus-glyph').textContent=item.glyph;
    $('#focus-title').textContent=item.title;
    $('#focus-description').textContent=item.description;
    focusPanel.style.background=item.color;
  }
  focusTabs.forEach((tab,i) => {
    tab.addEventListener('click', () => updateFocus(tab.dataset.focus));
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const offset = e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1;
      const next=focusTabs[(i+offset+focusTabs.length)%focusTabs.length];
      next.focus();updateFocus(next.dataset.focus);
    });
  });
  updateFocus('ai');

  // Copy email address, with a fallback for non-secure local previews.
  let toastTimer;
  function toast(message) {
    const box=$('#toast');box.textContent=message;box.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('show'),2600);
  }
  $('#copy-email').addEventListener('click', async () => {
    const address='maleeshadewmina@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(address);
      else {
        const helper=document.createElement('textarea');helper.value=address;helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);helper.select();
        if(!document.execCommand('copy'))throw new Error('copy failed');helper.remove();
      }
      toast('Email address copied!');
    } catch (_) {toast(`Email: ${address}`);}
  });
})();
