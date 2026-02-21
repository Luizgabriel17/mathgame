let score = 0;
let phase = 1;
let questionCount = 0;
let correctAnswer = 0;
let currentMode = "";
const maxPhases = 3;
const questionsPerPhase = 5;

function startGame() {
  showScreen("menu-screen");
}

function startMode(mode) {
  currentMode = mode;
  score = 0;
  phase = 1;
  questionCount = 0;
  document.getElementById("score").innerText = "⭐ Pontos: 0";
  showScreen("game-screen");
  generateQuestion();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function generateQuestion() {
  if (phase > maxPhases) {
    endGame();
    return;
  }

  if (questionCount >= questionsPerPhase) {
    phase++;
    questionCount = 0;
  }

  document.getElementById("phase-title").innerText = "Fase " + phase;
  document.getElementById("feedback").innerText = "";

  if (currentMode === "soma") generateSoma();
  if (currentMode === "sub") generateSub();
  if (currentMode === "contagem") generateContagem();
}

function generateSoma() {
  let n1 = rand(phase * 5);
  let n2 = rand(phase * 5);
  correctAnswer = n1 + n2;
  document.getElementById("question").innerText = `${n1} + ${n2} = ?`;
  createOptions();
}

function generateSub() {
  let n1 = rand(phase * 5) + 5;
  let n2 = rand(phase * 5);
  correctAnswer = n1 - n2;
  document.getElementById("question").innerText = `${n1} - ${n2} = ?`;
  createOptions();
}

function generateContagem() {
  let count = rand(phase * 5);
  correctAnswer = count;
  let emojis = "🍎".repeat(count);
  document.getElementById("question").innerText = emojis;
  createOptions();
}

function createOptions() {
  const div = document.getElementById("answers");
  div.innerHTML = "";
  let options = [correctAnswer];

  while (options.length < 3) {
    let wrong = correctAnswer + rand(5) - 2;
    if (!options.includes(wrong) && wrong >= 0) options.push(wrong);
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = () => checkAnswer(op);
    div.appendChild(btn);
  });
}

function checkAnswer(ans) {
  if (ans === correctAnswer) {
    playSound(true);
    score++;
    questionCount++;
    document.getElementById("score").innerText = "⭐ Pontos: " + score;
    document.getElementById("feedback").innerText = "🎉 Muito bem!";
    saveProgress();
    setTimeout(generateQuestion, 1000);
  } else {
    playSound(false);
    document.getElementById("feedback").innerText = "❌ Tente novamente!";
  }
}

function endGame() {
  showScreen("final-screen");
  document.getElementById("final-score").innerText =
    "Você fez " + score + " pontos!";
}

function goToMenu() {
  showScreen("menu-screen");
}

function rand(max) {
  return Math.floor(Math.random() * max) + 1;
}

/* Sons suaves */
function playSound(correct) {
  let audio = new Audio(
    correct
      ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
      : "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
  );
  audio.volume = 0.3;
  audio.play();
}

/* Salvar progresso */
function saveProgress() {
  localStorage.setItem("mathgame_score", score);
}