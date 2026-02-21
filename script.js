let score = 0;
let correctAnswer = "";
let currentMode = "";

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
  document.getElementById("score").innerText = "⭐ 0";
  document.getElementById("feedback").innerText = "";
  document.getElementById("drag-area").classList.add("hidden");
}

function generateQuestion(){
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

function generateSoma(){
  let a = rand(10), b = rand(10);
  correctAnswer = a+b;
  setQuestion(`${a} + ${b} = ?`);
  createOptions([correctAnswer, correctAnswer+1, correctAnswer-1]);
}

function generateSub(){
  let a = rand(10)+5, b = rand(5);
  correctAnswer = a-b;
  setQuestion(`${a} - ${b} = ?`);
  createOptions([correctAnswer, correctAnswer+1, correctAnswer-1]);
}

function generateContagem(){
  let n = rand(8);
  correctAnswer = n;
  setQuestion("Conte: "+ "🍎".repeat(n));
  createOptions([n,n+1,n-1]);
}

function generatePortugues(){
  const perguntas = [
    {q:"Qual está correta?", op:["BOLA","BOLLA","BOLAH"], a:"BOLA"},
    {q:"🐶 Qual é?", op:["CACHORRO","GATO","PATO"], a:"CACHORRO"},
    {q:"Qual rima com PATO?", op:["GATO","CASA","BOLA"], a:"GATO"}
  ];
  let p = perguntas[rand(perguntas.length)-1];
  correctAnswer = p.a;
  setQuestion(p.q);
  createOptions(p.op);
}

function generateHistoria(){
  const historias = [
    {t:"Luna tem um gato.\nQuem tem um gato?", op:["Luna","Pedro","O pai"], a:"Luna"},
    {t:"Pedro foi ao parque.\nOnde ele foi?", op:["Parque","Escola","Casa"], a:"Parque"}
  ];
  let h = historias[rand(historias.length)-1];
  correctAnswer = h.a;
  setQuestion(h.t);
  createOptions(h.op);
}

function generateDragWord(){
  const palavras = [
    {p:"BOLO", s:["BO","LO"]},
    {p:"CASA", s:["CA","SA"]}
  ];
  let w = palavras[rand(palavras.length)-1];
  correctAnswer = w.p;
  setQuestion("Arraste as sílabas:");
  document.getElementById("drag-area").classList.remove("hidden");
  let drop = document.getElementById("drop-zone");
  drop.innerText="";
  let syl = document.getElementById("syllables");
  syl.innerHTML="";
  w.s.sort(()=>Math.random()-0.5);
  w.s.forEach(s=>{
    let span=document.createElement("span");
    span.innerText=s;
    span.className="syllable";
    span.draggable=true;
    span.ondragstart=e=>e.dataTransfer.setData("text",s);
    syl.appendChild(span);
  });
  drop.ondrop=e=>{
    e.preventDefault();
    drop.innerText+=e.dataTransfer.getData("text");
    if(drop.innerText===correctAnswer) correct();
  };
  drop.ondragover=e=>e.preventDefault();
}

function generateMontar(){
  const palavras=["GATO","BOLA"];
  let p=palavras[rand(palavras.length)-1];
  correctAnswer=p;
  setQuestion("Clique nas letras:");
  p.split("").sort(()=>Math.random()-0.5).forEach(l=>{
    let btn=document.createElement("button");
    btn.innerText=l;
    btn.onclick=()=>checkMontar(l);
    document.getElementById("answers").appendChild(btn);
  });
  window.tentativa="";
}

function checkMontar(l){
  window.tentativa+=l;
  if(window.tentativa===correctAnswer) correct();
}

function createOptions(options){
  options.sort(()=>Math.random()-0.5);
  options.forEach(op=>{
    let btn=document.createElement("button");
    btn.innerText=op;
    btn.onclick=()=> op==correctAnswer ? correct() : wrong();
    document.getElementById("answers").appendChild(btn);
  });
}

function correct(){
  score++;
  document.getElementById("score").innerText="⭐ "+score;
  document.getElementById("feedback").innerText="🎉 Muito bem!";
  setTimeout(generateQuestion,1200);
}

function wrong(){
  document.getElementById("feedback").innerText="❌ Tente novamente";
}

function setQuestion(text){
  document.getElementById("question").innerText=text;
}

function rand(max){
  return Math.floor(Math.random()*max)+1;
}

showScreen("welcome-screen");