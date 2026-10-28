/* Rudra Health — sign-up flow (after the welcome cards)
   A little about you → code verification → 1/4 medications → 2/4 what brings on your urges → 3/4 what brings you relief → 4/4 care team.
   Also reused from Me to edit each part later (obEdit = 'me'). */
'use strict';

let obEdit = null;   // 'me' while editing a section from the Me tab

const MEDS = ['Buprenorphine', 'Methadone', 'Naltrexone', 'Suboxone', 'Naloxone', 'Lofexidine'];
const RELIEF = [['Go for a walk', 'run'], ['Call someone', 'phone'], ['Music', 'music'], ['Hot shower', 'shower'], ['Breathe', 'wind'], ['Play a game', 'game'],
  ['Pray / meditate', 'sparkle'], ['Work out', 'dumbbell'], ['Drink water', 'drop'], ['Time with a pet', 'paw']];
const URGES = [['High-risk places', 'pin'], ['Having money', 'coin'], ['Stress', 'bolt'], ['Relationships', 'heart'], ['Reminders of the drug', 'eye'], ['Boredom', 'cloud'], ['Exhaustion', 'moon']];
const URGE_INFO = { Stress: 'Work or financial', Relationships: 'Family, romantic, friends', 'Reminders of the drug': 'Sights, places, people, things' };
const CODES = [['+1', '🇺🇸'], ['+44', '🇬🇧'], ['+52', '🇲🇽'], ['+34', '🇪🇸'], ['+91', '🇮🇳']];
const fullPhone = () => S.profile.cc + S.profile.phone.replace(/\D/g, '');

let pStep = 1;
function startProfile() { obEdit = null; pStep = 1; renderProfile(); }
function leaveOnboarding(msg) {
  if (obEdit) { obEdit = null; save(); go('me'); if (msg) toast(msg); return; }
}
function finishOnboarding() {
  S.onboarded = true; save(); go('home');
  setTimeout(triggerSheet, 700);
}

/* ═════════ A little about you ═════════ */
const profVia = () => S.profile.via || (S.profile.phone ? 'phone' : S.profile.email ? 'email' : 'phone');
const phoneFld = (p, label = 'Mobile number') => `<div class="fld"><label class="lbl" for="ph">${label}</label>
      <div class="phone-row"><label class="cc"><select id="cc" aria-label="Country code">${CODES.map(([c, f]) => `<option value="${c}" ${p.cc === c ? 'selected' : ''}>${f} ${c}</option>`).join('')}</select>${ic('down', 16)}</label>
      <input class="inp" id="ph" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(555) 123-4567" value="${esc(p.phone)}"></div></div>`;
const emailFld = (p, label = 'Email') => `<div class="fld"><label class="lbl" for="em">${label}</label><div class="inp-i">${ic('mail', 20)}<input class="inp" id="em" type="email" inputmode="email" placeholder="you@example.com" value="${esc(p.email)}" autocomplete="email"></div></div>`;
const isEmailish = v => /[a-z@]/i.test(v);
const validContact = () => { const v = ($('#ct') || {}).value || ''; return isEmailish(v) ? /^\S+@\S+\.\S+$/.test(v.trim()) : v.replace(/\D/g, '').length >= 7; };
const contactFld = p => { const via = profVia(), val = via === 'email' ? p.email : p.phone; return `<div class="fld"><label class="lbl" for="ct">Mobile number or email</label>
      <div class="phone-row ${via === 'email' ? 'is-email' : ''}" id="ct-row"><label class="cc"><select id="cc" aria-label="Country code">${CODES.map(([c, f]) => `<option value="${c}" ${p.cc === c ? 'selected' : ''}>${f} ${c}</option>`).join('')}</select>${ic('down', 16)}</label>
      <input class="inp" id="ct" type="text" inputmode="email" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="Mobile number or email" value="${esc(val)}"></div></div>`; };
function renderProfile() {
  showView('setup'); $('#nav').hidden = true;
  const p = S.profile, via = profVia();
  $('#v-setup').innerHTML = `<div class="ob-page">
    ${obEdit ? `<div class="step-head"><button class="back-c" data-act="ob-back" aria-label="Back">${ic('back', 20)}</button><div class="step-bar"><i style="width:100%"></i></div></div>` : obHead(pStep, true)}
    <h1 class="step-h">${pStep === 1 ? 'Let’s get you <em>started</em>' : 'A little about <em>you</em>'}</h1>
    <p class="step-p">${pStep === 1 ? 'Enter your mobile number or email — we’ll ask for the other one next.' : (via === 'phone' ? 'Add your email so we can reach you both ways.' : 'Add your mobile number so we can reach you both ways.')}</p>
    <div class="pst" ${pStep === 1 ? '' : 'hidden'}>
    ${pStep === 1 ? contactFld(p) : ''}
    </div>
    <div class="pst" ${pStep === 2 ? '' : 'hidden'}>
    ${pStep === 2 ? `<div class="fld"><label class="lbl" for="nm">First name</label><div class="inp-i">${ic('user', 20)}<input class="inp" id="nm" maxlength="24" placeholder="First name" value="${esc(S.name)}" autocomplete="given-name" autocapitalize="words"></div></div>
    <div class="fld"><label class="lbl" for="ln">Last name</label><div class="inp-i">${ic('user', 20)}<input class="inp" id="ln" maxlength="24" placeholder="Last name" value="${esc(S.last || '')}" autocomplete="family-name" autocapitalize="words"></div></div>
    ${via === 'phone' ? emailFld(p, 'Email') : phoneFld(p, 'Mobile number')}
    <div class="fld"><label class="lbl" for="dob">Date of birth</label><div class="inp-i">${ic('calendar', 20)}<input class="inp" id="dob" type="text" readonly inputmode="none" placeholder="dd/mm/yyyy" data-act="dob-open" data-iso="${esc(p.dob)}" value="${esc(dobFmt(p.dob))}">${ic('down', 16)}</div></div>
    <div class="fld"><span class="lbl">Language</span><div class="lang"><button class="${p.lang === 'en' ? 'on' : ''}" data-act="pick-lang" data-k="en">${p.lang === 'en' ? ic('check', 16, 2.6) : ''}English</button><button class="${p.lang === 'es' ? 'on' : ''}" data-act="pick-lang" data-k="es">${p.lang === 'es' ? ic('check', 16, 2.6) : ''}Spanish</button></div></div>
    <label class="consent"><input type="checkbox" id="c1" ${p.terms ? 'checked' : ''}><i>${ic('check', 14, 3)}</i><span>I agree to Rudra Health AI’s <u>Terms of Use</u> and <u>Privacy Policy</u>.</span></label>
    <label class="consent"><input type="checkbox" id="c2" ${p.contact ? 'checked' : ''}><i>${ic('check', 14, 3)}</i><span><b>Contact me</b> — OK to send check-in reminders and support by text or email. Msg &amp; data rates may apply.</span></label>` : ''}
    </div>
    <div class="step-foot"><button class="btn" id="prof-go" data-act="prof-next" ${pStep === 1 ? 'disabled' : ''}>${obEdit && pStep === 2 ? 'Save' : 'Continue'} ${obEdit && pStep === 2 ? '' : ic('next', 16, 2.4)}</button></div></div>`;
  const ph = $('#ph');
  const fmt = el => { if ($('#cc').value !== '+1') return; const d = el.value.replace(/\D/g, '').slice(0, 10);
    el.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d.length ? `(${d}` : ''; };
  if (ph) ph.addEventListener('input', () => fmt(ph));   // (555) 123-4567 formatting for +1
  const ct = $('#ct');
  if (ct) {   // one box for mobile or email: digits → phone (with country code), letters/@ → email
    const mode = () => { const em = isEmailish(ct.value); $('#ct-row').classList.toggle('is-email', em); ct.inputMode = em ? 'email' : 'tel'; if (!em) fmt(ct); $('#prof-go').disabled = !validContact(); };
    ct.addEventListener('input', mode); mode();
  }
}

/* ═════════ date of birth: bottom-sheet wheel picker ═════════ */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dobFmt = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; };
function dobSheet() {
  const inp = $('#dob'), now = new Date(), maxY = now.getFullYear(), minY = maxY - 110, ROW = 46;
  const m0 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(inp.dataset.iso || '');
  const sel = m0 ? { d: +m0[3], m: +m0[2] - 1, y: +m0[1] } : { d: 1, m: 0, y: 2000 };
  const dim = (m, y) => new Date(y, m + 1, 0).getDate();
  const items = (arr, on) => arr.map((t, i) => `<li class="${i === on ? 'on' : ''}" data-i="${i}">${t}</li>`).join('');
  const years = []; for (let y = minY; y <= maxY; y++) years.push(y);
  const l = pushLayer(`<div class="dob-stack"><button class="dob-x" data-act="close-layer" aria-label="Close">${ic('x', 20, 1.8)}</button>
    <div class="sheet dob"><span class="grab"></span><span class="trig-ic dob-ic">${ic('calendar', 28, 1.6)}</span><h2>Date of birth</h2>
    <div class="wheels"><i class="wheel-band"></i>
      <ul class="wheel" id="w-d" aria-label="Day"></ul><ul class="wheel" id="w-m" aria-label="Month"></ul><ul class="wheel" id="w-y" aria-label="Year"></ul></div>
    <button class="btn" id="dob-done">Done</button></div></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
  const W = { d: $('#w-d', l), m: $('#w-m', l), y: $('#w-y', l) };
  const fill = (el, labels, idx) => { el.innerHTML = items(labels, idx); };
  const tooLate = () => sel.y === maxY && (sel.m > now.getMonth() || (sel.m === now.getMonth() && sel.d > now.getDate()));
  const mark = k => [...W[k].children].forEach((li, i) => li.classList.toggle('on', i === (k === 'd' ? sel.d - 1 : k === 'm' ? sel.m : sel.y - minY)));
  const days = () => Array.from({ length: dim(sel.m, sel.y) }, (_, i) => i + 1);
  const snap = (k, i, smooth) => W[k].scrollTo({ top: i * ROW, behavior: smooth ? 'smooth' : 'auto' });
  const settle = () => {   // keep the date valid: day fits the month, never in the future
    const n = dim(sel.m, sel.y); if (sel.d > n) { sel.d = n; }
    if (tooLate()) { sel.m = now.getMonth(); sel.d = Math.min(sel.d, now.getDate()); }
  };
  fill(W.d, days(), sel.d - 1); fill(W.m, MONTHS, sel.m); fill(W.y, years, sel.y - minY);
  requestAnimationFrame(() => { snap('d', sel.d - 1); snap('m', sel.m); snap('y', sel.y - minY); });
  const refresh = () => {
    const had = W.d.children.length, n = dim(sel.m, sel.y);
    if (had !== n) { fill(W.d, days(), sel.d - 1); }
    mark('d'); mark('m'); mark('y');
  };
  const read = k => {
    const i = Math.round(W[k].scrollTop / ROW), max = W[k].children.length - 1, c = Math.max(0, Math.min(max, i));
    if (k === 'd') sel.d = c + 1; else if (k === 'm') sel.m = c; else sel.y = minY + c;
    const d0 = sel.d, m0 = sel.m; settle(); refresh();
    if (sel.d !== d0) snap('d', sel.d - 1, true); if (sel.m !== m0) snap('m', sel.m, true);
  };
  Object.keys(W).forEach(k => {
    let t; W[k].addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => read(k), 90); });
    W[k].addEventListener('click', e => { const li = e.target.closest('li'); if (li) snap(k, +li.dataset.i, true); });
  });
  $('#dob-done', l).addEventListener('click', () => {
    settle();
    const iso = `${sel.y}-${String(sel.m + 1).padStart(2, '0')}-${String(sel.d).padStart(2, '0')}`;
    inp.dataset.iso = iso; inp.value = dobFmt(iso); S.profile.dob = iso; save(); popLayer(l);
  });
}
function profileNext() {
  const via = profVia();
  if (pStep === 1) {
    if (!validContact()) return;
    const v = $('#ct').value.trim(), em = isEmailish(v);
    S.profile = { ...S.profile, via: em ? 'email' : 'phone', ...(em ? { email: v } : { cc: $('#cc').value, phone: v }) }; save();
    const contact = em ? v.toLowerCase() : fullPhone();
    if (S.verified === contact) { pStep = 2; return renderProfile(); }   // already verified this contact
    return otpSheet(contact);
  }
  S.name = $('#nm').value.trim(); S.last = $('#ln').value.trim();
  S.profile = { ...S.profile, ...(via === 'phone' ? { email: $('#em').value.trim() } : { cc: $('#cc').value, phone: $('#ph').value.trim() }) }; save();
  // the second contact and everything else on this screen is optional
  const cc = S.profile.cc, phone = S.profile.phone, digits = phone.replace(/\D/g, '');
  S.profile = { ...S.profile, cc, phone, email: S.profile.email, dob: $('#dob').dataset.iso || '', lang: S.profile.lang, terms: $('#c1').checked, contact: $('#c2').checked }; save();
  if (obEdit) return leaveOnboarding('Profile saved');
  renderStep(1);
}

/* ═════════ Enter the code ═════════ */
function otpSheet(contact) {
  let code = String(Math.floor(100000 + Math.random() * 900000)), left = 30, timer;
  const l = pushLayer(`<div class="otp-x-wrap"><button class="otp-x" data-act="close-layer" aria-label="Close">${ic('x', 20)}</button></div>
    <div class="sheet otp"><span class="grab"></span><span class="otp-ic">${ic('chat', 28)}</span><h2>Enter the code</h2>
    <p class="muted" style="font-size:15px;line-height:1.5">We sent a 6-digit code to <b>${esc(contact)}</b>.</p>
    <div class="demo-code">Demo code <b id="dc">${code}</b></div>
    <div class="otp-boxes" id="otp">${[0, 1, 2, 3, 4, 5].map(i => `<input inputmode="numeric" maxlength="1" autocomplete="${i ? 'off' : 'one-time-code'}" aria-label="Digit ${i + 1}">`).join('')}</div>
    <p class="otp-err" id="oerr" role="alert"></p>
    <p class="otp-re" id="ore">Resend code in <span id="oleft">${left}</span>s</p>
    <button class="btn" id="over" disabled>Verify ${ic('next', 16, 2.4)}</button></div>`, 'sheet-wrap');
  const boxes = $$('#otp input', l), verify = $('#over', l);
  const val = () => boxes.map(b => b.value).join('');
  const sync = () => { verify.disabled = val().length < 6; $('#oerr', l).textContent = ''; };
  boxes.forEach((b, i) => {
    b.addEventListener('input', () => { b.value = b.value.replace(/\D/g, '').slice(-1); if (b.value && boxes[i + 1]) boxes[i + 1].focus(); sync(); });
    b.addEventListener('keydown', e => { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus(); });
    b.addEventListener('paste', e => { const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6); if (!d) return; e.preventDefault(); boxes.forEach((x, k) => { x.value = d[k] || ''; }); (boxes[Math.min(d.length, 5)]).focus(); sync(); });
  });
  const tick = () => { timer = setInterval(() => { left--; const re = $('#ore', l); if (!re) return; if (left > 0) { $('#oleft', l).textContent = left; } else { clearInterval(timer); re.innerHTML = '<button class="link" id="rsend">Resend code</button>'; $('#rsend', l).addEventListener('click', () => { code = String(Math.floor(100000 + Math.random() * 900000)); $('#dc', l).textContent = code; left = 30; re.innerHTML = 'Resend code in <span id="oleft">30</span>s'; tick(); toast('New code sent'); }); } }, 1000); };
  tick(); l._cleanup = () => clearInterval(timer);
  verify.addEventListener('click', () => {
    if (val() !== code) { $('#oerr', l).textContent = 'That code doesn’t match. Try again.'; const o = $('#otp', l); o.classList.remove('shake'); void o.offsetWidth; o.classList.add('shake'); return; }
    S.verified = contact; save(); popLayer(l);
    setTimeout(() => { pStep = 2; renderProfile(); }, 200);
  });
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
  setTimeout(() => boxes[0].focus({ preventScroll: true }), 350);
}

/* ═════════ Steps 1–3 ═════════ */
const stepHead = n => obEdit ? `<div class="step-head"><button class="back-c" data-act="ob-back" aria-label="Back">${ic('back', 20)}</button><div class="step-bar"><i style="width:100%"></i></div></div>` : obHead(n + 2, true);
const MED_INFO = { Buprenorphine: 'Film · Tablet', Methadone: 'Liquid · Tablet', Naltrexone: 'Tablet · Injection', Suboxone: 'Film', Naloxone: 'Nasal spray', Lofexidine: 'Tablet' };
const tile = (kind, label, icon, i, sel) => `<button class="mtile tg-${i % 8} ${kind === 'meds' ? 'is-med' : ''} ${sel ? 'on' : ''}" data-act="pick-item" data-kind="${kind}" data-v="${esc(label)}" aria-pressed="${sel}"><span class="plus">${ic(sel ? 'check' : 'plus', 14, 2.6)}</span><span class="mi">${kind === 'meds' ? `<i class="mono">${esc(label.charAt(0).toUpperCase())}</i>` : ic(icon, 20)}</span><b>${esc(label)}${kind === 'meds' ? `<small>${MED_INFO[label] || 'Added by you'}</small>` : kind === 'urges' && URGE_INFO[label] ? `<small>${URGE_INFO[label]}</small>` : ''}</b></button>`;
const addRow = (kind, ph) => `<div class="add-row"><input class="inp" id="add-in" placeholder="${ph}" maxlength="40" autocomplete="off" aria-label="${ph}"><button class="add-b" data-act="add-item" data-kind="${kind}">Add</button></div>`;
const cont = (label = 'Continue') => `<div class="step-foot"><button class="btn" data-act="step-next">${obEdit ? 'Save' : label} ${obEdit ? '' : ic('next', 16, 2.4)}</button></div>`;
let obStep = 1;

function renderStep(n) {
  obStep = n; showView('setup'); $('#nav').hidden = true;
  const v = $('#v-setup');
  if (n === 1) {
    const all = [...MEDS, ...S.meds.filter(m => !MEDS.includes(m))];
    v.innerHTML = `<div class="ob-page">${stepHead(1)}<h1 class="step-h">Which <em>medications</em> are you currently taking?</h1><p class="step-p">Select all that apply, or add your own.</p>${addRow('meds', 'Type a medication…')}
      <div class="mgrid" id="mgrid">${all.map((m, i) => tile('meds', m, 'pill', i, S.meds.includes(m))).join('')}</div>${cont()}</div>`;
  } else if (n === 2) {
    const base = URGES.map(r => r[0]), all = [...URGES, ...S.urges.filter(r => !base.includes(r)).map(r => [r, 'sparkle'])];
    v.innerHTML = `<div class="ob-page">${stepHead(2)}<h1 class="step-h">What brings on your <em>urges</em>?</h1><p class="step-p">Select all that apply, or add your own. Knowing your triggers helps me support you in the moment.</p>${addRow('urges', 'Type a trigger…')}
      <div class="mgrid" id="mgrid">${all.map(([r, ic2], i) => tile('urges', r, ic2, i, S.urges.includes(r))).join('')}</div>${cont()}</div>`;
  } else if (n === 3) {
    const base = RELIEF.map(r => r[0]), all = [...RELIEF, ...S.relief.filter(r => !base.includes(r)).map(r => [r, 'sparkle'])];
    v.innerHTML = `<div class="ob-page">${stepHead(3)}<h1 class="step-h">What brings you <em>relief</em>?</h1><p class="step-p">Things you enjoy can help an urge pass. I’ll keep these one tap away on your Urge button.</p>${addRow('relief', 'Type an activity…')}
      <div class="mgrid" id="mgrid">${all.map(([r, ic2], i) => tile('relief', r, ic2, i, S.relief.includes(r))).join('')}</div>${cont()}</div>`;
  } else {
    v.innerHTML = `<div class="ob-page">${stepHead(4)}<h1 class="step-h">Connect your <em>care team</em></h1><p class="step-p">Link your clinic to securely sync appointments and your treatment plan. This is optional.</p>
      <div class="fld"><label class="lbl" for="cn">Clinic name</label><input class="inp" id="cn" placeholder="Enter clinic name" value="${esc(S.clinic.name)}" autocomplete="off"></div>
      <div class="fld"><label class="lbl" for="cc2">Or clinic code</label><input class="inp" id="cc2" placeholder="Enter clinic code" value="${esc(S.clinic.code)}" autocomplete="off" autocapitalize="characters"></div>
      <p class="privacy">${ic('shield', 18)}<span>Protected under <b>42 CFR Part 2</b> &amp; HIPAA. You always control what’s shared.</span></p>
      <div class="step-foot"><button class="btn" data-act="step-next" id="care-go">${obEdit ? 'Save' : 'Continue'} ${obEdit ? '' : ic('next', 16, 2.4)}</button></div></div>`;
  }
}

function addItem(kind) {
  const inp = $('#add-in'), v = inp.value.trim(); if (!v) return inp.focus();
  const list = S[kind]; if (!list.some(x => x.toLowerCase() === v.toLowerCase())) list.push(v);
  save(); inp.value = ''; renderStep(obStep); $('#add-in').focus({ preventScroll: true });
}
function pickItem(el) {
  const kind = el.dataset.kind, v = el.dataset.v, list = S[kind], i = list.indexOf(v);
  if (i >= 0) list.splice(i, 1); else list.push(v);
  const on = i < 0; el.classList.toggle('on', on); el.setAttribute('aria-pressed', on); $('.plus', el).innerHTML = ic(on ? 'check' : 'plus', 14, 2.6); save();
}
function stepNext() {
  if (obStep === 4) { S.clinic = { name: $('#cn').value.trim(), code: $('#cc2').value.trim() }; save(); }
  if (obEdit) return leaveOnboarding('Saved');
  if (obStep < 4) renderStep(obStep + 1); else finishOnboarding();
}
function obBack() {
  if (pStep === 2 && $('#v-setup').querySelector('.pst')) { pStep = 1; return renderProfile(); }
  if (obEdit) return leaveOnboarding();
  if ($('#v-setup').querySelector('.pst')) return renderOnb(ONB.length - 1);   // from "A little about you"
  if (obStep === 1) { pStep = 2; return renderProfile(); }
  renderStep(obStep - 1);
}

Object.assign(ACT, {
  'prof-next': profileNext,
  'ob-back': obBack,
  'pick-via': el => { const v = profVia(), ph = $('#ph'), em = $('#em'); if (ph) S.profile.phone = ph.value.trim(); if (em) S.profile.email = em.value.trim(); S.profile.via = el.dataset.k; save(); renderProfile(); },
  'dob-open': () => dobSheet(),
  'pick-lang': el => { S.profile.lang = el.dataset.k; $$('.lang button').forEach(b => { const on = b === el; b.classList.toggle('on', on); b.innerHTML = (on ? ic('check', 16, 2.6) : '') + (b.dataset.k === 'en' ? 'English' : 'Spanish'); }); },
  'pick-item': pickItem,
  'add-item': el => addItem(el.dataset.kind),
  'step-next': stepNext,
  'care-skip': () => { S.clinic = { name: '', code: '' }; finishOnboarding(); },
  'edit-step': el => { obEdit = 'me'; const s = el.dataset.s; if (s === 'profile') { pStep = 1; renderProfile(); } else renderStep({ meds: 1, urges: 2, relief: 3, care: 4 }[s]); }
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'add-in') { e.preventDefault(); addItem({ 1: 'meds', 2: 'urges', 3: 'relief' }[obStep]); } });
