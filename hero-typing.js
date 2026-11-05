/* Two-line hero typing and rotating phrases.
   Accessible fallback: the original headline remains visible and readable without JS.
   The animated display is aria-hidden; a stable heading label serves screen readers. */
(() => {
  const heading = document.getElementById('hero-heading');
  const first = document.getElementById('typed-line-one');
  const second = document.getElementById('typed-line-two');
  if (!heading || !first || !second) return;

  const phrases = [
    ['Code with purpose.', 'Create with curiosity.'],
    ['Build with intention.', 'Learn with passion.'],
    ['Think beyond code.', 'Design for people.'],
    ['Solve real problems.', 'Make ideas matter.']
  ];
  const lines = [first, second];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let generation = 0;
  let resizeTimer;

  const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function render(node, value) {
    // Keep the original lilac period style on the second headline line.
    if (node === second && value.endsWith('.')) {
      node.replaceChildren(document.createTextNode(value.slice(0, -1)));
      const dot = document.createElement('span');
      dot.className = 'period';
      dot.textContent = '.';
      node.append(dot);
    } else {
      node.textContent = value;
    }
  }

  function displayPair(pair) {
    pair.forEach((text, index) => render(lines[index], text));
  }

  // Reserve height for the longest fully typed heading at each viewport width,
  // avoiding the page jumping as letters are removed and retyped.
  function reserveHeadingHeight() {
    const width = heading.getBoundingClientRect().width;
    if (!width) return;
    const test = heading.cloneNode(true);
    test.removeAttribute('id');
    test.classList.remove('is-running');
    test.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    test.style.cssText = `position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;width:${width}px;max-width:none;min-height:0;height:auto;`;
    heading.parentElement.append(test);
    const textNodes = [...test.querySelectorAll('.typed-contents')];
    let largestHeight = 0;
    phrases.forEach(pair => {
      textNodes.forEach((node, index) => { node.textContent = pair[index]; });
      largestHeight = Math.max(largestHeight, test.getBoundingClientRect().height);
    });
    test.remove();
    heading.style.minHeight = `${Math.ceil(largestHeight + 3)}px`;
  }

  function setCursor(lineIndex) {
    heading.querySelectorAll('.typing-line').forEach((line, index) => {
      line.classList.toggle('is-active', index === lineIndex);
    });
  }

  async function pauseWhileHidden(token) {
    while (document.hidden && generation === token && !reduceMotion.matches) {
      await sleep(250);
    }
  }

  async function animateLine(node, target, deleting, token) {
    const characters = Array.from(target);
    const total = characters.length;
    const positions = deleting
      ? Array.from({ length: total + 1 }, (_, i) => total - i)
      : Array.from({ length: total + 1 }, (_, i) => i);
    for (const position of positions) {
      if (generation !== token || reduceMotion.matches) return false;
      await pauseWhileHidden(token);
      if (generation !== token || reduceMotion.matches) return false;
      render(node, characters.slice(0, position).join(''));
      await sleep(deleting ? 27 : 60);
    }
    return true;
  }

  async function play(token) {
    let current = 0;
    heading.classList.add('is-running');
    setCursor(1);
    await sleep(2450);
    while (generation === token && !reduceMotion.matches) {
      const next = (current + 1) % phrases.length;
      setCursor(1);
      if (!await animateLine(second, phrases[current][1], true, token)) break;
      setCursor(0);
      if (!await animateLine(first, phrases[current][0], true, token)) break;
      if (!await animateLine(first, phrases[next][0], false, token)) break;
      setCursor(1);
      if (!await animateLine(second, phrases[next][1], false, token)) break;
      current = next;
      await sleep(2500);
    }
  }

  function applyPreference() {
    generation++;
    if (reduceMotion.matches) {
      heading.classList.remove('is-running');
      heading.querySelectorAll('.typing-line').forEach(line => line.classList.remove('is-active'));
      displayPair(phrases[0]);
    } else {
      displayPair(phrases[0]);
      reserveHeadingHeight();
      play(generation);
    }
  }

  reserveHeadingHeight();
  applyPreference();
  reduceMotion.addEventListener?.('change', applyPreference);
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(reserveHeadingHeight, 120);
  }, { passive: true });
})();
