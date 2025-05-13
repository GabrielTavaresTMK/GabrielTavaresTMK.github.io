const timerEl = document.getElementById('timer-text');
const lifeEl = document.getElementById('life');
const pauseMsg = document.getElementById('pause-message');
const gameOverMsg = document.getElementById('game-over-message');
const lifeLostMsg = document.getElementById('life-lost-message');
const alienCounterEl = document.getElementById('alien-counter');
const gameArea = document.getElementById('game');
const leftMissileFixed = document.getElementById('left-missile');
const rightMissileFixed = document.getElementById('right-missile');
const shipContainer = document.getElementById('ship-container');

let gamePaused = false;
let gameActive = true;
let time = 0;
let interval;
let lastTimeUpdate = Date.now();
let alienCounter = 0;
let activeMissiles = [];
let lives = 3;
let availableMissiles = 2;
let nextMissileToShoot = 'right';
let alienSpeed = 4;
const hudWidth = 250;
let alienMoveInterval;

function initGame() {
  shipContainer.style.left = `${window.innerWidth / 2}px`;
  leftMissileFixed.style.visibility = 'visible';
  rightMissileFixed.style.visibility = 'visible';
  
  time = 0;
  alienCounter = 0;
  lives = 3;
  availableMissiles = 2;
  nextMissileToShoot = 'right';
  gameActive = true;
  
  lifeEl.textContent = lives;
  alienCounterEl.textContent = alienCounter;
  timerEl.textContent = '00:00:00';
  
  pauseMsg.style.display = 'none';
  gameOverMsg.style.display = 'none';
  lifeLostMsg.style.display = 'none';
  
  document.querySelectorAll('.alien').forEach(alien => alien.remove());
  document.querySelectorAll('.missile').forEach(missile => missile.remove());
  
  startTimer();
  spawnAliens();
}

function startTimer() {
  clearInterval(interval);
  lastTimeUpdate = Date.now();
  
  interval = setInterval(() => {
    const now = Date.now();
    const delta = now - lastTimeUpdate;
    
    if (delta >= 1000) {
      updateTimer();
      lastTimeUpdate = now - (delta % 1000);
    }
  }, 100);
}

function updateTimer() {
  if (gamePaused || !gameActive) return;
  
  time++;
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  timerEl.textContent = `${hours}:${minutes}:${seconds}`;
}

function togglePause() {
  if (!gameActive) return;
  
  gamePaused = !gamePaused;
  pauseMsg.style.display = gamePaused ? 'block' : 'none';

  if (gamePaused) {
    clearInterval(alienMoveInterval);
  } else {
    lastTimeUpdate = Date.now();
    moveAliens();
  }
}

function moveShip(direction) {
  if (gamePaused || !gameActive) return;

  const currentLeft = parseInt(shipContainer.style.left);
  const newLeft = currentLeft + (direction * 15);
  
  const minLeft = hudWidth + 50;
  const maxLeft = window.innerWidth - 50;
  
  shipContainer.style.left = `${Math.max(minLeft, Math.min(newLeft, maxLeft))}px`;
}

function shootMissile() {
  if (gamePaused || !gameActive || availableMissiles <= 0) return;

  const side = nextMissileToShoot;
  availableMissiles--;
  
  const fixedMissile = side === 'left' ? leftMissileFixed : rightMissileFixed;
  fixedMissile.style.visibility = 'hidden';

  const missile = document.createElement('div');
  missile.className = 'missile';
  missile.dataset.side = side;
  missile.dataset.missileNumber = availableMissiles === 0 ? 'second' : 'first';

  const fixedMissileRect = fixedMissile.getBoundingClientRect();
  missile.style.left = `${fixedMissileRect.left}px`;
  missile.style.bottom = `${window.innerHeight - 750}px`;

  gameArea.appendChild(missile);
  activeMissiles.push(missile);

  nextMissileToShoot = side === 'left' ? 'right' : 'left';

  const missileInterval = setInterval(() => {
    if (gamePaused || !gameActive) return;

    const currentBottom = parseInt(missile.style.bottom);
    missile.style.bottom = `${currentBottom + 8}px`;

    const aliens = document.querySelectorAll('.alien');
    let hit = false;

    aliens.forEach(alien => {
      const alienRect = alien.getBoundingClientRect();
      const missileRect = missile.getBoundingClientRect();

      if (
        missileRect.left < alienRect.right &&
        missileRect.right > alienRect.left &&
        missileRect.top < alienRect.bottom &&
        missileRect.bottom > alienRect.top
      ) {
        alien.remove();
        hit = true;
        alienCounter++;
        alienCounterEl.textContent = alienCounter;
      }
    });

    if (parseInt(missile.style.bottom) > window.innerHeight || hit) {
      clearInterval(missileInterval);
      missile.remove();
      activeMissiles = activeMissiles.filter(m => m !== missile);

      if (missile.dataset.missileNumber === 'second') {
        leftMissileFixed.style.visibility = 'visible';
        rightMissileFixed.style.visibility = 'visible';
        availableMissiles = 2;
      }
    }
  }, 30);
}

function spawnAliens() {
  const alienCount = 3;
  const spacing = 180;
  const startX = (window.innerWidth - (alienCount * spacing)) / 2;

  for (let i = 0; i < alienCount; i++) {
    const alien = document.createElement('div');
    alien.className = 'alien';
    alien.style.position = 'absolute';
    alien.style.width = '70px';
    alien.style.height = '70px';
    alien.style.backgroundImage = "url('alien.png')";
    alien.style.backgroundSize = 'contain';
    alien.style.backgroundRepeat = 'no-repeat';
    alien.style.zIndex = '5';
    alien.style.filter = 'drop-shadow(0 0 5px #f00)';
    alien.style.left = `${startX + i * spacing}px`;
    alien.style.top = '-70px';
    gameArea.appendChild(alien);
  }

  moveAliens();
}

function moveAliens() {
  clearInterval(alienMoveInterval);
  
  alienMoveInterval = setInterval(() => {
    if (gamePaused || !gameActive) return;

    const aliens = document.querySelectorAll('.alien');
    if (aliens.length === 0) {
      clearInterval(alienMoveInterval);
      spawnAliens();
      return;
    }

    aliens.forEach(alien => {
      const currentTop = parseInt(alien.style.top);
      alien.style.top = `${currentTop + alienSpeed}px`;

      const alienRect = alien.getBoundingClientRect();
      const shipRect = shipContainer.getBoundingClientRect();

      if (alienRect.bottom >= shipRect.top) {
        loseLife();
      }
    });
  }, 100);
}

function loseLife() {
  if (!gameActive) return;
  
  lives--;
  lifeEl.textContent = lives;
  
  gameActive = false;
  clearInterval(alienMoveInterval);
  
  document.querySelectorAll('.alien').forEach(alien => alien.remove());
  document.querySelectorAll('.missile').forEach(missile => missile.remove());

  if (lives <= 0) {
    gameOverMsg.style.display = 'block';
  } else {
    lifeLostMsg.style.display = 'block';
    
    const continueListener = (e) => {
      if (e.code === 'Space') {
        document.removeEventListener('keydown', continueListener);
        continueGame();
      }
    };
    document.addEventListener('keydown', continueListener);
  }
}

function continueGame() {
  lifeLostMsg.style.display = 'none';
  gameActive = true;
  
  availableMissiles = 2;
  nextMissileToShoot = 'right';
  leftMissileFixed.style.visibility = 'visible';
  rightMissileFixed.style.visibility = 'visible';
  
  startTimer();
  spawnAliens();
}

function gameOver() {
  gameOverMsg.style.display = 'block';
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') moveShip(-1);
  if (e.code === 'ArrowRight') moveShip(1);
  if (e.code === 'Space') {
    if (!gameActive && lives > 0) continueGame();
    else if (gameActive) shootMissile();
  }
  if (e.code === 'KeyP') togglePause();
  if (e.code === 'KeyR' && !gameActive && lives <= 0) initGame();
});

window.onload = initGame;
