/* Rudra Health — mobile app prototype
   Built from: "UI UX feedback 10.20.26" + "Rudra Health Design Exploration" (core loop, coach, wallet).
   Part 1: state, helpers, art, onboarding, home, check-in loop. Part 2 (tools.js-style code) follows below. */
'use strict';

/* ═════════ helpers ═════════ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
const dateWord = d => d === today() ? 'Today' : d === daysAgo(1) ? 'Yesterday' : d;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ═════════ state ═════════ */
const KEY = 'rudra_mobile_v1';
const DEFAULT = () => ({
  onboarded: false, name: '', last: '', remind: 'morning',
  profile: { cc: '+1', phone: '', email: '', dob: '', lang: 'en', terms: false, contact: false }, meds: [], urges: [], relief: [], clinic: { name: '', code: '' }, verified: '', loop: {}, lastActivity: null,
  day: 1,                    // journey day (drives how the core loop evolves — deck slides 21-26)
  bucks: 0, streak: 0, lastCheckin: null,
  history: [],               // [{date, overall, vals:{k:v}}]
  txns: [], activities: 0, doneTools: {}, saved: [], watched: []
});
let S = (() => { try { return Object.assign(DEFAULT(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return DEFAULT(); } })();
S.history = (S.history || []).filter(h => h && Number.isFinite(h.overall) && h.vals && ['meds', 'cravings', 'risk', 'stress', 'emotions', 'body', 'drive'].every(k => Number.isFinite(h.vals[k])));   // drop any corrupt entries
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
/* a page refresh starts the check-in fresh: drop saved survey answers and today's completion */
/* …but a check-in finished today with its activity still pending is kept, so a refresh returns to the result page */
if (S.lastCheckin === today() && S.history.length) { /* resume */ } else { S.history = []; S.lastCheckin = null; S.loop = {}; S.lastActivity = null; } save();
const checkedInToday = () => S.lastCheckin === today();

/* journey stage flags (deck: "How will we handle phases of treatment?") */
const F = () => ({
  memory: S.history.length > 0,   // Rudra remembers last answers + focus area (the "memory & personalization" gap)
  trends: S.day >= 30,            // score shown in context of trends / milestones
  level: S.day >= 90 ? 3 : S.day >= 30 ? 2 : 1   // activity level — unlocked by doing earlier activities
});

/* ═════════ icons ═════════ */
const P = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  tools: '<path d="M12 3c4 2 6 6 5 10-1 3-3 5-5 8-2-3-4-5-5-8-1-4 1-8 5-10z"/><path d="M12 8v10"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-1 1-1.6 2.5-1.6s2.5.6 2.5 1.6-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1 1.6 2.5 1.6 2.5-.6 2.5-1.6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  life: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
  send: '<path d="M4 12l16-8-6 17-3-7-7-2z"/>',
  play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
  pause: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7M14 8.5v7"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  sms: '<path d="M4 5h16v11H9l-5 4z"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h8"/>',
  bars: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2"/>',
  quote: '<path d="M9 8H6v5h3v3H5M19 8h-3v5h3v3h-4"/>',
  book: '<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>',
  wave: '<path d="M2 14c3-6 5-6 8 0s5 6 8 0 3-4 4-3"/>',
  run: '<circle cx="14" cy="5" r="2"/><path d="M5 21l4-6 3 2 3-5-3-3-4 2-2 3M12 12l3 3v6"/>',
  leaf: '<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15zM5 19l8-8"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  pill: '<path d="M10.5 20.5a4.95 4.95 0 0 1-7-7l9-9a4.95 4.95 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  shower: '<path d="M5 8a7 7 0 0 1 14 0z"/><path d="M8 12v1M12 12v2M16 12v1M10 16v1M14 17v1"/>',
  game: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v4M5 13h4M16 12h.01M18 14h.01"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  dumbbell: '<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>',
  drop: '<path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z"/>',
  paw: '<circle cx="7" cy="10" r="1.8"/><circle cx="11" cy="6.5" r="1.8"/><circle cx="15.5" cy="6.5" r="1.8"/><circle cx="19" cy="10" r="1.8"/><path d="M12 12c-3 0-5 3-5 5 0 2 2 2.5 5 2.5s5-.5 5-2.5c0-2-2-5-5-5z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r=".6" fill="currentColor"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  cloud: '<path d="M7 16a4 4 0 1 1 .8-7.9A5 5 0 0 1 17 9a3.5 3.5 0 0 1 0 7z"/><path d="M9 19v2M13 19v2M17 19v2"/>',
  pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2M9 9.5h.01M15 9.5h.01"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5z"/><circle cx="15" cy="9" r="1.5"/>',
  more: '<circle cx="12" cy="12" r="9"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  beer: '<path d="M6 7h10v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM16 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2M6 7a3 3 0 0 1 5-2 3 3 0 0 1 5 2M9.5 11v6M12.5 11v6"/>',
  speaker: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16 9.5"/>',
  xc: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  partial: '<circle cx="12" cy="12" r="9" stroke-dasharray="3 3.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'
};
const ic = (n, s = 22, w = 1.9) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

/* ═════════ glossy illustrations: sphere on a ringed platform, coin stack ═════════ */
const SPHERE = [['#DCEBF7', '#6B9FCC', '#3F6F9F'], ['#E6F1FA', '#9CC0E0', '#5B8FC0'], ['#FDF1DB', '#EDB96A', '#C98A2B'], ['#FBE3C0', '#E3A04A', '#B87420'], ['#FBE6E3', '#E8928A', '#C2574E'], ['#DCEBF7', '#6B9FCC', '#3F6F9F']];
let _gid = 0;
function sphere(m, r = 34, cx = 0, cy = 0) {
  const [a, b, c] = SPHERE[m == null ? 5 : m], id = 'sg' + (++_gid);
  return `<defs><radialGradient id="${id}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/><ellipse cx="${cx - r * .3}" cy="${cy - r * .42}" rx="${r * .3}" ry="${r * .17}" fill="#fff" opacity=".55" transform="rotate(-24 ${cx - r * .3} ${cy - r * .42})"/>`;
}
function orbArt(m, w = 190) {
  const rings = [0, 1, 2, 3, 4, 5].map(k => `<ellipse cx="160" cy="${150 - k * 1}" rx="${142 - k * 21}" ry="${52 - k * 7.5}" fill="${k % 2 ? '#D3E4F2' : '#EAF2F9'}" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`).join('');
  return `<div class="orb-art" id="face"><svg viewBox="0 0 320 210" width="${w * 1.45}" height="${w}" aria-hidden="true"><defs><linearGradient id="pf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F8FC"/><stop offset="1" stop-color="#A9C9E3"/></linearGradient></defs>
    <ellipse cx="160" cy="164" rx="142" ry="46" fill="#7FAAD3" opacity=".45"/><ellipse cx="160" cy="150" rx="142" ry="52" fill="url(#pf)"/>${rings}
    <ellipse cx="160" cy="146" rx="24" ry="7" fill="#7FAAD3" opacity=".55"/>${sphere(m, 36, 160, 112)}</svg></div>`;
}
function coinStack(w = 170) {
  const coin = y => `<ellipse cx="85" cy="${y + 12}" rx="62" ry="20" fill="#1C1C1C"/><rect x="23" y="${y}" width="124" height="12" fill="url(#cs)"/><ellipse cx="85" cy="${y}" rx="62" ry="20" fill="url(#ct)" stroke="#E6F77A" stroke-width="1.5"/>`;
  return `<svg class="coin" viewBox="0 0 170 190" width="${w}" height="${w * 1.12}" aria-hidden="true"><defs><linearGradient id="cs" x1="0" x2="1"><stop offset="0" stop-color="#1C1C1C"/><stop offset=".5" stop-color="#D9F23C"/><stop offset="1" stop-color="#1C1C1C"/></linearGradient><radialGradient id="ct" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#F2FBB0"/><stop offset="1" stop-color="#3A3A3A"/></radialGradient></defs>
    <ellipse cx="85" cy="168" rx="66" ry="14" fill="#1C1C1C" opacity=".2"/>${[132, 110, 88, 66, 44].map(coin).join('')}<text x="85" y="50" text-anchor="middle" font-family="Inter" font-weight="800" font-size="26" fill="#fff" opacity=".9">R</text></svg>`;
}

/* brand mark — round "R" badge */
const brandMark = (size = 44) => `<svg class="bm" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true"><path d="M24 4c11 0 20 8 20 19 0 9-6 17-15 19-9 2-19-3-22-12C3 20 9 4 24 4z" fill="#0E5A58"/><circle cx="24" cy="24" r="9.5" fill="#fff"/></svg>`;

/* ═════════ toast / layers / confetti ═════════ */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }
function pushLayer(html, cls = '') {
  const l = document.createElement('div'); l.className = 'layer ' + cls; l.innerHTML = html;
  $('#phone').appendChild(l); requestAnimationFrame(() => requestAnimationFrame(() => l.classList.add('in'))); return l;
}
function popLayer(l) {
  if (!l) { const all = $$('.layer'); l = all[all.length - 1]; } if (!l) return;
  if (l._cleanup) { try { l._cleanup(); } catch (e) { } l._cleanup = null; }
  l.classList.remove('in'); setTimeout(() => l.remove(), 260);
}
const layerOf = el => el.closest('.layer');
function confetti() {
  const ph = $('#phone'), cols = ['#C9A84C', '#6B9FCC', '#D4736A', '#C4A088', '#8B7EC8'];
  for (let i = 0; i < 36; i++) {
    const c = document.createElement('i'); c.className = 'confetti';
    c.style.cssText = `left:${Math.random() * 100}%;background:${cols[i % 5]};animation-delay:${Math.random() * .5}s;transform:rotate(${Math.random() * 360}deg)`;
    ph.appendChild(c); setTimeout(() => c.remove(), 3000);
  }
}
function countUp(el, to, ms = 1100, from = 0, fmt = Math.round) {
  const t0 = performance.now();
  (function f(t) { const p = clamp((t - t0) / ms, 0, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(f); })(t0);
}

/* ═════════ wallet ═════════ */
/* rewards are real dollars: 1 reward point = $0.10 (RATE) */
const RATE = 0.1, usd = n => '$' + (n * RATE).toFixed(2);
function earn(amt, label, score) {
  S.bucks += amt; S.txns.unshift({ t: label, amt, d: today(), s: score });
  if (/^Activity/.test(label)) {   // weekly bonus: 6 activities within 7 days = $1.50
    const now = Date.now(), wk = S.txns.filter(x => /^Activity/.test(x.t) && now - new Date(x.d).getTime() < 7 * 864e5 + 864e5).length;
    const recentBonus = S.txns.some(x => x.t === 'Weekly bonus' && now - new Date(x.d).getTime() < 7 * 864e5 + 864e5);
    if (wk >= 6 && !recentBonus) { S.bucks += 15; S.txns.unshift({ t: 'Weekly bonus', n: '6 activities this week', amt: 15, d: today() }); toast('Weekly bonus +' + usd(15)); }
  }
  S.txns = S.txns.slice(0, 60); save();
}
const REWARDS = [
  { at: 50, t: 'Coffee on us', d: 'A $5 coffee credit' },
  { at: 150, t: 'Movie night', d: 'A $12 movie credit' },
  { at: 300, t: 'Treat yourself', d: 'A $25 gift card' },
  { at: 600, t: 'Weekend reset', d: 'A $50 wellness credit' }
];
const nextReward = () => REWARDS.find(r => r.at > S.bucks) || REWARDS[REWARDS.length - 1];

/* ═════════ router / views ═════════ */
let tab = 'home';
const VIEWS = ['onb', 'setup', 'home', 'tools', 'wallet', 'me', 'community', 'progress'];
function mountViews() {
  $('#views').innerHTML = VIEWS.map(v => `<section class="view${v === 'onb' ? ' noscroll' : ''}" id="v-${v}" hidden></section>`).join('');
}
function showView(v) { VIEWS.forEach(x => { $('#v-' + x).hidden = x !== v; }); document.getElementById('phone').classList.remove('on-intro'); }
function go(t) {
  tab = t; showView(t);
  $('#nav').hidden = t === 'me';
  if (t === 'wallet') markWalletViewed();   // loop step: View Wallet
  ({ home: renderHome, tools: renderTools, wallet: renderWallet, me: renderMe, community: renderCommunity, progress: renderProgress })[t]();
  renderNav(); $('#v-' + t).scrollTop = 0;
}
const NAV_ICON = {
  home: ['<path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>', '<path d="M11.1 3.3a1.4 1.4 0 0 1 1.8 0l7.4 6A1.4 1.4 0 0 1 20.8 10.4V19.2A1.8 1.8 0 0 1 19 21h-4a.9.9 0 0 1-.9-.9V15.5h-4.2v4.6a.9.9 0 0 1-.9.9H5A1.8 1.8 0 0 1 3.2 19.2V10.4A1.4 1.4 0 0 1 3.7 9.3z"/>'],
  community: ['<path d="M12 4C7.6 4 4 7.1 4 11c0 2 .9 3.700 2.400 5L5.800 20l3.900-1.800c.7.200 1.500.3 2.300.3 4.400 0 8-3.100 8-7S16.400 4 12 4z"/>', '<path d="M12 3C6.900 3 3 6.600 3 11c0 2.200 1 4.200 2.600 5.600L5 21l4.200-2c.9.200 1.800.4 2.800.4 5.100 0 9-3.600 9-8S17.100 3 12 3z"/>'],
  progress: ['<rect x="4" y="11" width="4" height="9" rx="1.200"/><rect x="10" y="4" width="4" height="16" rx="1.200"/><rect x="16" y="8" width="4" height="12" rx="1.200"/>', '<rect x="3.500" y="10.500" width="5" height="10" rx="1.600"/><rect x="9.500" y="3.500" width="5" height="17" rx="1.600"/><rect x="15.500" y="7.500" width="5" height="13" rx="1.600"/>'],
  wallet: ['<path d="M5 8V7a2 2 0 0 1 2-2h9.500A1.500 1.500 0 0 1 18 6.500V8"/><rect x="3.500" y="8" width="17" height="11.500" rx="2.500"/><path d="M20.500 12.500h-3.750a1.750 1.750 0 0 0 0 3.500h3.750"/>', '<path fill-rule="evenodd" d="M7 4.500A2.500 2.500 0 0 0 4.500 7v.2A3 3 0 0 0 3 9.800v7.700A2.500 2.500 0 0 0 5.500 20h13a2.500 2.500 0 0 0 2.500-2.500V9.800A2.500 2.500 0 0 0 18.500 7.300V6.500A2 2 0 0 0 16.500 4.500zM16.750 12a2 2 0 1 0 0 4h4.250v-4z"/>']
};
function renderNav() {
  const item = ([id, l]) => { const on = tab === id, [line, fill] = NAV_ICON[id];
    return `<button data-act="tab" data-v="${id}" class="${on ? 'on' : ''}" aria-label="${l}" ${on ? 'aria-current="page"' : ''}><i class="nav-ic">${on
      ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">${fill.replace(/<rect([^>]*)\/>/g, '<rect$1/>')}</svg>`
      : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${line}</svg>`}</i><span>${l}</span></button>`; };
  $('#nav').innerHTML = [['home', 'Home'], ['community', 'Community']].map(item).join('')
    + `<button class="nav-help" data-act="help" aria-label="Help">${ic('plus', 28, 2.6)}<span>HELP</span></button>`
    + [['progress', 'Progress'], ['wallet', 'Rewards']].map(item).join('');
}
const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

/* ═════════ ONBOARDING — "How to Play" style cards ═════════ */
const ONB = [
  { t: 'Your companion between visits', p: 'Recovery happens every day, not just at the clinic. Rudra is with you in between, so you never have to go it alone.' },
  { t: 'Here for you and your people', p: 'Rudra works alongside your care team. Your information stays private, and you decide what’s shared.' },
  { t: 'Check in, in about a minute', p: 'A few quick questions each day help you spot patterns early. Honest answers help most - there are no wrong ones.' },
  { t: 'One small step a day', p: 'Based on your check-in, Rudra picks a short activity for you, like breathing, grounding or a plan for cravings.' },
  { t: 'Help when it’s hard', p: 'Tap Help any time for crisis lines, tools to ride out a craving, or a quick way to reach your people.' },
  { t: 'Earn real rewards', p: 'Every check-in and activity earns real money, loaded onto your Rudra card each week. Showing up counts.' },
  { t: 'Why we do this', p: 'Steady, everyday support helps recovery last. We built Rudra so your effort is noticed and rewarded, one day at a time.' }
];
const ONB_IMG = [1, 2, 3, 4, 5, 6, 7].map(n => `intro-${n}.jpg?v=2`);
/* first screen after download: looping video + hello */
function renderIntro() {
  showView('onb'); $('#nav').hidden = true; $('#phone').classList.add('on-intro');
  $('#v-onb').innerHTML = `<div class="intro">
    <video class="intro-vid" src="assets/intro.mp4?v=2" poster="assets/intro-poster.jpg?v=2" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video>
    <div class="intro-shade" aria-hidden="true"></div>
    <div class="intro-copy"><h1>Meet Rudra, your recovery companion</h1>
      <p>Support for every day of your recovery.</p></div>
    <div class="intro-foot"><button class="btn intro-btn" data-act="intro-start">Get started ${ic('next', 16, 2.4)}</button></div></div>`;
  const v = $('.intro-vid');
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
  else { const pl = v.play(); if (pl && pl.catch) pl.catch(() => { }); }
}
let onbI = 0;
const OB_TOTAL = 4;
const obHead = (n, back) => `<div class="step-head">${back ? `<button class="back-c" data-act="ob-back" aria-label="Back">${ic('back', 20)}</button>` : ''}<div class="step-bar"><i style="width:${n / OB_TOTAL * 100}%"></i></div><span class="step-n"><b>${n}</b>/${OB_TOTAL}</span></div>`;
function renderOnb(i = 0) {
  onbI = i; showView('onb'); $('#nav').hidden = true;
  const s = ONB[i], last = i === ONB.length - 1;
  $('#v-onb').innerHTML = `<div class="onb2"><div class="onb-top"><button class="skip-link" data-act="onb-skip">Skip</button></div>
    <div class="onb-img" key="${i}"><img src="assets/${ONB_IMG[i]}" alt="" draggable="false"></div>
    <div class="onb-copy" key="t${i}"><h2>${s.t}</h2><p>${s.p}</p></div>
    <div class="onb-dots" role="tablist" aria-label="Intro pages">${ONB.map((_, k) => `<button class="${k === i ? 'on' : ''}" data-act="onb-go" data-i="${k}" aria-label="Page ${k + 1}"></button>`).join('')}</div>
    <div class="foot-row onb-foot2"><button class="btn" data-act="onb-next">${last ? 'Get started' : 'Next'} ${ic('next', 16, 2.4)}</button></div></div>`;
}
/* ── trigger: a time of day tied to something already in the user's routine (anchor habit) ── */
const REMIND = {
  morning: { label: 'Morning · with your coffee', t: '8:00 AM' },
  afternoon: { label: 'Midday · after lunch', t: '1:00 PM' },
  evening: { label: 'Evening · winding down', t: '8:00 PM' }
};
const remindTime = () => { if (!S.remindTime) return REMIND[S.remind].t; const [h, m] = S.remindTime.split(':').map(Number); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
const nextTrigger = () => S.remindOn === false ? 'Reminders are off' : `${checkedInToday() ? 'Tomorrow' : 'Today'}, ${remindTime()} · ${REMIND[S.remind].label}`;
const remindPills = act => Object.entries(REMIND).map(([k, r]) => `<button class="pill ${S.remind === k ? 'on' : ''}" data-act="${act}" data-k="${k}">${r.label}</button>`).join('');

/* ═════════ HOME ═════════ */
function sparkline(vals, w = 300, h = 70) {
  if (vals.length < 2) return '';
  const mn = Math.min(...vals) - 4, mx = Math.max(...vals) + 4, st = w / (vals.length - 1);
  const pts = vals.map((v, i) => [i * st, h - ((v - mn) / (mx - mn)) * h]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const l = pts[pts.length - 1];
  return `<svg viewBox="-6 -8 ${w + 12} ${h + 16}" width="100%" height="${h + 16}" preserveAspectRatio="none"><path d="${d} L${w} ${h} L0 ${h}Z" fill="#6B9FCC" opacity=".14"/><path d="${d}" fill="none" stroke="#5B8FC0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${l[0]}" cy="${l[1]}" r="5" fill="#5B8FC0"/></svg>`;
}
const focusArea = h => h ? Q.map(q => [q.label, h.vals[q.k]]).sort((a, b) => a[1] - b[1])[0][0] : null;
function homeLine() {
  const n = S.name || 'friend', last = S.history[S.history.length - 1];
  if (checkedInToday()) return `Done for today, ${n}. Next reminder: ${nextTrigger()}.`;
  if (!last) return `Hi ${n}. Your first check-in takes about 60 seconds.`;
  return `Welcome back, ${n}. Last score ${last.overall} · focus area: ${focusArea(last)}.`;
}
/* Today's loop: Survey → Score → Activity → Earn → Wallet → (next trigger) */
function loopCard(rec) {
  const L = S.loop.date === today() ? S.loop : {};
  const steps = [['Survey', !!L.survey, 'checkin'], ['Score', !!L.score, 'score'], ['Activity', !!L.activity, 'activity'], ['Earn', !!L.earned, 'wallet'], ['Rewards', !!L.wallet, 'wallet']];
  const cur = steps.findIndex(x => !x[1]);
  return `<div class="loop"><div class="eyebrow">Today’s loop</div><div class="loop-steps">${steps.map(([l, d, a], i) => `<button class="ls ${d ? 'done' : i === cur ? 'cur' : ''}" data-act="loop" data-s="${a}"><i>${d ? ic('check', 14, 3) : i + 1}</i><span>${l}</span></button>`).join('')}</div>
    <p class="loop-n">${ic('life', 15)}<span>Next reminder: <b>${nextTrigger()}</b></span></p></div>`;
}
function memoryCard() {
  const last = S.history[S.history.length - 1];
  if (!last) return `<div class="mem-card"><div class="mem-h">${brandMark(30)}<b>Personalized for you</b></div><p class="mem-empty">After your first check-in, Rudra remembers your answers and picks activities that fit.</p></div>`;
  const la = S.lastActivity ? (TOOLS.find(t => t.id === S.lastActivity) || {}).title : null, when = dateWord(last.date), r = REMIND[S.remind];
  const word = last.overall >= 75 ? 'Strong' : last.overall >= 55 ? 'Steady' : last.overall >= 40 ? 'Building' : 'Needs care';
  const tile = (tone, icon, label, value, sub, corner = '', bar = '') => `<div class="mem-t mt-${tone}"><div class="mt-top"><span class="s-ic tn-${tone}">${ic(icon, 20, 1.8)}</span>${corner}</div>
    <div class="mt-bot"><small>${label}</small><b>${value}</b><em>${sub}</em>${bar}</div></div>`;
  return `<div class="mem-card"><div class="mem-h">${brandMark(30)}<b>Rudra remembers</b><span class="mem-tag">For you</span></div>
    <div class="mem-grid">${tile('blue', 'pulse', 'Last check-in', `${last.overall}<i>/100</i>`, when, `<span class="mt-pill">${word}</span>`, `<div class="mt-bar"><i style="width:${last.overall}%"></i></div>`)}
      ${tile('amber', 'target', 'Focus area', focusArea(last), 'Lowest this time')}
      ${tile('green', 'leaf', 'Last activity', la || 'Not yet', la ? 'Completed' : 'Pick one below', la ? `<span class="mt-ok">${ic('check', 13, 3)}</span>` : '')}
      ${tile('slate', 'clock', 'Reminder', r.t, r.label.split(' · ')[0])}</div></div>`;
}
const dateLine = () => new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
const ARROW_UR = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8.5 7H17v8.5"/></svg>';

/* ── Recovery Health gauge card (home) ── */
function rhArc(cx, cy, r, a0, a1) {   // angles in degrees, 180 = left … 0 = right
  const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}
let rhN = 0;
function rhArcs() {   // one continuous red → orange → yellow → green arc
  const id = 'rhg' + (++rhN);
  return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="42" y1="0" x2="258" y2="0"><stop offset="0" stop-color="#CD8A80"/><stop offset=".28" stop-color="#DFA46B"/><stop offset=".5" stop-color="#E4C873"/><stop offset=".74" stop-color="#B4CB9B"/><stop offset="1" stop-color="#8FB287"/></linearGradient></defs><path d="${rhArc(150, 150, 108, 180, 0)}" stroke="url(#${id})" stroke-width="26" fill="none" stroke-linecap="round"/>`;
}
function recoveryCard(last) {
  const arcs = rhArcs();
  const done = !!last && checkedInToday();   // the gauge stays at zero until today's check-in is done
  const v = done ? last.overall : 0, prev = done ? (S.history.length > 1 ? S.history[S.history.length - 2].overall : Math.max(v - 2, 0)) : null;   // first check-in: a small steady baseline so the card reads like later days   // before today's check-in the gauge sits at zero
  const word = v >= 85 ? 'Excellent' : v >= 70 ? 'Above average' : v >= 55 ? 'Steady' : v >= 40 ? 'Building' : 'Needs care';
  const d = prev == null ? null : v - prev;
  const dtxt = d == null ? 'New' : Math.abs(d) <= 3 ? 'Stable' : d > 0 ? 'Improving' : 'Dipping';
  const arrow = d == null ? '' : d > 0 ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>' : d < 0 ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>' : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>';
  const who = S.name ? `${esc(S.name.split(' ')[0])}’s Recovery Health` : 'Your Recovery Health';
  const hist = S.history.slice(-14).map(h => h.overall), ready = done && hist.length > 0, pts = hist.length === 1 ? [-9, -8, -9.5, -6.5, -7.5, -4, -5, 0].map(o => clamp(hist[0] + o, 0, 100)) : hist;   // first check-in: flat line until there is more to compare
  const wd = ready ? pts[pts.length - 1] - pts[0] : 0, wword = hist.length === 1 ? 'Steady' : wd > 3 ? 'Improving' : wd < -3 ? 'Dipping' : 'Steady';
  const spark = ready ? (() => {
    const W = 180, H = 56, lo = Math.min(...pts), rg = Math.max(Math.max(...pts) - lo, 12), mid = lo + (Math.max(...pts) - lo) / 2, xy = pts.map((n, i) => [8 + i * (W - 16) / (pts.length - 1), H / 2 - 4 - (n - mid) / rg * (H - 28)]);
    const path = xy.map((q, i) => { if (!i) return `M${q[0].toFixed(1)} ${q[1].toFixed(1)}`; const pq = xy[i - 1], mx = ((pq[0] + q[0]) / 2).toFixed(1); return `C${mx} ${pq[1].toFixed(1)} ${mx} ${q[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join(' ');
    const dots = xy.slice(-2).map(q => `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="6" fill="#5E8B6E" stroke="#fff" stroke-width="3"/>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><defs><linearGradient id="spg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E8B6E" stop-opacity=".22"/><stop offset="1" stop-color="#5E8B6E" stop-opacity="0"/></linearGradient></defs><path d="${path} L${xy[xy.length - 1][0].toFixed(1)} ${H} L${xy[0][0].toFixed(1)} ${H}z" fill="url(#spg)"/><path d="${path}" fill="none" stroke="#5E8B6E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`;
  })() : `<svg viewBox="0 0 180 46" preserveAspectRatio="none" aria-hidden="true"><line x1="2" y1="23" x2="178" y2="23" stroke="#C5D1DD" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/></svg>`;
  const twoWeeks = `<div class="rh-weeks"><div><small>Past 2 weeks</small><b class="${ready ? '' : 'mut'}">${ready ? wword : 'Not ready yet'}</b></div><div class="rh-spark">${spark}</div></div>`;
  return `<div class="rh-card">
    <div class="rh-head"><b>${who}</b><span class="rh-info" aria-hidden="true">${ic('info', 20, 1.6)}</span></div>
    <div class="rh-gauge"><svg viewBox="0 0 300 175" width="100%" aria-hidden="true">${arcs}
      <g class="rh-needle" id="rh-needle" style="transform-origin:150px 150px;transform:rotate(-90deg)"><path d="M144.5 150L150 56 155.5 150z" fill="#2B3440" stroke="#2B3440" stroke-width="2" stroke-linejoin="round"/></g>
      <circle cx="150" cy="150" r="13" fill="#2B3440"/><circle cx="150" cy="150" r="5" fill="#fff"/>
      <text x="26" y="176" font-size="14" font-weight="500" fill="#C0847A">Low</text><text x="274" y="176" text-anchor="end" font-size="14" font-weight="500" fill="#6E9A78">HIGH</text></svg>
      <div class="rh-num"><b>${v}</b><small>OUT OF 100</small></div></div>
    <div class="rh-chips">${done ? `<span class="rh-word">${word}</span><span class="rh-delta ${d > 3 ? 'up' : d < -3 ? 'down' : ''}">${arrow}<b>${d == null ? '–' : Math.abs(d)}</b><em>${dtxt}</em></span>` : `<button class="rh-word rh-todo" data-act="checkin">Complete today’s check-in ${ic('next', 18, 2.4)}</button>`}</div>
    <button class="rh-xp" data-act="insights"><span class="rh-xp-ic">${ic('bulb', 24, 1.6)}</span><span class="rh-xp-t"><b>Insights</b><small>Recovery Health Score Details</small></span></button>
    ${twoWeeks}
  </div>`;
}
function streaksCard() {
  const n = S.streak || 0; if (n > (S.bestStreak || 0)) { S.bestStreak = n; save(); }
  const goal = 90, left = Math.max(0, goal - n), pct = Math.min(100, n / goal * 100);
  return `<div class="rh-card sk-card">
    <div class="rh-head"><b>Streaks</b><span class="rh-info" aria-hidden="true">${ic('info', 20, 1.6)}</span></div>
    <div class="sk-hero"><span class="sk-eye">RECOVERY JOURNEY</span>
      <h3>${n && n >= S.bestStreak ? 'Your longest yet' : n ? 'Keep it going' : 'Start your streak'}</h3>
      <div class="sk-n"><b>${n}</b><span>DAYS IN RECOVERY</span></div>
      <div class="sk-bar"><i style="width:${pct}%"></i></div>
      <p>${left ? `${left} day${left === 1 ? '' : 's'} to your ${goal}-day milestone` : `You reached your ${goal}-day milestone`}</p></div>
  </div>`;
}
function renderHome() {
  const v = $('#v-home'), done = checkedInToday(), last = S.history[S.history.length - 1];
  const rec = recommend(last ? last.vals : null);
  const week = Array.from({ length: 7 }, (_, k) => { const d = daysAgo(6 - k); return { done: S.history.some(h => h.date === d) || (k === 6 && done), now: k === 6 }; });
  const wdone = week.filter(x => x.done).length;
  v.innerHTML = `
  <div class="oh-top"><div class="oh-lead"><button class="oh-chip" data-act="tab" data-v="me" aria-label="Profile">${ic('user', 22, 1.6)}</button><img class="oh-logo" src="assets/logo.webp" alt="RudraHealth.ai"></div>
    <div class="oh-actions"><button class="oh-chip" data-act="open-map" aria-label="Nearby support map">${ic('pin', 22, 1.6)}</button></div></div>
  <h1 class="oh-hey"><span>Hey,</span> ${esc(S.name || 'friend')}</h1><p class="oh-sub">Take a breath - one small step today.</p>
  ${recoveryCard(last)}
  ${focusCard()}
`;
  setTimeout(() => { const n = $('#rh-needle'); if (n) n.style.transform = `rotate(${-90 + 180 * clamp(((last && checkedInToday()) ? last.overall : 0) / 100, 0, 1)}deg)`; }, 120);
}
const earnedToday = () => S.txns.filter(x => x.d === today()).reduce((a, x) => a + x.amt, 0);
function markWalletViewed() { if (S.loop.date === today() && S.loop.earned && !S.loop.wallet) { S.loop.wallet = 1; save(); } }
function weekRow() {
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = daysAgo(i), done = S.history.some(h => h.date === d) || (i === 0 && checkedInToday()); days.push({ d, done, now: i === 0, l: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(d + 'T12:00:00').getDay()] }); }
  return `<div class="week">${days.map(x => `<div class="wd ${x.done ? 'done' : ''} ${x.now ? 'now' : ''}"><i>${x.done ? ic('check', 14, 3) : ''}</i><span>${x.l}</span></div>`).join('')}</div>`;
}
const DAY_TITLE = { 1: 'First experience', 14: 'Rudra remembers you', 30: 'Score in context', 60: 'Fresh activities', 90: 'Level III unlocked' };
const DAY_NOTE = {
  1: 'Day 1 — the full loop with helper text on each step. Nothing to remember yet.',
  14: 'Day 14 — Rudra remembers: questions show your last answers and focus area.',
  30: 'Day 30 — your score appears in context of trends and milestones.',
  60: 'Day 60 — longer history and bigger milestones; activities rotate so they stay fresh.',
  90: 'Day 90 — Level III activities unlocked by earlier ones; activity earnings scale with level.'
};
function nextMilestone() { const m = [7, 14, 30, 60, 90, 180].find(x => x > S.streak) || 365; return `${m}-day streak`; }
function trendWord() { const h = S.history.slice(-14).map(x => x.overall); if (h.length < 3) return ''; const d = h[h.length - 1] - h[0]; return d > 3 ? '↗ Trending up' : d < -3 ? '↘ Dipping' : '→ Steady'; }

/* seed believable history when previewing later journey days */
function setDay(d) {
  S.day = d;
  const cfg = { 1: [0, 0, 0, 0], 14: [11, 12, 140, 9], 30: [27, 27, 380, 24], 60: [41, 41, 820, 55], 90: [68, 68, 1300, 104] }[d];
  S.streak = cfg[0]; S.bucks = cfg[2]; S.activities = cfg[3];
  const n = d === 1 ? 0 : Math.min(cfg[1], 21);
  S.history = []; S.txns = []; S.loop = {}; S.lastActivity = d > 1 ? 'breath' : null;
  for (let i = 0; i < n; i++) {
    const base = 46 + (i / Math.max(n - 1, 1)) * 24 + Math.sin(i * 1.7) * 5, vals = {};
    Q.forEach((q, k) => { vals[q.k] = clamp(Math.round((base / 10 + Math.sin(i + k * 2) * 1.4) * 2) / 2, 1, 10); });
    S.history.push({ date: daysAgo(n - i), overall: Math.round(Object.values(vals).reduce((a, b) => a + b, 0) / Q.length * 10), vals });
  }
  S.lastCheckin = n ? daysAgo(1) : null;
  S.history.forEach((h, i) => {   // earnings that line up with each seeded score
    S.txns.unshift({ t: 'Streak bonus', amt: Math.min(i + 1, 5), d: h.date });
    if (i % 2 === 0) S.txns.unshift({ t: 'Activity: Breathing', amt: 5, d: h.date });
    S.txns.unshift({ t: 'Daily check-in', amt: 10, d: h.date, s: h.overall });
  });
  save(); go('home');
}

/* ═════════ CHECK-IN CORE LOOP ═════════
   prompt → one question per screen (auto-advance) → score + coach → activity → RudraBucks → end */
const scoreCol = v => v >= 7 ? '#6C9FCC' : v >= 4.5 ? '#B7AEDB' : '#E3A99F';
const recWhy = r => r.why ? `For your ${r.why.toLowerCase()} (${r.whyV.toFixed(1)}) · ${r.hint}` : r.hint;

const ACT_BONUS = [0, 5, 7, 10];   // activity earnings scale with level
function earnCalc(didActivity) {
  const first = !!CI.first, base = first ? 10 : 0, act = first && didActivity ? ACT_BONUS[F().level] : 0, st = first ? clamp(S.streak, 1, 5) : 0;
  return { first, base, act, st, total: base + act + st };
}
const ROMAN = ['', 'I', 'II', 'III'];
function nextStepHTML(rec) {
  const e = earnCalc(true), lvl = F().level;
  return `<div class="nextstep" style="--ns:${rec.pc}">
    <div class="ns-top"><span class="eyebrow">Your next step</span>${lvl > 1 ? `<span class="lvl">LEVEL ${ROMAN[lvl]}${lvl === 3 ? ' · UNLOCKED' : ''}</span>` : ''}</div>
    <div class="ns-main"><span class="chip-i ${TCHIP[rec.id]}">${ic(rec.ic, 22)}</span><div><b>${rec.title}</b><small>Suggested for you</small></div></div>
    ${CI.first ? `<div class="ns-earn"><span><b>+${usd(e.base)}</b>check-in</span><span><b>+${usd(e.act)}</b>activity</span><span><b>+${usd(e.st)}</b>streak</span></div>` : `<p class="ns-done">You’ve already earned today’s reward — extra activities are still good for you.</p>`}
    <button class="btn" data-act="ci-activity">Start ${rec.title}${CI.first ? ` · earn +${usd(e.total)}` : ''}</button>
  </div><button class="btn ghost" data-act="ci-skip-act">Skip activity${CI.first ? ` · collect +${usd(e.base + e.st)}` : ''}</button>`;
}

let CI = null;
function startCheckin() {
  CI = { i: 0, a: {}, done: {}, touched: {}, layer: null };
  CI.layer = pushLayer('<div id="ci-root" style="display:flex;flex-direction:column;flex:1"></div>');
  CI.layer._cleanup = () => { CI = null; };
  renderCI();
}
/* arc gauge — 270° open-bottom arc with dotted inner ring */
function gauge(score) {   // same half-circle gauge as the home card
  return `<div class="sg"><svg viewBox="0 0 300 175" width="100%" aria-hidden="true">${rhArcs()}
    <g class="rh-needle" id="g-needle" style="transform-origin:150px 150px;transform:rotate(-90deg)"><path d="M143.5 148L150 62 156.5 148z" fill="#2B3440" stroke="#2B3440" stroke-width="2" stroke-linejoin="round"/></g>
    <circle cx="150" cy="150" r="13" fill="#2B3440"/><circle cx="150" cy="150" r="5" fill="#fff"/>
    <text x="26" y="176" font-size="14" font-weight="500" fill="#C0847A">Low</text><text x="274" y="176" text-anchor="end" font-size="14" font-weight="500" fill="#6E9A78">High</text></svg>
    <div class="rh-num"><b id="g-num" data-score="${score}">0</b><small>OUT OF 100</small></div></div><div class="rating ${score >= 55 ? 'ok' : 'low'}">${score >= 75 ? 'Strong' : score >= 55 ? 'Steady' : score >= 40 ? 'Building' : 'Needs care'}</div>`;
}
function strengthsHTML(vals) {
  return Q.map(q => { const v = vals[q.k]; return `<div class="str"><div class="str-r"><span>${q.label}</span><b>${v.toFixed(1)}</b></div><div class="str-bar"><i data-w="${v * 10}" style="background:${scoreCol(v)}"></i></div></div>`; }).join('');
}
function animateScore(scope, overall, prev) {
  setTimeout(() => {
    const nd = $('#g-needle', scope); if (nd) nd.style.transform = `rotate(${-90 + 180 * clamp(overall / 100, 0, 1)}deg)`;
    const n = $('#g-num', scope); if (n) countUp(n, overall, 1200, prev || 0);
    $$('.str-bar i', scope).forEach(b => { b.style.width = b.dataset.w + '%'; });
  }, 120);
}
function insightHTML(res) {
  const s = Q.map(q => ({ ...q, v: res.vals[q.k] })).sort((a, b) => b.v - a.v), hi = s[0], lo = s[s.length - 1];
  const d = res.prev == null ? null : res.overall - res.prev;
  const past = S.history.slice(0, -1).slice(-7), avg = past.length ? Math.round(past.reduce((a, h) => a + h.overall, 0) / past.length) : null;
  const pill = d == null ? 'First check-in' : d > 0 ? `▲ ${d} from last time` : d < 0 ? `▼ ${-d} from last time` : 'Same as last time';
  return `<div class="insight"><h3>What your score says</h3>
    <div class="ins-pills"><span class="ins-pill ${d > 0 ? 'up' : d < 0 ? 'down' : ''}">${pill}</span>${avg != null ? `<span class="ins-pill">Recent average ${avg}</span>` : ''}</div>
    <div class="ins-grid"><div class="ins-t good"><small>Strongest</small><b>${hi.label}</b><span>${hi.v.toFixed(1)}<i>/10</i></span></div><div class="ins-t low"><small>Needs care</small><b>${lo.label}</b><span>${lo.v.toFixed(1)}<i>/10</i></span></div></div></div>`;
}
function renderScore(root) {
  const vals = strengthVals(CI.a), overall = Math.round(finalPts());
  const prev = S.history.length ? S.history[S.history.length - 1].overall : null;
  CI.res = { vals, overall, prev };
  if (!CI.saved) { // log once
    CI.saved = true;
    const first = !checkedInToday();
    if (first) {
      S.streak = S.lastCheckin === daysAgo(1) ? S.streak + 1 : 1; S.lastCheckin = today();
      S.history.push({ date: today(), overall, vals, raw: JSON.parse(JSON.stringify(CI.a)) });
      S.loop = { date: today(), survey: 1, score: 1 };
    }
    save(); CI.first = first;
  }
  const rec = recommend(vals), f = F(), lvl = f.level;
  CI.rec = rec; CI.layer.classList.add('indigo');
  const delta = prev == null ? '' : `<div class="delta" style="color:${overall >= prev ? 'var(--sage-dk)' : 'var(--coral)'}">${overall >= prev ? '▲' : '▼'} ${Math.abs(overall - prev)} vs. last check-in</div>`;
  root.innerHTML = `<div class="layer-top"><button class="icon-btn" data-act="ci-close" aria-label="Close">${ic('x', 20)}</button><h3>Your recovery score</h3></div>
  <div class="layer-body" style="padding-top:4px">
    <div class="fin-gauge">${gauge(overall)}${delta}</div><div class="white-sheet">
    <div class="str-h"><h3>Your strengths</h3><span class="muted" style="font-size:14px">(Out of 10)</span></div>
    <div>${strengthsHTML(vals)}</div>
    ${f.trends && S.history.length > 2 ? `<div class="trend"><div class="eyebrow" style="margin-bottom:8px">In context · your trend</div>${sparkline(S.history.slice(-14).map(h => h.overall), 300, 56)}<div style="display:flex;justify-content:space-between;font-size:13px;margin-top:6px" class="muted"><span>Streak ${S.streak} days · next: ${nextMilestone()}</span><b style="color:var(--sage-dk)">${trendWord()}</b></div><div style="margin-top:10px;font-size:13px;color:var(--gold-dk);display:flex;align-items:center;gap:6px">${ic('coin', 14)}<span>${nextReward().at - S.bucks > 0 ? `${usd(nextReward().at - S.bucks)} to “${nextReward().t}”` : 'Reward unlocked!'}</span></div></div>` : ''}
    ${insightHTML(CI.res)}
    ${nextStepHTML(rec)}
  </div></div>`;
  animateScore(root, overall, 0);
}
function finishCheckinReward(didActivity) {
  const e = earnCalc(didActivity), lvl = F().level, score = CI.res ? CI.res.overall : S.history[S.history.length - 1].overall;
  if (e.first) {
    earn(e.base, 'Daily check-in', score);
    if (e.act) { earn(e.act, 'Activity: ' + CI.rec.title); S.activities++; }
    if (e.st) earn(e.st, 'Streak bonus');
    if (didActivity) S.lastActivity = CI.rec.id;
    S.loop.activity = didActivity ? 1 : 0; S.loop.earned = 1; save();
  }
  const nr = nextReward(), prog = clamp(S.bucks / nr.at * 100, 0, 100), root = $('#ci-root', CI.layer); CI.layer.classList.remove('indigo');
  root.innerHTML = `<div class="layer-body reward-screen">
    ${coinStack(130)}
    <div class="eyebrow" style="margin-top:6px">Score ${score} · today’s earnings</div><div class="big-amt">+${usd(e.total)}</div><div class="eyebrow">Added to your wallet</div>
    <div class="break"><div><span>Today’s score</span><span>${score}</span></div><div><span>Daily check-in</span><span>+${usd(e.base)}</span></div><div><span>Activity${e.act ? ` · Level ${ROMAN[lvl]}` : ''}</span><span>${e.act ? '+' + usd(e.act) : '—'}</span></div><div><span>Streak bonus (${S.streak} day${S.streak === 1 ? '' : 's'})</span><span>+${usd(e.st)}</span></div><div><span>Wallet balance</span><span style="color:var(--purple)">${usd(S.bucks)}</span></div></div>
    <div style="width:100%;text-align:left;margin-bottom:6px;font-size:13px" class="muted">${nr.at - S.bucks > 0 ? `${usd(nr.at - S.bucks)} to “${nr.t}” — ${nr.d}` : `Unlocked: ${nr.t}`}</div><div class="prog"><i style="width:0" data-w="${prog}"></i></div>
    <div class="next-trig">${ic('life', 18)}<div><b>Next reminder</b><small>${nextTrigger()}</small></div></div>
    <div style="flex:1;min-height:14px"></div><button class="btn" data-act="ci-wallet">View wallet</button><button class="btn ghost" data-act="ci-end">Back to today</button></div>`;
  setTimeout(() => { const p = $('.prog i', root); if (p) p.style.width = p.dataset.w + '%'; }, 150);
  if (e.first) confetti();
}
function endCheckin(dest = 'home') { $$('.layer').forEach(l => popLayer(l)); go(dest); }

/* swipe between intro pages */
(() => { let x0 = null; const el = document.getElementById('views');
  el.addEventListener('touchstart', e => { x0 = e.target.closest('.onb2') ? e.touches[0].clientX : null; }, { passive: true });
  el.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (dx < -50 && onbI < ONB.length - 1) renderOnb(onbI + 1); else if (dx > 50 && onbI > 0) renderOnb(onbI - 1); else if (dx > 50) renderIntro(); }, { passive: true }); })();
