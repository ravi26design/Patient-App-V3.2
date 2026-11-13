/* Weekly flow: after one week, the first daily check-in shows last week's earnings, then continues to the check-in.
   Self-contained: loads after modules.js / onboarding.js and wraps startCheckin(). Preview any time with ?recap */
const wkNum = () => Math.ceil(Math.max(1, S.day || 1) / 7);
const needRecap = () => (new URLSearchParams(location.search).has('recap') || wkNum() > 1) && S.recapWk !== wkNum();
function recapScreen(go) {
  const wd = weekDays(1), tot = wd.reduce((a, x) => a + x.e, 0), mx = Math.max(1, ...wd.map(x => x.e));
  const ci = wd.filter(x => x.h).length, full = wd.filter(x => x.e >= 11).length, wk = Math.max(1, wkNum() - 1);
  pushLayer(`<div class="fx-wrap rc-wrap"><div class="fx-top"><span class="fx-wk">Week ${wk} · Recap</span></div>
    <div class="rc-hero"><svg viewBox="0 0 220 130" aria-hidden="true"><circle cx="110" cy="66" r="62" fill="#F8EBC8"/><circle cx="110" cy="66" r="46" fill="#F3DC9C"/><circle cx="110" cy="66" r="34" fill="#fff"/>
      <g transform="translate(86 42) scale(2)" fill="none" stroke="#B08A2E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P.coin}</g>
      <g fill="#E0B454"><path d="M28 30l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" opacity=".9"/><path d="M188 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" opacity=".8"/><circle cx="186" cy="100" r="4" opacity=".6"/><circle cx="36" cy="102" r="3" opacity=".6"/></g></svg></div>
    <p class="rc-lab">You earned last week</p><div class="rc-amt">${usd(tot)}</div>
    <div class="rc-tiles"><div><b>${ci}<small> of 7</small></b><span>Check-ins</span></div><div><b>${full}<small> of 7</small></b><span>Full days</span></div></div>
    <div class="rc-chart"><div class="rc-bars">${wd.map(x => `<div><i style="height:${Math.max(6, Math.round(x.e / mx * 100))}%" class="${x.e >= 11 ? 'f' : ''}"></i></div>`).join('')}</div><div class="rc-days">${wd.map(x => `<span>${x.l}</span>`).join('')}</div></div>
    <button class="btn fx-next rc-go" data-act="rc-go">Continue to daily check-in</button></div>`, 'fx-layer');
  window._rcGo = go;
}
{ const _sc = startCheckin;
  startCheckin = function () { if (needRecap()) return recapScreen(_sc); _sc(); }; }
Object.assign(ACT, { 'rc-go': el => { S.recapWk = wkNum(); save(); const go = window._rcGo; window._rcGo = null; popLayer(layerOf(el)); setTimeout(() => go && go(), 280); } });
