const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const chao = document.querySelector('.chao');
const reset = document.getElementById('reiniciar');
const score = document.getElementById('score');
const animacaoScore = document.querySelector('#score');
const dev = document.querySelector('.dev');
const pular = document.getElementById('pular');
let recorde = localStorage.getItem('recorde') ? parseInt(localStorage.getItem('recorde')) : 0;
const gameBoard = document.getElementById('gameBoard');
const marioMusic = document.getElementById('mario-music');
const marioJump = document.getElementById('mario-jump');
const marioGameOver = document.getElementById('game-over');

const jump = () => {
    mario.classList.add('jump');
    marioJumpPlay();

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

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

let loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    const chaoPosition = window.getComputedStyle(chao).backgroundPosition.replace('px', '');
    const chaoPositionSemPX = chaoPosition.replace('%', '');
    const chaoNum = parseFloat(chaoPositionSemPX);
    

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition< 170) {
        gameOver(pipePosition, marioPosition, chaoNum);
    }

}, 10);

const updateGameBoardColor = (pontos) => {
    if (pontos > 100 && pontos <= 200) {
        gameBoard.classList.add('orange-mode');
        gameBoard.classList.remove('night-mode');
    } else if (pontos > 200) {
        gameBoard.classList.remove('orange-mode');
        gameBoard.classList.add('night-mode');
    } else {
        gameBoard.classList.remove('orange-mode', 'night-mode');
    }
};

const gameOver = (pipePosition, marioPosition, chaoNum) => {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`
    pular.setAttribute('disabled', true);
    // mario.style.animation = 'none';

    // let marioBottom = mario.style.bottom;
    // marioBottom = `${marioPosition}px`;
    // console.log(`${marioBottom}`);

    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem('recorde', recorde); // Salve o novo recorde no localStorage
        updateRecord(); // Chame a função para atualizar o recorde na interface
    }


    mario.style.bottom = `${marioPosition}px`;

    mario.src = './img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '45px';

    chao.style.animation = 'none';
    chao.style.backgroundPosition = `${chaoNum}`;

    animacaoScore.style.animation = 'score 1s infinite';

    dev.style.display = 'inline';
    reset.style.display = 'inline';
    clearInterval(loop);
    clearInterval(loopPontos);
    pauseMarioMusic();
    marioGameOverPlay();
}
/**/

const originalMario = {
    animation: 'animation: jump-mario 500ms ease-out',
    bottom: '84px',
    src: './img/mario.gif',
    width: '150px',
    marginLeft: '0px'
}

const originalPipe = {
    left: '166vh',
    animation: 'pipe-animation 1.5s infinite linear'
}

const originalChao = {
    animation: 'floor 1.23s infinite linear',
    backgroundPosition: 'background-position: 43px;'
}

const originalBotao = {
    innerHTML : ''
}

const resetGame = () => {
    // redefine os valores do Mario
    
    pular.removeAttribute('disabled');
    // mario.style.animation = originalMario.animation;

    // o problema ta aqui
    mario.style.bottom = originalMario.bottom;
    console.log( mario.style.bottom);

    mario.src = originalMario.src;
    mario.style.width = originalMario.width;
    mario.style.marginLeft = originalMario.marginLeft;

    // redefine os valores do cano
    pipe.style.animation = originalPipe.animation;
    pipe.style.left = originalPipe.left;

    // redefine os valores do chão
    chao.style.animation = originalChao.animation;
    chao.style.backgroundPosition = originalChao.backgroundPosition;

    // redefine o score
    pontos = 0;
    score.innerText = 'Score: 0';
    animacaoScore.style.animation = '';

    // esconde o botão de reiniciar e o texto do desenvolvedor
    dev.style.display = 'none';
    reset.style.display = 'none';

    playMarioMusic();
    marioGameOver.pause();
    marioGameOver.currentTime = 0;

    // reinicia os loops do jogo
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
        const chaoPosition = window.getComputedStyle(chao).backgroundPosition.replace('px', '');
        const chaoPositionSemPX = chaoPosition.replace('%', '');
        const chaoNum = parseFloat(chaoPositionSemPX);
        
    
        if(pipePosition <= 120 && pipePosition > 0 && marioPosition< 170) {
            gameOver(pipePosition, marioPosition, chaoNum);
        }
    }, 10);

    loopPontos = setInterval(() => {
        pontos++;
        score.innerText = `Score: ${pontos}`;
        updateGameBoardColor(pontos);
    },100);
};

const updateRecord = () => {
    // Atualize o elemento HTML com o valor do recorde
    document.getElementById('record').innerText = `Recorde: ${recorde}`;
};

/**/

let pontos = 0;
let loopPontos = setInterval(() => {
    pontos++;
    score.innerText = `Score: ${pontos}`;
    updateGameBoardColor(pontos);
    recorde = 0;
    window.onload = updateRecord;
    playMarioMusic();
},100);

document.getElementById('pular').addEventListener('click', jump );
document.getElementById('reiniciar').addEventListener('click', resetGame);