const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const missil = document.querySelector(".missil");
const chao = document.querySelector(".chao");
const reset = document.getElementById("reiniciar");
const score = document.getElementById("score");
const animacaoScore = document.querySelector("#score");
const dev = document.querySelector(".dev");
const pular = document.getElementById("pular");
let recorde = localStorage.getItem("recorde")
  ? parseInt(localStorage.getItem("recorde"))
  : 0;
const gameBoard = document.getElementById("gameBoard");
const marioMusic = document.getElementById("mario-music");
const marioJump = document.getElementById("mario-jump");
const marioGameOver = document.getElementById("game-over");
const mutar = document.getElementById("mutar");
let musicaMuda = localStorage.getItem("musicaMuda") === "true" ? true : false;
mutar.innerText = musicaMuda ? "Tocar" : "Mutar";
let position = 0;
let tipo = true;

const jump = () => {
  mario.classList.add("jump");
  if (!musicaMuda) {
    pauseAllSounds();
  } else {
    marioJumpPlay();
  }

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

mutar.addEventListener("click", () => {
  if (!musicaMuda) {
    pauseAllSounds();
    musicaMuda = true;
    mutar.innerText = "Tocar";
  } else {
    playMarioMusic();
    musicaMuda = false;
    mutar.innerText = "Mutar";
  }
  // Salve o estado de mutação no armazenamento local
  localStorage.setItem("musicaMuda", musicaMuda);
});

function playMarioMusic() {
  marioMusic.play();
}

function marioJumpPlay() {
  marioJump.play();
}

function marioGameOverPlay() {
  marioGameOver.play();
}

function pauseMarioMusic() {
  marioMusic.pause();
  marioMusic.currentTime = 0;
}

function pauseAllSounds() {
  if (!musicaMuda) {
    pauseMarioMusic();
    marioGameOver.pause();
    marioGameOver.currentTime = 0;
    marioJump.pause();
    marioJump.currentTime = 0;
  }
}

let loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const missilPosition = missil.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  const chaoPosition = window
    .getComputedStyle(chao)
    .backgroundPosition.replace("px", "");
  const chaoPositionSemPX = chaoPosition.replace("%", "");
  const chaoNum = parseFloat(chaoPositionSemPX);

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 170) {
    position = pipePosition;
    tipo = false;
    gameOver(position, tipo, marioPosition, chaoNum);
  } else if (
    missilPosition <= 120 &&
    missilPosition > 0 &&
    marioPosition < 170
  ) {
    position = missilPosition;
    tipo = true;
    gameOver(position, tipo, marioPosition, chaoNum);
  }
  if (pontos > 100) {
    missil.style.display = "block";
    pipe.style.display = "none"; // Oculta o elemento .pipe
  } else {
    missil.style.display = "none";
    pipe.style.display = "block"; // Exibe o elemento .pipe
  }
}, 10);

const updateGameBoardColor = (pontos) => {
  if (pontos > 100 && pontos <= 200) {
    gameBoard.classList.add("orange-mode");
    gameBoard.classList.remove("night-mode");
  } else if (pontos > 200) {
    gameBoard.classList.remove("orange-mode");
    gameBoard.classList.add("night-mode");
  } else {
    gameBoard.classList.remove("orange-mode", "night-mode");
  }
};

const gameOver = (position, tipo, marioPosition, chaoNum) => {
  if (!tipo) {
    pipe.style.animation = "none";
    pipe.style.left = `${position}px`;
  } else {
    missil.style.animation = "none";
    missil.style.left = `${position}px`;
  }

  pular.setAttribute("disabled", true);

  if (pontos > recorde) {
    recorde = pontos;
    localStorage.setItem("recorde", recorde);
    updateRecord();
  }
  if (!musicaMuda) {
    pauseAllSounds();
  } else {
    marioGameOverPlay();
  }

  mario.style.bottom = `${marioPosition}px`;
  mario.src = "./img/game-over.png";
  mario.style.width = "75px";
  mario.style.marginLeft = "45px";

  chao.style.animation = "none";
  chao.style.backgroundPosition = `${chaoNum}`;

  animacaoScore.style.animation = "score 1s infinite";

  dev.style.display = "inline";
  reset.style.display = "inline";
  clearInterval(loop);
  clearInterval(loopPontos);
  pauseAllSounds();
};

const originalMario = {
  animation: "animation: jump-mario 500ms ease-out",
  bottom: "84px",
  src: "./img/mario.gif",
  width: "150px",
  marginLeft: "0px",
};

const originalPipe = {
  left: "166vh",
  animation: "pipe-animation 1.5s infinite linear",
};

const originalChao = {
  animation: "floor 1.23s infinite linear",
  backgroundPosition: "background-position: 43px;",
};

const originalBotao = {
  innerHTML: "",
};

const resetGame = () => {
  pular.removeAttribute("disabled");
  mario.style.bottom = originalMario.bottom;
  mario.src = originalMario.src;
  mario.style.width = originalMario.width;
  mario.style.marginLeft = originalMario.marginLeft;

  if (!tipo) {
    pipe.style.animation = originalPipe.animation;
    pipe.style.left = originalPipe.left;
  } else {
    missil.style.animation = originalPipe.animation;
    missil.style.left = originalPipe.left;
  }

  chao.style.animation = originalChao.animation;
  chao.style.backgroundPosition = originalChao.backgroundPosition;

  pontos = 0;
  score.innerText = "Score: 0";
  animacaoScore.style.animation = "";

  dev.style.display = "none";
  reset.style.display = "none";

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const missilPosition = missil.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    const chaoPosition = window
      .getComputedStyle(chao)
      .backgroundPosition.replace("px", "");
    const chaoPositionSemPX = chaoPosition.replace("%", "");
    const chaoNum = parseFloat(chaoPositionSemPX);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 170) {
      position = pipePosition;
      tipo = false;
      gameOver(position, tipo, marioPosition, chaoNum);
    } else if (
      missilPosition <= 120 &&
      missilPosition > 0 &&
      marioPosition < 170
    ) {
      position = missilPosition;
      tipo = true;
      gameOver(position, tipo, marioPosition, chaoNum);
    }

    if (pontos > 100) {
      missil.style.display = "block";
      pipe.style.display = "none"; // Oculta o elemento .pipe
    } else {
      missil.style.display = "none";
      pipe.style.display = "block"; // Exibe o elemento .pipe
    }
  }, 10);

  loopPontos = setInterval(() => {
    pontos++;
    score.innerText = `Score: ${pontos}`;
    updateGameBoardColor(pontos);
    if (!musicaMuda) {
      pauseAllSounds();
    } else {
      playMarioMusic();
      marioGameOver.pause();
      marioGameOver.currentTime = 0;
    }
  }, 100);
};

const updateRecord = () => {
  document.getElementById("record").innerText = `Recorde: ${recorde}`;
};

let pontos = 0;
let loopPontos = setInterval(() => {
  pontos++;
  score.innerText = `Score: ${pontos}`;
  updateGameBoardColor(pontos);
  recorde = 0;
  window.onload = updateRecord;
  if (!musicaMuda) {
    pauseAllSounds();
  } else {
    playMarioMusic();
  }
}, 100);

document.getElementById("pular").addEventListener("click", jump);
document.getElementById("reiniciar").addEventListener("click", resetGame);
