// ─────────────────────────────────────────────────────────────
//  PeoplesHR Webinar Page — app.js
//  Reads data.json and renders all content dynamically.
//  To update content: edit data.json only. Never touch this file
//  for routine content changes.
// ─────────────────────────────────────────────────────────────

const GRAD_CLASSES = ['','wb-uc-thumb-grad-1','wb-uc-thumb-grad-2','wb-uc-thumb-grad-3','wb-uc-thumb-grad-4','wb-uc-thumb-grad-5'];

const LANG_FLAG = { 'English': '🇬🇧', 'Bahasa': '🇮🇩' };
function langBadge(lang) {
  if (!lang) return '';
  const flag = LANG_FLAG[lang] || '';
  return `<span class="wb-lang-badge">${flag} ${lang}</span>`;
}

// ── Icons (reusable SVG strings) ──────────────────────────────
const ICON_CALENDAR = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="11" rx="2" fill="none"/><path d="M5 2v2M11 2v2M2 7h12" stroke-linecap="round"/></svg>`;
const ICON_CLOCK    = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6" fill="none"/><path d="M8 5v3l2 2" stroke-linecap="round"/></svg>`;
const ICON_ARROW    = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 7h10M7 2l5 5-5 5"/></svg>`;
const ICON_PLAY_SM  = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 4-8 4V4z" fill="#fff"/></svg>`;
const ICON_PLAY_LG  = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 5l9 5-9 5V5z" fill="#2563eb"/></svg>`;
const ICON_EYE      = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M1 5s1.5-3 4-3 4 3 4 3-1.5 3-4 3-4-3-4-3z" fill="none"/><circle cx="5" cy="5" r="1.2" fill="currentColor"/></svg>`;
const ICON_MINI_CLK = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="6" cy="6" r="4.5" fill="none"/><path d="M6 3.5v2.5l1.5 1.5" stroke-linecap="round"/></svg>`;
const ICON_MINI_ARR = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 5h6M5 2l3 3-3 3"/></svg>`;
const ICON_PREV     = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 4l-4 4 4 4"/></svg>`;
const ICON_NEXT     = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4l4 4-4 4"/></svg>`;
const ICON_GRID     = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="display:inline;vertical-align:-2px;margin-right:6px;"><rect x="1" y="1" width="5" height="5" rx="1.5" fill="#2563eb"/><rect x="8" y="1" width="5" height="5" rx="1.5" fill="#2563eb" opacity=".5"/><rect x="1" y="8" width="5" height="5" rx="1.5" fill="#2563eb" opacity=".5"/><rect x="8" y="8" width="5" height="5" rx="1.5" fill="#2563eb" opacity=".25"/></svg>`;

// ── Render: Featured Webinar ──────────────────────────────────
function renderFeatured(f) {
  const speakersHTML = f.speakers.map(s => `
    <div class="wb-speaker">
      ${s.photo
          ? `<img class="wb-speaker-av wb-rec-sp-photo" src="${s.photo}" alt="${s.name}">`
          : `<div class="wb-speaker-av" style="background:${s.color};color:${s.textColor};">${s.initials}</div>`}
      <div>
        <div class="wb-speaker-name">${s.name}</div>
        <div class="wb-speaker-role">${s.role}</div>
      </div>
    </div>`).join('');

  const avatarsHTML = f.speakers.map(s =>
    `<div class="wb-att-av" style="background:${s.color};color:${s.textColor};">${s.initials}</div>`
  ).join('') + `<div class="wb-att-av" style="background:#ede9fe;color:#7c3aed;">+</div>`;

  return `
  <div class="wb-featured-card">
    <div class="wb-featured-left">
      <div>
        <div class="wb-featured-meta">
          <span class="wb-live-badge"><span class="wb-live-dot"></span>UPCOMING</span>
        </div>
        <h2 class="wb-featured-title">${f.title}</h2>
        ${langBadge(f.language)}
        <p class="wb-featured-desc">${f.description}</p>
        <div class="wb-speakers">${speakersHTML}</div>
      </div>
      <div class="wb-featured-footer">
        <div class="wb-date-chip">${ICON_CALENDAR} ${f.dateLabel}</div>
        <div class="wb-date-chip">${ICON_CLOCK} ${f.timeLabel}</div>
        <a href="${f.registerUrl}" class="btn-primary wb-featured-cta">Register Free ${ICON_ARROW}</a>
      </div>
    </div>
    <div class="wb-featured-right">
      <div class="wb-countdown">
        <div class="wb-countdown-label">Starts in</div>
        <div class="wb-countdown-tiles">
          <div class="wb-tile"><div class="wb-tile-num" id="cd-days">--</div><div class="wb-tile-unit">Days</div></div>
          <div class="wb-sep">:</div>
          <div class="wb-tile"><div class="wb-tile-num" id="cd-hrs">--</div><div class="wb-tile-unit">Hrs</div></div>
          <div class="wb-sep">:</div>
          <div class="wb-tile"><div class="wb-tile-num" id="cd-min">--</div><div class="wb-tile-unit">Min</div></div>
          <div class="wb-sep">:</div>
          <div class="wb-tile"><div class="wb-tile-num" id="cd-sec">--</div><div class="wb-tile-unit">Sec</div></div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Render: Upcoming Slider ───────────────────────────────────
function renderUpcoming(upcoming) {
  if (!upcoming || upcoming.length === 0) return '';
  const cardsHTML = upcoming.map(u => `
    <a class="wb-upcoming-card" href="${u.registerUrl}">
      <div class="wb-uc-thumb ${GRAD_CLASSES[u.gradient] || GRAD_CLASSES[1]}">
        ${u.date && u.time ? `<span class="wb-uc-date-badge">${u.date} · ${u.time}</span>` : ''}
        <div class="wb-uc-icon">${ICON_PLAY_SM}</div>
      </div>
      <div class="wb-uc-body">
        <div class="wb-uc-cat-row">
          <div class="wb-uc-cat">${u.category}</div>
          <div class="wb-rec-meta-right">
            ${langBadge(u.language)}
            ${u.date ? `<span class="wb-rec-date-str">${u.date}</span>` : ''}
          </div>
        </div>
        <div class="wb-uc-title">${u.title}</div>
        ${u.speaker ? `
        <div class="wb-uc-speaker">
          ${u.speaker.photo
            ? `<img class="wb-rec-sp-av wb-rec-sp-photo" src="${u.speaker.photo}" alt="${u.speaker.name}">`
            : `<div class="wb-rec-sp-av" style="background:${u.speaker.color};color:${u.speaker.textColor};">${u.speaker.initials}</div>`}
          <div class="wb-rec-sp-info">
            <span class="wb-rec-sp-name">${u.speaker.name}</span>
            ${u.speaker.role ? `<span class="wb-rec-sp-role">${u.speaker.role}</span>` : ''}
          </div>
        </div>` : ''}
        <div class="wb-uc-footer">
          <div class="wb-uc-time">${ICON_MINI_CLK} ${u.duration}</div>
          <span class="wb-register-btn">Register ${ICON_MINI_ARR}</span>
        </div>
      </div>
    </a>`).join('');

  return `
  <div class="wb-section-head">
    <div class="wb-section-title wb-section-title--dark">More <span>Upcoming</span> Webinars</div>
    <div class="wb-slider-arrows wb-slider-arrows--dark">
      <button class="wb-arrow wb-arrow--dark" id="sliderPrev" onclick="slideUpcoming(-1)">${ICON_PREV}</button>
      <button class="wb-arrow wb-arrow--dark" id="sliderNext" onclick="slideUpcoming(1)">${ICON_NEXT}</button>
    </div>
  </div>
  <div class="wb-slider-track-wrap">
    <div class="wb-slider-track" id="upcomingTrack">${cardsHTML}</div>
  </div>`;
}

// ── Render: Recordings ────────────────────────────────────────
function renderRecordings(recordings) {
  const totalVideos = recordings.reduce((n, g) => n + g.videos.length, 0);

  const groupsHTML = recordings.map(group => {
    const cardsHTML = group.videos.map(v => {
      // Use YouTube thumbnail if youtubeId is real, otherwise use gradient
      const thumbStyle = `background:${v.thumbnailGradient};`;
      const speakersHTML = (v.speakers || []).slice(0, 2).map(s => `
        <div class="wb-rec-speaker">
          ${s.photo
            ? `<img class="wb-rec-sp-av wb-rec-sp-photo" src="${s.photo}" alt="${s.name}">`
            : `<div class="wb-rec-sp-av" style="background:${s.color};color:${s.textColor};">${s.initials}</div>`}
          <div class="wb-rec-sp-info">
            <span class="wb-rec-sp-name">${s.name}</span>
            ${s.role ? `<span class="wb-rec-sp-role">${s.role}</span>` : ''}
          </div>
        </div>`).join('');
      const youtubeThumb = v.youtubeId && v.youtubeId !== 'dQw4w9WgXcQ'
        ? `<img src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;" loading="lazy" alt="${v.title}">`
        : '';

      return `
      <div class="wb-rec-card" data-ytid="${v.youtubeId}" data-title="${v.title.replace(/"/g, '&quot;')}">
        <div class="wb-rec-thumb" style="${thumbStyle}">
          ${youtubeThumb}
          <span class="wb-preview-label">Preview</span>
          <div class="wb-rec-thumb-inner"><div class="wb-rec-play">${ICON_PLAY_LG}</div></div>
          ${v.duration ? `<span class="wb-rec-duration">${v.duration}</span>` : ''}
          ${v.views ? `<span class="wb-rec-viewed">${ICON_EYE} ${v.views} views</span>` : ''}
        </div>
        <div class="wb-rec-body">
          <div class="wb-rec-meta">
            <span class="wb-rec-cat-dot">
              <span style="width:6px;height:6px;border-radius:50%;background:${group.categoryColor};display:inline-block;"></span>
              ${group.category}
            </span>
            <div class="wb-rec-meta-right">
              ${langBadge(v.language)}
              <span class="wb-rec-date-str">${v.date}</span>
            </div>
          </div>
          <div class="wb-rec-title">${v.title}</div>
          <div class="wb-rec-footer">
            <div class="wb-rec-speakers">${speakersHTML}</div>
            <button class="wb-watch-btn">Watch ${ICON_MINI_ARR}</button>
          </div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="wb-cat-group">
      <div class="wb-cat-label">
        <span class="wb-cat-label-text">${ICON_GRID} ${group.category}</span>
        <div class="wb-cat-label-line"></div>
      </div>
      <div class="wb-rec-grid">${cardsHTML}</div>
    </div>`;
  }).join('');

  return `
  <div class="wb-recordings-wrap">
    <div class="wb-rec-header">
      <div class="wb-rec-title-block">
        <div class="wb-rec-eyebrow">On-Demand</div>
        <div class="wb-rec-h2">Past Recordings</div>
      </div>
      <div class="wb-rec-count">${totalVideos} sessions available</div>
    </div>
    ${groupsHTML}
  </div>`;
}

// ── Render: CTA Strip ─────────────────────────────────────────
function renderCTA() {
  return `
  <div class="wb-cta-strip">
    <div class="wb-cta-strip-text">
      <h3>Never miss a webinar</h3>
      <p>Get notified when new sessions go live. Join 8,000+ HR and finance leaders already subscribed.</p>
    </div>
    <div class="wb-cta-strip-btns">
      <a href="#" class="btn-primary" style="font-size:.9rem;padding:12px 24px;">Get Notified ${ICON_ARROW}</a>
    </div>
  </div>`;
}

// ── Countdown Timer ───────────────────────────────────────────
function startCountdown(isoDate) {
  const target = new Date(isoDate);
  const pad = n => String(Math.floor(n)).padStart(2, '0');
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hrs','cd-min','cd-sec'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    const days = document.getElementById('cd-days');
    const hrs  = document.getElementById('cd-hrs');
    const min  = document.getElementById('cd-min');
    const sec  = document.getElementById('cd-sec');
    if (days) days.textContent = pad(diff / 86400000);
    if (hrs)  hrs.textContent  = pad((diff % 86400000) / 3600000);
    if (min)  min.textContent  = pad((diff % 3600000) / 60000);
    if (sec)  sec.textContent  = pad((diff % 60000) / 1000);
  }
  tick();
  setInterval(tick, 1000);
}

// ── Slider Logic ──────────────────────────────────────────────
let upcomingIndex = 0;
function isMobile() { return window.innerWidth <= 768; }
function getVisible() { return window.innerWidth <= 1024 ? 2 : 3; }

function slideUpcoming(dir) {
  if (isMobile()) return;
  const track = document.getElementById('upcomingTrack');
  if (!track) return;
  const cards = track.children;
  const max = cards.length - getVisible();
  upcomingIndex = Math.max(0, Math.min(upcomingIndex + dir, max));
  const w = cards[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${upcomingIndex * w}px)`;
  const prev = document.getElementById('sliderPrev');
  const next = document.getElementById('sliderNext');
  if (prev) prev.disabled = upcomingIndex === 0;
  if (next) next.disabled = upcomingIndex >= max;
}

function initSlider() {
  const track = document.getElementById('upcomingTrack');
  if (!track) return;
  const wrap = track.parentElement;
  if (isMobile()) {
    track.style.transform = '';
    upcomingIndex = 0;
  } else {
    wrap.style.overflow = 'hidden';
    slideUpcoming(0);
    const prev = document.getElementById('sliderPrev');
    if (prev) prev.disabled = true;
  }
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.wb-rec-card,.wb-upcoming-card,.wb-featured-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    obs.observe(el);
  });
}

// ── Hamburger ─────────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-nav');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const open = this.classList.toggle('open');
    if (drawer) drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link tap
  if (drawer) drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ── Video Modal ───────────────────────────────────────────────
function renderModal() {
  const el = document.createElement('div');
  el.id = 'wb-video-modal';
  el.className = 'wb-modal-backdrop';
  el.innerHTML = `
    <div class="wb-modal-box">
      <button class="wb-modal-close" id="wb-modal-close">&#x2715;</button>
      <div class="wb-modal-iframe-wrap">
        <iframe id="wb-modal-iframe" frameborder="0" allowfullscreen
          allow="autoplay; encrypted-media; picture-in-picture"></iframe>
      </div>
      <div class="wb-modal-title" id="wb-modal-title"></div>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e => { if (e.target === el) closeVideoModal(); });
  document.getElementById('wb-modal-close').addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });
}

function openVideoModal(youtubeId, title) {
  document.getElementById('wb-modal-iframe').src =
    `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  document.getElementById('wb-modal-title').textContent = title;
  document.getElementById('wb-video-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  document.getElementById('wb-modal-iframe').src = '';
  document.getElementById('wb-video-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Main: Fetch data.json and render everything ───────────────
async function init() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const body = document.getElementById('wb-body');
    body.innerHTML =
      renderFeatured(data.featured) +
      renderUpcoming(data.upcoming) +
      renderRecordings(data.recordings) +
      renderCTA();

    // Wire up video modal
    renderModal();
    document.getElementById('wb-body').addEventListener('click', e => {
      const card = e.target.closest('.wb-rec-card[data-ytid]');
      if (!card) return;
      openVideoModal(card.dataset.ytid, card.dataset.title);
    });

    // Kick off interactive features after DOM is ready
    startCountdown(data.featured.date);
    initSlider();
    initReveal();
    initHamburger();
    window.addEventListener('resize', () => { upcomingIndex = 0; initSlider(); });

  } catch (err) {
    document.getElementById('wb-body').innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:#6b7280;">
        <p style="font-size:1.1rem;font-weight:600;color:#ef4444;margin-bottom:8px;">Could not load webinar data</p>
        <p style="font-size:.9rem;">${err.message}</p>
      </div>`;
    console.error('Webinar page error:', err);
  }
}

init();
