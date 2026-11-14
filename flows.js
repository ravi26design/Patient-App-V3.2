/* Flow links: open index.html?flow=<name> to jump straight to a screen (used by flows.html).
   Loads last; runs after the normal boot in tools.js. */
document.addEventListener('DOMContentLoaded', () => {
  const qs = new URLSearchParams(location.search), name = qs.get('flow');
  // one-shot links: drop ?flow and ?reset from the address so a refresh (or a log out then refresh) is not forced back in
  if (name || qs.has('reset')) { qs.delete('flow'); qs.delete('reset'); try { history.replaceState(null, '', location.pathname + (qs.toString() ? '?' + qs.toString() : '') + location.hash); } catch (e) { } }
  if (!name) return;
  setTimeout(() => {
    try {
      if (!S.onboarded) { S.onboarded = true; S.name = S.name || 'John'; save(); }
      $$('.layer').forEach(l => l.parentNode && l.parentNode.removeChild(l));
      const needToday = () => { S.lastCheckin = today(); S.focusDone = null; save(); };
      const fresh = () => { S.lastCheckin = null; S.day = 1; S.recapWk = null; S.focusDone = null; S.fpProg = null; S.inAct = null; save(); };
      const run = {
        home: () => go('home'),
        checkin: () => { fresh(); go('home'); startCheckin(); },
        result: () => { fresh(); go('home'); startCheckin(); Q.forEach((q, i) => { CI.a[q.k] = [7, 4, 8, 5, 7, 6, 8][i]; CI.touched[q.k] = true; }); renderScore($('#ci-root')); },
        activity: () => { needToday(); go('home'); focusPage('cravings'); },
        complete: () => { needToday(); S.lastAct = 'cravings'; go('home'); claimPopup(); },
        rewards: () => go('wallet'),
        location: () => { go('home'); ACT['open-map'](); },
        weekly: () => { S.day = 14; S.recapWk = null; S.lastCheckin = null; S.focusDone = null; S.fpProg = null; S.inAct = null; save(); go('home'); startCheckin(); },
        progress: () => go('progress'),
        community: () => go('community')
      }[name];
      if (run) run();
    } catch (e) { console.warn('flow failed', name, e); }
  }, 450);
});
