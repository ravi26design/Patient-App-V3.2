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
  pencil: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14 7l3 3"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.500 6-3v-4.500"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/>',
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
const call911 = () => `<a class="md-911" href="tel:911"><span class="md-911-ic">${ic('phone', 22, 1.8)}</span><div><b>Call 911</b><small>Overdose or medical emergency — call now</small></div><span class="md-go">${ic('chev', 16, 2.2)}</span></a>`;
const mdOpt = (act, tone, icon, t, d) => `<button class="md-opt t-${tone}" data-act="${act}"><span class="md-opt-ic">${ic(icon, 22, 1.8)}</span><div><b>${t}</b><small>${d}</small></div><span class="md-go">${ic('chev', 16, 2.2)}</span></button>`;

function helpSheet() {
  mdLayer('Help', `${call911()}
    <div class="eyebrow md-eb">What's going on?</div>
    ${mdOpt('md-crisis', 'r', 'pulse', 'I’m in crisis', '988 Lifeline, crisis text line &amp; naloxone help')}
    ${mdOpt('md-urge', 'a', 'wave', 'I’m having cravings', 'Ride it out — breathing, grounding &amp; your people')}
    ${mdOpt('md-team', 'g', 'hands', 'Reach my support team', 'Family, friends, sponsor, coach, peer, therapist &amp; doctor')}
    <div class="eyebrow md-eb">New to the app?</div>
    ${mdOpt('md-guide', 'b', 'sparkle', 'App Help Guide', 'A quick tour of the app’s main features')}
    <div class="md-reassure">${ic('heart', 16, 1.8)}<span>Help is always one tap away, any time of day.</span></div>`);
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
const PG_EMO = { health: '💙', urge: '⚡', pain: '🩹', stress: '😟', pleasant: '😊', risky: '⚠️', sleep: '🌙' };
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
  const axis = (k, x, anchor) => { const d = PG_DATA[k], ticks = d.hi === 100 ? [0, 20, 40, 60, 80, 100] : [1, 2, 3, 4, 5]; return ticks.map(v => `<text x="${x}" y="${(T + ih - (v - d.lo) / (d.hi - d.lo) * ih + 3).toFixed(1)}" font-size="9" text-anchor="${anchor}" fill="${d.hex}">${v}</text>`).join(''); };
  let grid = `<line x1="${L}" x2="${L}" y1="${T}" y2="${T + ih}" stroke="rgba(31,42,55,.10)"/>`, lines = '', xl = '';
  (PG_DATA[keys[0]].hi === 100 ? [0, .2, .4, .6, .8, 1] : [0, .25, .5, .75, 1]).forEach(f => { grid += `<line x1="${L}" x2="${W - rightPad}" y1="${(T + ih * f).toFixed(1)}" y2="${(T + ih * f).toFixed(1)}" stroke="rgba(31,42,55,.06)"/>`; });
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
function pgStats() {
  const f = (d, v) => d.hi === 100 ? Math.round(v) : v.toFixed(1);
  return PG.items.map(k => {
    const d = PG_DATA[k], a = tfSeries(d.daily, d.monthly, PG.tf, PG.off).data, last = a[a.length - 1], first = a[0], avg = a.reduce((x, y) => x + y, 0) / a.length, dl = last - first, up = dl >= 0;
    const good = (d.hi === 100 || ['pleasant', 'sleep'].includes(k)) ? up : !up;
    return `<div class="pg-stat" style="--c:${d.hex}"><span class="pg-sl"><i></i>${d.label}</span><b>${f(d, last)}</b><span class="pg-sd ${good ? 'good' : 'warn'}">${up ? '▲' : '▼'} ${f(d, Math.abs(dl))}</span><small>avg ${f(d, avg)} · ${f(d, Math.min(...a))}–${f(d, Math.max(...a))}</small></div>`;
  }).join('');
}
function pgSpark(k) {
  const d = PG_DATA[k], a = d.daily.slice(-14), mn = Math.min(...a), mx = Math.max(...a), w = 64, h = 22;
  const xy = a.map((v, i) => [i * w / (a.length - 1), h - 3 - (v - mn) / ((mx - mn) || 1) * (h - 6)]);
  return `<svg class="pg-sp" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${pgSmooth(xy)}" fill="none" stroke="${d.hex}" stroke-width="2" stroke-linecap="round"/></svg>`;
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
  $('#pg-legend', v).innerHTML = PG.items.map(k => `<span><svg width="30" height="10" viewBox="0 0 30 10"><path d="M0 5h30" stroke="${PG_DATA[k].hex}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="7 14" stroke-dashoffset="-1"/><circle cx="15" cy="5" r="4.2" fill="${PG_DATA[k].hex}"/></svg>${PG_DATA[k].label}</span>`).join('');
}
function renderProgress() {
  $('#v-progress').innerHTML = `<div class="wal-top"><h1>Progress</h1><p class="md-sub">See how your recovery health and daily factors trend over time.</p></div>
  <div class="pad"><div class="pg-card2"><div class="pg-h2"><b id="pg-title" class="pg-t"></b><button class="pg-info" data-act="pg-info" aria-label="About this chart">${ic('info', 22, 1.8)}</button></div><div class="pg-tf">${['W', 'M', '6M', 'Y'].map(t => `<button data-act="pg-tf" data-tf="${t}">${t}</button>`).join('')}</div>
    <div class="pg-nav" id="pg-nav"><button id="pg-prev" data-act="pg-wk" data-d="1" aria-label="Previous week">${ic('left', 18, 2)}</button><span id="pg-wk">This week</span><button id="pg-next" data-act="pg-wk" data-d="-1" aria-label="Next week">${ic('chev', 18, 2)}</button></div>
    <div id="pg-chart"></div><div class="pg-legend" id="pg-legend"></div></div>
  <div class="pg-card2"><b class="pg-t2">Compare factors</b><p class="pg-hint">Pick up to 2 to see them side by side.</p>
    <div class="pg-grid">${Object.keys(PG_DATA).map(k => `<button class="pg-item" style="--cat:${PG_DATA[k].hex}" data-act="pg-item" data-k="${k}"><span class="pg-n">${PG_DATA[k].label}</span></button>`).join('')}</div></div></div>`;
  pgPaint();
}

/* ═════════ COMMUNITY ═════════ */
const ROOMS = { community: ['💬', 'Community Room', '#4E7FA8'] };
const TINT = { blue: '#DEEAF4', sage: '#E1ECE2', gold: '#FAEFD6', coral: '#F8E5E2' };
const REACT = [['heart', 'heart', 'Been there', 'hearts', '#C56A5E'], ['support', 'sparkle', 'Proud of you', 'supports', '#C9973B'], ['strong', 'dumbbell', 'Stay strong', 'strong', '#4B77A6'], ['pray', 'shield', 'Holding you', 'pray', '#4E7A5E']];
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
const AV_SKIN = ['#F2C9A5', '#E3A982', '#C98B63', '#A8714E', '#F7D6BC'], AV_HAIR = ['#2E2A29', '#5A3A29', '#8A5A3B', '#C9973B', '#3B4A5E', '#6B5DB0'];
const avHash = t => { let h = 7; for (const c of String(t)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
function avatar(user, tint, size = 40) {
  const h = avHash(user), skin = AV_SKIN[h % 5], hair = AV_HAIR[(h >> 3) % 6], style = (h >> 6) % 4, bg = TINT[tint] || '#DEEAF4', top = AV_HAIR[(h >> 9) % 6];
  const hairBack = style === 1 ? `<path d="M10 24c-2-10 4-17 10-17s12 7 10 17c-1 5-3 8-3 8H13s-2-3-3-8z" fill="${hair}"/>` : '';
  const hairTop = [`<path d="M11 19c0-7 4-10 9-10s9 3 9 10c-3-3-6-4-9-4s-6 1-9 4z" fill="${hair}"/>`,
    `<path d="M11 20c0-8 4-11 9-11s9 3 9 11c-2-4-5-6-9-6s-7 2-9 6z" fill="${hair}"/>`,
    `<circle cx="20" cy="11" r="3.4" fill="${hair}"/><path d="M11 19c0-6 4-9 9-9s9 3 9 9c-3-3-6-4-9-4s-6 1-9 4z" fill="${hair}"/>`,
    `<path d="M11.5 18c1-6 4-8.5 8.5-8.5S27.500 12 28.500 18c-4-1-7-3-8.500-5-1.500 3-4 4.500-8.500 5z" fill="${hair}"/>`][style];
  return `<svg class="av-img" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" fill="${bg}"/>${hairBack}<path d="M5 40c1-8 7-11 15-11s14 3 15 11z" fill="${top}" opacity=".9"/><rect x="17" y="24" width="6" height="6" rx="2" fill="${skin}"/><ellipse cx="20" cy="19" rx="7.500" ry="8.500" fill="${skin}"/>${hairTop}<circle cx="17.200" cy="19.500" r=".9" fill="#2E2A29"/><circle cx="22.800" cy="19.500" r=".9" fill="#2E2A29"/><path d="M17.500 23c1.500 1.500 3.500 1.500 5 0" stroke="#2E2A29" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`;
}
function cmPostHTML(p) {
  const total = REACT.reduce((a, r) => a + (p[r[3]] || 0), 0);
  return `<article class="cpost" data-pid="${p.id}"><div class="cp-top"><span class="cp-av photo">${avatar(p.user, p.tint)}</span>
    <div class="cp-who"><b>${esc(p.user)}</b><small>${p.time}</small></div>
    <button class="cp-flag${CM.flagged.has(p.id) ? ' on' : ''}" data-act="cm-flag" data-id="${p.id}" aria-label="Flag this post for review">${ic('flag', 16, 1.8)}</button></div>
    <p class="cp-text">${esc(p.text)}</p>
    <div class="cp-react">${REACT.map(r => `<button class="${p['r_' + r[0]] ? 'on' : ''}" data-act="cm-react" data-id="${p.id}" data-r="${r[0]}" aria-label="${r[2]}" title="${r[2]}" style="--rc:${r[4]}">${ic(r[1], 18, 1.8)}<span>${p[r[3]] || 0}</span></button>`).join('')}
      <button class="rt" data-act="cm-comments" data-id="${p.id}" aria-label="Comments">${ic('chat', 18, 1.8)}<span>${p.replies.length || ''}</span></button></div>
  </article>`;
}
function csList(p) {
  return p.replies.length ? p.replies.map(r => `<div class="cs-item"><span class="cp-av photo sm">${avatar(r.user, 'blue', 36)}</span><div class="cs-bub"><b>${esc(r.user)}</b><p>${esc(r.text)}</p></div></div>`).join('') : '<div class="cm-empty"><b>No comments yet.</b>Be the first to leave some kind words.</div>';
}
function commentsSheet(id) {
  const p = POSTS.find(x => x.id == id); if (!p) return;
  const l = pushLayer(`<div class="sheet cs-sheet" data-pid="${p.id}"><span class="grab"></span>
    <h2>Comments <em id="cs-n">${p.replies.length}</em></h2>
    <div class="cs-list" id="cs-list">${csList(p)}</div>
    <div class="cp-quick">${['Proud of you 🙌', 'Been there. You’ve got this.', 'Same here 🫂', 'Here with you.'].map(t => `<button data-act="cm-quick" data-id="${p.id}" data-t="${t}">${t.replace(/ [🙌🫂]$/u, '').replace('Been there. You’ve got this.', 'Been there')}</button>`).join('')}</div>
    <div class="cs-box"><span class="cp-av photo sm">${avatar('you', 'blue', 36)}</span><input placeholder="Write a comment…" id="rp-${p.id}"><button data-act="cm-send" data-id="${p.id}" aria-label="Send">${ic('chev', 18, 2.4)}</button></div></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
}
function csRefresh(p) {
  const list = $('#cs-list'); if (list) { list.innerHTML = csList(p); list.scrollTop = list.scrollHeight; } const n = $('#cs-n'); if (n) n.textContent = p.replies.length;
  const i = $('#rp-' + p.id); if (i) i.value = ''; cmFeed();
}
function cmFeed() {
  const box = $('#cm-feed'); if (!box) return;
  const list = POSTS;
  box.innerHTML = (list.length ? list.map(cmPostHTML).join('') : '<div class="cm-empty"><b>Quiet in this room right now.</b>Be the first to say something — someone will see it.</div>');
    const st = $('#cm-sup'); if (st) st.textContent = CM.support; const rk = $('#cm-rank'); if (rk) rk.textContent = cmRank();
}
function composeSheet() {
  const l = pushLayer(`<div class="sheet cmp-sheet"><span class="grab"></span>
    <div class="cmp-top"><span class="cb-av">${esc((S.name || 'You').charAt(0).toUpperCase())}</span><div class="cmp-who"><b>Share with the community</b><small>Posting as you</small></div><button class="cmp-x" data-act="close-layer" aria-label="Close">${ic('x', 18, 2)}</button></div>
    <div class="cmp-box"><textarea id="cm-text" rows="5" placeholder="What’s on your mind? Even one line counts.">${esc(CM.draft)}</textarea><span class="cmp-count" id="cm-count">${CM.draft.length ? CM.draft.length + ' characters' : ''}</span></div>
    <button class="btn cmp-send" id="cm-post" data-act="cm-submit"${CM.draft.trim() ? '' : ' disabled'}>Post anonymously</button></div>`, 'sheet-wrap');
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


/* ═════════ PROFILE (Me) — content ported from Patient Dashboard Version 2.0 ═════════ */
const PF_PEOPLE = [
  ['#6E9E80', 'DR', 'Daniel Ruiz', 'Your recovery coach', '(310) 555-0142'], ['#4A90D9', 'TB', 'Tasha Brooks', 'Your peer specialist', '(310) 555-0188'],
  ['#C97B6F', 'MR', 'Mike R.', 'Sponsor · CPRS', '(323) 555-0117'], ['#8A6FB0', 'DE', 'Dr. Elena Rivera', 'Therapist · LCSW', '(310) 555-0164'],
  ['#D8AD63', 'MS', 'Mom (Sarah M.)', 'Family', '(562) 555-0193'], ['#5E8560', 'JP', 'Jack P.', 'Supportive friend', '(213) 555-0175']
];
function renderMe() {
  const full = [S.name, S.last].filter(Boolean).join(' ') || 'Friend', name = esc(full), ini = esc(full.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'R');
  const since = new Date(Date.now() - (Math.max(1, S.day || 1) - 1) * 864e5).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const meds = S.meds && S.meds.length ? S.meds : ['Suboxone 8mg / 2mg'];
  const helps = [['run', 'g', 'Go for a walk'], ['phone', 'b', 'Call someone I trust'], ['music', 'a', 'Listen to music'], ['wind', 'r', 'Breathing exercise']];
  const care = [['sage', 'Dr', 'Dr. Rivera', 'MOUD Prescriber'], ['purple', 'Th', 'Dr. Chen', 'Therapist · CBT'], ['rose', 'Sp', 'Mike R.', 'Sponsor · CPRS']];
  const menu = [['b', 'book', 'Guides', 'pf-soon', 'Guides'], ['a', 'cap', 'Tutorials', 'pf-soon', 'Tutorials'], ['g', 'gear', 'Settings &amp; Preferences', 'pf-soon', 'Settings'], ['b', 'shield', 'Privacy &amp; Data Sharing', 'pf-soon', 'Privacy'], ['b', 'sparkle', 'App Help Guide', 'me-replay', '']];
  const rem = [['morning', 'Morning', '☕'], ['afternoon', 'Midday', '🥗'], ['evening', 'Evening', '🌙']];
  const lab = (title, extra = '') => `<div class="pf-lab"><span>${title}</span>${extra}</div>`;
  $('#v-me').innerHTML = `<div class="pf-top"><button data-act="tab" data-v="home" aria-label="Back">${ic('back', 22)}</button><h2>My Profile</h2><span></span></div>
    <div class="pf-hero"><span class="pf-hero-av">${avatar(full, 'blue', 104)}</span><h1>${name}</h1><p>Clean since ${since}</p>
      <div class="pf-tags"><span class="gold">Level 4 · Bloom</span><span class="sage">2,340 XP</span></div></div>
    ${lab('Medication')}<div class="pf-card">${meds.map(m => `<div class="pf-row"><span class="pf-ic blue">${ic('pill', 20, 1.8)}</span><div><b>${esc(m)}</b><small>Daily · Sublingual · Prescribed by Dr. Rivera</small></div></div>`).join('')}</div>
    ${lab('What Helps Me', `<button class="pf-edit" data-act="pf-soon" data-t="Edit what helps me" aria-label="Edit what helps me">${ic('pencil', 16, 1.8)}</button>`)}<div class="pf-card">
      <div class="pf-help">${helps.map(([i, c, t]) => `<div class="hp-${c}"><span>${ic(i, 24, 1.7)}</span><b>${t}</b></div>`).join('')}</div></div>
    ${lab('My People', `<button class="pf-add" data-act="pf-add">${ic('plus', 14, 2.4)}Add</button>`)}<div class="pf-card"><p class="pf-sub">Call or text anyone in one tap.</p>
      ${[...PF_PEOPLE, ...(S.people || []).map(x => [x.c, x.i, x.n, x.r, x.p])].map(([c, i, n, r, p]) => { const d = String(p || '').replace(/[^\d+]/g, ''); if (!d) return `<div class="pf-row"><span class="pf-av" style="background:color-mix(in srgb,${c} 20%,#fff);color:color-mix(in srgb,${c} 78%,#26323D)">${i}</span><div><b>${esc(n)}</b><small>${esc(r)}</small></div></div>`; return `<div class="pf-row"><span class="pf-av" style="background:color-mix(in srgb,${c} 20%,#fff);color:color-mix(in srgb,${c} 78%,#26323D)">${i}</span><div><b>${n}</b><small>${r}</small></div><span class="pf-btns"><a class="call" href="tel:${d}" aria-label="Call ${n}">${ic('phone', 16, 2)}</a><a class="txt" href="sms:${d}" aria-label="Text ${n}">${ic('sms', 16, 2)}</a></span></div>`; }).join('')}</div>
    ${lab('Care Team')}<div class="pf-card">${care.map(([t, i, n, r]) => `<div class="pf-row"><span class="pf-ic ${t}">${i}</span><div><b>${n}</b><small>${r}</small></div></div>`).join('')}</div>
    ${lab('Setup reminders')}<div class="pf-card">
      <div class="st-row"><span class="pf-ic blue">${ic('clock', 22, 1.7)}</span><div><b>Daily check-in reminders</b><small id="st-state">${S.remindOn === false ? 'Disabled' : 'Enabled'}</small></div><button class="st-sw${S.remindOn === false ? '' : ' on'}" id="st-sw" role="switch" aria-checked="${S.remindOn !== false}" aria-label="Daily check-in reminders" data-act="pf-rem-toggle"><i></i></button></div>
      <div class="st-row st-time${S.remindOn === false ? ' off' : ''}" id="st-time"><span class="pf-ic amber">${ic('sun', 22, 1.7)}</span><div><b>Daily check-in time</b><small>${remindTime()} PT</small></div><select id="pf-time" aria-label="Daily check-in time"${S.remindOn === false ? ' disabled' : ''}>${Array.from({ length: 17 }, (_, k) => k + 6).map(h => { const v = String(h).padStart(2, '0') + ':00', cur = (S.remindTime || '').slice(0, 5) || ({ morning: '08:00', afternoon: '13:00', evening: '20:00' })[S.remind]; return `<option value="${v}"${v === cur ? ' selected' : ''}>${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}</option>`; }).join('')}</select></div></div>
    ${lab('Appearance')}<div class="pf-card"><div class="st-lang">${[['light', 'Light', 'sun'], ['dark', 'Dark', 'moon']].map(([k, l, i]) => `<button class="${(S.theme || 'light') === k ? 'on' : ''}" data-act="pf-theme" data-k="${k}">${ic(i, 16, 2)}${l}</button>`).join('')}</div></div>
    ${lab('Language settings')}<div class="pf-card"><div class="st-lang">${[['en', 'English'], ['es', 'Español']].map(([k, l]) => `<button class="${(S.profile.lang || 'en') === k ? 'on' : ''}" data-act="pf-lang" data-k="${k}">${(S.profile.lang || 'en') === k ? ic('check', 16, 2.6) : ''}${l}</button>`).join('')}</div></div>
    <div class="pf-card pf-list">${menu.map(([t, i, l, a, d]) => `<button class="pf-mrow t-${t}" data-act="${a}" data-t="${d}"><span class="pf-mic">${ic(i, 20, 1.8)}</span><b>${l}</b>${ic('chev', 16, 2.2)}</button>`).join('')}
      <button class="pf-mrow t-r" data-act="me-logout"><span class="pf-mic">${ic('out', 20, 1.8)}</span><b>Log out</b></button></div>`;
}


/* ═════════ ADD TO MY PEOPLE ═════════ */
function openAddPerson() {
  const feats = [['home', 'home', 'Home Overview'], ['progress', 'bars', 'Progress'], ['rewards', 'coin', 'Rewards']];
  const l = pushLayer(`<div class="sheet ap-sheet"><span class="grab"></span>
    <div class="ap-head"><span class="ap-ic">${ic('users', 24, 1.7)}</span><div><h2>Add to My People</h2><p>They’ll appear in your Call or Text list.</p></div><button class="cmp-x" data-act="close-layer" aria-label="Close">${ic('x', 18, 2)}</button></div>
    <div class="ap-body">
      <label class="ap-l" for="ap-name">Full name</label><input class="ap-in" id="ap-name" placeholder="e.g. Jordan Lee" autocomplete="off">
      <span class="ap-l">Relationship</span><div class="ap-seg" id="ap-rel"><button class="on" data-r="Friend">${ic('user', 18, 1.8)}Friend</button><button data-r="Family">${ic('users', 18, 1.8)}Family</button></div>
      <label class="ap-l" for="ap-phone">Contact number</label><input class="ap-in" id="ap-phone" inputmode="tel" placeholder="(555) 123-4567">
      <label class="ap-l" for="ap-email">Email</label><input class="ap-in" id="ap-email" inputmode="email" placeholder="name@email.com" autocomplete="off">
      <span class="ap-l">Give feature access</span><p class="ap-h">Choose what this person can see in your app.</p>
      ${feats.map(([k, i, t]) => `<div class="ap-feat"><span>${ic(i, 20, 1.7)}</span><b>${t}</b><button class="st-sw" role="switch" aria-checked="false" aria-label="${t}" data-act="ap-sw" data-k="${k}"><i></i></button></div>`).join('')}
    </div>
    <div class="ap-foot"><button class="btn ghost" data-act="close-layer">Cancel</button><button class="btn" id="ap-go" data-act="ap-save" disabled>Add person</button></div></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
  const chk = () => { const n = $('#ap-name').value.trim(), p = $('#ap-phone').value.replace(/\D/g, ''), m = $('#ap-email').value.trim(); $('#ap-go').disabled = !(n && (p.length >= 7 || /^\S+@\S+\.\S+$/.test(m))); };
  l.addEventListener('input', e => {
    if (e.target.id === 'ap-phone') { const d = e.target.value.replace(/\D/g, '').slice(0, 10); e.target.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d; }
    chk();
  });
}


/* ═════════ WALLET — bonuses ═════════ */
function bonusCard() {
  const week = S.history.filter(h => (Date.now() - new Date(h.date + 'T12:00:00').getTime()) < 7 * 864e5).length;
  const items = [
    ['r', 'flame', 'Streak bonus', 'Grows every day you check in, up to ' + usd(5), clamp(S.streak, 0, 5) / 5, '+' + usd(clamp(S.streak + 1, 1, 5)) + ' today', S.streak >= 5],
    ['a', 'bolt', '7-day streak', 'Check in 7 days in a row', clamp(S.streak, 0, 7) / 7, '+' + usd(20), S.streak >= 7],
    ['g', 'calendar', 'Weekly goal', '5 check-ins in a week · ' + Math.min(week, 5) + ' of 5', Math.min(week, 5) / 5, '+' + usd(10), week >= 5],
    ['b', 'rocket', '30-day milestone', 'A full month of showing up', clamp(S.streak, 0, 30) / 30, '+' + usd(50), S.streak >= 30]
  ];
  return `<div class="sec"><div class="eyebrow" style="margin-bottom:12px">Bonuses</div><div class="bn-card">${items.map(([c, i, t, d, p, amt, done]) => `<div class="bn-row t-${c}"><span class="bn-ic">${ic(i, 22, 1.8)}</span><div class="bn-mid"><b>${t}</b><small>${d}</small><div class="bn-bar"><i style="width:${Math.round(p * 100)}%"></i></div></div><span class="bn-amt${done ? ' done' : ''}">${done ? ic('check', 14, 2.6) + 'Earned' : amt}</span></div>`).join('')}</div></div>`;
}


/* ═════════ CHECK-IN RESULT — speedometer modal, then back to Home ═════════ */
function renderScore(root) {
  const vals = strengthVals(CI.a), overall = Math.round(finalPts());
  const pi = CI.saved ? S.history.length - 2 : S.history.length - 1, prev = pi >= 0 ? S.history[pi].overall : null;
  CI.res = { vals, overall, prev };
  if (!CI.saved) {
    CI.saved = true;
    const first = !checkedInToday();
    if (first) {
      S.streak = S.lastCheckin === daysAgo(1) ? S.streak + 1 : 1; S.lastCheckin = today();
      S.history.push({ date: today(), overall, vals, raw: JSON.parse(JSON.stringify(CI.a)) });
      S.loop = { date: today(), survey: 1, score: 1 };
    }
    save(); CI.first = first;
    const e = earnCalc(false);
    if (e.first) { earn(e.base, 'Daily check-in', overall); if (e.st) earn(e.st, 'Streak bonus'); S.loop.earned = 1; save(); }
  }
  const layer = CI.layer; layer.classList.add('rd-layer');
  const day = Math.max(1, S.day || 1), dIn = ((day - 1) % 7) + 1, first = !!CI.first;
  const f = FOCUS[focusKey({ vals })], fin = S.focusDone === today();
  const e = earnCalc(false), got = e.base + e.st, srt = Q.map(q => ({ ...q, v: vals[q.k] })).sort((a, b) => b.v - a.v), hi = srt[0], lo = srt[srt.length - 1];
  const d = prev == null ? null : overall - prev;
  const side = d == null ? ['First', 'check-in'] : d > 0 ? ['▲ ' + d, 'from last time'] : d < 0 ? ['▼ ' + -d, 'from last time'] : ['Same', 'as last time'];
  const A = Math.PI * 70, off = A * (1 - clamp(overall / 100, 0, 1));
  root.innerHTML = `<div class="rd-welcome rd-result"><div class="rd-pad">
    <div class="rd-top rd-hdr"><span class="rd-wk">Week ${Math.ceil(day / 7)} · Day ${dIn}</span><button class="rd-help" data-act="help">${ic('plus', 14, 2.8)}Help</button></div>
    <div class="rd-prog"><div class="seg"><i class="on"></i><i></i></div><div class="lbl"><span>Check-in <b>+${usd(10)}</b></span><span>Activity <b>+${usd(20)}</b></span></div></div>
    <h1 class="rd-h1 rr-h1">${first && !prev ? 'Your first check-in is done.' : 'Your check-in is done.'}</h1>
    <div class="rr-score"><div class="rr-arc"><svg viewBox="0 0 180 100" aria-hidden="true"><defs><linearGradient id="rrg" x1="0" x2="1"><stop offset="0" stop-color="#BBD0E6"/><stop offset="1" stop-color="#4F82B0"/></linearGradient></defs>
        <path d="M20 90A70 70 0 0 1 160 90" fill="none" stroke="#E8EDF3" stroke-width="14" stroke-linecap="round"/>
        <path class="rr-fill" d="M20 90A70 70 0 0 1 160 90" fill="none" stroke="url(#rrg)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${A}" stroke-dashoffset="${A}" data-off="${off}"/></svg>
        <div class="rr-num"><b id="g-num" data-score="${overall}">0</b></div><small class="rr-cap">RECOVERY SCORE</small></div>
      <div class="rr-side"><span class="rr-pill ${overall >= 55 ? 'ok' : 'low'}">${overall >= 75 ? 'Strong' : overall >= 55 ? 'Steady' : overall >= 40 ? 'Building' : 'Needs care'}</span><b>${side[0]} ${side[1]}</b>
        <div class="rr-mini"><span class="up"><i></i>${hi.label}<em>${hi.v.toFixed(1)}</em></span><span class="dn"><i></i>${lo.label}<em>${lo.v.toFixed(1)}</em></span></div></div></div>
    <p class="rr-ins">${hi.label} is your strongest area today. ${lo.label} could use a little care.</p>
    ${got ? `<div class="rr-earn"><span class="rr-eic">${ic('check', 18, 2.8)}</span><div><b>Check-in complete</b><small>${e.st ? 'Includes a ' + usd(e.st) + ' streak bonus' : 'Added to your wallet'}</small></div><strong>+${usd(got)}</strong></div>` : ''}
    <div class="rd-card rr-next"><div class="rr-nh"><span class="rr-nic t-${f.tone}">${ic(f.icon, 26, 1.7)}</span><div><small class="rr-eye">NEXT UP</small><h2>${f.page}</h2></div></div>
      <p>${f.why}.</p>
      <div class="rr-meta"><span>${ic('clock', 14, 2)}${f.mins} min</span><span>${ic('check', 14, 2.4)}${f.steps.length} short steps</span></div>
      ${fin ? '' : `<div class="rr-reward"><span class="rr-coin">${ic('coin', 24, 1.7)}</span><div><b>Finish to earn</b><span>Today becomes ${usd(got + 20)}</span></div><strong>+${usd(20)}</strong></div>`}
      <button class="btn" data-act="${fin ? 'ci-later' : 'fpr-go'}" data-k="${focusKey({ vals })}">${fin ? 'Back to Home' : 'Start activity'} ${ic('next', 18, 2.4)}</button></div></div></div>`;
  setTimeout(() => {
    const p = $('.rr-fill', root); if (p) { p.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)'; p.style.strokeDashoffset = p.dataset.off; }
    const n = $('#g-num', root); if (n) countUp(n, overall, 1200, 0);
  }, 150);
  if (CI.first && !CI.resumed) setTimeout(confetti, 600);
  layer._cleanup = () => { CI = null; };
}


/* ═════════ HOME — Today's focus card + guided activity page ═════════ */
const FOCUS = {
  cravings: { name: 'Craving', icon: 'bolt', tone: 'r', line: 'Cravings look like the biggest challenge today.', cta: 'Start Managing Cravings', mins: 4, page: 'Managing Cravings', hero: 'life', why: 'Surf the urge until it passes',
    steps: [['Name it and rate it', 'Say it plainly: “I’m having a craving.” Rate it 1–10. Naming it moves it from the driver’s seat to the passenger seat — you’re observing it now, not obeying it.'],
      ['Delay — set a 15-minute deal', 'You don’t have to promise forever, just 15 minutes. Tell yourself “I can revisit this in 15 minutes” and set an actual timer. Almost every craving loses its grip inside that window.'],
      ['Distance — change your surroundings', 'Leave the room, step outside, put physical space between you and the cue. Cravings feed on cues; starve this one.'],
      ['Distract — give your hands and mind a job', 'Splash cold water on your face, do 10 slow squats, play the number game, make tea. Strong sensation + simple task = the craving loses your attention.'],
      ['Dial — reach one person', 'Text or call someone from your support list, even just: “Rough moment, riding it out.” Saying it out loud cuts a craving’s intensity more than almost anything else.'],
      ['Decide and review', 'When the timer ends, re-rate it 1–10. Notice it dropped — that’s proof, not luck. Jot one line about what triggered it; every craving you outlast makes the next one weaker.']],
    works: 'Cravings rise and fall in waves and usually peak within 15–30 minutes. Delay, distance and distraction give the wave time to pass, while connection and review turn each one into evidence that you can outlast them.' },
  meds: { name: 'Medication', icon: 'pill', tone: 'b', line: 'Staying on track with your medication is today’s focus.', cta: 'Start Medication Check', mins: 3, page: 'Staying on Track', hero: 'pill', why: 'Make your medication routine easy',
    steps: [['Check your plan', 'Look at your dose and timing. If you’re unsure, write down the question for your prescriber.'], ['Pair it with a habit', 'Take it at the same moment as something you already do daily, like brushing your teeth or making coffee.'], ['Set a reminder', 'A phone alarm or pill box makes the routine automatic so you don’t have to rely on memory.'], ['Plan for a missed dose', 'Know what to do if you miss one, and who to call. A plan takes the panic out of the moment.'], ['Tell someone', 'Share your plan with one person on your team. Being known makes it easier to keep.']],
    works: 'Consistent medication keeps cravings steadier. Small routines and reminders do more than willpower.' },
  risk: { name: 'Staying Safe', icon: 'shield', tone: 'a', line: 'Risky moments look like the biggest challenge today.', cta: 'Start Staying Safe', mins: 4, page: 'Staying Safe', hero: 'shield', why: 'Get ahead of risky moments',
    steps: [['Name your riskiest cue', 'Which person, place or time of day is hardest? Write it down in one line.'], ['Make an if-then plan', '“If I’m near ___, then I will ___.” A ready plan beats deciding in the moment.'], ['Change the route', 'Take a different way, shorten the visit, or bring someone with you.'], ['Keep help close', 'Save one person to call, and keep naloxone where you can reach it.'], ['Review tonight', 'Notice what worked. Adjust the plan for tomorrow.']],
    works: 'Planning ahead for known triggers cuts the number of decisions you have to make under pressure.' },
  stress: { name: 'Stress', icon: 'wind', tone: 'b', line: 'Stress looks like the biggest challenge today.', cta: 'Start Managing Stress', mins: 4, page: 'Managing Stress', hero: 'wind', why: 'Bring your body back to calm',
    steps: [['Pause and notice', 'Stop for a moment. Name where you feel stress in your body.'], ['Breathe out longer', 'Breathe in for 4, out for 6. Repeat five times. A long exhale tells your body it’s safe.'], ['Drop your shoulders', 'Unclench your jaw and hands. Let your shoulders fall away from your ears.'], ['Shrink the task', 'Pick the one smallest thing you can do next. Ignore the rest for now.'], ['Reach out', 'Tell someone how you’re feeling, even in one line.']],
    works: 'Slow breathing activates the body’s calming response, and shrinking tasks makes stress feel manageable.' },
  emotions: { name: 'Emotions', icon: 'smile', tone: 'p', line: 'Big feelings look like the biggest challenge today.', cta: 'Start Steadying Emotions', mins: 4, page: 'Steadying Emotions', hero: 'smile', why: 'Let the feeling move through',
    steps: [['Name the feeling', 'Say what it is: sad, angry, anxious. Naming a feeling lowers its volume.'], ['Locate it', 'Notice where it sits in your body, and breathe into that spot.'], ['Let it be', 'You don’t have to fix it. Feelings rise and fall like waves.'], ['Do one kind thing', 'A walk, a shower, music, a warm drink. Pick the gentlest option.'], ['Share it', 'Tell someone you trust, or write one line in your own words.']],
    works: 'Feelings that are named and shared lose their intensity much faster than ones we push away.' },
  body: { name: 'Sleep & Body', icon: 'moon', tone: 'p', line: 'Sleep and your body need care today.', cta: 'Start Body Care', mins: 4, page: 'Caring for Your Body', hero: 'moon', why: 'Give your body what it needs',
    steps: [['Check in with your body', 'Scan from head to toe. Where do you feel tight, tired or sore?'], ['Move gently', 'Stretch or take a short walk. Gentle movement eases pain and tension.'], ['Drink and eat', 'Have water and something simple to eat. Your body needs fuel to recover.'], ['Plan your wind-down', 'Dim the lights, put away screens and keep the same bedtime tonight.'], ['Ask for help', 'If pain or poor sleep keeps up, tell your care team.']],
    works: 'Sleep and pain affect cravings and mood the next day, so small body-care steps protect tomorrow’s recovery.' },
  drive: { name: 'Motivation', icon: 'rocket', tone: 'g', line: 'Motivation and confidence need a boost today.', cta: 'Start Building Confidence', mins: 3, page: 'Building Confidence', hero: 'rocket', why: 'Remember why you started',
    steps: [['Name your why', 'Write one reason recovery matters to you today.'], ['Count a win', 'List one thing you’ve done well this week, however small.'], ['Picture tomorrow', 'Imagine a good day ahead. What does it look like?'], ['Pick one small step', 'Choose one thing you can do in the next hour to move forward.'], ['Tell someone', 'Share your win or your plan with someone on your team.']],
    works: 'Remembering your reasons and counting small wins builds confidence, which makes the next step easier.' }
};
const FP = { done: new Set() };
function focusKey(h) { const q = Q.map(x => [x.k, h.vals[x.k]]).sort((a, b) => a[1] - b[1])[0]; return q[0]; }
function focusCard() {
  const last = S.history[S.history.length - 1], dn = checkedInToday() && last;
  if (!dn) return `<div class="fc-card"><div class="fc-top"><span class="fc-ic t-r">${ic('bolt', 26, 1.7)}</span><div><small>Today’s focus</small><b class="muted">Not ready yet</b></div></div>
    <p class="fc-note">Your focus and recovery activity for today show here after your daily reflection.</p>
    <button class="fc-btn" data-act="checkin">Complete today’s check-in ${ic('next', 18, 2.4)}</button><span class="fc-cap">About 1 minute · unlocks today’s score</span></div>`;
  const k = focusKey(last), f = FOCUS[k], fin = S.focusDone === today();
  return `<div class="fc-card"><div class="fc-top"><span class="fc-ic t-${f.tone}">${ic(f.icon, 26, 1.7)}</span><div><small>Today’s focus</small><b>${f.name}</b></div></div>
    <p class="fc-line">${f.line}</p>
    <button class="fc-btn" data-act="focus-open" data-k="${k}">${fin ? 'Review ' + f.page : f.cta} ${ic('next', 18, 2.4)}</button><span class="fc-cap">${fin ? 'Completed today ✓' : 'About ' + f.mins + ' minutes'}</span></div>`;
}
function focusPrompt() {
  const last = S.history[S.history.length - 1]; if (!last || S.focusDone === today() || $$('.layer').length) return;
  const k = focusKey(last), f = FOCUS[k];
  const l = pushLayer(`<div class="sheet cx-sheet fpr-sheet"><span class="grab"></span><span class="fpr-ic t-${f.tone}">${ic(f.icon, 28, 1.7)}</span>
    <h2>One more step for today</h2><p>Complete today’s personalized activity, <b>${f.page}</b>, to earn <b>${usd(20)}</b>.</p>
    <button class="btn" data-act="fpr-go" data-k="${k}">Start activity</button><button class="btn ghost" data-act="close-layer">Maybe later</button></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
}
const FP_MIN = 8;   // seconds each step stays locked, so the activity can't be tapped through
function fpSteps(k) {
  const f = FOCUS[k], fin = S.focusDone === today(), n = fin ? f.steps.length : FP.step;
  return `<div class="fp-card fp-steps"><h3>How to do it</h3><p class="fp-sub">${fin ? 'You completed every step today.' : 'Follow the steps in order — each one unlocks after a short pause.'}</p>
    ${f.steps.map(([t, d], i) => {
      const st = i < n ? 'done' : i === n ? 'now' : 'lock';
      return `<div class="fp-step ${st}"><span class="fp-n">${st === 'done' ? ic('check', 16, 2.8) : st === 'lock' ? ic('lock', 15, 2) : i + 1}</span><div><b>${t}</b>${st === 'lock' ? '' : `<p>${d}</p>`}
        ${st === 'now' ? `<button class="btn fp-next" id="fp-next" data-act="fp-next" data-k="${k}" disabled>${i === f.steps.length - 1 ? 'Finish activity' : 'Complete step ' + (i + 1)}</button>` : ''}</div></div>`;
    }).join('')}
    <div class="fp-prog"><i style="width:${Math.round(n / f.steps.length * 100)}%"></i></div><small class="fp-pc">${n} of ${f.steps.length} steps</small></div>`;
}
function fpTick() {
  const b = $('#fp-next'); if (!b) return;
  const left = Math.max(0, Math.ceil(FP_MIN - (Date.now() - FP.t0) / 1000)), f = FOCUS[b.dataset.k], last = FP.step === f.steps.length - 1;
  b.disabled = left > 0; b.textContent = left > 0 ? 'Available in ' + left + 's' : last ? 'Finish activity' : 'Complete step ' + (FP.step + 1);
}
function focusPage(k) {
  const f = FOCUS[k]; if (!f) return; const fin = S.focusDone === today();
  FP.step = !fin && S.fpProg && S.fpProg.d === today() && S.fpProg.k === k ? S.fpProg.n : 0; FP.t0 = Date.now();
  const l = pushLayer(`<div class="layer-top fin-head md-head"><button class="plain-btn" data-act="close-layer" aria-label="Back">${ic('back', 22)}</button><span class="fh-t">${f.page}</span><button class="plain-btn" data-act="fp-speak" data-k="${k}" aria-label="Read aloud">${ic('speaker', 22)}</button></div>
    <div class="layer-body md-body fp-body">
      <div class="fp-card fp-focus"><span class="fc-ic t-${f.tone}">${ic(f.icon, 26, 1.7)}</span><div><small>TODAY’S PERSONALIZED ACTIVITY</small><b>${f.name}</b></div></div>
      <div class="fp-card fp-hero"><span class="fp-hero-ic">${ic(f.hero, 34, 1.7)}</span><small>WHY THIS HELPS TODAY</small><h2>${f.why}</h2><span class="fp-xp">EARN ${usd(20)}</span></div>
      <div id="fp-steps">${fpSteps(k)}</div>
      <button class="fp-why" data-act="fp-why"><span>${ic('stetho', 22, 1.7)}Why this works</span>${ic('down', 20, 2)}</button><p class="fp-wp" hidden>${f.works}</p>
      <p class="fp-foot">There’s no wrong way. Completing an activity syncs to your care team.</p></div>`, 'md-layer fp-layer');
  const t = setInterval(fpTick, 500); l._cleanup = () => clearInterval(t); fpTick();
}
function fpComplete(k, layer) {
  if (S.focusDone !== today()) { S.focusDone = today(); S.activities++; earn(20, 'Activity: ' + FOCUS[k].page); }
  S.fpProg = null; save(); popLayer(layer); if (tab === 'home') renderHome(); setTimeout(claimPopup, 400);
}
function claimPopup() {
  if ($$('.layer').length) return;
  pushLayer(`<div class="cm-wrap"><div class="cm-card clm-card"><span class="clm-ic">${ic('coin', 34, 1.6)}</span><h3>You claimed ${usd(20)}</h3>
    <p>For completing today’s check-in and personalized activity. Great work showing up for yourself.</p><button class="btn" data-act="close-layer">Done</button></div></div>`, 'ci-modal');
  setTimeout(confetti, 300);
}

/* ═════════ WALLET — this week ═════════ */
function applyTheme(t) {
  S.theme = t === 'dark' ? 'dark' : 'light'; save();
  document.documentElement.dataset.theme = S.theme;
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = S.theme === 'dark' ? '#0F1318' : '#F5F7F9';
}
applyTheme(S.theme);
function weekLabel() {
  if (WK.back === 0) return 'This week'; if (WK.back === 1) return 'Last week';
  const d = weekDays(), f = x => new Date(x + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return f(d[0].d) + ' – ' + f(d[6].d);
}
function weekCard() {
  const days = weekDays(), n = days.filter(x => x.h).length, earned = days.reduce((a, x) => a + x.e, 0), need = Math.max(6 - n, 0);
  const chip = WK.back ? (need ? '' : '<span class="wk-chip">+1 Bonus</span>') : `<span class="wk-chip">${need ? need + ' to bonus' : '+1 Bonus'}</span>`;
  return `<div class="sec"><div class="wk-head"><div class="eyebrow">${weekLabel()}</div><div class="wk-nav"><button data-act="wk-nav" data-d="1" aria-label="Previous week">${ic('back', 16, 2.4)}</button><button data-act="wk-nav" data-d="-1" aria-label="Next week" ${WK.back ? '' : 'disabled'}>${ic('next', 16, 2.4)}</button></div></div><div class="wk-card">
    <div class="wk-tile"><small>Check-ins</small><b>${n} of 7</b>${chip}</div>
    <div class="wk-tile"><small>Activities</small><b>${WK.back ? Math.max(n - 1, 0) : n + 2}</b></div>
    <div class="wk-tile"><small>Earned</small><b class="g">+${usd(earned)}</b></div></div></div>`;
}

/* ═════════ wiring ═════════ */
Object.assign(ACT, {
  help: () => helpSheet(),
  'pf-rem-toggle': () => { S.remindOn = S.remindOn === false; save(); renderMe(); toast(S.remindOn ? 'Daily reminders enabled' : 'Daily reminders disabled'); },
  'pf-theme': el => { applyTheme(el.dataset.k); renderMe(); },
  'pf-lang': el => { S.profile.lang = el.dataset.k; save(); renderMe(); toast(el.dataset.k === 'es' ? 'Idioma: Español' : 'Language: English'); },
  'ci-exit': () => {
    const l = pushLayer(`<div class="sheet cx-sheet"><span class="grab"></span><h2>Are you sure you want to close?</h2><p>Your answers for today’s check-in won’t be saved, and you’ll miss out on today’s reward.</p>
      <button class="btn" data-act="cx-stay">Keep going</button><button class="btn ghost cx-yes" data-act="cx-yes">Yes, close</button></div>`, 'sheet-wrap');
    l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
  },
  'cx-stay': el => popLayer(layerOf(el)),
  'cx-yes': el => { popLayer(layerOf(el)); ACT['ci-close'](); },
  'wk-nav': el => { if (el.disabled) return; WK.back = Math.max(0, WK.back + +el.dataset.d); const y = $('#v-wallet').scrollTop; renderWallet(); $('#v-wallet').scrollTop = y; },
  'focus-open': el => focusPage(el.dataset.k),
  'ci-later': () => endCheckin('home'),
  'fpr-go': el => { popLayer(layerOf(el)); focusPage(el.dataset.k); },
  'fp-next': el => {
    if (el.disabled || (Date.now() - FP.t0) / 1000 < FP_MIN) return; const k = el.dataset.k, f = FOCUS[k];
    FP.step++; S.fpProg = { d: today(), k, n: FP.step }; save();
    if (FP.step >= f.steps.length) return fpComplete(k, layerOf(el));
    FP.t0 = Date.now(); $('#fp-steps').innerHTML = fpSteps(k); fpTick();
  },
  'fp-why': el => { const p = el.nextElementSibling; p.hidden = !p.hidden; el.classList.toggle('open', !p.hidden); },
  'fp-speak': el => { const f = FOCUS[el.dataset.k]; if (!window.speechSynthesis) return toast('Read-aloud isn’t supported on this device'); if (speechSynthesis.speaking) return speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(f.page + '. ' + f.why + '. ' + f.steps.map(x => x[0] + '. ' + x[1]).join(' ')); u.rate = .95; speechSynthesis.speak(u); },
  'pf-add': () => openAddPerson(),
  'ap-sw': el => { const on = !el.classList.contains('on'); el.classList.toggle('on', on); el.setAttribute('aria-checked', on); },
  'ap-save': el => {
    const l = layerOf(el), n = $('#ap-name').value.trim(), rel = ($('#ap-rel .on') || {}).dataset.r || 'Friend', ph = $('#ap-phone').value.trim(), em = $('#ap-email').value.trim();
    const access = $$('.ap-feat .st-sw.on', l).map(b => b.dataset.k), cols = ['#4A90D9', '#6E9E80', '#C97B6F', '#8A6FB0', '#D8AD63', '#5E8560'];
    S.people = [...(S.people || []), { n, r: rel, p: ph, e: em, access, i: n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase(), c: cols[(S.people || []).length % cols.length] }]; save();
    popLayer(l); renderMe(); toast(n + ' added to My People');
  },
  'pf-soon': el => soonScreen(el.dataset.t || 'Coming soon', 'gear', 'Coming soon', 'This part of your profile is on its way.'),
  'md-crisis': () => crisisScreen(),
  'md-urge': el => { $$('.md-layer').forEach(popLayer); setTimeout(() => openTool('urge'), 200); },
  'md-team': () => mdLayer('Reach my support team', CONTACTS.support.map(ctRow).join('')),
  'md-nalox': () => soonScreen('Find naloxone', 'pill', 'Naloxone finder coming soon', 'We’re building a map of pharmacies and free distribution points near you. In the meantime, call <b>988</b> or your pharmacy to ask where to get naloxone.'),
  'md-guide': () => { $$('.md-layer').forEach(popLayer); setTimeout(() => ACT['me-replay'](), 220); },
  'pg-info': () => toast('Tap factors below to compare how they move together'),
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
  'cm-comments': el => commentsSheet(el.dataset.id),
  'cm-quick': el => { const p = POSTS.find(x => x.id == el.dataset.id); p.replies.push({ user: 'you', text: el.dataset.t }); csRefresh(p); },
  'cm-send': el => { const p = POSTS.find(x => x.id == el.dataset.id), i = $('#rp-' + p.id), t = i && i.value.trim(); if (!t) return; p.replies.push({ user: 'you', text: t }); csRefresh(p); },
  'cm-rooms': () => roomsSheet(),
  'cm-room': el => { CM.room = el.dataset.r; const l = layerOf(el); if (l && l.classList.contains('sheet-wrap')) popLayer(l); cmFeed(); const f = $('#cm-feed'); if (f) f.scrollIntoView({ block: 'start', behavior: 'smooth' }); },
  'cm-soon': el => soonScreen(el.dataset.t, 'users', 'Coming soon', 'This part of Community is on its way. For now you can share in the rooms below.')
});
document.addEventListener('input', e => { if (e.target.id === 'cm-text') { CM.draft = e.target.value; $('#cm-post').disabled = !CM.draft.trim(); $('#cm-count').textContent = CM.draft.length ? CM.draft.length + ' characters' : ''; } });

document.addEventListener('click', e => { const b = e.target.closest('#ap-rel button'); if (b) { $$('#ap-rel button').forEach(x => x.classList.toggle('on', x === b)); } });
document.addEventListener('change', e => {
  if (e.target.id !== 'pf-time') return;
  S.remindTime = e.target.value; const h = +e.target.value.slice(0, 2); S.remind = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'; save(); renderMe(); toast('Check-in time set to ' + remindTime() + ' PT');
});


/* ═════════ Check-in welcome — full screen, replaces the "Time for your check-in" sheet ═════════ */
function triggerSheet() {
  if (S.remindOn === false || checkedInToday() || $$('.layer').length) return;
  const first = !S.history.length, day = Math.max(1, S.day || 1), dIn = ((day - 1) % 7) + 1;
  pushLayer(`<div class="rd-welcome"><div class="rd-pad">
    <div class="rd-top rd-hdr"><span class="rd-wk">Week ${Math.ceil(day / 7)} · Day ${dIn}</span><button class="rd-help" data-act="help">${ic('plus', 14, 2.8)}Help</button></div>
    <div class="rd-prog"><div class="seg"><i></i><i></i></div>
      <div class="lbl"><span>Check-in <b>+${usd(10)}</b></span><span>Activity <b>+${usd(20)}</b></span></div></div>
    <h1 class="rd-h1"><span class="g">${first ? 'Welcome,' : greeting() + ','}</span> ${esc(S.name || 'friend')}</h1>
    <p class="rd-p">${first ? 'Your first week starts today.' : 'One minute for you, then one small step.'}</p>
        <div class="rd-card rd-cicard">
      <div class="rd-art rd-ci-art"><span class="rd-pulse p1"></span><span class="rd-pulse p2"></span><span class="rd-fl f1">${ic('heart', 16, 2)}</span><span class="rd-fl f2">${ic('leaf', 16, 2)}</span><span class="rd-fl f3">${ic('moon', 16, 2)}</span><span class="rd-spk k1">${ic('sparkle', 18, 1.8)}</span><span class="rd-spk k2">${ic('sparkle', 14, 1.8)}</span><button class="rd-spin" data-act="trigger-go" aria-label="Start check-in">
        <svg class="rd-spin-ring" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round"/><circle cx="100" cy="8" r="6" fill="currentColor"/></svg>
        <span class="rd-spin-core">${ic('plus', 40, 2.6)}<b>Check in</b></span></button><span class="rd-tap">Tap to begin</span></div>
      <div class="rd-cimeta"><span class="rd-chip t">${ic('clock', 14, 2)}About 1 min</span><span class="rd-chip g">${ic('coin', 14, 2)}Earn up to ${usd(10)}</span></div>
      <h2 class="rd-cardh">${first ? 'Your first check-in' : 'How are you doing today?'}</h2>
      <p class="rd-cardp">${first ? 'One question at a time, no right answers.' : 'One question at a time. Take your time.'}</p>
      <button class="btn" data-act="trigger-go">Start check-in ${ic('next', 18, 2.4)}</button></div></div></div>`, 'rd-layer');
}


/* ═════════ GATE — Home stays hidden until today's check-in and activity are done ═════════ */
const GATE_ON = !/notrigger|nogate/.test(location.search);
const gateOn = () => GATE_ON && !!S.onboarded && (!checkedInToday() || S.focusDone !== today());
const updGate = () => document.documentElement.classList.toggle('gated', gateOn());
function gateRoute() {
  updGate(); if (!gateOn() || $$('.layer').length) return false;
  if (!checkedInToday()) { S.remindOn = true; triggerSheet(); return true; }
  const last = S.history[S.history.length - 1];
  if (last && last.raw) {   // refresh after the check-in: come back to the result page
    CI = { i: 0, a: JSON.parse(JSON.stringify(last.raw)), done: {}, touched: {}, layer: null, saved: true, resumed: true, first: !!(S.loop && S.loop.earned) };
    CI.layer = pushLayer('<div id="ci-root" style="display:flex;flex-direction:column;flex:1"></div>'); CI.layer._cleanup = () => { CI = null; };
    renderScore($('#ci-root', CI.layer)); return true;
  }
  if (last) { focusPage(focusKey(last)); return true; }
  return false;
}
document.addEventListener('DOMContentLoaded', () => { gateRoute(); });
let gateIdle = 0;
setInterval(() => { updGate(); gateIdle = gateOn() && !$$('.layer').length ? gateIdle + 1 : 0; if (gateIdle >= 2) { gateIdle = 0; gateRoute(); } }, 350);
