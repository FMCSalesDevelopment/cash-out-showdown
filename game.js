(function () {
  // ---- Scoring & timing (ms-precision) ----
  const START_POINTS = 1000;          // per standard question
  const QUESTION_MS  = 120_000;       // 120 seconds per question
  const UI_TICK_MS   = 100;           // refresh HUD ~10x/second
  const MAX_Q        = 20;

  // Final Showdown timing/points (also ms-decay)
  const FINAL_START_POINTS = 2000;
  const FINAL_MS           = 120_000; // 120 seconds for final as well

  // elements
  const startBtn       = document.getElementById('startBtn');
  const qNumber        = document.getElementById('qNumber');
  const timerEl        = document.getElementById('timer');
  const pointsEl       = document.getElementById('points');
  const totalEl        = document.getElementById('total');
  const qText          = document.getElementById('qText');
  const answersWrap    = document.getElementById('answers');
  const submitBtn      = document.getElementById('submitBtn');
  const feedback       = document.getElementById('feedback');
  const correctLabel   = document.getElementById('correctLabel');
  const explanation    = document.getElementById('explanation');
  const leader         = document.getElementById('leaderboard');
  const leaderList     = document.getElementById('leaderboardList');
  const finalSec       = document.getElementById('final');
  const finalStartBtn  = document.getElementById('finalStartBtn');
  const finalWrap      = document.getElementById('finalWrap');
  const finalQ         = document.getElementById('finalQ');
  const finalAnswers   = document.getElementById('finalAnswers');
  const finalSubmitBtn = document.getElementById('finalSubmitBtn');
  const finalResult    = document.getElementById('finalResult');
  const restartBtn     = document.getElementById('restartBtn');

  let idx = 0, total = 0, intervalId = null, deadlineMs = 0, startMs = 0;
  let livePoints = 0, selected = null, scores = [], deck = [];
  let phase = 'normal'; // 'normal' | 'final'

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startGame() {
    deck = shuffle([...window.GAME_QUESTIONS]).slice(0, MAX_Q);
    idx = 0; total = 0; scores = []; selected = null;
    leader.hidden = false; leaderList.innerHTML = '';
    finalSec.hidden = true;
    feedback.hidden = true;
    renderQuestion();
  }

  function renderQuestion() {
    if (idx >= deck.length) {
      // Move to final showdown
      finalSec.hidden = false;
      window.scrollTo({ top: finalSec.offsetTop, behavior: 'smooth' });
      return;
    }
    phase = 'normal';

    const q = deck[idx];
    qNumber.textContent = `${idx + 1} / ${deck.length}`;
    qText.textContent = q.q;
    answersWrap.innerHTML = '';
    selected = null;
    submitBtn.disabled = true;
    feedback.hidden = true;

    q.choices.forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.role = 'listitem';
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('tabindex', '0');
      btn.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + i)}.</span> <span>${text}</span>`;
      btn.addEventListener('click', () => select(i, btn));
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
      answersWrap.appendChild(btn);
    });

    // precise timer & ms-decay points
    startMs   = performance.now();
    deadlineMs = startMs + QUESTION_MS;
    livePoints = START_POINTS;
    kickTimer(QUESTION_MS, START_POINTS);
  }

  function kickTimer(durationMs, startPts) {
    // clear prior
    if (intervalId) clearInterval(intervalId);

    // immediate HUD update
    updateHud(durationMs, startPts);

    intervalId = setInterval(() => {
      updateHud(durationMs, startPts);
      if (performance.now() >= deadlineMs) {
        clearInterval(intervalId);
        // auto-submit when time runs out
        if (phase === 'normal') submit();
        else submitFinal();
      }
    }, UI_TICK_MS);
  }

  function updateHud(durationMs, startPts) {
    const now = performance.now();
    const remainingMs = Math.max(0, deadlineMs - now);
    const fraction = remainingMs / durationMs; // 1 → 0
    livePoints = Math.max(0, Math.round(startPts * fraction)); // linear ms-based drop to 0

    timerEl.textContent  = formatTime(remainingMs);
    pointsEl.textContent = livePoints;
    totalEl.textContent  = total;
  }

  function select(i, btn) {
    [...answersWrap.children].forEach(b => b.setAttribute('aria-checked', 'false'));
    btn.setAttribute('aria-checked', 'true');
    selected = i;
    submitBtn.disabled = false;
  }

  function submit() {
    const q = deck[idx];
    if (intervalId) clearInterval(intervalId);

    const correct = (selected === q.answerIndex);
    const earned  = correct ? livePoints : 0;  // ms-accurate points at click time

    total += earned;
    scores.push({ n: idx + 1, earned, correct });
    totalEl.textContent = total;

    // feedback
    correctLabel.textContent = correct ? "✅ Correct!" : "❌ Not quite.";
    explanation.textContent  = `${q.choices[q.answerIndex]} — ${q.expl}`;
    feedback.hidden = false;

    // leaderboard line
    const li = document.createElement('li');
    li.textContent = `Q${idx + 1}: ${earned} pts • ${correct ? "Correct" : "Wrong"}`;
    leaderList.appendChild(li);

    // next question after short pause
    setTimeout(() => {
      feedback.hidden = true;
      idx++;
      renderQuestion();
    }, 2000);
  }

  function startFinal() {
    phase = 'final';
    finalWrap.hidden = false;
    finalResult.hidden = true;
    finalSubmitBtn.disabled = true;
    finalQ.textContent = window.FINAL_QUESTION.q;
    finalAnswers.innerHTML = '';
    selected = null;

    window.FINAL_QUESTION.choices.forEach((text, i) => {
      const b = document.createElement('button');
      b.className = 'answer';
      b.setAttribute('aria-checked', 'false');
      b.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + i)}.</span> <span>${text}</span>`;
      b.addEventListener('click', () => {
        [...finalAnswers.children].forEach(x => x.setAttribute('aria-checked', 'false'));
        b.setAttribute('aria-checked', 'true');
        finalSubmitBtn.disabled = false;
        selected = i;
      });
      finalAnswers.appendChild(b);
    });

    // 120s final + ms-decay from 2000 → 0
    startMs    = performance.now();
    deadlineMs = startMs + FINAL_MS;
    livePoints = FINAL_START_POINTS;
    kickTimer(FINAL_MS, FINAL_START_POINTS);
  }

  function submitFinal() {
    if (intervalId) clearInterval(intervalId);

    const correct = (selected === window.FINAL_QUESTION.answerIndex);
    const earned  = correct ? livePoints : 0; // ms-accurate

    total += earned;
    totalEl.textContent = total;

    finalResult.hidden = false;
    finalResult.textContent =
      `${correct ? "✅ Correct" : "❌ Incorrect"} — ${window.FINAL_QUESTION.choices[window.FINAL_QUESTION.answerIndex]} `
      + `(${window.FINAL_QUESTION.expl}). Final Score: ${total} pts.`;
    finalSubmitBtn.disabled = true;
    restartBtn.hidden = false;
    window.scrollTo({ top: finalSec.offsetTop, behavior: 'smooth' });
  }

  // utilities
  function formatTime(ms) {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  // Events
  startBtn.addEventListener('click', startGame);
  submitBtn.addEventListener('click', submit);
  finalStartBtn.addEventListener('click', startFinal);
  finalSubmitBtn.addEventListener('click', submitFinal);
  restartBtn.addEventListener('click', () => { location.reload(); });

  // Keyboard navigation between answers (left/right)
  document.addEventListener('keydown', (e) => {
    if (!answersWrap || !answersWrap.children.length) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const list = [...answersWrap.children];
      let i = list.findIndex(b => b.getAttribute('aria-checked') === 'true');
      if (i < 0) i = 0;
      else i = (e.key === 'ArrowRight') ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[i].focus(); list[i].click();
    }
  });
})();
