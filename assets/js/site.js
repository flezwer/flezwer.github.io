/* Abyss Launcher site: command palette, languages, live release data,
   accent presets and the falling particles. No dependencies. */
(() => {
  'use strict';

  const I18N = window.ABYSS_I18N;
  const REPO = 'flezwer/Abyss-Launcher';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Fallback release data, replaced by the GitHub API when it answers.
  const release = {
    version: 'v1.1.0',
    size: 77838868,
    date: '2026-09-24T18:11:38Z',
    url: 'https://github.com/flezwer/Abyss-Launcher/releases/download/v1.1.0/Abyss.Launcher.Setup.1.1.0.exe',
    page: 'https://github.com/flezwer/Abyss-Launcher/releases/tag/v1.1.0',
  };

  // The launcher's 15 accent presets (src/hooks/useAccent.js)
  const ACCENTS = [
    ['#1d6fff', '#1450cc', '#60a5fa'], ['#3b82f6', '#2563eb', '#60a5fa'], ['#0ea5e9', '#0284c7', '#38bdf8'],
    ['#6366f1', '#4f46e5', '#818cf8'], ['#1e40af', '#1e3a8a', '#3b82f6'], ['#7c6af7', '#5b4ee0', '#a78bfa'],
    ['#06b6d4', '#0891b2', '#22d3ee'], ['#22c55e', '#16a34a', '#4ade80'], ['#10b981', '#059669', '#34d399'],
    ['#ec4899', '#db2777', '#f472b6'], ['#d946ef', '#c026d3', '#e879f9'], ['#f97316', '#ea580c', '#fb923c'],
    ['#eab308', '#ca8a04', '#facc15'], ['#ef4444', '#dc2626', '#f87171'], ['#e2e8f0', '#94a3b8', '#f8fafc'],
  ];

  /* ── i18n ───────────────────────────────────────────────────────────── */
  let lang = 'en';
  const codes = I18N.langs.map(l => l.code);
  const t = (key, vars) => {
    const table = I18N.strings[lang] || {};
    let s = key in table ? table[key] : I18N.strings.en[key];
    if (s == null) return '';
    if (typeof s === 'string' && vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
    return s;
  };

  function pickInitialLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl) {
      const hit = codes.find(c => c.toLowerCase() === fromUrl.toLowerCase());
      if (hit) return hit;
    }
    const saved = store.get('abyss-site-lang');
    return codes.includes(saved) ? saved : 'en';
  }

  function applyLang(code, persist) {
    lang = codes.includes(code) ? code : 'en';
    const meta = I18N.langs.find(l => l.code === lang);
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    $('meta[name="description"]').setAttribute('content', t('meta.description'));

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    splitSentences($('.hero__title'));
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });

    const btn = $('.lang__btn');
    btn.querySelector('use').setAttribute('href', '#f-' + meta.flag);
    btn.setAttribute('aria-label', t('nav.language') + ': ' + meta.name);
    $$('.lang__item').forEach(it => it.setAttribute('aria-checked', String(it.dataset.lang === lang)));

    // Screenshots follow the language: assets/img/<lang>/<name>-<width>.webp
    $$('img[data-shot]').forEach(img => {
      const swap = v => v.replace(/assets\/img\/[^/]+\//g, `assets/img/${lang}/`);
      img.src = swap(img.getAttribute('src'));
      if (img.hasAttribute('srcset')) img.srcset = swap(img.getAttribute('srcset'));
    });
    renderRelease();
    renderAccentName();
    $$('.swatch').forEach((s, i) => { const n = t('colors')[i]; s.setAttribute('aria-label', n); s.title = n; });
    filterPalette(input.value);
    if (persist) store.set('abyss-site-lang', lang);
  }

  // Let the headline break between its sentences, never inside one
  function splitSentences(el) {
    const parts = el.textContent.split(/(?<=[.!?])\s+/).filter(Boolean);
    el.replaceChildren(...parts.flatMap((p, i) => {
      const span = document.createElement('span');
      span.className = 's';
      span.textContent = p;
      return i ? [document.createTextNode(' '), span] : [span];
    }));
  }

  /* Language menu: round flag button + menu of seven languages */
  const langBtn = $('.lang__btn');
  const langMenu = $('#lang-menu');
  langMenu.innerHTML = I18N.langs.map(l => `
    <li role="none">
      <button class="lang__item" role="menuitemradio" aria-checked="false" data-lang="${l.code}" lang="${l.code}" tabindex="-1">
        <svg class="flag" viewBox="0 0 30 30" aria-hidden="true"><use href="#f-${l.flag}"/></svg>
        <span>${l.name}</span>
        <svg class="i" aria-hidden="true"><use href="#i-check"/></svg>
      </button>
    </li>`).join('');
  const langItems = () => $$('.lang__item', langMenu);

  function openLangMenu() {
    langMenu.hidden = false;
    langBtn.setAttribute('aria-expanded', 'true');
    const current = langItems().find(b => b.dataset.lang === lang) || langItems()[0];
    current.focus();
  }
  function closeLangMenu(focusBtn) {
    if (langMenu.hidden) return;
    langMenu.hidden = true;
    langBtn.setAttribute('aria-expanded', 'false');
    if (focusBtn) langBtn.focus();
  }
  langBtn.addEventListener('click', () => (langMenu.hidden ? openLangMenu() : closeLangMenu()));
  langBtn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openLangMenu(); }
  });
  langMenu.addEventListener('click', e => {
    const item = e.target.closest('.lang__item');
    if (!item) return;
    applyLang(item.dataset.lang, true);
    closeLangMenu(true);
  });
  langMenu.addEventListener('keydown', e => {
    const items = langItems();
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); closeLangMenu(true); }
    else if (e.key === 'Tab') closeLangMenu(false);
  });
  document.addEventListener('pointerdown', e => {
    if (!langMenu.hidden && !e.target.closest('.lang')) closeLangMenu(false);
  });

  /* ── Release data (GitHub API, cached for the session) ─────────────── */
  function renderRelease() {
    const mb = Math.round(release.size / 1048576);
    const size = new Intl.NumberFormat(lang).format(mb) + ' ' + t('unit.mb');
    let date = '';
    try { date = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(release.date)); } catch { /* ignore */ }
    $$('[data-release-version]').forEach(el => { el.textContent = release.version; });
    $$('[data-release-size]').forEach(el => { el.textContent = size; });
    $$('[data-release-date]').forEach(el => { el.textContent = t('close.released', { date }); });
    $$('[data-release-link]').forEach(el => { el.href = release.url; });
    $$('[data-release-page]').forEach(el => { el.href = release.page; });
  }

  function useRelease(data) {
    const exe = (data.assets || []).find(a => /\.exe$/i.test(a.name));
    if (!data.tag_name || !exe) return;
    release.version = data.tag_name.startsWith('v') ? data.tag_name : 'v' + data.tag_name;
    release.size = exe.size;
    release.date = data.published_at || release.date;
    release.url = exe.browser_download_url;
    release.page = data.html_url || release.page;
    renderRelease();
  }

  (async () => {
    try {
      const cached = JSON.parse(sessionStorage.getItem('abyss-release') || 'null');
      if (cached && Date.now() - cached.at < 30 * 60 * 1000) return useRelease(cached.data);
    } catch { /* ignore */ }
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) return;
      const data = await res.json();
      useRelease(data);
      try { sessionStorage.setItem('abyss-release', JSON.stringify({ at: Date.now(), data: { tag_name: data.tag_name, published_at: data.published_at, html_url: data.html_url, assets: (data.assets || []).map(a => ({ name: a.name, size: a.size, browser_download_url: a.browser_download_url })) } })); } catch { /* ignore */ }
    } catch { /* offline or rate limited: keep the fallback */ }
  })();

  /* ── Toast ──────────────────────────────────────────────────────────── */
  const toast = $('.toast');
  let toastTimer;
  function showToast(text) {
    $('.toast__text', toast).textContent = text;
    toast.hidden = false;
    toast.style.animation = 'none'; void toast.offsetWidth; toast.style.animation = '';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 7000);
  }

  /* ── Command palette ───────────────────────────────────────────────── */
  const palette = $('#palette');
  const home = $('#palette-home');
  const overlay = $('#palette-overlay');
  const input = $('#palette-input');
  const list = $('#palette-list');
  const empty = $('.palette__empty', list);
  const items = $$('.cmd', list);
  let active = null;
  let lastFocus = null;

  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const inOverlay = () => overlay.open;
  const visibleItems = () => items.filter(el => !el.hidden && getComputedStyle(el).display !== 'none');

  function haystack(el) {
    const cmd = el.dataset.cmd;
    return norm([
      $('.cmd__label', el).textContent, $('.cmd__hint', el).textContent,
      t('kw.' + cmd), I18N.strings.en['kw.' + cmd], I18N.strings.en['cmd.' + cmd],
    ].join(' '));
  }

  function filterPalette(raw) {
    const q = norm(raw).trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    home.classList.toggle('is-filtering', tokens.length > 0);
    items.forEach(el => {
      el.hidden = tokens.length > 0 && !tokens.every(tok => haystack(el).includes(tok));
    });
    // Hide a group label when nothing under it survives
    $$('.palette__group', list).forEach(g => {
      let n = g.nextElementSibling, any = false;
      while (n && !n.classList.contains('palette__group')) {
        if (n.classList.contains('cmd') && !n.hidden && getComputedStyle(n).display !== 'none') any = true;
        n = n.nextElementSibling;
      }
      g.hidden = !any;
    });
    const vis = visibleItems();
    empty.hidden = vis.length > 0;
    if (!vis.length) empty.textContent = t('palette.empty', { q: raw.trim() });
    setActive(vis.includes(active) ? active : vis[0] || null, false);
  }

  function setActive(el, scroll = true) {
    items.forEach(it => { it.classList.toggle('is-active', it === el); it.setAttribute('aria-selected', String(it === el)); });
    active = el;
    if (el) input.setAttribute('aria-activedescendant', el.id); else input.removeAttribute('aria-activedescendant');
    if (el && scroll) {
      // Keep the active row visible inside the list without moving the page
      const top = el.offsetTop - list.offsetTop, bottom = top + el.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top - 6;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 6;
    }
  }

  function move(delta) {
    const vis = visibleItems();
    if (!vis.length) return;
    const i = vis.indexOf(active);
    setActive(vis[(i + delta + vis.length) % vis.length]);
  }

  function goTo(id) {
    const section = document.getElementById(id);
    if (!section) return;
    if (inOverlay()) overlay.close();
    section.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
    const title = $('.row__title', section);
    if (title) setTimeout(() => title.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 450);
  }

  function run(el) {
    if (!el) return;
    el.click();
  }

  list.addEventListener('pointermove', e => {
    const el = e.target.closest('.cmd');
    if (el && el !== active) setActive(el, false);
  });
  list.addEventListener('click', e => {
    const el = e.target.closest('a');
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (href.startsWith('#')) { e.preventDefault(); goTo(href.slice(1)); }
    else if (inOverlay()) overlay.close();
  });

  input.addEventListener('input', () => filterPalette(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); run(active); }
    else if (e.key === 'Escape') {
      if (inOverlay()) return; // the dialog closes itself
      if (input.value) { input.value = ''; filterPalette(''); }
      else input.blur();
    }
  });

  /* Overlay: the same palette element moves into a dialog and back */
  let heroVisible = true;
  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }, { threshold: 0.35 }).observe(palette.parentElement === home ? home : palette);

  function openPalette() {
    closeLangMenu(false);
    if (inOverlay()) { input.focus(); return; }
    if (heroVisible && palette.parentElement === home) {
      input.focus({ preventScroll: true });
      input.select();
      return;
    }
    lastFocus = document.activeElement;
    home.style.minHeight = home.offsetHeight + 'px'; // keep the hero's height while the palette is away
    overlay.append(palette);
    input.value = '';
    filterPalette('');
    overlay.showModal();
    input.focus();
  }
  overlay.addEventListener('close', () => {
    home.append(palette);
    home.style.minHeight = '';
    input.value = '';
    filterPalette('');
    list.scrollTop = 0;
    if (lastFocus && document.contains(lastFocus) && !document.activeElement?.closest?.('.row')) lastFocus.focus({ preventScroll: true });
  });
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.close(); });
  $$('[data-open-palette]').forEach(b => b.addEventListener('click', openPalette));
  $$('[data-close-palette]').forEach(b => b.addEventListener('click', () => overlay.close()));

  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
    else if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) { e.preventDefault(); openPalette(); }
  });

  /* Downloads: direct .exe link plus the SmartScreen hint */
  document.addEventListener('click', e => {
    const dl = e.target.closest('[data-cmd="download"]');
    if (dl) showToast(t('toast.download'));
  });

  /* ── Rows: the section you are reading is the selected command ─────── */
  const sections = $$('[data-section]');
  const bar = $('.bar');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      bar.classList.toggle('is-scrolled', window.scrollY > 8);
      const line = window.innerHeight * 0.42;
      let current = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line * 0.6) current = s;
      }
      sections.forEach(s => {
        const on = s === current;
        s.classList.toggle('is-current', on);
        $('[data-row]', s).classList.toggle('is-selected', on);
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ── Accent presets: the page recolors like the launcher ───────────── */
  const swatchWrap = $('.swatches');
  let accentIdx = Number(store.get('abyss-site-accent-idx'));
  if (!Number.isInteger(accentIdx) || accentIdx < 0 || accentIdx >= ACCENTS.length) accentIdx = 0;

  const lum = hex => {
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const mix = (a, b, w) => '#' + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - w) + parseInt(b.slice(i, i + 2), 16) * w).toString(16).padStart(2, '0')).join('');
  const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

  function applyAccent(i, persist) {
    accentIdx = i;
    const [accent, dim, bright] = ACCENTS[i];
    // White text like the launcher, unless the accent is genuinely light (cyan, green, gold, white…)
    const light = contrast(accent, '#ffffff') < 3;
    const on = light ? '#0b0b12' : '#ffffff';
    const pill = light ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.28)';
    // Deepen the fill until small white text clears 4.5:1 (light accents already use dark text)
    let fill = accent;
    for (let k = 0; !light && contrast(fill, '#ffffff') < 4.6 && k < 20; k++) fill = mix(fill, '#000000', 0.04 * (k + 1));
    const root = document.documentElement.style;
    root.setProperty('--accent', accent); root.setProperty('--accent-dim', dim);
    root.setProperty('--accent-bright', bright); root.setProperty('--on-accent', on);
    root.setProperty('--on-accent-pill', pill); root.setProperty('--fill', fill);
    $$('.swatch').forEach((s, n) => { s.setAttribute('aria-checked', String(n === i)); s.tabIndex = n === i ? 0 : -1; });
    renderAccentName();
    if (persist) {
      store.set('abyss-site-accent-idx', String(i));
      store.set('abyss-site-accent', JSON.stringify({ accent, dim, bright, on, pill, fill }));
    }
  }
  function renderAccentName() {
    const el = $('[data-accent-name]');
    if (el) el.textContent = t('colors')[accentIdx] || '';
  }

  swatchWrap.innerHTML = ACCENTS.map((_, i) =>
    `<button class="swatch" type="button" role="radio" aria-checked="false" tabindex="-1" data-i="${i}"></button>`).join('');
  $$('.swatch').forEach((s, i) => s.style.setProperty('--c', ACCENTS[i][0])); // CSSOM, allowed by the CSP (inline style attrs aren't)
  swatchWrap.addEventListener('click', e => {
    const s = e.target.closest('.swatch');
    if (s) applyAccent(Number(s.dataset.i), true);
  });
  swatchWrap.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const n = (accentIdx + d + ACCENTS.length) % ACCENTS.length;
    applyAccent(n, true);
    $$('.swatch')[n].focus();
  });

  /* ── Falling particles (StarField) with a sinking parallax ─────────── */
  const canvas = $('.snow');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, flakes = [], lastY = window.scrollY, lastT = 0, raf = 0;

  function seed() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(28, Math.min(90, Math.round((W * H) / 22000)));
    flakes = Array.from({ length: n }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: 0.5 + depth * 1.3,
        vy: 5 + depth * 16,
        a: 0.18 + depth * 0.55,
        ph: Math.random() * Math.PI * 2,
        sw: 0.3 + Math.random() * 0.9,
        depth,
      };
    });
  }

  function draw(time) {
    const dt = lastT ? Math.min(0.05, (time - lastT) / 1000) : 0;
    lastT = time;
    const sy = window.scrollY, dScroll = sy - lastY;
    lastY = sy;
    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.vy * dt - dScroll * (0.08 + f.depth * 0.22);
      f.x += Math.sin(time / 1000 * f.sw + f.ph) * 0.12;
      if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
      else if (f.y < -4) { f.y = H + 4; f.x = Math.random() * W; }
      const tw = 0.65 + 0.35 * Math.sin(time / 900 * f.sw + f.ph);
      ctx.globalAlpha = f.a * tw;
      ctx.fillStyle = '#b4acff';
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      if (f.r > 1.4) {
        ctx.globalAlpha = f.a * tw * 0.18;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 3.2, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  function startSnow() {
    cancelAnimationFrame(raf);
    seed();
    if (reduceMotion.matches) { lastT = 0; draw(0); cancelAnimationFrame(raf); return; }
    lastT = 0; raf = requestAnimationFrame(draw);
  }
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(startSnow, 150); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!reduceMotion.matches) { lastT = 0; raf = requestAnimationFrame(draw); }
  });
  reduceMotion.addEventListener?.('change', startSnow);

  /* ── Boot ───────────────────────────────────────────────────────────── */
  applyAccent(accentIdx, false);
  applyLang(pickInitialLang(), false);
  startSnow();
  onScroll();
})();
