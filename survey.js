/* Rudra Health — daily check-in survey (7 screens) + scoring
   1 medication yesterday · 2 past 24 hours · 3 emotions · 4 body · 5 next week · 6 unreported use (+dates) · 7 substances.
   Every screen is worth 100/7 ≈ 14.3 points; the speedometer at the top climbs to the final score (0–100). */
'use strict';

/* Strengths shown on the score screen (0–10 each, higher is better) — derived from the survey answers */
const Q = [
  { k: 'meds', label: 'Medication' }, { k: 'cravings', label: 'Craving Control' }, { k: 'risk', label: 'Staying Safe' },
  { k: 'stress', label: 'Stress Management' }, { k: 'emotions', label: 'Emotional Balance' },
  { k: 'body', label: 'Sleep & Body' }, { k: 'drive', label: 'Motivation & Confidence' }
];
const REC = { meds: 'mindful', cravings: 'urge', risk: 'grounding', stress: 'breath', emotions: 'emotions', body: 'sound', drive: 'quotes' };
function recommend(vals) {
  if (!vals) return TOOLS.find(t => t.id === 'breath');
  const order = Q.map(q => [q, vals[q.k]]).sort((a, b) => a[1] - b[1]);
  let pick = order[0];
  if (REC[pick[0].k] === S.lastActivity && order[1] && order[1][1] - pick[1] <= 2) pick = order[1];   // rotate so activities stay fresh
  return Object.assign({}, TOOLS.find(t => t.id === REC[pick[0].k]), { why: pick[0].label, whyV: pick[1] });
}


/* ═════════ soft flat illustrations for the question cards ═════════ */
const IL = (inner, bg) => `<svg class="s-il" viewBox="0 0 200 120" width="190" height="114" aria-hidden="true"><defs><clipPath id="ilc"><circle cx="100" cy="60" r="50"/></clipPath></defs><ellipse cx="100" cy="108" rx="62" ry="7" fill="#1F2A37" opacity=".06"/><circle cx="100" cy="60" r="50" fill="${bg}"/>${inner}</svg>`;
const FACE = (eyes, mouth, extra = '', fill = '#FBE3B8') => `<circle cx="100" cy="60" r="34" fill="${fill}"/>${eyes}${mouth}${extra}`;
const EYES = '<circle cx="88" cy="55" r="3.6" fill="#3A3F4A"/><circle cx="112" cy="55" r="3.6" fill="#3A3F4A"/>';
const ILLUS = {
  craving: IL('<g clip-path="url(#ilc)"><path d="M40 86c14-18 28-18 40 0s26 18 40 0 26-18 40 0v20H40z" fill="#8FB5D8"/><path d="M40 94c14-14 28-14 40 0s26 14 40 0 26-14 40 0v12H40z" fill="#6C9FCC"/></g><path d="M92 62c0-12 8-16 10-26 6 6 14 14 14 26a12 12 0 0 1-24 0z" fill="#F4A58F"/><path d="M99 66c0-6 4-8 5-13 3 3 7 7 7 13a6 6 0 0 1-12 0z" fill="#FBD2A8"/>', '#E5DDF3'),
  risk: IL('<path d="M100 26l30 10v22c0 20-14 32-30 38-16-6-30-18-30-38V36z" fill="#9CBBE0"/><path d="M100 26l30 10v22c0 20-14 32-30 38z" fill="#7FA6CE"/><rect x="96.5" y="46" width="7" height="22" rx="3.5" fill="#fff"/><circle cx="100" cy="77" r="4" fill="#fff"/>', '#E6EFF8'),
  stress: IL('<path d="M64 78a16 16 0 0 1 4-31 22 22 0 0 1 42-4 18 18 0 0 1 22 18 14 14 0 0 1-4 17z" fill="#fff"/><path d="M64 78a16 16 0 0 1 4-31 22 22 0 0 1 42-4 18 18 0 0 1 22 18 14 14 0 0 1-4 17z" fill="#C9D8EA" opacity=".7"/><path d="M142 88h24M134 98h30M150 78h14" stroke="#8FB5D8" stroke-width="4" stroke-linecap="round"/>', '#E3ECF6'),
  pleasant: IL('<circle cx="100" cy="58" r="22" fill="#F6D98B"/><g stroke="#F6D98B" stroke-width="5" stroke-linecap="round"><path d="M100 22v8M100 86v8M64 58h8M128 58h8M74 32l6 6M126 84l6 6M74 84l6-6M126 32l-6 6"/></g><circle cx="92" cy="55" r="2.8" fill="#6B5A2A"/><circle cx="108" cy="55" r="2.8" fill="#6B5A2A"/><path d="M91 65q9 8 18 0" stroke="#6B5A2A" stroke-width="3" fill="none" stroke-linecap="round"/>', '#FBF1D6'),
  depressed: IL(FACE(EYES, '<path d="M90 76q10-8 20 0" stroke="#3A3F4A" stroke-width="3.4" fill="none" stroke-linecap="round"/>', '<path d="M82 46q6-4 11-1M118 46q-6-4-11-1" stroke="#3A3F4A" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M128 78c4 6 4 10 0 12-4-2-4-6 0-12z" fill="#8FB5D8"/>', '#D7E3F1'), '#E6EDF6'),
  angry: IL(FACE(EYES, '<path d="M90 76q10-6 20 0" stroke="#3A3F4A" stroke-width="3.4" fill="none" stroke-linecap="round"/>', '<path d="M81 45l14 5M119 45l-14 5" stroke="#3A3F4A" stroke-width="3.4" stroke-linecap="round"/>', '#F6C7BB'), '#F8E6E1'),
  anxious: IL(FACE(EYES, '<path d="M88 74q4-5 8 0t8 0 8 0" stroke="#3A3F4A" stroke-width="3" fill="none" stroke-linecap="round"/>', '<path d="M126 44c4 6 4 10 0 12-4-2-4-6 0-12z" fill="#8FB5D8"/><path d="M82 46q6-4 11 0M118 46q-6-4-11 0" stroke="#3A3F4A" stroke-width="2.6" fill="none" stroke-linecap="round"/>', '#E3DDF2'), '#EEEAF8'),
  relaxed: IL(FACE('<path d="M82 56q6 5 12 0M106 56q6 5 12 0" stroke="#3A3F4A" stroke-width="3" fill="none" stroke-linecap="round"/>', '<path d="M91 68q9 7 18 0" stroke="#3A3F4A" stroke-width="3" fill="none" stroke-linecap="round"/>', '<path d="M128 36c10 0 16 6 16 14-10 0-16-6-16-14z" fill="#8DBB9A"/><path d="M128 36c4 4 9 9 16 14" stroke="#6FA37F" stroke-width="2" fill="none"/>', '#DCEBDD'), '#E8F2EA'),
  happy: IL(FACE(EYES, '<path d="M86 66q14 16 28 0z" fill="#fff" stroke="#3A3F4A" stroke-width="3" stroke-linejoin="round"/>', '<circle cx="80" cy="66" r="5" fill="#F4A58F" opacity=".5"/><circle cx="120" cy="66" r="5" fill="#F4A58F" opacity=".5"/>'), '#FBF1D6'),
  sleep: IL('<path d="M112 34a26 26 0 1 0 14 46 22 22 0 0 1-14-46z" fill="#C9C3EA"/><path d="M112 34a26 26 0 0 0-4 44 22 22 0 0 1 4-44z" fill="#B3ACDD"/><g fill="#F6D98B"><path d="M138 40l2.6 6 6 2.6-6 2.6-2.6 6-2.6-6-6-2.6 6-2.6z"/><circle cx="68" cy="44" r="3"/><circle cx="144" cy="82" r="2.4"/></g>', '#E9E6F6'),
  pain: IL('<g transform="rotate(-35 100 60)"><rect x="62" y="46" width="76" height="28" rx="14" fill="#F3C9A6"/><rect x="86" y="46" width="28" height="28" fill="#F0B88C"/><g fill="#E3A57A"><circle cx="96" cy="56" r="1.8"/><circle cx="104" cy="56" r="1.8"/><circle cx="96" cy="64" r="1.8"/><circle cx="104" cy="64" r="1.8"/></g></g><path d="M138 30l-8 14h8l-6 14" stroke="#F4A58F" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>', '#FBEBDD'),
  motivation: IL('<g clip-path="url(#ilc)"><path d="M52 92l34-44 18 22 12-14 32 36z" fill="#9CBBE0"/><path d="M86 48l18 22 12-14-12-8z" fill="#7FA6CE"/><path d="M86 48l-8 10 8 4 6-6z" fill="#fff"/></g><path d="M118 56V30" stroke="#6B7B8B" stroke-width="3" stroke-linecap="round"/><path d="M118 30l18 6-18 7z" fill="#F4A58F"/>', '#E3ECF6'),
  confidence: IL('<path d="M100 26l30 10v22c0 20-14 32-30 38-16-6-30-18-30-38V36z" fill="#B9DCC2"/><path d="M100 26l30 10v22c0 20-14 32-30 38z" fill="#9CCBA8"/><path d="M100 44l5.4 11 12 1.7-8.7 8.5 2 12-10.7-5.7-10.7 5.7 2-12-8.7-8.5 12-1.7z" fill="#fff"/>', '#E8F2EA')
};
const illus = k => ILLUS[k] || '';
/* ═════════ the screens ═════════ */
const sl = (k, q, lo, hi, icon, tone, eLo, eHi, inv) => ({ k, q, lo, hi, icon, tone, eLo, eHi, inv });
/* one question per screen */
const one = (ctx, title, item, sub) => ({ id: item.k, type: 'sliders', ctx, title, sub, items: [item] });
const SCREENS = [
  { id: 'meds', type: 'choice' },
  one('Past 24 hours', 'What was your strongest opioid craving?', sl('craving', 'Strongest opioid craving?', 'No craving', 'Extreme craving', 'flame', 'coral', '😌', '😖', true)),
  one('Past 24 hours', 'What was your riskiest moment?', sl('risk', 'Riskiest moment?', 'No risk', 'Extreme risk', 'alert', 'amber', '😌', '😰', true), 'People, places or things that threaten your recovery.'),
  one('Past 24 hours', 'How stressful was your most stressful moment?', sl('stress', 'Most stressful moment?', 'No stress', 'Extreme stress', 'wind', 'blue', '😌', '😩', true)),
  one('Past 24 hours', 'How pleasant was your most pleasant moment?', sl('pleasant', 'Most pleasant moment?', 'Not at all pleasant', 'Extremely pleasant', 'sun', 'amber', '😕', '😄', false)),
  one('Emotions', 'How depressed have you felt?', sl('depressed', 'Depressed?', 'Not at all', 'Extremely', 'cloud', 'slate', '🙂', '😢', true)),
  one('Emotions', 'How angry have you felt?', sl('angry', 'Angry?', 'Not at all', 'Extremely', 'flame', 'coral', '🙂', '😠', true)),
  one('Emotions', 'How anxious have you felt?', sl('anxious', 'Anxious?', 'Not at all', 'Extremely', 'pulse', 'amber', '🙂', '😰', true)),
  one('Emotions', 'How relaxed have you felt?', sl('relaxed', 'Relaxed?', 'Not at all', 'Extremely', 'leaf', 'green', '😐', '😌', false)),
  one('Emotions', 'How happy have you felt?', sl('happy', 'Happy?', 'Not at all', 'Extremely', 'smile', 'amber', '😐', '😄', false)),
  one('Your body', 'How was your sleep quality?', sl('sleep', 'Sleep quality?', 'Very poor', 'Excellent', 'moon', 'slate', '😫', '😊', false)),
  one('Your body', 'How was your worst pain?', sl('pain', 'Worst pain?', 'No pain', 'Worst pain', 'bolt', 'coral', '🙂', '😣', true)),
  one('Next week', 'How motivated are you to avoid non-medical opioid use?', sl('motivation', 'Motivation?', 'Not motivated', 'Extremely motivated', 'rocket', 'green', '😐', '🔥', false)),
  one('Next week', 'How confident are you that you can avoid it?', sl('confidence', 'Confidence?', 'Not confident', 'Extremely confident', 'shield', 'blue', '😟', '😎', false)),
  { id: 'unreported', type: 'yesno', title: 'Have you used opioids that you didn’t report?' },
  { id: 'substances', type: 'multi', title: 'Which of these drugs have you used in the past 24 hours?' }
];
const MED_OPTS = [['Yes, my full dose', 'checkc'], ['Only part of my dose', 'partial'], ['No, I didn’t take it', 'xc']];
const SUBS = [['Alcohol', 'beer'], ['Cannabis (marijuana, pot, hash, K2, spice, etc.)', 'leaf'], ['Stimulants (cocaine, meth, speed, ecstasy, molly, Adderall, etc.)', 'bolt'],
  ['Inhalants (nitrous, glue, petrol, paint thinner, etc.)', 'wind'], ['Sedatives or sleeping pills (Valium, Serepax, Rohypnol, etc.)', 'pill'],
  ['Hallucinogens (LSD, acid, mushrooms, PCP, special K, etc.)', 'sparkle'], ['Other', 'more'], ['None of these', 'checkc']];
const NONE = 'None of these';

/* ═════════ scoring ═════════ */
const Q_POINTS = 100 / SCREENS.length;
const num = (a, k) => a[k] != null ? a[k] : 0;           // sliders start at 0 — the user has to move them
const inv = v => 10 - v;
const mean = arr => arr.reduce((x, y) => x + y, 0) / arr.length;
/* 0..1 for a screen from the current answers, or null while a choice screen is unanswered */
function screenScore(id, a) {
  const sc = SCREENS.find(x => x.id === id);
  if (sc && sc.type === 'sliders') { const it = sc.items[0], v = num(a, it.k); return (it.inv ? inv(v) : v) / 10; }
  switch (id) {
    case 'meds': return a.meds == null ? null : [1, .5, 0][a.meds];
    case 'unreported': return a.unreported == null ? null : a.unreported === 'no' ? 1 : .5;   // disclosing is never punished heavily
    case 'substances': return !a.subs || !a.subs.length ? null : a.subs.includes(NONE) ? 1 : Math.max(0, 1 - .25 * a.subs.length);
  }
}
/* a screen counts on the speedometer once it's answered (sliders: touched or passed) */
function counts(s) {
  if (CI.done[s.id]) return true;
  return s.type === 'sliders' ? !!CI.touched[s.id] : screenScore(s.id, CI.a) != null;
}
const screenPts = s => counts(s) ? (screenScore(s.id, CI.a) || 0) * Q_POINTS : 0;
const totalPts = () => SCREENS.reduce((t, s) => t + screenPts(s), 0);
const finalPts = () => SCREENS.reduce((t, s) => t + (screenScore(s.id, CI.a) || 0) * Q_POINTS, 0);
function strengthVals(a) {
  const r = x => Math.round(x * 2) / 2, s6 = screenScore('unreported', a), s7 = screenScore('substances', a);
  return {
    meds: r((screenScore('meds', a) || 0) * 10), cravings: r(inv(num(a, 'craving'))),
    risk: r(mean([inv(num(a, 'risk')), (s6 == null ? 1 : s6) * 10, (s7 == null ? 1 : s7) * 10])),
    stress: r(inv(num(a, 'stress'))), emotions: r(mean(['depressed', 'angry', 'anxious', 'relaxed', 'happy'].map(k => screenScore(k, a))) * 10), body: r(mean(['sleep', 'pain'].map(k => screenScore(k, a))) * 10), drive: r(mean(['motivation', 'confidence'].map(k => screenScore(k, a))) * 10)
  };
}

/* ═════════ speedometer ═════════ */
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, '');
const qgCaption = () => {
  const s = SCREENS[CI.i];
  return s && counts(s) ? `<b>+${fmt1(screenPts(s))}</b> points from this screen` : `Each screen is worth up to ${fmt1(Q_POINTS)} points`;
};
function qGauge() {
  return '';
}
function updateQGauge() { const b = $('#ci-adv', CI.layer); if (b) b.disabled = !screenReady(SCREENS[CI.i]); }

/* ═════════ screen bodies ═════════ */
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }); };
const medName = () => S.meds.length === 1 ? S.meds[0] : S.meds.length > 1 ? 'medications' : 'medication';
const lastRaw = () => { const p = S.history[S.history.length - 1]; return p && p.raw ? p.raw : null; };
const screenTitle = s => s.id === 'meds' ? `Did you take your ${medName()} yesterday (${yesterday()})?` : s.title;
function screenReady(s) {
  if (s.type === 'sliders') return !!CI.touched[s.id];   // must slide (or tap) before continuing
  if (s.id === 'meds') return CI.a.meds != null;
  if (s.id === 'unreported') return CI.a.unreported === 'no' || (CI.a.unreported === 'yes' && (CI.a.dates || []).length > 0);
  return !!(CI.a.subs && CI.a.subs.length);
}
function bodyHTML(s) {
  const raw = lastRaw();
  if (s.id === 'meds') {
    return `${raw && raw.meds != null ? `<div class="q-memory">Last time: ${MED_OPTS[raw.meds][0]}</div>` : ''}
      <div class="choices">${MED_OPTS.map(([l, i], k) => `<button class="choice ${CI.a.meds === k ? 'sel' : ''}" data-act="ci-pick" data-k="${k}"><span class="c-ic">${ic(i, 26, 1.8)}</span><b>${l}</b></button>`).join('')}</div>`;
  }
  if (s.type === 'sliders') {
    return `<div class="scards">${s.items.map(it => {
      const v = num(CI.a, it.k), last = raw && raw[it.k] != null ? raw[it.k] : null;
      return `<div class="scard">${illus(it.k) || `<span class="s-ic tn-${it.tone}">${ic(it.icon, 26, 1.7)}</span>`}<b class="s-q">${it.q}</b><div class="s-val" id="sv-${it.k}">${v}</div>
        <div class="s-row"><span class="emo">${it.eLo}<small>0</small></span><input class="s-range" type="range" min="0" max="10" step="1" value="${v}" data-k="${it.k}" data-s="${s.id}" style="--p:${v * 10}%" aria-label="${esc(it.q)}"><span class="emo">${it.eHi}<small>10</small></span></div>
        <div class="s-lab"><span>${it.lo}</span><span>${it.hi}</span></div>${last != null ? `<div class="s-last">Last time: ${last}</div>` : ''}</div>`;
    }).join('')}</div>`;
  }
  if (s.id === 'unreported') {
    return `<div class="yn"><button class="choice ${CI.a.unreported === 'yes' ? 'sel' : ''}" data-act="ci-yn" data-v="yes"><span class="c-ic">${ic('checkc', 26, 1.8)}</span><b>Yes</b></button><button class="choice ${CI.a.unreported === 'no' ? 'sel' : ''}" data-act="ci-yn" data-v="no"><span class="c-ic">${ic('xc', 26, 1.8)}</span><b>No</b></button></div>
      ${CI.a.unreported === 'yes' ? `<p class="cal-note">Select the date when you used. You can log for the last 1 week. You can add multiple entries.</p>${calendarHTML()}` : ''}`;
  }
  return `<div class="subs">${SUBS.map(([l, i]) => `<button class="sub ${(CI.a.subs || []).includes(l === NONE ? NONE : l) ? 'sel' : ''}" data-act="ci-sub" data-v="${esc(l)}"><span class="c-ic">${ic(i, 24, 1.8)}</span><b>${l}</b><i>${ic('check', 14, 3)}</i></button>`).join('')}</div>`;
}

/* last-7-days calendar for "dates you used" */
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
function calWindow() { const out = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - i); out.push(ymd(d)); } return out; }
function calendarHTML() {
  const win = calWindow(), first = new Date(win[0] + 'T12:00:00'), last = new Date(win[6] + 'T12:00:00');
  if (!CI.cal) CI.cal = { y: last.getFullYear(), m: last.getMonth() };
  const { y, m } = CI.cal, dim = new Date(y, m + 1, 0).getDate(), lead = new Date(y, m, 1).getDay();
  const hasPrev = y * 12 + m > first.getFullYear() * 12 + first.getMonth(), hasNext = y * 12 + m < last.getFullYear() * 12 + last.getMonth();
  const sel = CI.a.dates || [];
  const cells = [...Array(lead).fill('<i></i>'), ...Array.from({ length: dim }, (_, i) => { const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`, ok = win.includes(key);
    return `<button class="cd ${sel.includes(key) ? 'sel' : ''}" ${ok ? `data-act="ci-date" data-d="${key}"` : 'disabled'}>${i + 1}</button>`; })];
  return `<div class="cal"><div class="cal-h"><button data-act="ci-cal" data-d="-1" ${hasPrev ? '' : 'disabled'} aria-label="Previous month">${ic('back', 18)}</button><b>${new Date(y, m, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</b><button data-act="ci-cal" data-d="1" ${hasNext ? '' : 'disabled'} aria-label="Next month">${ic('next', 18)}</button></div>
    <div class="cal-w">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<span>${d}</span>`).join('')}</div><div class="cal-g">${cells.join('')}</div></div>`;
}

/* ═════════ rendering ═════════ */
function ciHead(pct, back) {   // prompt screen header
  return `<div class="layer-top fin-head"><button class="plain-btn" data-act="${back}" aria-label="${back === 'ci-close' ? 'Close' : 'Back'}">${ic(back === 'ci-close' ? 'x' : 'back', 22)}</button><span class="fh-t">Daily check-in</span><span style="width:40px"></span></div><div class="pline"><i style="width:${pct}%"></i></div>`;
}
function surveyHead() {
  const n = CI.i + 1;
  return `<div class="layer-top fin-head"><button class="plain-btn" data-act="${CI.i === 0 ? 'ci-close' : 'ci-prev'}" aria-label="${CI.i === 0 ? 'Close' : 'Back'}">${ic(CI.i === 0 ? 'x' : 'back', 22)}</button>
    <span class="fh-t">Daily check-in <small>${n}/${SCREENS.length}</small></span>
    <span class="fh-r"><button class="plain-btn" data-act="ci-speak" aria-label="Read this screen aloud">${ic('speaker', 22)}</button>${CI.i ? `<button class="plain-btn" data-act="ci-close" aria-label="Close">${ic('x', 22)}</button>` : ''}</span></div>
    <div class="pline"><i style="width:${(n / SCREENS.length) * 100}%"></i></div>`;
}
function renderCI() {
  const root = $('#ci-root', CI.layer);
  CI.layer.classList.remove('indigo'); if (window.speechSynthesis) speechSynthesis.cancel();
  if (CI.i === -1) { // prompt
    const prev = S.history[S.history.length - 1];
    root.innerHTML = `${ciHead(0, 'ci-close')}
    <div class="q-wrap"><h1 class="q-text" style="margin-top:22px">${greeting()},<br>${esc(S.name || 'friend')}</h1>
      <p class="q-sub">${prev ? esc(`Last time you scored ${prev.overall}. Your focus area was ${focusArea(prev)} — let’s see how today feels.`) : 'One question at a time — about two minutes. Your answers build your score.'}</p>
      ${(() => { const base = 10, act = ACT_BONUS[F().level], st = clamp(S.streak + 1, 1, 5), tot = base + act + st, got = checkedInToday();
        return `<div class="rw-panel"><span class="rw-lab">${got ? 'Already earned today' : 'You can earn today'}</span>
        <div class="rw-amt">${usd(tot)}</div><p class="rw-note">Added straight to your rewards wallet.</p>
        <div class="rw-lines">
          <div><span class="rw-ic">${ic('check', 16, 2.4)}</span><b>Daily check-in</b><em>+${usd(base)}</em></div>
          <div><span class="rw-ic">${ic('leaf', 16, 2)}</span><b>Finish an activity</b><em>+${usd(act)}</em></div>
          <div><span class="rw-ic">${ic('flame', 16, 2)}</span><b>Streak bonus${S.streak ? ` · day ${S.streak + 1}` : ''}</b><em>+${usd(st)}</em></div>
        </div></div>`; })()}
      <div style="flex:1;min-height:16px"></div><button class="btn" data-act="ci-next">Let’s begin</button><button class="btn ghost" data-act="ci-close">Maybe later</button></div>`;
    return;
  }
  if (CI.i < SCREENS.length) {
    const s = SCREENS[CI.i], last = CI.i === SCREENS.length - 1;
    root.innerHTML = `${surveyHead()}
    <div class="q-wrap" key="${CI.i}">${s.ctx ? `<div class="q-ctx">${s.ctx}</div>` : ''}<h1 class="q-text">${esc(screenTitle(s))}</h1>${s.sub ? `<p class="q-sub">${esc(s.sub)}</p>` : ''}${bodyHTML(s)}</div>
    <div class="ci-foot"><button class="btn" id="ci-adv" data-act="ci-adv" ${screenReady(s) ? '' : 'disabled'}>${last ? 'See my score' : 'Next'} ${ic('next', 16, 2.4)}</button></div>`;
    return;
  }
  renderScore(root);
}
function advance() {
  if (!CI) return; const s = SCREENS[CI.i]; if (!screenReady(s)) return;
  CI.done[s.id] = true; CI.i++; renderCI(); CI.layer.scrollTop = 0;
}
function sliderInput(el) {
  const v = +el.value, k = el.dataset.k; CI.a[k] = v; CI.touched[el.dataset.s] = true;
  el.style.setProperty('--p', v * 10 + '%'); $('#sv-' + k, CI.layer).textContent = v; updateQGauge();
}
function speakScreen() {
  if (!window.speechSynthesis) return toast('Read-aloud isn’t supported on this device');
  if (speechSynthesis.speaking) return speechSynthesis.cancel();
  const s = SCREENS[CI.i];
  const parts = [screenTitle(s), ...(s.items ? s.items.map(i => `${i.q} From ${i.lo} to ${i.hi}.`) : s.id === 'meds' ? MED_OPTS.map(o => o[0]) : s.id === 'substances' ? SUBS.map(o => o[0]) : ['Yes or no.'])];
  const u = new SpeechSynthesisUtterance(parts.join(' ')); u.rate = .95; speechSynthesis.speak(u);
}

Object.assign(ACT, {
  'ci-adv': advance,
  'ci-speak': speakScreen,
  'ci-pick': el => { CI.a.meds = +el.dataset.k; $$('.choice', CI.layer).forEach((b, i) => b.classList.toggle('sel', i === CI.a.meds)); updateQGauge(); setTimeout(() => { if (CI && SCREENS[CI.i].id === 'meds') advance(); }, 650); },   // single choice: tap and move on
  'ci-yn': el => { CI.a.unreported = el.dataset.v; if (el.dataset.v === 'no') CI.a.dates = []; renderCI(); updateQGauge(); if (el.dataset.v === 'no') setTimeout(() => { if (CI && SCREENS[CI.i].id === 'unreported' && CI.a.unreported === 'no') advance(); }, 650); },
  'ci-date': el => { const d = el.dataset.d, a = CI.a.dates || (CI.a.dates = []), i = a.indexOf(d); if (i >= 0) a.splice(i, 1); else a.push(d); el.classList.toggle('sel'); updateQGauge(); },
  'ci-cal': el => { const m = CI.cal.m + +el.dataset.d; CI.cal = { y: CI.cal.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 }; renderCI(); updateQGauge(); },
  'ci-sub': el => {
    const v = el.dataset.v, a = CI.a.subs || (CI.a.subs = []), i = a.indexOf(v);
    if (i >= 0) a.splice(i, 1); else if (v === NONE) a.splice(0, a.length, NONE); else { const n = a.indexOf(NONE); if (n >= 0) a.splice(n, 1); a.push(v); }
    $$('.sub', CI.layer).forEach(b => b.classList.toggle('sel', a.includes(b.dataset.v))); updateQGauge();
  }
});
document.addEventListener('pointerup', e => { if (CI && e.target.classList && e.target.classList.contains('s-range')) sliderInput(e.target); });
document.addEventListener('input', e => { if (CI && e.target.classList && e.target.classList.contains('s-range')) sliderInput(e.target); });
