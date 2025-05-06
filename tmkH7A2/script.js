// Referências aos elementos
let ship = document.getElementById('ship');
let timerEl = document.getElementById('timer');
let lifeEl = document.getElementById('life');
let pauseMsg = document.getElementById('pause-message');
let alienCounterEl = document.getElementById('alien-counter');
let gameArea = document.getElementById('game');

let shipX = window.innerWidth / 2 - 30;
let gamePaused = false;
let time = 0;
let interval;
let alienCounter = 0;
let activeMissiles = [];
let maxMissiles = 2;

function updateTimer() {
  time++;
  let minutes = String(Math.floor(time / 60)).padStart(2, '0');
  let seconds = String(time % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function togglePause() {
  gamePaused = !gamePaused;
  pauseMsg.style.display = gamePaused ? 'block' : 'none';
  if (gamePaused) {
    clearInterval(interval);
  } else {
    interval = setInterval(updateTimer, 1000);
  }
}

function moveShip(direction) {
  if (gamePaused) return;
  let hudWidth = document.getElementById('hud').offsetWidth;
  shipX += direction * 10;
  if (shipX < hudWidth) shipX = hudWidth;
  if (shipX > window.innerWidth - 60) shipX = window.innerWidth - 60;
  ship.style.left = `${shipX}px`;
  updateMissilePositions();
}

function updateMissilePositions() {
  const missileLeft = document.getElementById('missile-left');
  const missileRight = document.getElementById('missile-right');
  if (missileLeft) missileLeft.style.left = `${shipX}px`;
  if (missileRight) missileRight.style.left = `${shipX + 50}px`;
}

function shootMissile() {
  if (gamePaused) return;
  if (activeMissiles.length >= maxMissiles) return;

  // Remove os mísseis laterais
  document.getElementById('missile-left')?.remove();
  document.getElementById('missile-right')?.remove();

  // Criar os dois mísseis centrais
  let missile1 = document.createElement('div');
  let missile2 = document.createElement('div');
  missile1.className = 'missile';
  missile2.className = 'missile';
  missile1.style.left = `${shipX + 10}px`;
  missile2.style.left = `${shipX + 40}px`;
  missile1.style.bottom = '80px';
  missile2.style.bottom = '80px';
  gameArea.appendChild(missile1);
  gameArea.appendChild(missile2);
  activeMissiles.push(missile1, missile2);

  // Movimentação
  let missile1Done = false;
  let missile2Done = false;

  function checkRemoveAll() {
    if (missile1Done && missile2Done) {
      missile1.remove();
      missile2.remove();
      activeMissiles = [];
      createSideMissiles();
    }
  }

  let move1 = setInterval(() => {
    if (gamePaused) return;
    let y = parseInt(missile1.style.bottom) + 10;
    if (y >= window.innerHeight) {
      clearInterval(move1);
      missile1Done = true;
      checkRemoveAll();
    } else {
      missile1.style.bottom = `${y}px`;
      checkAlienCollision(missile1, move1, () => {
        missile1Done = true;
        checkRemoveAll();
      });
    }
  }, 30);

  let move2 = setInterval(() => {
    if (gamePaused) return;
    let y = parseInt(missile2.style.bottom) + 10;
    if (y >= window.innerHeight) {
      clearInterval(move2);
      missile2Done = true;
      checkRemoveAll();
    } else {
      missile2.style.bottom = `${y}px`;
      checkAlienCollision(missile2, move2, () => {
        missile2Done = true;
        checkRemoveAll();
      });
    }
  }, 30);
}

function checkAlienCollision(missile, moveInterval, callback) {
  document.querySelectorAll('.alien').forEach(alien => {
    let alienRect = alien.getBoundingClientRect();
    let missileRect = missile.getBoundingClientRect();
    if (
      missileRect.left < alienRect.right &&
      missileRect.right > alienRect.left &&
      missileRect.top < alienRect.bottom &&
      missileRect.bottom > alienRect.top
    ) {
      alien.remove();
      missile.remove();
      clearInterval(moveInterval);
      alienCounter++;
      alienCounterEl.textContent = alienCounter;
      callback();
    }
  });
}

function createSideMissiles() {
  let missileLeft = document.createElement('div');
  missileLeft.id = 'missile-left';
  missileLeft.className = 'side-missile';
  missileLeft.style.left = `${shipX}px`;
  missileLeft.style.bottom = '80px';
  gameArea.appendChild(missileLeft);

  let missileRight = document.createElement('div');
  missileRight.id = 'missile-right';
  missileRight.className = 'side-missile';
  missileRight.style.left = `${shipX + 50}px`;
  missileRight.style.bottom = '80px';
  gameArea.appendChild(missileRight);
}

function spawnAliens() {
  let startX = document.getElementById('hud').offsetWidth + 40;
  let cols = 8;
  let rows = 3;
  let spacing = 80;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let alien = document.createElement('div');
      alien.className = 'alien';
      alien.style.left = `${startX + col * spacing}px`;
      alien.style.top = `${50 + row * spacing}px`;
      gameArea.appendChild(alien);
    }
  }
  moveAliens();
  alienShootLoop();
}

function moveAliens() {
  let direction = 1;
  setInterval(() => {
    if (gamePaused) return;
    document.querySelectorAll('.alien').forEach(alien => {
      let currentLeft = parseInt(alien.style.left);
      alien.style.left = `${currentLeft + direction * 10}px`;
    });
    direction *= -1;
  }, 1000);
}

function alienShootLoop() {
  setInterval(() => {
    if (gamePaused) return;
    let aliens = document.querySelectorAll('.alien');
    if (aliens.length === 0) return;
    let alien = aliens[Math.floor(Math.random() * aliens.length)];
    let bullet = document.createElement('div');
    bullet.className = 'alien-bullet';
    bullet.style.left = alien.style.left;
    bullet.style.top = alien.style.top;
    gameArea.appendChild(bullet);

    let move = setInterval(() => {
      if (gamePaused) return;
      let y = parseInt(bullet.style.top) + 5;
      if (y > window.innerHeight) {
        bullet.remove();
        clearInterval(move);
      } else {
        bullet.style.top = `${y}px`;
      }
    }, 30);
  }, 2000);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') moveShip(-1);
  else if (e.code === 'ArrowRight') moveShip(1);
  else if (e.code === 'Space') shootMissile();
  else if (e.code === 'KeyP') togglePause();
});

window.onload = () => {
  ship.style.left = `${shipX}px`;
  ship.style.bottom = '100px';
  interval = setInterval(updateTimer, 1000);
  spawnAliens();
  createSideMissiles();
};
