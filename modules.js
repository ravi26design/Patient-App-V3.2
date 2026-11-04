/* Help, Progress and Community modules — ported from Patient Dashboard Version 2.0 */
Object.assign(P, {
  mic: '<path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.2-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  stetho: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="12" r="2"/>',
  sofa: '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 12a2 2 0 0 1 4 0v3h10v-3a2 2 0 0 1 4 0v5H3z"/>',
  hands: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  out: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
});

const mdHead = t => `<div class="layer-top fin-head md-head"><button class="plain-btn" data-act="close-layer" aria-label="Back">${ic('back', 22)}</button><span class="fh-t">${t}</span><span class="md-sp"></span></div>`;
const mdLayer = (title, body, cls = '') => pushLayer(`${mdHead(title)}<div class="layer-body md-body">${body}</div>`, 'md-layer ' + cls);

/* ═════════ HELP ═════════ */
const CONTACTS = {
  crisis: [
    ['#C97B6F', '988', '988 Suicide & Crisis Lifeline', 'Free & confidential · 24/7 · call or text', '', [['call', 'tel:988'], ['text', 'sms:988']]],
    ['#4A6D9A', 'chat', 'Crisis Text Line', 'Text HOME to 741741 · 24/7', '', [['text', 'sms:741741&body=HOME']]]
  ],
  team: [
    ['#6E9E80', 'headset', 'Daniel Ruiz', 'Your recovery coach', '(310) 555-0142', [['call', 'tel:3105550142'], ['text', 'sms:3105550142']]],
    ['#4A90D9', 'hands', 'Tasha Brooks', 'Your peer specialist', '(310) 555-0188', [['call', 'tel:3105550188'], ['text', 'sms:3105550188']]],
    ['#C97B6F', 'compass', 'Mike R.', 'Sponsor', '(323) 555-0117', [['call', 'tel:3235550117'], ['text', 'sms:3235550117']]]
  ],
  support: [
    ['#C0504A', 'heart', 'Mom (Linda)', 'Family', '(562) 555-0193', [['call', 'tel:5625550193'], ['text', 'sms:5625550193']]],
    ['#E0A93C', 'smile', 'Jack P.', 'Supportive friend', '(213) 555-0175', [['call', 'tel:2135550175'], ['text', 'sms:2135550175']]],
    ['#C97B8A', 'heart', 'Sam', 'Loved one', '(310) 555-0151', [['call', 'tel:3105550151'], ['text', 'sms:3105550151']]],
    ['#C97B6F', 'compass', 'Mike R.', 'Sponsor', '(323) 555-0117', [['call', 'tel:3235550117'], ['text', 'sms:3235550117']]],
    ['#6E9E80', 'headset', 'Daniel Ruiz', 'Your recovery coach', '(310) 555-0142', [['call', 'tel:3105550142'], ['text', 'sms:3105550142']]],
    ['#4A90D9', 'hands', 'Tasha Brooks', 'Your peer specialist', '(310) 555-0188', [['call', 'tel:3105550188'], ['text', 'sms:3105550188']]],
    ['#8A6FB0', 'sofa', 'Dr. Elena Rivera', 'Therapist · LCSW', '', [['email', 'mailto:e.rivera@clinic.example']]],
    ['#4FA3A3', 'stetho', 'Dr. Sarah Okafor', 'Your doctor · MD', '', [['email', 'mailto:s.okafor@clinic.example']]]
  ]
};
const ctRow = ([bg, icon, name, role, num, btns]) => `<div class="ct-row"><span class="ct-av" style="background:${bg}">${/^\d+$/.test(icon) ? icon : ic(icon, 20, 1.8)}</span>
  <div class="ct-main"><b>${name}</b><small>${role}</small>${num ? `<em>${num}</em>` : ''}</div>
  <div class="ct-btns">${btns.map(([k, h]) => `<a class="ct-btn ${k}" href="${h}">${ic(k === 'call' ? 'phone' : k === 'email' ? 'mail' : 'sms', 15, 2)}${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</div></div>`;
const call911 = () => `<a class="md-911" href="tel:911"><span class="md-911-ic">${ic('phone', 24, 1.9)}</span><div><b>Call 911</b><small>Overdose or medical emergency — call now</small></div>${ic('chev', 20, 2)}</a>`;
const mdOpt = (act, bg, icon, t, d, emerg) => `<button class="md-opt${emerg ? ' emerg' : ''}" data-act="${act}"><span class="md-opt-ic" style="background:${bg}">${ic(icon, 22, 1.8)}</span><div><b>${t}</b><small>${d}</small></div>${ic('chev', 18, 2)}</button>`;

function helpSheet() {
  mdLayer('Help', `<h1 class="md-title">Help</h1><p class="md-sub">You're not alone. Pick what you need right now.</p>
    ${call911()}
    <div class="eyebrow md-eb">What's going on?</div>
    ${mdOpt('md-crisis', '#C4453A', 'pulse', 'I’m in crisis', '988 Lifeline, crisis text line &amp; naloxone help', 1)}
    ${mdOpt('md-urge', '#C4453A', 'wave', 'I’m having cravings', 'Ride it out — breathing, grounding &amp; your people', 1)}
    ${mdOpt('md-team', '#6E9E80', 'hands', 'Reach my support team', 'Family, friends, sponsor, coach, peer, therapist &amp; doctor')}
    <div class="eyebrow md-eb">New to the app?</div>
    ${mdOpt('md-guide', '#6DA0CC', 'sparkle', 'App Help Guide', 'A quick tour of the app’s main features')}`);
}
function crisisScreen() {
  mdLayer('Crisis support', `${call911()}
    <div class="md-note"><b>Possible overdose?</b> Signs: can't wake them, slow or stopped breathing, blue lips or fingertips. <b>Call 911, give naloxone, stay with them.</b></div>
    <button class="ct-row ct-tap" data-act="md-nalox"><span class="ct-av" style="background:#7BA47E">${ic('pill', 20, 1.8)}</span><div class="ct-main"><b>Find naloxone near me</b><small>Pharmacies &amp; free distribution points</small></div>${ic('chev', 18, 2)}</button>
    <div class="eyebrow md-eb">More ways to get help right now</div>${CONTACTS.crisis.map(ctRow).join('')}
    <div class="eyebrow md-eb">Reach a person on your team</div>${CONTACTS.team.map(ctRow).join('')}
    <div class="md-foot"><span>${ic('leaf', 22, 1.7)}</span><b>This moment is not the whole story.</b><small>You've made it through hard moments before. You can make it through this one too.</small></div>`);
}
const soonScreen = (title, icon, t, d) => mdLayer(title, `<div class="empty-card"><span class="empty-ic">${ic(icon, 30, 1.5)}</span><h3>${t}</h3><p>${d}</p></div>`);

/* ═════════ PROGRESS ═════════ */
function _gen(n, from, to, lo, hi, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = n > 1 ? i / (n - 1) : 0, base = from + (to - from) * t, w = Math.sin((i + seed) * 1.7) * (hi - lo) * .11 + Math.sin((i + seed) * .6) * (hi - lo) * .07;
    out.push(Math.max(lo, Math.min(hi, Math.round((base + w) * 10) / 10)));
  }
  return out;
}
const PG_DATA = {
  health: { label: 'Recovery Health', hex: '#455B8A', lo: 0, hi: 100, daily: _gen(84, 60, 78, 42, 92, 7), monthly: _gen(12, 56, 80, 42, 92, 17) },
  urge: { label: 'Urge', hex: '#D4736A', lo: 1, hi: 5, daily: _gen(84, 4.1, 2.4, 1, 5, 1), monthly: _gen(12, 4.3, 2.2, 1, 5, 11) },
  pain: { label: 'Pain', hex: '#C9A84C', lo: 1, hi: 5, daily: _gen(84, 3.8, 2.3, 1, 5, 2), monthly: _gen(12, 4.0, 2.1, 1, 5, 12) },
  stress: { label: 'Stressful Events', hex: '#8B7EC8', lo: 1, hi: 5, daily: _gen(84, 4.2, 2.2, 1, 5, 3), monthly: _gen(12, 4.4, 2.0, 1, 5, 13) },
  pleasant: { label: 'Pleasant Events', hex: '#4A7E5C', lo: 1, hi: 5, daily: _gen(84, 1.8, 3.7, 1, 5, 4), monthly: _gen(12, 1.6, 3.9, 1, 5, 14) },
  risky: { label: 'Risky Situations', hex: '#D4612A', lo: 1, hi: 5, daily: _gen(84, 4.5, 2.1, 1, 5, 5), monthly: _gen(12, 4.6, 1.9, 1, 5, 15) },
  sleep: { label: 'Sleep Quality', hex: '#4A90D9', lo: 1, hi: 5, daily: _gen(84, 2.0, 3.8, 1, 5, 6), monthly: _gen(12, 1.9, 4.0, 1, 5, 16) }
};
const PG = { items: ['health'], tf: 'W', off: 0 };
const _DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], _MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function tfSeries(d, m, tf, off) {
  if (tf === 'W') { const end = d.length - 7 * off, start = Math.max(0, end - 7); return { data: d.slice(start, end), labels: _DOW.slice(0, end - start) }; }
  if (tf === 'M') { const x = d.slice(-28); return { data: x, labels: x.map((_, i) => i % 7 === 3 ? 'Wk ' + (Math.floor(i / 7) + 1) : '') }; }
  if (tf === '6M') return { data: m.slice(0, 6), labels: _MON.slice(0, 6) };
  return { data: m.slice(0, 12), labels: _MON.slice(0, 12) };
}
const PG_MAXOFF = 11;
function pgSmooth(xy) { return xy.map((q, i) => { if (!i) return `M${q[0].toFixed(1)} ${q[1].toFixed(1)}`; const p = xy[i - 1], mx = ((p[0] + q[0]) / 2).toFixed(1); return `C${mx} ${p[1].toFixed(1)} ${mx} ${q[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join(' '); }
function pgChart() {
  const keys = PG.items, W = 330, H = 190, L = 34, T = 12, B = 26;
  const mixed = keys.length > 1 && keys.includes('health'), rightPad = mixed ? 34 : 10;
  const iw = W - L - rightPad, ih = H - T - B;
  const axis = (k, x, anchor) => { const d = PG_DATA[k], ticks = d.hi === 100 ? [0, 25, 50, 75, 100] : [1, 2, 3, 4, 5]; return ticks.map(v => `<text x="${x}" y="${(T + ih - (v - d.lo) / (d.hi - d.lo) * ih + 3).toFixed(1)}" font-size="9" text-anchor="${anchor}" fill="${d.hex}">${v}</text>`).join(''); };
  let grid = '', lines = '', xl = '';
  [0, .25, .5, .75, 1].forEach(f => { grid += `<line x1="${L}" x2="${W - rightPad}" y1="${(T + ih * f).toFixed(1)}" y2="${(T + ih * f).toFixed(1)}" stroke="rgba(31,42,55,.06)"/>`; });
  keys.forEach((k, ki) => {
    const d = PG_DATA[k], s = tfSeries(d.daily, d.monthly, PG.tf, PG.off), n = s.data.length;
    const xy = s.data.map((v, i) => [L + (n > 1 ? i * iw / (n - 1) : iw / 2), T + ih - (v - d.lo) / (d.hi - d.lo) * ih]);
    if (ki === 0) xl = s.labels.map((t, i) => t ? `<text x="${xy[i][0].toFixed(1)}" y="${H - 8}" font-size="9" text-anchor="middle" fill="#8F9AA5">${t}</text>` : '').join('');
    const id = 'pgf' + ki;
    if (keys.length === 1) lines += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${d.hex}" stop-opacity=".26"/><stop offset="1" stop-color="${d.hex}" stop-opacity=".02"/></linearGradient></defs><path d="${pgSmooth(xy)} L${xy[n - 1][0].toFixed(1)} ${T + ih} L${xy[0][0].toFixed(1)} ${T + ih}z" fill="url(#${id})"/>`;
    lines += `<path d="${pgSmooth(xy)}" fill="none" stroke="${d.hex}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (n <= 14) lines += xy.map(q => `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="3.4" fill="#fff" stroke="${d.hex}" stroke-width="2"/>`).join('');
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Trend chart">${grid}${axis(keys[0], L - 6, 'end')}${mixed ? axis(keys.find(k => k !== 'health'), W - rightPad + 6, 'start') : ''}${lines}${xl}</svg>`;
}
function pgTitle() { const k = PG.items; return k.map(x => `<span style="color:${PG_DATA[x].hex}">${PG_DATA[x].label}</span>`).join('<span class="pg-vs"> vs </span>'); }
function pgPaint() {
  const v = $('#v-progress'); if (!v) return;
  $('#pg-title', v).innerHTML = pgTitle(); $('#pg-chart', v).innerHTML = pgChart();
  $$('.pg-tf button', v).forEach(b => b.classList.toggle('on', b.dataset.tf === PG.tf));
  const nav = $('#pg-nav', v); nav.hidden = PG.tf !== 'W';
  $('#pg-wk', v).textContent = PG.off === 0 ? 'This week' : PG.off === 1 ? 'Last week' : PG.off + ' weeks ago';
  $('#pg-prev', v).disabled = PG.off >= PG_MAXOFF; $('#pg-next', v).disabled = PG.off <= 0;
  $$('.pg-item', v).forEach(b => b.classList.toggle('on', PG.items.includes(b.dataset.k)));
  $('#pg-legend', v).innerHTML = PG.items.length > 1 ? PG.items.map(k => `<span><i style="background:${PG_DATA[k].hex}"></i>${PG_DATA[k].label}</span>`).join('') : '';
}
function renderProgress() {
  $('#v-progress').innerHTML = `<div class="wal-top"><h1>Progress</h1><p class="md-sub">See how your recovery health and daily factors trend over time.</p></div>
  <div class="pad"><div class="pg-card2"><div class="pg-h2"><b id="pg-title" class="pg-t"></b><div class="pg-tf">${['W', 'M', '6M', 'Y'].map(t => `<button data-act="pg-tf" data-tf="${t}">${t}</button>`).join('')}</div></div>
    <div class="pg-nav" id="pg-nav"><button id="pg-prev" data-act="pg-wk" data-d="1" aria-label="Previous week">${ic('left', 18, 2)}</button><span id="pg-wk">This week</span><button id="pg-next" data-act="pg-wk" data-d="-1" aria-label="Next week">${ic('chev', 18, 2)}</button></div>
    <div id="pg-chart"></div><div class="pg-legend" id="pg-legend"></div></div>
  <div class="pg-card2"><b class="pg-t2">Select up to 2 to compare</b><p class="pg-hint">Tap two factors to see them side by side.</p>
    <div class="pg-grid">${Object.keys(PG_DATA).map(k => `<button class="pg-item" style="--cat:${PG_DATA[k].hex}" data-act="pg-item" data-k="${k}">${PG_DATA[k].label}</button>`).join('')}</div></div></div>`;
  pgPaint();
}

/* ═════════ COMMUNITY ═════════ */
const ROOMS = { community: ['💬', 'Community Room', '#4E7FA8'] };
const TINT = { blue: '#DEEAF4', sage: '#E1ECE2', gold: '#FAEFD6', coral: '#F8E5E2' };
const REACT = [['heart', '❤️', 'Been there', 'hearts'], ['support', '🙌', 'Proud of you', 'supports'], ['strong', '💪', 'Stay strong', 'strong'], ['pray', '🙏', 'Holding you', 'pray']];
const mk = (id, user, tint, channel, time, text, hearts, supports, replies = [], extra = {}) => ({ id, user, tint, channel, time, text, hearts, supports, strong: 0, pray: 0, replies, ...extra });
const POSTS = [
  mk(9, 'northstar', 'gold', 'community', '12m ago', 'If today’s your first day back after a hard stretch — that’s not a demotion. Recovery isn’t linear for anyone in here. Proud of you for showing up.', 41, 19),
  mk(8, 'tidewalker', 'blue', 'community', '38m ago', 'Anyone else awake at 2am white-knuckling it? Just needed to say it somewhere.', 27, 8, [{ user: 'riverbend', text: 'Here. Not going anywhere. What’s the loudest thought right now?' }]),
  mk(104, 'stepbystep', 'blue', 'community', '40m ago', '90 days today. Working Step 4 with my sponsor this week — the searching-and-fearless part is no joke. Anyone got a gentle way to think about the resentment list?', 52, 31, [{ user: 'Marcus T.', text: 'Peer specialist here — a lot of people write the resentment first and the “my part” column last, on a different day. You don’t have to do it all in one sitting.' }]),
  mk(7, 'Denise R.', 'blue', 'community', '1h ago', 'Question from a few of you this week: yes, it’s normal for cravings to spike around custody visits. It’s a trigger, not a setback. Plan the hour before and the hour after, not just the visit itself.', 63, 22),
  mk(103, 'toolbox', 'gold', 'community', '1h ago', 'Used the SMART cost-benefit worksheet on my 5pm craving instead of just white-knuckling. Writing down what using would actually cost me tomorrow killed most of the urge.', 38, 16),
  mk(6, 'emberly', 'coral', 'community', '2h ago', 'Does buprenorphine make anyone else feel foggy in the mornings, or is that just me still adjusting?', 9, 4, [{ user: 'James O.', text: 'Common in the first few weeks — worth mentioning your dose timing to your prescriber. Mine moved mine to bedtime and it helped a lot.' }]),
  mk(102, 'stillwater', 'sage', 'community', '2h ago', 'Reminder for anyone sitting with a craving right now: you can watch it rise and pass without acting on it. It’s a wave, not a command. Ten slow breaths — I’ll sit with you.', 74, 29),
  mk(5, 'quietpine', 'sage', 'community', '3h ago', 'Took my kid to school again this morning. Eight years ago I couldn’t have named her teacher. Small, but it’s mine.', 118, 54),
  mk(101, 'dawnlight', 'blue', 'community', '3h ago', 'Faith is the thing that gets me to my morning meeting some days. Not preaching to anyone — just grateful there’s a room here where I can say that without it being weird. What keeps you grounded?', 61, 24),
  mk(4, 'riverbend', 'sage', 'community', '5h ago', 'Nearest meeting is two counties over and today’s harder than usual. Anyone from a rural area have tips for the in-between days?', 14, 11),
  mk(256, 'tendergrief', 'blue', 'community', '1d ago', 'Grief and recovery both ask me to feel things. Taking it one breath at a time.', 68, 47),
  mk(257, 'slowtrust', 'sage', 'community', '1d ago', 'Rebuilding trust with my partner is slow. We agreed on weekly check-ins and it’s helping.', 93, 7),
  mk(260, 'sunnyside', 'blue', 'community', '3d ago', 'Tried a pottery class last night. Terrible bowl, great time, zero cravings.', 81, 46)
];
const CM = { room: 'community', open: false, pick: 'community', draft: '', replying: new Set(), flagged: new Set(), support: 0 };
const cmRank = () => { const s = CM.support + 4 * 5; return s >= 400 ? 'Anchor' : s >= 180 ? 'Encourager' : s >= 60 ? 'Regular' : 'Neighbor'; };
const roomTag = c => { const r = ROOMS[c] || ['💬', 'Community', '#8A7D75']; return `<span class="croom" style="--rc:${r[2]}"><i>${r[0]}</i>${r[1]}</span>`; };
function cmPostHTML(p) {
  const total = REACT.reduce((a, r) => a + (p[r[3]] || 0), 0);
  return `<article class="cpost" data-pid="${p.id}"><div class="cp-top"><span class="cp-av" style="background:${TINT[p.tint] || '#EEEDE8'}">${esc(p.user.charAt(0).toUpperCase())}</span>
    <div class="cp-who"><b>${esc(p.user)}</b><small>${p.time}</small></div>
    <button class="cp-flag${CM.flagged.has(p.id) ? ' on' : ''}" data-act="cm-flag" data-id="${p.id}" aria-label="Flag this post for review">${ic('flag', 16, 1.8)}</button></div>
    <p class="cp-text">${esc(p.text)}</p>
    <div class="cp-react">${REACT.map(r => `<button class="${p['r_' + r[0]] ? 'on' : ''}" data-act="cm-react" data-id="${p.id}" data-r="${r[0]}" aria-label="${r[2]}">${r[1]}<span>${p[r[3]] || 0}</span></button>`).join('')}
      <button class="rt" data-act="cm-reply-toggle" data-id="${p.id}" aria-label="Reply">💬<span>${p.replies.length || ''}</span></button></div>
    ${p.replies.length ? `<div class="cp-replies"><div class="cp-rh">${p.replies.length} ${p.replies.length === 1 ? 'reply' : 'replies'}</div>${p.replies.map(r => `<div class="cp-reply"><b>${esc(r.user)}</b>${esc(r.text)}</div>`).join('')}</div>` : ''}
    <div class="cp-zone" ${CM.replying.has(p.id) ? '' : 'hidden'}><div class="cp-quick">${['Proud of you 🙌', 'Been there. You’ve got this.', 'Same here 🫂', 'Here with you.'].map(t => `<button data-act="cm-quick" data-id="${p.id}" data-t="${t}">${t.replace(/ [🙌🫂]$/u, '').replace('Been there. You’ve got this.', 'Been there')}</button>`).join('')}</div>
      <div class="cp-box"><input placeholder="Write a reply…" id="rp-${p.id}"><button data-act="cm-send" data-id="${p.id}">Send</button></div></div></article>`;
}
function cmFeed() {
  const box = $('#cm-feed'); if (!box) return;
  const list = POSTS;
  box.innerHTML = (list.length ? list.map(cmPostHTML).join('') : '<div class="cm-empty"><b>Quiet in this room right now.</b>Be the first to say something — someone will see it.</div>');
    const st = $('#cm-sup'); if (st) st.textContent = CM.support; const rk = $('#cm-rank'); if (rk) rk.textContent = cmRank();
}
function composeSheet() {
  const l = pushLayer(`<div class="sheet cmp-sheet"><span class="grab"></span>
    <div class="cmp-top"><span class="cp-av">${esc((S.name || 'You').charAt(0).toUpperCase())}</span><div class="cmp-who">Posting as <b>you</b><small>Your real name is never shown</small></div><button class="cmp-x" data-act="close-layer" aria-label="Close">${ic('x', 18, 2)}</button></div>
    <textarea id="cm-text" rows="5" placeholder="What’s on your mind? Anything counts — even one line.">${esc(CM.draft)}</textarea>
    <div class="cmp-count" id="cm-count">${CM.draft.trim() ? CM.draft.length + ' characters' : 'Anything counts — even one line.'}</div>
    <button class="btn" id="cm-post" data-act="cm-submit"${CM.draft.trim() ? '' : ' disabled'}>Post anonymously</button></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
  setTimeout(() => { const t = $('#cm-text'); if (t) t.focus(); }, 320);
}
function renderCommunity() {
  const me = esc((S.name || 'You').charAt(0).toUpperCase());
  $('#v-community').innerHTML = `<div class="wal-top"><h1>Community</h1><p class="md-sub">Connect, share &amp; find support</p></div>
  <div class="pad cm">
    <div class="hub-card"><div class="hub-head"><span class="hub-ic" style="background:linear-gradient(145deg,#7FB0DC,#3F6E99)">${ic('shield', 22, 1.8)}</span><div><b>A safe place, always anonymous</b><small>Support whenever you need it</small></div></div>
      <div class="hub-opts sp">
        <button class="sp-card g" data-act="cm-soon" data-t="1:1 support"><span class="sp-ic">${ic('hands', 22, 1.8)}</span><b>Want 1:1 support?</b><small>A peer specialist or coach, privately</small><span class="sp-go">${ic('chev', 16, 2.2)}</span></button>
        <button class="sp-card c" data-act="cm-soon" data-t="Find a meeting"><span class="sp-ic">${ic('compass', 22, 1.8)}</span><b>Find a Meeting</b><small>In-person, virtual &amp; hybrid</small><span class="sp-go">${ic('chev', 16, 2.2)}</span></button></div></div>
    <div class="hub-card"><div class="hub-head"><span class="hub-ic" style="background:#5B92CE">${ic('chat', 22, 1.8)}</span><div><b>Find your people</b><small>Join the conversation</small></div></div>
      <button class="cr-room" data-act="cm-room"><span class="cr-ic">${ic('users', 24, 1.8)}</span><span class="cr-tx"><b>Community Room</b><small>One shared space for everyone</small><span class="cr-live"><span class="cr-av"><i style="background:#7FB0DC">N</i><i style="background:#8FBF9F">T</i><i style="background:#E0B25C">R</i></span><em><u></u>214 here today</em></span></span><span class="cr-go">${ic('chev', 18, 2.2)}</span></button></div>
    <button class="compose-bar" id="cm-bar" data-act="cm-open"><span class="cb-av">${me}</span><span class="cb-tx"><b>What’s on your mind?</b><small>Share, ask, or just say you’re here</small></span><span class="cb-go">${ic('mic', 18, 1.8)}</span></button>
    <div id="cm-feed"></div></div>`;
  cmFeed();
}
function roomsSheet() {
  const cnt = k => POSTS.filter(p => k === 'all' || p.channel === k).length;
  const l = pushLayer(`<div class="sheet rooms-sheet"><span class="grab"></span><h2>All Rooms</h2><p class="muted" style="font-size:14px;line-height:1.45">Browse every room and jump into the one that fits. Every room is watched over by a certified peer specialist.</p>
    <div class="ar-list">${[['all', ['🌐', 'All Rooms', '#5B7FD6']], ...Object.entries(ROOMS)].map(([k, r]) => `<button class="ar-row${CM.room === k ? ' on' : ''}" data-act="cm-room" data-r="${k}"><i style="--rc:${r[2]}">${r[0]}</i><b>${r[1]}</b><em>${cnt(k)}</em></button>`).join('')}</div>
    <button class="btn ghost" style="margin-top:12px" data-act="close-layer">Close</button></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
}

/* ═════════ wiring ═════════ */
Object.assign(ACT, {
  help: () => helpSheet(),
  'md-crisis': () => crisisScreen(),
  'md-urge': el => { $$('.md-layer').forEach(popLayer); setTimeout(() => openTool('urge'), 200); },
  'md-team': () => mdLayer('Reach my support team', CONTACTS.support.map(ctRow).join('')),
  'md-nalox': () => soonScreen('Find naloxone', 'pill', 'Naloxone finder coming soon', 'We’re building a map of pharmacies and free distribution points near you. In the meantime, call <b>988</b> or your pharmacy to ask where to get naloxone.'),
  'md-guide': () => { $$('.md-layer').forEach(popLayer); setTimeout(() => ACT['me-replay'](), 220); },
  'pg-tf': el => { PG.tf = el.dataset.tf; if (PG.tf === 'W') PG.off = 0; pgPaint(); },
  'pg-wk': el => { PG.off = Math.max(0, Math.min(PG_MAXOFF, PG.off + +el.dataset.d)); pgPaint(); },
  'pg-item': el => {
    const k = el.dataset.k, i = PG.items.indexOf(k);
    if (i >= 0) { if (PG.items.length > 1) PG.items.splice(i, 1); } else if (PG.items.length < 2) PG.items.push(k); else PG.items[1] = k;
    pgPaint();
  },
  'cm-open': () => composeSheet(),
  'cm-submit': () => {
    const t = CM.draft.trim(); if (!t) return;
    POSTS.unshift(mk(Date.now(), 'you', 'blue', 'community', 'just now', t, 0, 0, [], { mine: true }));
    CM.draft = ''; popLayer(layerOf($('#cm-text'))); cmFeed(); toast('Posted anonymously');
  },
  'cm-react': el => {
    const p = POSTS.find(x => x.id == el.dataset.id), r = REACT.find(x => x[0] === el.dataset.r), on = !p['r_' + r[0]];
    p['r_' + r[0]] = on; p[r[3]] = (p[r[3]] || 0) + (on ? 1 : -1); if (p.mine) CM.support += on ? 1 : -1; cmFeed();
  },
  'cm-flag': el => { const id = +el.dataset.id; CM.flagged.has(id) ? CM.flagged.delete(id) : (CM.flagged.add(id), toast('Flagged for review')); cmFeed(); },
  'cm-reply-toggle': el => { const id = +el.dataset.id; CM.replying.has(id) ? CM.replying.delete(id) : CM.replying.add(id); cmFeed(); },
  'cm-quick': el => { const p = POSTS.find(x => x.id == el.dataset.id); p.replies.push({ user: 'you', text: el.dataset.t }); CM.replying.add(p.id); cmFeed(); },
  'cm-send': el => { const p = POSTS.find(x => x.id == el.dataset.id), i = $('#rp-' + p.id), t = i && i.value.trim(); if (!t) return; p.replies.push({ user: 'you', text: t }); CM.replying.add(p.id); cmFeed(); },
  'cm-rooms': () => roomsSheet(),
  'cm-room': el => { CM.room = el.dataset.r; const l = layerOf(el); if (l && l.classList.contains('sheet-wrap')) popLayer(l); cmFeed(); const f = $('#cm-feed'); if (f) f.scrollIntoView({ block: 'start', behavior: 'smooth' }); },
  'cm-soon': el => soonScreen(el.dataset.t, 'users', 'Coming soon', 'This part of Community is on its way. For now you can share in the rooms below.')
});
document.addEventListener('input', e => { if (e.target.id === 'cm-text') { CM.draft = e.target.value; $('#cm-post').disabled = !CM.draft.trim(); $('#cm-count').textContent = CM.draft.trim() ? CM.draft.length + ' characters' : 'Anything counts — even one line.'; } });
