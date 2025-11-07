(function(){
  const START_POINTS = 1000;
  const TICK_MS = 3000;      // score drops every 3 seconds
  const DROP = 1000/5;       // 1000 → 750 → 500 → 250 → 100
  const MAX_Q = 20;

  // elements
  const startBtn = document.getElementById('startBtn');
  const qNumber = document.getElementById('qNumber');
  const timerEl = document.getElementById('timer');
  const pointsEl = document.getElementById('points');
  const totalEl = document.getElementById('total');
  const qText = document.getElementById('qText');
  const answersWrap = document.getElementById('answers');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('feedback');
  const correctLabel = document.getElementById('correctLabel');
  const explanation = document.getElementById('explanation');
  const leader = document.getElementById('leaderboard');
  const leaderList = document.getElementById('leaderboardList');
  const finalSec = document.getElementById('final');
  const finalStartBtn = document.getElementById('finalStartBtn');
  const finalWrap = document.getElementById('finalWrap');
  const finalQ = document.getElementById('finalQ');
  const finalAnswers = document.getElementById('finalAnswers');
  const finalSubmitBtn = document.getElementById('finalSubmitBtn');
  const finalResult = document.getElementById('finalResult');
  const restartBtn = document.getElementById('restartBtn');

  let idx=0, total=0, countdown, timeLeft, livePoints, selected=null, scores=[];
  let deck = [];

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  function startGame(){
    deck = shuffle([...window.GAME_QUESTIONS]).slice(0, MAX_Q);
    idx=0; total=0; scores=[];
    leader.hidden = false; leaderList.innerHTML='';
    finalSec.hidden = true;
    feedback.hidden = true;
    renderQuestion();
  }

  function renderQuestion(){
    if(idx >= deck.length){
      // Move to final showdown
      finalSec.hidden = false;
      window.scrollTo({top:finalSec.offsetTop, behavior:'smooth'});
      return;
    }
    const q = deck[idx];
    qNumber.textContent = `${idx+1} / ${deck.length}`;
    qText.textContent = q.q;
    answersWrap.innerHTML='';
    selected = null;
    submitBtn.disabled = true;
    feedback.hidden = true;

    q.choices.forEach((text, i)=>{
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.role = 'listitem';
      btn.setAttribute('aria-checked','false');
      btn.setAttribute('tabindex','0');
      btn.innerHTML = `<span class="choice-letter">${String.fromCharCode(65+i)}.</span> <span>${text}</span>`;
      btn.addEventListener('click', ()=>select(i, btn));
      btn.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); btn.click(); }});
      answersWrap.appendChild(btn);
    });

    // timer & points
    timeLeft = 15;
    livePoints = START_POINTS;
    updateHud();
    clearInterval(countdown);
    countdown = setInterval(tick, 1000);
  }

  function tick(){
    timeLeft--;
    if(timeLeft % 3 === 2 && livePoints > 100){
      livePoints = Math.max(100, livePoints - DROP);
    }
    updateHud();
    if(timeLeft <= 0){
      clearInterval(countdown);
      submit(); // auto-submit when time runs out
    }
  }

  function updateHud(){
    timerEl.textContent = `${timeLeft}s`;
    pointsEl.textContent = Math.round(livePoints);
    totalEl.textContent = total;
  }

  function select(i, btn){
    [...answersWrap.children].forEach(b=>b.setAttribute('aria-checked','false'));
    btn.setAttribute('aria-checked','true');
    selected = i;
    submitBtn.disabled = false;
  }

  function submit(){
    const q = deck[idx];
    clearInterval(countdown);
    let earned = 0;
    const correct = (selected === q.answerIndex);
    if(correct){
      if(timeLeft >= 12) earned = 1000;
      else if(timeLeft >= 9) earned = 750;
      else if(timeLeft >= 5) earned = 500;
      else if(timeLeft >= 1) earned = 250;
      else earned = 100;
    } else {
      earned = 0;
    }
    total += earned;
    scores.push({n: idx+1, earned, correct});
    totalEl.textContent = total;

    // feedback
    correctLabel.textContent = correct ? "✅ Correct!" : "❌ Not quite.";
    explanation.textContent = `${q.choices[q.answerIndex]} — ${q.expl}`;
    feedback.hidden = false;

    // update leaderboard
    const li = document.createElement('li');
    li.textContent = `Q${idx+1}: ${earned} pts • ${correct ? "Correct" : "Wrong"}`;
    leaderList.appendChild(li);

    // automatically go to next question after delay
    setTimeout(()=>{
      feedback.hidden = true;
      idx++;
      renderQuestion();
    }, 2000); // 2-second pause before next question
  }

  function startFinal(){
    finalWrap.hidden = false;
    finalResult.hidden = true;
    finalSubmitBtn.disabled = true;
    finalQ.textContent = window.FINAL_QUESTION.q;
    finalAnswers.innerHTML='';
    window.FINAL_QUESTION.choices.forEach((text, i)=>{
      const b = document.createElement('button');
      b.className='answer';
      b.setAttribute('aria-checked','false');
      b.innerHTML = `<span class="choice-letter">${String.fromCharCode(65+i)}.</span> <span>${text}</span>`;
      b.addEventListener('click', ()=>{ 
        [...finalAnswers.children].forEach(x=>x.setAttribute('aria-checked','false'));
        b.setAttribute('aria-checked','true');
        finalSubmitBtn.disabled = false;
        selected = i;
      });
      finalAnswers.appendChild(b);
    });

    timeLeft = 10;
    livePoints = 2000;
    updateHud();
    clearInterval(countdown);
    countdown = setInterval(()=>{
      timeLeft--;
      if(timeLeft<=0){ clearInterval(countdown); submitFinal(); }
      updateHud();
    }, 1000);
  }

  function submitFinal(){
    clearInterval(countdown);
    const correct = (selected === window.FINAL_QUESTION.answerIndex);
    const earned = correct ? 2000 : 0;
    total += earned;
    totalEl.textContent = total;

    finalResult.hidden = false;
    finalResult.textContent = `${correct ? "✅ Correct" : "❌ Incorrect"} — ${window.FINAL_QUESTION.choices[window.FINAL_QUESTION.answerIndex]} (${window.FINAL_QUESTION.expl}). Final Score: ${total} pts.`;
    finalSubmitBtn.disabled = true;
    restartBtn.hidden = false;
    window.scrollTo({top:finalSec.offsetTop, behavior:'smooth'});
  }

  // Events
  startBtn.addEventListener('click', startGame);
  submitBtn.addEventListener('click', submit);
  finalStartBtn.addEventListener('click', startFinal);
  finalSubmitBtn.addEventListener('click', submitFinal);
  restartBtn.addEventListener('click', ()=>{ location.reload(); });

  // Keyboard navigation between answers (left/right)
  document.addEventListener('keydown', (e)=>{
    if(!answersWrap || !answersWrap.children.length) return;
    if(e.key==='ArrowRight' || e.key==='ArrowLeft'){
      const list = [...answersWrap.children];
      let i = list.findIndex(b=>b.getAttribute('aria-checked')==='true');
      if(i<0) i = 0;
      else i = (e.key==='ArrowRight') ? (i+1)%list.length : (i-1+list.length)%list.length;
      list[i].focus(); list[i].click();
    }
  });
})();
