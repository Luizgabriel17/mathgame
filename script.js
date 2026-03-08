let score = 0;
let correctAnswer = "";
let currentMode = "";
let questionCount = 0;

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function goToMenu(){
  resetGame();
  showScreen("menu-screen");
}

function startMode(mode){
  resetGame();
  currentMode = mode;
  showScreen("game-screen");
  generateQuestion();
}

function resetGame(){
  score = 0;
  questionCount = 0;
  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("feedback").innerText = "";
  document.getElementById("drag-area").classList.add("hidden");
  document.getElementById("answers").innerHTML = "";
}

function generateQuestion(){
  questionCount++;
  document.getElementById("feedback").innerText = "";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("drag-area").classList.add("hidden");

  if(currentMode==="soma") generateSoma();
  if(currentMode==="sub") generateSub();
  if(currentMode==="contagem") generateContagem();
  if(currentMode==="portugues") generatePortugues();
  if(currentMode==="historia") generateHistoria();
  if(currentMode==="drag") generateDragWord();
  if(currentMode==="montar") generateMontar();
}

/* =========================
   SOMA MAIS DIFÍCIL
========================= */

function generateSoma(){

  let difficulty = getDifficulty();

  let a,b;

  if(difficulty === "facil"){
    a = randRange(1,20);
    b = randRange(1,20);
  }

  if(difficulty === "medio"){
    a = randRange(20,100);
    b = randRange(20,100);
  }

  if(difficulty === "dificil"){
    a = randRange(100,500);
    b = randRange(100,500);
  }

  correctAnswer = a + b;

  setQuestion(`${a} + ${b} = ?`);

  createOptions([
    correctAnswer,
    correctAnswer + randRange(2,15),
    correctAnswer - randRange(2,15)
  ]);
}

/* =========================
   SUBTRAÇÃO MAIS DIFÍCIL
========================= */

function generateSub(){

  let difficulty = getDifficulty();

  let a,b;

  if(difficulty === "facil"){
    a = randRange(10,30);
    b = randRange(1,10);
  }

  if(difficulty === "medio"){
    a = randRange(50,150);
    b = randRange(10,50);
  }

  if(difficulty === "dificil"){
    a = randRange(200,500);
    b = randRange(50,200);
  }

  if(b > a) [a,b] = [b,a];

  correctAnswer = a - b;

  setQuestion(`${a} - ${b} = ?`);

  createOptions([
    correctAnswer,
    correctAnswer + randRange(2,15),
    correctAnswer - randRange(2,15)
  ]);
}

function generateContagem(){
  let n = rand(8);
  correctAnswer = n;
  setQuestion("Conte: " + "🍎".repeat(n));
  createOptions([n, n+1, n-1]);
}

function generatePortugues(){

  const perguntas = [

    {q:"Qual palavra tem mais letras?", op:["CASA","ELEFANTE","BOLA"], a:"ELEFANTE"},
    {q:"Qual desses e um animal da fazenda?", op:["LEAO","PORCO","TIGRE"], a:"PORCO"},
    {q:"Quantas silabas tem CADERNO?", op:["2","3","4"], a:"3"},
    {q:"Qual rima com JANELA?", op:["PANELA","SAPATO","MENINO"], a:"PANELA"},
    {q:"Quantas letras tem BORBOLETA?", op:["8","9","10"], a:"9"},
    {q:"Qual palavra e maior?", op:["SOL","PASSARO","MAR"], a:"PASSARO"},
    {q:"Qual comeca com a mesma letra de MACACO?", op:["MESA","SAPO","BOLA"], a:"MESA"},
    {q:"Qual rima com SAPATO?", op:["GATO","CASA","LIVRO"], a:"GATO"},
    {q:"Quantas letras tem ESCOLA?", op:["5","6","7"], a:"6"},
    {q:"Qual tem 3 silabas?", op:["BOLA","CAVALO","FLOR"], a:"CAVALO"}

  ];

  let p = perguntas[rand(perguntas.length)];
  correctAnswer = p.a;
  setQuestion(p.q);
  createOptions(p.op);
}

function generateHistoria(){

  const historias = [

    {t:"Luna tem um gato.\nQuem tem um gato?", op:["Luna","Pedro","O pai"], a:"Luna"},
    {t:"Pedro foi ao parque.\nOnde ele foi?", op:["Parque","Escola","Casa"], a:"Parque"},
    {t:"Ana gosta de ler livros.\nO que Ana gosta de fazer?", op:["Brincar","Ler livros","Dormir"], a:"Ler livros"},
    {t:"Joao levou seu cachorro ao veterinario.\nQuem Joao levou?", op:["Seu amigo","Seu cachorro","Seu irmao"], a:"Seu cachorro"},
    {t:"Maria acordou cedo para ir a escola.\nPara onde Maria foi?", op:["Praia","Escola","Supermercado"], a:"Escola"},
    {t:"O pai de Lucas comprou uma bicicleta.\nO que ele comprou?", op:["Uma bola","Uma bicicleta","Um livro"], a:"Uma bicicleta"},
    {t:"Sofia fez um bolo de chocolate.\nQual bolo?", op:["Morango","Chocolate","Baunilha"], a:"Chocolate"},
    {t:"Carlos perdeu seu lapis.\nO que perdeu?", op:["Borracha","Lapis","Caderno"], a:"Lapis"},
    {t:"Beatriz foi ao mercado com sua mae.\nCom quem?", op:["Amiga","Mae","Professora"], a:"Mae"},
    {t:"O bebe chorou porque estava com fome.\nPor que chorou?", op:["Sono","Fome","Frio"], a:"Fome"}

  ];

  let h = historias[rand(historias.length)];
  correctAnswer = h.a;
  setQuestion(h.t);
  createOptions(h.op);
}

function generateDragWord(){

  const palavras = [
    {p:"BOLO", s:["BO","LO"]},
    {p:"PANELA", s:["PA","NE","LA"]},
    {p:"CANETA", s:["CA","NE","TA"]},
    {p:"GIRAFA", s:["GI","RA","FA"]},
    {p:"CANECA", s:["CA","NE","CA"]},
    {p:"CIDADE", s:["CI","DA","DE"]},
    {p:"JESUS", s:["JE","SUS"]},
    {p:"TARTARUGA", s:["TAR","TA","RU","GA"]},
    {p:"HIPOPOTAMO", s:["HI","PO","PO","TA","MO"]},
    {p:"CASA", s:["CA","SA"]}
  ];

  let w = palavras[rand(palavras.length)];
  correctAnswer = w.p;

  setQuestion("Toque nas silabas na ordem correta:");
  document.getElementById("drag-area").classList.remove("hidden");

  let drop = document.getElementById("drop-zone");
  drop.innerText = "";

  let syl = document.getElementById("syllables");
  syl.innerHTML = "";

  w.s.sort(()=>Math.random()-0.5);

  w.s.forEach(s=>{
    let span = document.createElement("span");
    span.innerText = s;
    span.className = "syllable";

    span.onclick = function(){
      drop.innerText += s;
      if(drop.innerText === correctAnswer){
        correct();
      }
    };

    syl.appendChild(span);
  });
}

function generateMontar(){

  const palavras = ["GATO","BOLA","CASA","ARVORE","COLA","PATO","SALA","LADO","SAPATO","MALA","VIRADA","MALUCO","PANELA","FACA","CIDADE","ESCOLA","SALADA","TOMATE","CEBOLA","CANETA"];

  let p = palavras[rand(palavras.length)];
  correctAnswer = p;

  setQuestion("Clique nas letras na ordem correta:");

  window.tentativa = "";

  p.split("").sort(()=>Math.random()-0.5).forEach(l=>{
    let btn = document.createElement("button");
    btn.innerText = l;

    btn.onclick = function(){
      window.tentativa += l;

      if(window.tentativa === correctAnswer){
        correct();
      }

      if(!correctAnswer.startsWith(window.tentativa)){
        wrong();
        window.tentativa = "";
      }
    };

    document.getElementById("answers").appendChild(btn);
  });
}

function createOptions(options){

  options.sort(()=>Math.random()-0.5);

  options.forEach(op=>{
    let btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = ()=> op == correctAnswer ? correct() : wrong();
    document.getElementById("answers").appendChild(btn);
  });
}

/* =========================
   SISTEMA DE PONTUAÇÃO
========================= */

function correct(){

  score += 1;

  document.getElementById("score").innerText = "⭐ " + score;

  document.getElementById("feedback").innerText = "🎉 Muito bem!";

  setTimeout(generateQuestion,1200);
}

function wrong(){

  score -= 1;

  document.getElementById("score").innerText = "⭐ " + score;

  document.getElementById("feedback").innerText = "❌ Tente novamente";
}

function setQuestion(text){
  document.getElementById("question").innerText = text;
}

function rand(max){
  return Math.floor(Math.random()*max);
}

function randRange(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
function getDifficulty(){

  if(questionCount <= 25){
    return "facil";
  }

  if(questionCount <= 50){
    return "medio";
  }

  return "dificil";
}

showScreen("welcome-screen");
