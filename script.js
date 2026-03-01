/* ═══════════════════════════════
   BACKEND ENGINE
═══════════════════════════════ */
// SUBJECTS, LEVELS, KG, and QB are now loaded from data.js

// ⚠️ DEPLOYMENT CONFIGURATION ⚠️
// If testing locally, uncomment the localhost URL and comment out the production URL
// const API_BASE_URL = 'http://localhost:3000';
// Once your backend is deployed, update this URL to your live backend URL (e.g., your Render or Heroku URL)
const API_BASE_URL = 'https://clarix-bzm1.vercel.app';

const S = {
  user: null, lRole: 'student', sRole: 'student', mastery: {}, sessions: 0, history: [], streak: 0,
  activeSubject: 'maths', activeLevel: '12',
  quiz: { qs: [], idx: 0, ans: [], qStart: 0, hintsUsed: 0, selOpt: null, answered: false, conf: 'high', interval: null, elapsed: 0 }
};
let dChart = null, bChart = null, trChart = null, tChart = null;

/* AUTH */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function setRole(f, r) { S[f === 'login' ? 'lRole' : 'sRole'] = r; const p = f === 'login' ? 'lr' : 'sr';['student', 'teacher'].forEach(v => document.getElementById(p + '-' + v)?.classList.toggle('on', v === r)); if (f === 'signup') { document.getElementById('s-extras')?.classList.toggle('hidden', r === 'teacher'); } }
function switchScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
async function handleLogin() {
  const em = document.getElementById('l-email').value.trim();
  const pw = document.getElementById('l-pass').value.trim();
  if (!em) { showToast('Enter your email', 'tr'); return; }
  if (!pw) { showToast('Enter your password', 'tr'); return; }
  if (!isValidEmail(em)) { showToast('Please enter a valid email address', 'tr'); return; }

  showLoad('AUTHENTICATING…');
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: em, password: pw })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const u = data.user;

    // Load the user's progress from MongoDB into local state
    S.user = { name: u.name, email: u.email, role: u.role, level: u.level, goal: u.goal };
    S.mastery = u.mastery || {};
    S.sessions = u.sessions || 0;
    S.history = u.history || [];
    S.streak = u.streak || 0;

    hideLoad();
    launch();
  } catch (e) {
    console.error(e);
    hideLoad();
    showToast(e.message || 'Login Failed. Ensure server is running.', 'tr');
  }
}

async function handleSignup() {
  const fn = document.getElementById('s-fn').value.trim();
  const ln = document.getElementById('s-ln').value.trim();
  const em = document.getElementById('s-em').value.trim();
  const pw = document.getElementById('s-pw').value.trim();

  if (!fn || !ln || !em || !pw) { showToast('Please fill all fields', 'tr'); return; }
  if (!isValidEmail(em)) { showToast('Please enter a valid email address', 'tr'); return; }

  showLoad('CREATING PROFILE…');
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: em,
        password: pw,
        name: `${fn} ${ln}`,
        role: S.sRole,
        level: document.getElementById('s-lv')?.value || 'Beginner',
        goal: document.getElementById('s-gl')?.value || 'Concept Mastery'
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    const u = data.user;

    S.user = { name: u.name, email: u.email, role: u.role, level: u.level, goal: u.goal };
    S.mastery = u.mastery || {};
    S.sessions = u.sessions || 0;
    S.history = u.history || [];
    S.streak = u.streak || 0;

    hideLoad();
    launch();
  } catch (e) {
    console.error(e);
    hideLoad();
    showToast(e.message || 'Signup Failed. Ensure server is running.', 'tr');
  }
}
function demo(r) { S.user = { name: r === 'student' ? 'Aryan Kumar' : 'Dr. Priya Sharma', email: r + '@clarix.ai', role: r, level: 'Intermediate', goal: 'Concept Mastery' }; launch(); }
function logout() { S.user = null; S.mastery = {}; S.sessions = 0; S.history = []; S.streak = 0; switchScreen('s-login'); }
function launch() { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById('s-app').classList.add('active'); buildSidebar(); initCharts(); renderHeatmap(); renderStreak(); updateSbUser(); showPage(S.user.role === 'teacher' ? 'p-teacher' : 'p-home'); showToast(`Welcome, ${S.user.name.split(' ')[0]}! 🎓`, 'tg'); }

/* SIDEBAR */
function buildSidebar() {
  const nav = document.getElementById('sb-nav');
  if (S.user.role === 'teacher') {
    nav.innerHTML = `<div class="sb-sec">Analytics</div><div class="ni on" onclick="showPageN('p-teacher',this)"><span class="ni-ico">📊</span>Class Dashboard</div>`;
    return;
  }

  let html = `<div class="sb-sec">Overview</div>
              <div class="ni ${S.activeSubject === 'global' ? 'on' : ''}" id="nav-global" onclick="changeSubject('global', this)"><span class="ni-ico">⬡</span>Global Dashboard</div>
              <div class="ni" id="nav-profile" onclick="showPageN('p-profile',this)"><span class="ni-ico">👤</span>My Profile</div>`;

  SUBJECTS.forEach(sub => {
    const isAct = S.activeSubject === sub.id;
    html += `<div class="sb-sec" style="margin-top:15px; cursor:pointer;" onclick="toggleSubNav('${sub.id}')">
               ${sub.icon} ${sub.name} <span style="float:right; font-size:10px;">${isAct ? '▼' : '▶'}</span>
             </div>
             <div id="subnav-${sub.id}" style="display: ${isAct ? 'block' : 'none'}; margin-left:10px;">
               <div class="ni ${isAct ? 'on' : ''}" onclick="changeSubject('${sub.id}', this)"><span class="ni-ico">⬡</span>Dashboard</div>
               <div class="ni" onclick="if(S.activeSubject!=='${sub.id}') changeSubject('${sub.id}'); goQuiz();"><span class="ni-ico">📝</span>Take Quiz</div>
               <div class="ni" onclick="if(S.activeSubject!=='${sub.id}') changeSubject('${sub.id}'); showPageN('p-path',this)"><span class="ni-ico">🛤</span>My Path</div>
             </div>`;
  });
  nav.innerHTML = html;
}

function toggleSubNav(id) {
  const el = document.getElementById(`subnav-${id}`);
  const isHidden = el.style.display === 'none';
  // Collapse all
  SUBJECTS.forEach(s => {
    const sn = document.getElementById(`subnav-${s.id}`);
    if (sn) sn.style.display = 'none';
  });
  // Expand clicked
  el.style.display = isHidden ? 'block' : 'none';
}

function changeSubject(subId, el) {
  S.activeSubject = subId;
  buildSidebar();
  if (subId === 'global') {
    showPageN('p-home', document.getElementById('nav-global'));
    document.getElementById('dash-t').textContent = 'Global Analytics';
    document.getElementById('dash-hm-sub').textContent = 'All Subjects Overview';
  } else {
    showPageN('p-home'); // Let buildSidebar handle 'on' class
    const sub = SUBJECTS.find(s => s.id === subId);
    document.getElementById('dash-t').textContent = `${sub.icon} ${sub.name} Dashboard`;
    document.getElementById('dash-hm-sub').textContent = `Live mastery heatmap · ${sub.name}`;
  }
  refreshDashboards();
}

function changeLevel(lvlId) {
  S.activeLevel = lvlId;
  refreshDashboards();
}

function refreshDashboards() {
  updateDash();
  updateProfile();
  updatePath();
  renderHeatmap();
}

function updateSbUser() { const ini = S.user.name.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase(); document.getElementById('sb-av').textContent = ini; document.getElementById('sb-un').textContent = S.user.name; document.getElementById('sb-ur').textContent = S.user.role === 'teacher' ? 'Teacher' : 'Student'; const h = new Date().getHours(), g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; const el = document.getElementById('dash-t'); if (el && S.activeSubject === 'maths') el.textContent = `${g}, ${S.user.name.split(' ')[0]} 👋`; }
function showPage(id) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById(id)?.classList.add('active'); if (id === 'p-home') refreshDashboards(); }
function showPageN(id, el) { showPage(id); document.querySelectorAll('.ni').forEach(n => n.classList.remove('on')); el?.classList.add('on'); }

/* HEATMAP */
function unlocked(id) { const n = KG.find(c => c.id === id); return !n || !n.prereqs.length || n.prereqs.every(p => (S.mastery[p] ?? 0) >= 70); }
function getActiveKG() {
  if (S.activeSubject === 'global') return KG.filter(c => c.level === S.activeLevel);
  return KG.filter(c => c.subject === S.activeSubject && c.level === S.activeLevel);
}
function getActiveQB() {
  if (S.activeSubject === 'global') return QB.filter(q => KG.find(c => c.id === q.concept && c.level === S.activeLevel));
  return QB.filter(q => { const c = KG.find(x => x.id === q.concept); return c && c.subject === S.activeSubject && c.level === S.activeLevel; });
}
function renderHeatmap() {
  const el = document.getElementById('heatmap');
  if (!el) return;
  const aKg = getActiveKG();
  el.innerHTML = aKg.map(c => {
    const s = S.mastery[c.id], u = unlocked(c.id) || s !== undefined;
    let cls = 'locked', sc = '—';
    if (s !== undefined) { cls = s >= 80 ? 'strong' : s >= 60 ? 'moderate' : 'weak'; sc = s + '%'; }
    return `<div class="hmn ${cls}" onclick="openStudyModal('${c.id}')"><div class="hmname">${c.name}</div><div class="hmscore">${sc}</div><div class="hmbt"><div class="hmbf" style="width:${s || 0}%"></div></div>${!u && s === undefined ? '<span class="lockico">🔒</span>' : ''}</div>`;
  }).join('');
}

/* QUIZ */
async function goQuiz() {
  const qh = document.getElementById('quiz-sub-name');
  const subName = S.activeSubject === 'global' ? 'All Subjects' : SUBJECTS.find(s => s.id === S.activeSubject)?.name || 'Mixed';
  if (qh) qh.textContent = subName;

  // Show loading state instead of starting immediately
  showLoad('GENERATING AI QUESTIONS…');
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('on'));

  try {
    const aKg = getActiveKG();
    const topics = aKg.slice(0, 10).map(c => ({ id: c.id, name: c.name }));

    // Call our new backend
    const res = await fetch(`${API_BASE_URL}/api/generate-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: S.activeSubject,
        level: S.activeLevel,
        topics: topics,
        count: 10
      })
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const data = await res.json();

    if (!data.questions || !data.questions.length) {
      throw new Error("No questions were generated.");
    }

    S.quiz = { qs: data.questions, idx: 0, ans: [], qStart: Date.now(), hintsUsed: 0, selOpt: null, answered: false, conf: 'high', interval: null, elapsed: 0 };
    hideLoad();
    showPage('p-quiz');
    startTimer();
    renderQ();

  } catch (error) {
    console.error("Failed to fetch questions:", error);
    hideLoad();
    showToast('Failed to generate quiz. Is the server running?', 'tr');
  }
}
function renderQ() { const q = S.quiz.qs[S.quiz.idx]; S.quiz.qStart = Date.now(); S.quiz.selOpt = null; S.quiz.answered = false; S.quiz.hintsUsed = 0; const tot = S.quiz.qs.length, cur = S.quiz.idx + 1; document.getElementById('qpbf').style.width = `${(cur - 1) / tot * 100}%`; document.getElementById('q-num').textContent = `Q ${cur} of ${tot}`; const nd = KG.find(n => n.id === q.concept); document.getElementById('q-ctag').textContent = nd?.name || q.concept; document.getElementById('q-diff').textContent = `${q.diff.toUpperCase()} · BLOOM: ${q.bloom.toUpperCase()}`; document.getElementById('q-text').textContent = q.text; const L = ['A', 'B', 'C', 'D']; document.getElementById('q-opts').innerHTML = q.opts.map((o, i) => `<div class="qopt" id="opt-${i}" onclick="pickOpt(${i})"><div class="oltr">${L[i]}</div>${o}</div>`).join(''); document.getElementById('q-hint').classList.add('hidden'); const fb = document.getElementById('q-fb'); fb.classList.add('hidden'); fb.className = 'fbbox hidden'; document.getElementById('conf-row').style.display = 'none'; document.getElementById('submit-btn').disabled = true; document.getElementById('submit-btn').classList.remove('hidden'); document.getElementById('next-btn').classList.add('hidden'); document.getElementById('hint-btn').disabled = false; document.querySelectorAll('.confopt').forEach((b, i) => b.classList.toggle('on', i === 2)); S.quiz.conf = 'high'; }
function pickOpt(i) { if (S.quiz.answered) return; S.quiz.selOpt = i; document.querySelectorAll('.qopt').forEach((e, j) => e.classList.toggle('sel', j === i)); document.getElementById('submit-btn').disabled = false; }
function submitAns() { const q = S.quiz, qi = q.qs[q.idx]; if (q.answered || q.selOpt === null) return; q.answered = true; const ok = q.selOpt === qi.correct, ms = Date.now() - q.qStart; q.ans.push({ concept: qi.concept, correct: ok, ms, hints: q.hintsUsed, conf: q.conf }); document.querySelectorAll('.qopt').forEach((el, i) => { el.classList.add('dis'); if (i === qi.correct) el.classList.add('correct'); else if (i === q.selOpt && !ok) el.classList.add('wrong'); }); const fb = document.getElementById('q-fb'); fb.classList.remove('hidden'); fb.className = `fbbox ${ok ? 'ok' : 'bad'}`; fb.textContent = (ok ? '✓ Correct! ' : '✗ Incorrect. ') + qi.exp; document.getElementById('conf-row').style.display = 'flex'; document.getElementById('submit-btn').classList.add('hidden'); document.getElementById('next-btn').classList.remove('hidden'); }
function nextQ() { S.quiz.idx++; if (S.quiz.idx >= S.quiz.qs.length) finishQuiz(); else renderQ(); }
function useHint() { S.quiz.hintsUsed++; const h = document.getElementById('q-hint'); h.classList.remove('hidden'); h.textContent = '💡 Hint: ' + S.quiz.qs[S.quiz.idx].hint; document.getElementById('hint-btn').disabled = true; }
function setConf(v, el) { S.quiz.conf = v; document.querySelectorAll('.confopt').forEach(b => b.classList.remove('on')); el.classList.add('on'); }
function startTimer() { if (S.quiz.interval) clearInterval(S.quiz.interval); S.quiz.elapsed = 0; S.quiz.interval = setInterval(() => { S.quiz.elapsed++; const m = Math.floor(S.quiz.elapsed / 60), s = S.quiz.elapsed % 60; const el = document.getElementById('q-timer'); if (el) el.textContent = `${m}:${String(s).padStart(2, '0')}`; }, 1000); }
function exitQuiz() { clearInterval(S.quiz.interval); showPage('p-home'); }

/* MASTERY ENGINE */
function computeMastery(ans, cid) {
  const ca = ans.filter(a => a.concept === cid);
  if (!ca.length) return null;
  if (ca.some(a => !a.correct)) return 0;

  let tot = 0;
  ca.forEach(a => {
    let p = 50;
    const s = a.ms / 1000;
    p += s < 10 ? 20 : s < 20 ? 14 : s < 35 ? 8 : 4;
    p += a.hints === 0 ? 15 : a.hints === 1 ? 8 : 2;
    p += a.conf === 'high' ? 15 : a.conf === 'medium' ? 10 : 5;
    tot += p;
  });
  return Math.min(100, Math.round(tot / ca.length));
}
async function finishQuiz() {
  clearInterval(S.quiz.interval);
  showLoad('COMPUTING & SAVING MASTERY…');

  S.sessions++;
  KG.forEach(c => {
    const sc = computeMastery(S.quiz.ans, c.id);
    if (sc !== null) S.mastery[c.id] = sc;
  });
  const vals = Object.values(S.mastery);
  if (vals.length) S.history.push(Math.round(vals.reduce((a, b) => a + b, 0) / vals.length));
  S.streak = Math.min(S.streak + 1, 30);

  try {
    await fetch(`${API_BASE_URL}/api/users/sync`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: S.user.email,
        mastery: S.mastery,
        sessions: S.sessions,
        history: S.history,
        streak: S.streak
      })
    });
  } catch (e) {
    console.error('Failed to sync progress:', e);
    showToast('Progress saved locally (Server unreachable)', 'tr');
  }

  hideLoad();
  renderResults();
  updateDash();
  updateProfile();
  updatePath();
  renderHeatmap();
  renderStreak();
  showPage('p-results');
  showToast('Mastery updated & saved! 🚀', 'tg');
}

/* RESULTS */
function renderResults() { const aKg = getActiveKG(); const ans = S.quiz.ans, cor = ans.filter(a => a.correct).length, avgT = Math.round(ans.reduce((s, a) => s + a.ms, 0) / (ans.length || 1) / 1000); const actVals = aKg.map(c => S.mastery[c.id]).filter(v => v !== undefined); const gaps = actVals.filter(s => s < 70).length, avg = actVals.length ? Math.round(actVals.reduce((a, b) => a + b, 0) / actVals.length) : 0; document.getElementById('res-pct').textContent = avg + '%'; const ring = document.getElementById('res-pct').parentElement; ring.style.borderColor = avg >= 70 ? 'var(--green)' : avg >= 50 ? 'var(--amber)' : 'var(--coral)'; document.getElementById('res-cor').textContent = `${cor}/${ans.length}`; document.getElementById('res-time').textContent = avgT + 's'; document.getElementById('res-gaps').textContent = gaps; document.getElementById('res-bd').innerHTML = aKg.filter(c => S.mastery[c.id] !== undefined).map(c => { const s = S.mastery[c.id], col = s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--amber)' : 'var(--coral)'; return `<div class="pi"><div class="pm"><span class="pn">${c.name}</span><span class="pv" style="color:${col};font-weight:700">${s}%</span></div><div class="pt"><div class="pf" style="width:${s}%;background:${col}"></div></div></div>`; }).join(''); }

/* DASHBOARD */
function updateDash() { const aKg = getActiveKG(); const vals = aKg.map(c => S.mastery[c.id]).filter(v => v !== undefined); const mastered = vals.filter(s => s >= 70).length, gaps = vals.filter(s => s < 60).length, avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0; document.getElementById('kv-m').textContent = mastered; document.getElementById('kd-m').textContent = `↑ Out of ${aKg.length} concepts`; document.getElementById('kd-m').className = 'kd up'; document.getElementById('kv-g').textContent = gaps; document.getElementById('kv-a').textContent = avg + '%'; document.getElementById('kv-s').textContent = S.streak + 'd'; document.getElementById('hm-badge').textContent = 'Live'; document.getElementById('ses-badge').textContent = S.sessions + ' Session' + (S.sessions !== 1 ? 's' : ''); const gl = document.getElementById('gap-list'), wc = aKg.filter(c => S.mastery[c.id] !== undefined && S.mastery[c.id] < 70); document.getElementById('gap-cnt').textContent = wc.length + ' Active'; gl.innerHTML = !wc.length ? '<div style="text-align:center;padding:24px;font-family:var(--mono);font-size:11px;font-weight:600;color:var(--green);">✓ No gaps detected!</div>' : wc.map(c => { const s = S.mastery[c.id], crit = s < 50; return `<div class="gap-item"><div class="gap-ico ${crit ? 'gic' : 'gim'}">${crit ? '⚑' : '◈'}</div><div style="flex:1"><div class="gap-name">${c.name}</div><div class="gap-detail">Mastery: ${s}% · Threshold: ${c.threshold}%</div></div><div class="gap-score ${crit ? 'gsc-r' : 'gsc-a'}">${s}%</div></div>`; }).join(''); document.getElementById('concept-bars').innerHTML = aKg.filter(c => S.mastery[c.id] !== undefined).map(c => { const s = S.mastery[c.id], col = s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--amber)' : 'var(--coral)'; return `<div class="pi"><div class="pm"><span class="pn">${c.name}</span><span class="pv">${s}%</span></div><div class="pt"><div class="pf" style="width:${s}%;background:${col}"></div></div></div>`; }).join(''); updDonut(); updBar(); updTrend(); }

/* PROFILE */
function updateProfile() { const aKg = getActiveKG(); const vals = aKg.map(c => S.mastery[c.id]).filter(v => v !== undefined), mastered = vals.filter(s => s >= 70).length; const ini = S.user.name.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase(); document.getElementById('pc-av').textContent = ini; document.getElementById('pc-n').textContent = S.user.name; document.getElementById('pc-r').textContent = `Student · ${SUBJECTS.find(s => s.id === S.activeSubject)?.name} (${LEVELS.find(l => l.id === S.activeLevel)?.name})`; document.getElementById('pc-e').textContent = S.user.email; document.getElementById('goal-badge').textContent = S.user.goal; document.getElementById('pc-m').textContent = mastered; document.getElementById('pc-s').textContent = S.sessions; document.getElementById('pc-st').textContent = S.streak + 'd'; const comp = aKg.length ? Math.round(mastered / aKg.length * 100) : 0; document.getElementById('comp-pct').textContent = comp + '%'; document.getElementById('comp-bar').style.width = comp + '%'; const mr = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0; document.getElementById('mr-v').textContent = mr + '%'; document.getElementById('mr-b').style.width = mr + '%'; const eng = Math.min(100, S.sessions * 15 + S.streak * 3); document.getElementById('eng-v').textContent = eng < 30 ? 'Low' : eng < 60 ? 'Medium' : 'High'; document.getElementById('eng-b').style.width = eng + '%'; document.getElementById('eng-b').style.background = eng < 30 ? 'var(--coral)' : eng < 60 ? 'var(--amber)' : 'var(--green)'; document.getElementById('pc-bars').innerHTML = aKg.filter(c => S.mastery[c.id] !== undefined).map(c => { const s = S.mastery[c.id], col = s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--amber)' : 'var(--coral)'; return `<div class="pi"><div class="pm"><span class="pn">${c.name}</span><span class="pv" style="color:${col};font-weight:700">${s}%</span></div><div class="pt"><div class="pf" style="width:${s}%;background:${col}"></div></div></div>`; }).join(''); document.getElementById('ach-row').innerHTML = [{ icon: '🏆', name: 'First Quiz', earned: S.sessions >= 1 }, { icon: '🧠', name: 'Conqueror', earned: mastered >= 3 }, { icon: '🔥', name: '7-Day Streak', earned: S.streak >= 7 }, { icon: '🎯', name: 'Gap Closer', earned: aKg.length > 0 && mastered === aKg.length }].map(a => `<div class="ach ${a.earned ? 'earned' : ''}">${a.earned ? a.icon : '🔒'} ${a.name}</div>`).join(''); }

/* PATH */
function updatePath() { const aKg = getActiveKG(); const steps = aKg.map(c => { const s = S.mastery[c.id]; return s === undefined ? { c, status: 'pending' } : s >= 70 ? { c, status: 'done', s } : { c, status: 'gap', s }; }); const fg = steps.findIndex(s => s.status === 'gap'); document.getElementById('path-tl').innerHTML = steps.map((st, i) => { let dc = 'pend', cc = '', tn = ''; if (st.status === 'done') dc = 'done'; else if (st.status === 'gap' && i === fg) { dc = 'active'; cc = 'act'; } else tn = 'gr'; const det = st.status === 'done' ? `Mastered · Score: ${st.s}%` : st.status === 'gap' ? `Gap detected · Score: ${st.s}% · Needs reinforcement` : 'Locked · Complete prerequisites first'; const tags = st.status === 'gap' ? `<div class="pstags"><span class="badge b-coral">Gap</span><span class="badge b-amber">Reinforce</span></div>` : st.status === 'done' ? `<div class="pstags"><span class="badge b-green">Mastered</span></div>` : `<div class="pstags"><span class="badge" style="background:var(--bg2);color:var(--ink4);font-family:var(--mono);font-size:8px;padding:3px 8px;border-radius:20px;font-weight:600;">Locked</span></div>`; return `<div class="pstep"><div class="psdot ${dc}">${st.status === 'done' ? '✓' : i + 1}</div><div class="pscard ${cc}"><div class="psname ${tn}">${st.c.name}</div><div class="psdetail">${det}</div>${tags}</div></div>`; }).join(''); const cl = steps.filter(s => s.status === 'done').length, cp = aKg.length ? Math.round(cl / aKg.length * 100) : 0; document.getElementById('path-cp').textContent = cp + '%'; document.getElementById('path-cpb').style.width = cp + '%'; document.getElementById('path-cl').textContent = `${cl} / ${aKg.length}`; document.getElementById('path-clb').style.width = aKg.length ? `${cl / aKg.length * 100}%` : '0%'; const weak = aKg.filter(c => S.mastery[c.id] !== undefined && S.mastery[c.id] < 70); document.getElementById('recs-list').innerHTML = !weak.length ? '<div style="text-align:center;padding:16px;font-family:var(--mono);font-size:11px;font-weight:600;color:var(--green);">✓ All above threshold!</div>' : weak.map(c => `<div style="background:var(--bg);border:1.5px solid var(--border);border-radius:var(--r2);padding:12px;margin-bottom:8px;"><div style="font-size:12px;font-weight:700;color:var(--ink);margin-bottom:2px;">Reinforce: ${c.name}</div><div style="font-family:var(--mono);font-size:9px;font-weight:500;color:var(--ink4);">Score: ${S.mastery[c.id]}%</div><div style="display:flex;gap:5px;margin-top:7px;flex-wrap:wrap;"><span class="badge b-green">Practice</span><span class="badge b-blue">Khan Academy</span><span class="badge b-amber">Video</span></div></div>`).join(''); }

/* STREAK */
function renderStreak() { const w = document.getElementById('streak-wrap'); if (!w) return; let h = ''; for (let r = 0; r < 4; r++) { h += `<div class="sgrid">`; for (let d = 0; d < 7; d++) { const isToday = r === 3 && d === new Date().getDay() - 1, isAct = S.sessions > 0 && Math.random() > .4 && r * 7 + d < (3 * 7 + new Date().getDay()); h += `<div class="sd ${isToday ? 'today' : isAct ? 'act' : ''}"></div>`; } h += `</div>`; } w.innerHTML = h; }

/* CHARTS */
const chartBase = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#7A7F96', font: { family: 'IBM Plex Mono', size: 10 }, boxWidth: 10, padding: 12 } }, tooltip: { backgroundColor: '#fff', borderColor: '#E4E6ED', borderWidth: 1.5, titleColor: '#0D0F14', bodyColor: '#7A7F96', padding: 11, cornerRadius: 9 } } };
function initCharts() {
  if (!dChart) { const c = document.getElementById('donutC')?.getContext('2d'); if (c) { dChart = new Chart(c, { type: 'doughnut', data: { labels: ['Strong', 'Moderate', 'Weak', 'Untested'], datasets: [{ data: [0, 0, 0, 6], backgroundColor: ['#00B87A', '#F59E0B', '#FF3D5A', '#F0F1F5'], borderColor: '#fff', borderWidth: 4 }] }, options: { ...chartBase, cutout: '68%', plugins: { ...chartBase.plugins, legend: { ...chartBase.plugins.legend, position: 'bottom' } } } }); } }
  if (!bChart) { const c = document.getElementById('barC')?.getContext('2d'); if (c) { bChart = new Chart(c, { type: 'bar', data: { labels: [], datasets: [{ label: 'Mastery %', data: [], backgroundColor: [], borderRadius: 7 }] }, options: { ...chartBase, scales: { x: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 9 } } }, y: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 9 } }, max: 100, min: 0 } } } }); } }
  if (!trChart) { const c = document.getElementById('trendC')?.getContext('2d'); if (c) { trChart = new Chart(c, { type: 'line', data: { labels: [], datasets: [{ label: 'Avg Score', data: [], borderColor: '#00B87A', backgroundColor: 'rgba(0,184,122,.07)', borderWidth: 2.5, pointBackgroundColor: '#00B87A', pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5, tension: .4, fill: true }] }, options: { ...chartBase, scales: { x: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 9 } } }, y: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 9 } }, max: 100, min: 0 } } } }); } }
  if (!tChart) { const c = document.getElementById('t-dist')?.getContext('2d'); if (c) { tChart = new Chart(c, { type: 'bar', data: { labels: ['0–20%', '21–40%', '41–60%', '61–80%', '81–100%'], datasets: [{ label: 'Students', data: [4, 7, 22, 29, 12], backgroundColor: ['#FF3D5A', '#F59E0B', '#2563FF', '#7C3AED', '#00B87A'], borderRadius: 8 }] }, options: { ...chartBase, plugins: { ...chartBase.plugins, legend: { display: false } }, scales: { x: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 10 } } }, y: { grid: { color: 'rgba(228,230,237,.8)' }, ticks: { color: '#B0B5C8', font: { family: 'IBM Plex Mono', size: 10 } } } } } }); } }
}
function updDonut() { if (!dChart) return; const aKg = getActiveKG(); const v = aKg.map(c => S.mastery[c.id]).filter(v => v !== undefined); dChart.data.datasets[0].data = [v.filter(s => s >= 80).length, v.filter(s => s >= 60 && s < 80).length, v.filter(s => s < 60).length, aKg.length - v.length]; dChart.update(); document.getElementById('dc-n').textContent = v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) + '%' : '—'; }
function updBar() { if (!bChart) return; const aKg = getActiveKG(); bChart.data.labels = aKg.map(k => k.name.length > 9 ? k.name.slice(0, 9) + '…' : k.name); bChart.data.datasets[0].data = aKg.map(c => S.mastery[c.id] || 0); bChart.data.datasets[0].backgroundColor = aKg.map(c => { const s = S.mastery[c.id] || 0; return s >= 80 ? '#00B87A' : s >= 60 ? '#F59E0B' : '#FF3D5A'; }); bChart.update(); }
function updTrend() { if (!trChart) return; trChart.data.labels = S.history.map((_, i) => `S${i + 1}`); trChart.data.datasets[0].data = S.history; trChart.update(); }

/* UTILS */
function showLoad(t = 'PROCESSING') { document.getElementById('ll').textContent = t; document.getElementById('ls').classList.remove('hidden'); }
function hideLoad() { document.getElementById('ls').classList.add('hidden'); }
let tT;
function showToast(msg, type = 'tg') { const t = document.getElementById('toast'); t.textContent = msg; t.className = `toast ${type} show`; clearTimeout(tT); tT = setTimeout(() => t.classList.remove('show'), 3400); }

/* STUDY MATERIAL MODAL */
let currentStudyConcept = null;
function openStudyModal(conceptId) {
  const concept = KG.find(c => c.id === conceptId);
  if (!concept) return;

  currentStudyConcept = conceptId;
  document.getElementById('sm-title').textContent = concept.name;

  // Set video and notes from data
  document.getElementById('sm-video').src = concept.videoUrl || '';
  document.getElementById('sm-notes').textContent = concept.notes || 'No notes available for this topic.';

  // Update UI State
  document.getElementById('study-modal').classList.remove('hidden');
  // Small delay to allow display:block to apply before adding opacity transition class
  requestAnimationFrame(() => {
    document.getElementById('study-modal').classList.add('show');
  });
}

function closeStudyModal(e) {
  // Prevent closing if clicking inside the modal-content itself (handled by stopPropagation on the child)
  const modal = document.getElementById('study-modal');
  modal.classList.remove('show');

  // Stop the video from playing in the background
  document.getElementById('sm-video').src = '';

  setTimeout(() => {
    modal.classList.add('hidden');
    currentStudyConcept = null;
  }, 200); // match CSS transition duration
}

function goQuizFromModal() {
  if (!currentStudyConcept) return;
  // If we launch from modal, we could filter the quiz to ONLY this concept,
  // but for now let's just trigger a normal quiz in the active subject.
  goQuiz();
}
