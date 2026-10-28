/* Rudra Health — mobile app prototype
   Part 2: Tools (calming activities — NOT CBT micro-interventions), coach chat, wallet, me, help, wiring. */
'use strict';

/* ═════════ TOOLS CATALOG — colourful tiles ═════════ */
const g2 = (a, b) => `linear-gradient(160deg,${a},${b})`;
const TOOLS = [
  { id: 'sound', title: 'Sound Patterns', sub: '4 experiences', ic: 'bars', pc: '#E3EEF8', dur: '5 min', when: 'Evening', hint: 'Let soft sound settle your body for a minute.' },
  { id: 'breath', title: 'Breathing', sub: '3 practices', ic: 'wind', pc: '#FDF1DB', dur: '3 min', when: 'Anytime', hint: 'A few slow breaths to bring stress down.' },
  { id: 'quotes', title: 'Quotes', sub: '24 affirmations', ic: 'quote', pc: '#FBE6E3', dur: '1 min', when: 'Morning', hint: 'A few words to carry with you today.' },
  { id: 'emotions', title: 'Emotions 101', sub: '10-part series', ic: 'book', pc: '#E3EEF8', dur: '2 min', when: 'Anytime', hint: 'A short lesson on how feelings work.' },
  { id: 'urge', title: 'Urge Surfing', sub: 'Ride it out', ic: 'wave', pc: '#FDF1DB', dur: '2 min', when: 'Cravings', hint: 'Watch the craving rise, peak and pass.' },
  { id: 'movement', title: 'Movement', sub: '6 routines', ic: 'run', pc: '#FBE6E3', dur: '2 min', when: 'Morning', hint: 'Get your body moving — gently.' },
  { id: 'mindful', title: 'Mindfulness', sub: '4 practices', ic: 'leaf', pc: '#E3EEF8', dur: '3 min', when: 'Anytime', hint: 'A minute of calm, present attention.' },
  { id: 'grounding', title: 'Grounding', sub: '5-4-3-2-1', ic: 'eye', pc: '#FDF1DB', dur: '2 min', when: 'Anxious', hint: 'Come back to this moment through your senses.' }
];
const toolById = id => TOOLS.find(t => t.id === id);
const ringArt = `<svg class="bgart" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#fff" stroke-opacity=".35"><circle cx="100" cy="100" r="40"/><circle cx="100" cy="100" r="64"/><circle cx="100" cy="100" r="88"/><circle cx="100" cy="100" r="112"/></g></svg>`;

/* ═════════ guided content ═════════ */
const GUIDES = {
  urge: { title: 'Urge Surfing', steps: [
    { t: 'Notice the urge. Don’t fight it — just say to yourself, “An urge is here.”', s: 15 },
    { t: 'Where do you feel it in your body? Chest, stomach, hands? Breathe slowly into that spot.', s: 20 },
    { t: 'Picture the urge as a wave. It rises, it peaks, and it passes. You only have to ride it.', s: 20 },
    { t: 'Rate it from 0 to 10. Keep breathing. Notice it beginning to shift.', s: 20 },
    { t: 'You rode the wave. Urges pass — and you just proved it.', s: 10 }] },
  grounding: { title: '5-4-3-2-1 Grounding', steps: [
    { t: 'Look around. Name 5 things you can see.', s: 20 }, { t: 'Notice 4 things you can feel — your feet, the chair, your clothes.', s: 20 },
    { t: 'Listen for 3 sounds, near or far.', s: 15 }, { t: 'Find 2 things you can smell.', s: 12 }, { t: 'Notice 1 thing you can taste. Take one slow, full breath.', s: 12 }] },
  movement: [
    { id: 'neck', title: 'Neck & shoulder release', d: '2 min', steps: [{ t: 'Sit or stand tall. Drop your shoulders away from your ears.', s: 15 }, { t: 'Slowly tilt your right ear toward your right shoulder. Breathe.', s: 20 }, { t: 'Switch sides. Let the weight of your head do the work.', s: 20 }, { t: 'Roll your shoulders back, five slow circles.', s: 20 }, { t: 'Shake out your arms. Notice how you feel.', s: 10 }] },
    { id: 'walk', title: 'Two-minute walk', d: '2 min', steps: [{ t: 'Stand up and head for the nearest door or window.', s: 10 }, { t: 'Walk at an easy pace. Feel each foot land.', s: 30 }, { t: 'Look up. Notice three colours around you.', s: 25 }, { t: 'Slow down. Take a deep breath of fresh air.', s: 15 }] },
    { id: 'stretch', title: 'Full-body stretch', d: '3 min', steps: [{ t: 'Reach both arms overhead and stretch tall.', s: 15 }, { t: 'Fold forward gently, knees soft. Let your head hang heavy.', s: 25 }, { t: 'Roll up slowly, one bone at a time.', s: 15 }, { t: 'Open your chest — hands clasped behind your back.', s: 20 }, { t: 'Shake it out, head to toe.', s: 10 }] },
    { id: 'shake', title: 'Shake it out', d: '1 min', steps: [{ t: 'Stand and start shaking your hands, then your arms.', s: 15 }, { t: 'Let the shake travel through your whole body.', s: 20 }, { t: 'Slow down. Stand still and feel the buzz settle.', s: 15 }] },
    { id: 'wall', title: 'Wall push-ups', d: '2 min', steps: [{ t: 'Stand an arm’s length from a wall, palms flat.', s: 10 }, { t: 'Bend your elbows, lean in, then push back. Ten slow reps.', s: 40 }, { t: 'Rest. Roll out your wrists.', s: 15 }] },
    { id: 'flow', title: 'Gentle flow', d: '3 min', steps: [{ t: 'Begin standing. Inhale, arms up. Exhale, fold forward.', s: 20 }, { t: 'Step back to a gentle lunge. Breathe.', s: 20 }, { t: 'Child’s pose, forehead down. Let go of the day.', s: 30 }, { t: 'Roll up slowly and stand tall.', s: 15 }] }
  ],
  mindful: [
    { id: 'scan', title: 'Body scan', d: '3 min', steps: [{ t: 'Close your eyes or soften your gaze. Feel your feet on the floor.', s: 15 }, { t: 'Move attention up through your legs. Notice, don’t change.', s: 20 }, { t: 'Notice your belly and chest rising and falling.', s: 20 }, { t: 'Soften your hands, arms and shoulders.', s: 20 }, { t: 'Relax your jaw and the space around your eyes.', s: 20 }] },
    { id: 'minute', title: 'Mindful minute', d: '1 min', steps: [{ t: 'Put everything down. Take one slow breath in…', s: 12 }, { t: '…and out. Follow the breath without trying to change it.', s: 25 }, { t: 'When your mind wanders, gently come back. That’s the practice.', s: 20 }] },
    { id: 'kind', title: 'Loving-kindness', d: '3 min', steps: [{ t: 'Bring to mind someone you care about. Silently wish them well.', s: 20 }, { t: 'Now picture yourself. Say: “May I be safe. May I be kind to myself.”', s: 25 }, { t: 'Extend that wish outward to everyone who’s struggling today.', s: 25 }] },
    { id: 'listen', title: 'Mindful listening', d: '2 min', steps: [{ t: 'Sit quietly. Let sounds come to you.', s: 20 }, { t: 'Notice the nearest sound, then the farthest.', s: 25 }, { t: 'Notice the silence between sounds.', s: 20 }] }
  ]
};
const QUOTES = ['This feeling is temporary. I can sit with it.', 'I don’t have to be perfect. I just have to keep going.', 'One day at a time is still moving forward.', 'I am more than my hardest moments.', 'Asking for help is a sign of strength.', 'Every craving I ride out makes me stronger.', 'I am allowed to take up space and rest.', 'Progress is not a straight line — and that’s okay.', 'I choose the next right thing.', 'My story isn’t over. The best chapters are ahead.', 'I can do hard things, one breath at a time.', 'Today, I am doing my best — and that is enough.', 'I deserve care, patience and kindness — from me too.', 'Small steps still count.', 'I am not alone on this road.', 'I’m learning what my body and mind need.', 'Healing takes time, and I’m giving it time.', 'I am proud of showing up today.', 'Calm is something I can return to.', 'I let go of what I can’t control.', 'The wave will pass. I’ll still be here.', 'I am worthy of the life I’m building.', 'Rest is part of recovery.', 'I’m choosing myself today.'];
const QCOL = ['#9A4F4A', '#3F6F9F', '#B87420', '#4A7FB0', '#C98A2B', '#9A4A4A'];
const EPISODES = [
  ['So, you’re having a feeling', 'Feelings are signals from your body and mind, not verdicts. The first step is simply noticing: “I’m having a feeling.”', 'Try this: pause and name what you feel in one word. Naming it gives you a little distance from it.'],
  ['Scientist or judge?', 'A judge says “I shouldn’t feel this.” A scientist says “How interesting — what’s here?” Curiosity opens the door; judgement closes it.', 'Next time a hard feeling shows up, ask: “What do I notice?” instead of “What’s wrong with me?”'],
  ['There are no bad emotions', 'Even painful emotions carry information — fear points to what matters, sadness to what we’ve lost, anger to a boundary.', 'Uncomfortable doesn’t mean wrong. Emotions are weather; you are the sky.'],
  ['Feelings are information', 'Emotions tell us what we need — rest, connection, safety, movement. Listening is different from obeying.', 'Ask: “If this feeling could talk, what would it ask for?”'],
  ['The wave', 'Emotions rise, peak and fall — usually within minutes if we don’t feed them with more thoughts. Cravings do the same.', 'You can ride a wave without fighting it. Breathe, watch, let it pass.'],
  ['Body clues', 'Emotions live in the body first: tight chest, heavy stomach, clenched jaw. Your body often knows before your mind does.', 'Try a quick scan from head to toe. Where do you feel it? Soften that spot.'],
  ['Name it to tame it', 'Putting a feeling into words calms the brain’s alarm system. Specific words — “disappointed,” “overwhelmed” — work better than “bad.”', 'Pick a more specific word for how you feel right now.'],
  ['When feelings point to cravings', 'Stress, loneliness, boredom and shame can all trigger cravings. Noticing the feeling underneath gives you a choice point.', 'Ask: “What am I actually feeling right now?” before you decide what to do.'],
  ['Being kind to yourself', 'Self-criticism rarely helps people change. Self-compassion does — it makes it safer to try again after a hard day.', 'Speak to yourself like you would to a friend who was struggling.'],
  ['Choosing your next step', 'You can’t always choose what you feel, but you can choose what you do next. Small, kind actions add up.', 'Pick one small thing that helps: a breath, a walk, a message to someone you trust.']
];

/* ═════════ finishing an activity ═════════ */
const closeAbove = base => { const all = $$('.layer'), i = all.indexOf(base); all.slice(i + 1).forEach(popLayer); };
function finishActivity(ctx, id) {
  if (ctx && ctx.checkin && CI) { closeAbove(CI.layer); finishCheckinReward(true); return; }
  const k = id + today(); popLayer($$('.layer').pop());
  if (S.loop.date === today() && S.loop.survey) { S.loop.activity = 1; S.lastActivity = id; }
  if (!S.doneTools[k]) { S.doneTools[k] = 1; S.activities++; earn(3, 'Activity: ' + (toolById(id) ? toolById(id).title : id)); toast(`+${usd(3)} · nice work`); }
  else toast('Nice work — that’s all for today’s bonus');
  save();
}
const endBtn = (ctx, id) => `<button class="btn light" data-act="finish" data-id="${id}" data-ck="${ctx && ctx.checkin ? 1 : 0}">${ctx && ctx.checkin ? 'Finish & collect reward' : 'Finish'}</button>`;
const playerTop = (title, dark = true) => `<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Close">${ic('x', 20)}</button><h3 style="color:#fff">${title}</h3></div>`;

/* ═════════ TOOLS TAB ═════════ */
const TCHIP = { sound: 'g-teal', breath: 'g-blue', quotes: 'g-pink', emotions: 'g-purple', urge: 'g-orange', movement: 'g-green', mindful: 'g-teal', grounding: 'g-coral' };
function renderTools() {
  const rec = recommend(S.history.length ? S.history[S.history.length - 1].vals : null);
  $('#v-tools').innerHTML = `<div class="tools-head"><h1>Tools</h1><button class="dot-btn" data-act="help" aria-label="Help">${ic('life', 20)}</button></div>
  <label class="searchbar">${ic('search', 20)}<input id="tsearch" placeholder="Search tools…" autocomplete="off" aria-label="Search tools"></label>
  ${S.relief.length ? `<div class="relief-list tools-r"><div class="eyebrow">Your relief list</div><div class="chips-wrap">${S.relief.map(r => `<span class="tag">${esc(r)}</span>`).join('')}</div></div>` : ''}
  <div class="more-card"><h2>Calming tools</h2><p>Use any time — when you’re stressed, restless, or just need a reset.</p><div id="tgrid">${TOOLS.map(t => `<button class="more-row" data-act="tool" data-id="${t.id}" data-name="${t.title.toLowerCase()}"><span><b>${t.title}</b><small>${t.sub}</small></span><span class="chip-i ${TCHIP[t.id]}">${ic(t.ic, 20)}</span></button>`).join('')}</div></div>
  <div class="promo" style="margin:14px var(--gutter) 0"><div class="promo-t"><b>Not sure where to start?</b><small>${rec.title} is a great fit for how you’ve been feeling.</small><button class="pill-btn light" data-act="tool" data-id="${rec.id}">Try ${rec.title}</button></div><svg viewBox="-50 -50 100 100" width="96" height="96" aria-hidden="true">${sphere(5, 38)}</svg></div>`;
}
function openTool(id, ctx) {
  switch (id) {
    case 'breath': return breathPlayer(ctx);
    case 'sound': return ctx && ctx.checkin ? soundPlayer(1, ctx) : soundList();
    case 'quotes': return quotesPlayer(ctx);
    case 'emotions': return ctx && ctx.checkin ? lesson(S.watched.length % 10, ctx) : emotionsList();
    case 'urge': return guidePlayer({ id: 'urge', ...GUIDES.urge }, ctx);
    case 'grounding': return guidePlayer({ id: 'grounding', ...GUIDES.grounding }, ctx);
    case 'movement': case 'mindful':
      if (ctx && ctx.checkin) return guidePlayer({ id, title: GUIDES[id][0].title, steps: GUIDES[id][0].steps }, ctx);
      return routineList(id);
  }
}

/* ── routine lists (Movement / Mindfulness) ── */
function routineList(id) {
  const t = toolById(id), list = GUIDES[id];
  pushLayer(`<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Back">${ic('back', 20)}</button></div>
  <div class="tool-hero"><h1>${t.title}</h1><p>${t.hint}</p></div><div style="height:22px"></div>
  ${list.map((r, i) => `<button class="row-card" data-act="routine" data-id="${id}" data-i="${i}">${ringArt}<b>${r.title}<span class="d">${r.d} · guided</span></b>${ic('play', 22)}</button>`).join('')}<div style="height:30px"></div>`, 'dark');
}

/* ── generic guided player: ring timer + step text ── */
function guidePlayer(g, ctx) {
  const mult = ctx && ctx.checkin ? [1, 1, 1.25, 1.5][F().level] : 1;
  const steps = g.steps.map(s => ({ t: s.t, s: Math.round(s.s * mult) }));
  const l = pushLayer(`${playerTop(g.title)}<div class="player"><div class="step-meta" id="gp-meta"></div>
    <div class="ring"><svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="8"/><circle id="gp-ring" cx="110" cy="110" r="100" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="628.3" stroke-dashoffset="628.3"/></svg><div class="mid" id="gp-time"></div></div>
    <div class="step-txt" id="gp-txt"></div><div style="flex:1"></div>
    ${ctx && ctx.checkin && F().level > 1 ? `<div style="margin-bottom:12px"><span class="lvl">LEVEL ${F().level === 3 ? 'III' : 'II'}</span></div>` : ''}
    <button class="btn light" id="gp-next">Next step</button></div>`, 'dark');
  let i = -1, timer, tick;
  const total = steps.reduce((a, s) => a + s.s, 0);
  const done = () => {
    clearInterval(tick); clearTimeout(timer);
    $('.player', l).innerHTML = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><div class="big-emoji" style="background:rgba(255,255,255,.14);color:#fff">${ic('check', 42, 2.4)}</div><h2 style="font-size:38px">Well done</h2><p style="color:rgba(255,255,255,.65);font-size:16px;line-height:1.5;max-width:280px">You took about ${Math.max(1, Math.round(total / 60))} minute${total >= 90 ? 's' : ''} for yourself. Notice how you feel now.</p></div>${endBtn(ctx, g.id)}`;
  };
  const next = () => {
    clearInterval(tick); clearTimeout(timer); i++;
    if (i >= steps.length) return done();
    const s = steps[i]; let left = s.s;
    $('#gp-meta', l).textContent = `Step ${i + 1} of ${steps.length}`;
    const tx = $('#gp-txt', l); tx.style.animation = 'none'; tx.offsetHeight; tx.style.animation = ''; tx.textContent = s.t;
    const ring = $('#gp-ring', l); ring.style.transition = 'none'; ring.setAttribute('stroke-dashoffset', 628.3); ring.getBoundingClientRect();
    ring.style.transition = `stroke-dashoffset ${s.s}s linear`; ring.setAttribute('stroke-dashoffset', 0);
    $('#gp-time', l).textContent = left;
    tick = setInterval(() => { left--; const t = $('#gp-time', l); if (t) t.textContent = Math.max(left, 0); }, 1000);
    timer = setTimeout(next, s.s * 1000);
    if (i === steps.length - 1) $('#gp-next', l).textContent = 'Finish';
  };
  l._cleanup = () => { clearInterval(tick); clearTimeout(timer); };
  $('#gp-next', l).addEventListener('click', next);
  next();
}

/* ── breathing ── */
const PATTERNS = {
  '478': { name: '4-7-8 Calm', d: 'Inhale 4 · Hold 7 · Exhale 8', seq: [['Breathe in', 4, 1.12], ['Hold', 7, 1.12], ['Breathe out', 8, .62]] },
  box: { name: 'Box breathing', d: '4 · 4 · 4 · 4', seq: [['Breathe in', 4, 1.12], ['Hold', 4, 1.12], ['Breathe out', 4, .62], ['Hold', 4, .62]] },
  coherent: { name: 'Coherent', d: 'In 5 · Out 5', seq: [['Breathe in', 5, 1.12], ['Breathe out', 5, .62]] }
};
function breathPlayer(ctx) {
  const l = pushLayer(`${playerTop('Breathing')}<div class="player" id="bp"></div>`, 'dark');
  let timers = [], key = ctx && ctx.checkin ? 'coherent' : '478';
  l._cleanup = () => timers.forEach(clearTimeout);
  const intro = () => {
    $('#bp', l).innerHTML = `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;width:100%"><h1 style="font-size:38px;margin-bottom:8px">Choose a rhythm</h1><p class="hint" style="margin-bottom:22px">Sit comfortably. Follow the circle — in through your nose, out slowly through your mouth.</p>
    ${Object.entries(PATTERNS).map(([k, p]) => `<button class="sound-row ${k === key ? 'on' : ''}" style="background:rgba(255,255,255,.1)" data-act="bp-pick" data-k="${k}"><div style="flex:1"><b style="font-size:22px;font-family:var(--serif)">${p.name}</b><div style="font-size:13px;opacity:.7;margin-top:3px">${p.d}</div></div></button>`).join('')}</div><button class="btn light" id="bp-go">Begin</button>`;
    $$('[data-act=bp-pick]', l).forEach(b => b.addEventListener('click', () => { key = b.dataset.k; $$('[data-act=bp-pick]', l).forEach(x => x.classList.toggle('on', x === b)); }));
    $('#bp-go', l).addEventListener('click', run);
  };
  const run = () => {
    const p = PATTERNS[key], rounds = ctx && ctx.checkin ? [0, 4, 5, 6][F().level] : 4; let r = 0;
    $('#bp', l).innerHTML = `<div class="step-meta" id="bp-r"></div><div class="orb-wrap"><div class="orb" id="orb">Ready</div></div><div class="phase" id="bp-ph"></div><div class="hint">${p.name} · ${p.d}</div><button class="btn ghost" style="color:#fff" id="bp-stop">End early</button>`;
    $('#bp-stop', l).addEventListener('click', complete);
    const cycle = () => {
      if (r >= rounds) return complete();
      $('#bp-r', l).textContent = `Round ${r + 1} of ${rounds}`; let t = 0;
      p.seq.forEach(([lab, sec, sc]) => {
        timers.push(setTimeout(() => {
          const o = $('#orb', l); if (!o) return;
          o.style.transitionDuration = (lab === 'Hold' ? .3 : sec) + 's'; o.style.transform = `scale(${sc})`; o.textContent = lab === 'Hold' ? 'Hold' : lab.replace('Breathe ', '').replace(/^./, c => c.toUpperCase());
          $('#bp-ph', l).textContent = lab + ' · ' + sec;
        }, t * 1000)); t += sec;
      });
      timers.push(setTimeout(() => { r++; cycle(); }, t * 1000));
    };
    timers.push(setTimeout(cycle, 900));
  };
  const complete = () => {
    timers.forEach(clearTimeout);
    $('#bp', l).innerHTML = `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><div class="big-emoji" style="background:rgba(255,255,255,.14);color:#fff">${ic('check', 42, 2.4)}</div><h2 style="font-size:38px">Well done</h2><p style="color:rgba(255,255,255,.65);font-size:16px;line-height:1.5;max-width:280px">Notice your shoulders, your jaw, your breath. How do you feel?</p></div>${endBtn(ctx, 'breath')}`;
  };
  intro();
}

/* ── sound patterns (Web Audio, generated — no files) ── */
const SOUNDS = [
  { id: 0, t: 'Ocean Waves', bg: g2('#3F6F9F', '#1E3550') }, { id: 1, t: 'Soft Rain', bg: g2('#5A7A8A', '#34505E') },
  { id: 2, t: 'Forest Wind', bg: g2('#B87420', '#6B3F1A') }, { id: 3, t: 'Singing Bowls', bg: g2('#C49A3F', '#8A6A22') }
];
let AC = null, SND = null;
function stopSound() { if (!SND) return; clearInterval(SND.iv); try { SND.master.gain.cancelScheduledValues(AC.currentTime); SND.master.gain.setTargetAtTime(0, AC.currentTime, .15); } catch (e) { } const s = SND; setTimeout(() => { s.nodes.forEach(n => { try { n.stop(); } catch (e) { } }); try { s.master.disconnect(); } catch (e) { } }, 600); SND = null; }
function startSound(kind) {
  stopSound(); const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return;
  AC = AC || new Ctx(); if (AC.state === 'suspended') AC.resume();
  const master = AC.createGain(); master.gain.value = 0; master.connect(AC.destination); master.gain.setTargetAtTime(.55, AC.currentTime, .8);
  const nodes = [], noiseSrc = brown => { const b = AC.createBuffer(1, AC.sampleRate * 4, AC.sampleRate), d = b.getChannelData(0); let last = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; if (brown) { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w * .5; } const s = AC.createBufferSource(); s.buffer = b; s.loop = true; s.start(); nodes.push(s); return s; };
  const lfo = (freq, depth, target) => { const o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = freq; g.gain.value = depth; o.connect(g); g.connect(target); o.start(); nodes.push(o); };
  let iv = null;
  if (kind === 0) { const n = noiseSrc(true), f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 650; const g = AC.createGain(); g.gain.value = .55; n.connect(f); f.connect(g); g.connect(master); lfo(.11, .4, g.gain); lfo(.07, 120, f.frequency); }
  else if (kind === 1) { const n = noiseSrc(false), h = AC.createBiquadFilter(); h.type = 'highpass'; h.frequency.value = 1400; const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 9000; const g = AC.createGain(); g.gain.value = .32; n.connect(h); h.connect(lp); lp.connect(g); g.connect(master); lfo(.2, .05, g.gain); }
  else if (kind === 2) { const n = noiseSrc(true), b = AC.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = 480; b.Q.value = .7; const g = AC.createGain(); g.gain.value = .9; n.connect(b); b.connect(g); g.connect(master); lfo(.06, 220, b.frequency); lfo(.09, .3, g.gain); }
  else { const bowl = () => { [[196, .35], [392.8, .2], [588, .12], [790, .06]].forEach(([f, a]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.value = 0; g.gain.setTargetAtTime(a, AC.currentTime, .05); g.gain.setTargetAtTime(0, AC.currentTime + .4, 1.6); o.connect(g); g.connect(master); o.start(); o.stop(AC.currentTime + 9); }); }; bowl(); iv = setInterval(bowl, 7000); }
  SND = { master, nodes, iv };
}
function soundList() {
  pushLayer(`<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Back">${ic('back', 20)}</button></div><div class="tool-hero"><h1>Sound Patterns</h1><p>Soft, generated soundscapes to settle your body.</p></div><div style="height:22px"></div>
  ${SOUNDS.map(s => `<button class="row-card" style="background:${s.bg}" data-act="sound" data-i="${s.id}">${ringArt}<b>${s.t}<span class="d">Loops · pick a timer</span></b>${ic('play', 22)}</button>`).join('')}<div style="height:30px"></div>`, 'dark');
}
function soundPlayer(i, ctx) {
  const s = SOUNDS[i], mins = ctx && ctx.checkin ? [0, 2, 3, 5][F().level] : 5; let left = mins * 60, on = true, tm;
  const l = pushLayer(`${playerTop(s.t)}<div class="player"><div class="orb-wrap"><div class="orb" id="so" style="background:radial-gradient(circle at 35% 30%,#fff3,${s.bg.match(/#[0-9A-F]{6}/gi)[0]} 70%);animation:breathe 6s ease-in-out infinite;font-size:44px" id="so"><span id="st">${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}</span></div></div>
    <div class="phase" id="sp">Playing</div><div class="hint">Headphones recommended. Close your eyes and let the sound do the work.</div>
    ${ctx && ctx.checkin ? '' : `<div class="seg" style="justify-content:center;margin-bottom:16px">${[5, 10, 15].map(m => `<button data-m="${m}" class="${m === mins ? 'on' : ''}" style="background:rgba(255,255,255,.12);color:#fff">${m} min</button>`).join('')}</div>`}
    <div style="display:flex;gap:10px;width:100%"><button class="btn light" id="sp-t" style="flex:1">Pause</button><div style="flex:1">${endBtn(ctx, 'sound')}</div></div></div>`, 'dark');
  if (!document.getElementById('kf')) { const k = document.createElement('style'); k.id = 'kf'; k.textContent = '@keyframes breathe{0%,100%{transform:scale(.9)}50%{transform:scale(1.1)}}'; document.head.appendChild(k); }
  const show = () => { const t = $('#st', l); if (t) t.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; };
  const run = () => { tm = setInterval(() => { left--; show(); if (left <= 0) { clearInterval(tm); stopSound(); $('#sp', l).textContent = 'Finished'; } }, 1000); };
  startSound(s.id); run();
  l._cleanup = () => { clearInterval(tm); stopSound(); };
  $('#sp-t', l).addEventListener('click', e => { on = !on; if (on) { startSound(s.id); run(); $('#so', l).style.animationPlayState = 'running'; } else { clearInterval(tm); stopSound(); $('#so', l).style.animationPlayState = 'paused'; } e.target.textContent = on ? 'Pause' : 'Resume'; $('#sp', l).textContent = on ? 'Playing' : 'Paused'; });
  $$('[data-m]', l).forEach(b => b.addEventListener('click', () => { left = +b.dataset.m * 60; show(); $$('[data-m]', l).forEach(x => x.classList.toggle('on', x === b)); }));
}

/* ── quotes / affirmations ── */
function quotesPlayer(ctx) {
  let i = (new Date().getDate() * 3) % QUOTES.length;
  const l = pushLayer(`${playerTop('Quotes')}<div class="player" style="align-items:stretch" id="qp"></div>`, 'dark');
  const draw = () => {
    const sv = S.saved.includes(i);
    $('#qp', l).innerHTML = `<div class="q-card" style="background:${g2(QCOL[i % 6], '#1B1313')}">${ringArt}<span style="position:relative">“${QUOTES[i]}”</span></div>
    <div class="q-nav"><button data-q="-1" aria-label="Previous">${ic('back', 22)}</button><div class="count">${i + 1} / ${QUOTES.length}</div><button data-q="heart" aria-label="Save" style="${sv ? 'background:var(--coral)' : ''}">${ic('heart', 22)}</button><button data-q="1" aria-label="Next">${ic('next', 22)}</button></div>
    ${ctx && ctx.checkin ? `<div style="margin-top:18px">${endBtn(ctx, 'quotes')}</div>` : ''}`;
    $$('[data-q]', l).forEach(b => b.addEventListener('click', () => { const q = b.dataset.q; if (q === 'heart') { S.saved = sv ? S.saved.filter(x => x !== i) : [...S.saved, i]; save(); } else i = (i + +q + QUOTES.length) % QUOTES.length; draw(); }));
  };
  draw();
}

/* ── Emotions 101 ── */
function emotionsList() {
  const cols = ['#2B4A6B', '#8A4A45', '#8A4A45', '#6B4A3A', '#3F6A93', '#9A4F4A', '#2B4A6B', '#3F6A93', '#B87420', '#8A5A2A'];
  pushLayer(`<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Back">${ic('back', 20)}</button></div><div class="tool-hero"><h1>Emotions 101</h1><p>A 10-part series that explores how emotions work.</p></div><div style="height:20px"></div>
  ${EPISODES.map((e, i) => `<button class="row-card" style="background:${g2(cols[i], '#161212')}" data-act="lesson" data-i="${i}">${S.watched.includes(i) ? `<span class="tick">${ic('check', 14, 2.6)}</span>` : ''}<b>${e[0]}<span class="d">2 min read</span></b><span class="n">${i + 1}</span></button>`).join('')}<div style="height:30px"></div>`, 'dark');
}
function lesson(i, ctx) {
  const e = EPISODES[i];
  pushLayer(`<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Close">${ic(ctx && ctx.checkin ? 'x' : 'back', 20)}</button></div>
  <div class="layer-body lesson"><div class="step-meta">Episode ${i + 1} of 10</div><h1>${e[0]}</h1><p>${e[1]}</p><p style="color:#fff;font-family:var(--serif);font-style:italic;font-size:21px;line-height:1.35;border-left:3px solid var(--rose);padding-left:14px">${e[2]}</p>
  <div style="flex:1;min-height:20px"></div><button class="btn light" data-act="lesson-done" data-i="${i}" data-ck="${ctx && ctx.checkin ? 1 : 0}">${ctx && ctx.checkin ? 'Done · collect reward' : 'Mark as done'}</button></div>`, 'dark');
}

/* ═════════ WALLET ═════════ */
/* score and earnings side by side, per check-in (the "Score & Earnings not integrated" gap) */
function scoreEarnCard() {
  if (!S.history.length) return '';
  const word = s => s >= 75 ? 'Strong' : s >= 55 ? 'Steady' : s >= 40 ? 'Building' : 'Needs care';
  const earnedOn = d => S.txns.filter(x => x.d === d).reduce((a, x) => a + x.amt, 0);
  const days = Array.from({ length: 7 }, (_, k) => { const d = daysAgo(6 - k); return { d, h: S.history.find(h => h.date === d), e: earnedOn(d), l: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(d + 'T12:00:00').getDay()], now: k === 6 }; });
  const done = days.filter(x => x.h), latest = S.history[S.history.length - 1], total = days.reduce((a, x) => a + x.e, 0);
  const cols = days.map(x => `<div class="se-col ${x.now ? 'now' : ''} ${x.h ? '' : 'empty'}"><em class="se-e">${x.h ? '+' + usd(x.e) : '·'}</em>
    <div class="se-bar">${x.h ? `<i style="height:${x.h.overall}%;background:${scoreCol(x.h.overall / 10)}"></i>` : ''}</div><span class="se-s">${x.h ? x.h.overall : '–'}</span><small>${x.l}</small></div>`).join('');
  return `<div class="sec"><div class="eyebrow" style="margin-bottom:12px">Score & earnings · this week</div><div class="se-card">
    <div class="se-sum"><div><small>Latest score</small><b>${latest.overall}</b><span class="se-pill">${word(latest.overall)}</span></div><div><small>Earned</small><b>+${usd(total)}</b><span class="se-pill gold">${done.length} check-in${done.length === 1 ? '' : 's'}</span></div></div>
    <div class="se-cols">${cols}</div>
    <p class="se-note">Rewards come from showing up and doing activities — not from the score itself.</p></div></div>`;
}
function renderWallet() {
  const nr = nextReward();
  $('#v-wallet').innerHTML = `<div class="wal-top"><h1>Wallet</h1></div>
  <div class="pad"><div class="bal-card"><div class="bal-h"><span class="bal-logo">R</span><b>Rewards wallet</b><span class="bal-tag">USD</span></div>
    <small>Balance</small><div class="bal" id="wb">$0.00</div><small>Last earned: ${S.txns.length ? dateWord(S.txns[0].d) : '—'}</small>
    <div class="bal-grid"><div><small>Streak</small><b>${S.streak} days</b></div><div><small>Activities</small><b>${S.activities}</b></div></div>
    <button class="btn light" data-act="tab" data-v="home">Back to today</button></div></div>
  ${scoreEarnCard()}
  <div class="sec"><div class="eyebrow" style="margin-bottom:12px">Rewards you’re working toward</div>
    ${REWARDS.map(r => S.bucks >= r.at
      ? `<div class="goal done"><span class="tick">${ic('check', 18, 2.4)}</span><div><b>${r.t}</b><small>${r.d}</small></div><span class="tag">Unlocked</span></div>`
      : `<div class="goal"><div class="r"><b>${r.t}</b><span>${usd(S.bucks)} / ${usd(r.at)}</span></div><div class="muted" style="font-size:13px;margin-bottom:10px">${r.d}</div><div class="prog"><i style="width:${clamp(S.bucks / r.at * 100, 0, 100)}%"></i></div></div>`).join('')}</div>
  <div class="sec"><div class="eyebrow" style="margin-bottom:12px">How to earn</div><div class="group">${[['Daily check-in', '+' + usd(10)], ['Complete an activity', '+' + usd(5)], ['Streak bonus (up to)', '+' + usd(5)], ['Any tool, once a day', '+' + usd(3)]].map(([a, b]) => `<div class="txn"><div class="t">${a}</div><b>${b}</b></div>`).join('')}</div></div>
  <div class="sec"><div class="eyebrow" style="margin-bottom:12px">Recent activity</div><div class="group">${S.txns.length ? S.txns.slice(0, 8).map(x => `<div class="txn"><div class="ic">${ic('coin', 20)}</div><div class="t">${esc(x.t)}<small>${x.s != null ? `Score ${x.s} · ` : ''}${dateWord(x.d)}</small></div><b>+${usd(x.amt)}</b></div>`).join('') : '<p class="muted" style="padding:16px 0;font-size:14px">Complete your first check-in to start earning.</p>'}</div></div>`;
  countUp($('#wb'), S.bucks, 900, 0, v => usd(v));
}

/* ═════════ ME ═════════ */
function renderMe() {
  const first = esc([S.name, S.last].filter(Boolean).join(' ') || 'Friend'), initial = esc((S.name || 'R').charAt(0).toUpperCase());
  const contact = S.profile.email || (S.profile.phone ? S.profile.cc + ' ' + S.profile.phone : '');
  const row = (act, data, icon, title, sub) => `<button class="set-row" data-act="${act}" ${data}><span class="chip-i">${ic(icon, 20, 1.6)}</span><div><b>${title}</b><small>${sub}</small></div>${ic('next', 18, 1.6)}</button>`;
  const rem = [['morning', 'Morning', '☕'], ['afternoon', 'Midday', '🥗'], ['evening', 'Evening', '🌙']];
  $('#v-me').innerHTML = `<div class="me-card"><div class="me-av">${initial}</div><h1>${first}</h1>${contact ? `<p class="me-contact">${esc(contact)}</p>` : ''}
    <div class="me-chips"><span>Day ${S.day} of your journey</span><span class="fl">${ic('flame', 15, 1.8)} ${S.streak}-day streak</span></div></div>
  <div class="sec"><div class="eyebrow">Your info</div>
    ${row('edit-step', 'data-s="profile"', 'user', 'Profile', esc([S.name, S.last].filter(Boolean).join(' ') || 'Add your name'))}
    ${row('edit-step', 'data-s="meds"', 'pill', 'Medications', S.meds.length ? esc(S.meds.join(', ')) : 'None added')}
    ${row('edit-step', 'data-s="relief"', 'heart', 'What brings you relief', S.relief.length ? esc(S.relief.join(', ')) : 'None added')}
    ${row('edit-step', 'data-s="care"', 'shield', 'Care team', esc(S.clinic.name || S.clinic.code || 'Not connected'))}</div>
  <div class="sec"><div class="eyebrow">Daily reminder</div>
    <div class="me-rem"><div class="me-rem-t"><b>Check-in time</b><small>Next: ${nextTrigger()}</small></div>
      <div class="me-seg">${rem.map(([k, l, e]) => `<button class="${S.remind === k ? 'on' : ''}" data-act="me-remind" data-k="${k}"><i>${e}</i>${l}</button>`).join('')}</div></div></div>
  <div class="sec"><div class="eyebrow">Support</div>
    ${row('help', '', 'life', 'Help & crisis support', '988 Lifeline · 911 · your people')}
    ${row('me-replay', '', 'play', 'Replay welcome tour', 'See how Rudra works again')}</div>
  <div class="sec"><button class="me-logout" data-act="me-logout">${ic('x', 18, 2)}<span>Log out</span></button></div>`;
}

/* ═════════ HELP SHEET ═════════ */
function helpSheet() {
  const l = pushLayer(`<div class="sheet"><h2>You’re not alone</h2><p class="muted" style="font-size:15px;line-height:1.45">Help is free, private and available right now.</p>
    <a class="help-row" href="tel:988" style="text-decoration:none;color:inherit"><div class="ico" style="background:var(--coral-lt);color:var(--coral)">${ic('phone', 20)}</div><div><b>Call 988</b><span class="d">Suicide & Crisis Lifeline · 24/7</span></div></a>
    <a class="help-row" href="sms:741741&body=HOME" style="text-decoration:none;color:inherit"><div class="ico" style="background:var(--sky);color:#4A7FB0">${ic('sms', 20)}</div><div><b>Text HOME to 741741</b><span class="d">Crisis Text Line</span></div></a>
    <a class="help-row" href="tel:911" style="text-decoration:none;color:inherit"><div class="ico" style="background:#FBE6E3;color:#D9766D">${ic('phone', 20)}</div><div><b>Call 911</b><span class="d">Emergency or suspected overdose</span></div></a>
    ${S.relief.length ? `<div class="relief-list"><div class="eyebrow">Your relief list</div><div class="chips-wrap">${S.relief.map(r => `<span class="tag">${esc(r)}</span>`).join('')}</div><small>Things you told us help an urge pass.</small></div>` : ''}
    <button class="help-row" data-act="help-urge"><div class="ico" style="background:var(--lav);color:#4A7FB0">${ic('life', 20)}</div><div><b>I’m having cravings</b><span class="d">Ride it out with urge surfing</span></div></button>
    <button class="btn ghost" style="margin-top:12px" data-act="close-layer">Close</button></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
}

/* ═════════ view score again (after check-in) ═════════ */
function viewScore() {
  const last = S.history[S.history.length - 1]; if (!last) return;
  const prev = S.history.length > 1 ? S.history[S.history.length - 2].overall : null;
  const l = pushLayer(`<div class="layer-top"><button class="icon-btn" data-act="close-layer" aria-label="Close">${ic('x', 20)}</button><h3>Your recovery score</h3></div><div class="layer-body" style="padding:4px 0 0"><div class="fin-gauge">${gauge(last.overall)}</div><div class="white-sheet">
    <div class="str-h"><h3>Your strengths</h3><span class="muted" style="font-size:14px">(Out of 10)</span></div>${strengthsHTML(last.vals)}</div></div>`, 'indigo');
  animateScore(l, last.overall, 0);
}

/* ═════════ event wiring ═════════ */
const ACT = {
  tab: el => go(el.dataset.v),
  help: () => helpSheet(),
  'close-layer': el => popLayer(layerOf(el)),
  'help-urge': el => { popLayer(layerOf(el)); setTimeout(() => openTool('urge'), 200); },
  tool: el => openTool(el.dataset.id),
  routine: el => { const r = GUIDES[el.dataset.id][+el.dataset.i]; guidePlayer({ id: el.dataset.id, title: r.title, steps: r.steps }); },
  sound: el => soundPlayer(+el.dataset.i),
  lesson: el => lesson(+el.dataset.i),
  'lesson-done': el => {
    const i = +el.dataset.i; if (!S.watched.includes(i)) S.watched.push(i); save();
    if (el.dataset.ck === '1' && CI) { closeAbove(CI.layer); finishCheckinReward(true); } else { popLayer(layerOf(el)); const k = 'emo' + i + today(); if (!S.doneTools[k]) { S.doneTools[k] = 1; S.activities++; earn(3, 'Activity: Emotions 101'); toast(`+${usd(3)} · episode done`); save(); } else toast('Episode marked done'); const ls = $$('.layer'); }
  },
  finish: el => finishActivity({ checkin: el.dataset.ck === '1' }, el.dataset.id),
  checkin: () => startCheckin(),
  'view-score': () => viewScore(),
  'set-day': el => setDay(+el.dataset.d),
  /* onboarding / setup */
  'onb-skip': () => startProfile(),
  'onb-go': el => renderOnb(+el.dataset.i),
  'onb-next': () => { if (onbI >= ONB.length - 1) startProfile(); else renderOnb(onbI + 1); },
  'pick-remind': el => { S.remind = el.dataset.k; $$('[data-act=pick-remind]').forEach(b => b.classList.toggle('on', b === el)); },
  /* check-in */
  'ci-next': () => { CI.i = 0; renderCI(); },
  'ci-prev': () => { if (CI.i > 0) { CI.i--; renderCI(); } },
  'ci-close': () => { $$('.layer').forEach(popLayer); go(tab === 'home' ? 'home' : tab); },
  'ci-activity': () => openTool(CI.rec.id, { checkin: true }),
  'ci-skip-act': () => finishCheckinReward(false),
  'ci-end': () => endCheckin('home'),
  'ci-wallet': () => endCheckin('wallet'),
  loop: el => { const a = el.dataset.s, last = S.history[S.history.length - 1]; if (a === 'checkin') return checkedInToday() ? viewScore() : startCheckin(); if (a === 'score') return last ? viewScore() : startCheckin(); if (a === 'activity') return openTool(recommend(last ? last.vals : null).id); go('wallet'); },
  'trigger-go': el => { popLayer(layerOf(el)); setTimeout(startCheckin, 150); },
  /* me */
  'me-remind': el => { S.remind = el.dataset.k; save(); renderMe(); },
  'me-replay': () => { renderOnb(0); },
  'me-logout': () => { if (confirm('Log out of Rudra Health on this device?')) { try { localStorage.removeItem(KEY); } catch (e) { } S = DEFAULT(); $$('.layer').forEach(popLayer); renderOnb(); } },
  'me-reset': () => { if (confirm('Reset the prototype and clear all data?')) { try { localStorage.removeItem(KEY); } catch (e) { } S = DEFAULT(); $$('.layer').forEach(popLayer); renderOnb(); } }
};
document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el) return; const f = ACT[el.dataset.act]; if (f) f(el, e); });
document.addEventListener('input', e => { if (e.target.id !== 'tsearch') return; const q = e.target.value.trim().toLowerCase(); $$('#tgrid .more-row').forEach(b => { b.hidden = q && !b.dataset.name.includes(q); }); });

/* ═════════ TRIGGER — the reminder that starts the loop ═════════ */
function triggerSheet() {
  if (checkedInToday() || $$('.layer').length) return;
  const last = S.history[S.history.length - 1];
  const tot = 10 + ACT_BONUS[F().level] + clamp(S.streak + 1, 1, 5), rem = REMIND[S.remind];
  const l = pushLayer(`<div class="sheet trig"><span class="grab"></span>
    <span class="trig-ic">${ic('sun', 30, 1.5)}</span>
    <span class="trig-eye">${esc(rem.label)}</span>
    <h2>Time for your check-in</h2>
    <p class="trig-p">Take a calm minute for yourself. One simple question at a time.${last ? ` Last time you scored ${last.overall}.` : ''}</p>
    <div class="trig-earn"><span class="trig-coin">${ic('coin', 20, 1.6)}</span><div><small>You can earn today</small><b>${usd(tot)}</b></div><em>1 min</em></div>
    <button class="btn" data-act="trigger-go">Start check-in</button><button class="btn ghost" data-act="close-layer">Maybe later</button></div>`, 'sheet-wrap');
  l.addEventListener('click', e => { if (e.target === l) popLayer(l); });
}

/* ═════════ boot ═════════ */
document.addEventListener('DOMContentLoaded', function init() {
  mountViews();
  const q = new URLSearchParams(location.search);
  if (q.get('reset')) { S = DEFAULT(); save(); }
  if (q.get('day')) { S.onboarded = true; S.name = S.name || 'Alex'; setDay(+q.get('day')); }
  if (!S.onboarded) renderOnb(); else { go('home'); if (!q.get('notrigger')) setTimeout(triggerSheet, 700); }
});
