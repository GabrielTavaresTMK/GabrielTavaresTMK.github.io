// Elementos do jogo
const ship = document.getElementById('ship');
const timerEl = document.getElementById('timer');
const lifeEl = document.getElementById('life');
const pauseMsg = document.getElementById('pause-message');
const alienCounterEl = document.getElementById('alien-counter');
const gameArea = document.getElementById('game');

// Variáveis do jogo
let shipX = window.innerWidth / 2;
let gamePaused = false;
let time = 0;
let interval;
let alienCounter = 0;
let activeMissile = null;
let lives = 3;
let canShoot = true;

// Atualiza o timer
function updateTimer() {
  time++;
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  timerEl.textContent = `${hours}:${minutes}:${seconds}`;
}

// Pausa/despausa o jogo
function togglePause() {
  gamePaused = !gamePaused;
  pauseMsg.style.display = gamePaused ? 'block' : 'none';
  
  if (gamePaused) {
    clearInterval(interval);
    document.querySelectorAll('.alien-bullet').forEach(bullet => {
      bullet.style.animationPlayState = 'paused';
    });
  } else {
    interval = setInterval(updateTimer, 1000);
    document.querySelectorAll('.alien-bullet').forEach(bullet => {
      bullet.style.animationPlayState = 'running';
    });
  }
}

// Move a nave
function moveShip(direction) {
  if (gamePaused) return;
  
  shipX += direction * 15;
  shipX = Math.max(30, Math.min(shipX, window.innerWidth - 30));
  ship.style.left = `${shipX}px`;
  
  // Move o míssil junto com a nave
  if (activeMissile) {
    activeMissile.style.left = `${shipX}px`;
  }
}

// Dispara um míssil
function shootMissile() {
  if (gamePaused || !canShoot || activeMissile) return;
  
  canShoot = false;
  activeMissile = document.createElement('div');
  activeMissile.className = 'missile';
  activeMissile.style.left = `${shipX}px`;
  gameArea.appendChild(activeMissile);
  
  const missileInterval = setInterval(() => {
    if (gamePaused) return;
    
    const currentBottom = parseInt(activeMissile.style.bottom) || 60;
    const newBottom = currentBottom + 10;
    activeMissile.style.bottom = `${newBottom}px`;
    
    // Verifica colisão com aliens
    const aliens = document.querySelectorAll('.alien');
    let hit = false;
    
    aliens.forEach(alien => {
      const alienRect = alien.getBoundingClientRect();
      const missileRect = activeMissile.getBoundingClientRect();
      
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
    
    // Verifica se saiu da tela ou acertou um alien
    if (newBottom > window.innerHeight || hit) {
      clearInterval(missileInterval);
      activeMissile.remove();
      activeMissile = null;
      canShoot = true;
    }
  }, 30);
}

// Cria os aliens
function spawnAliens() {
  const cols = 8;
  const rows = 3;
  const spacing = 70;
  const startX = (window.innerWidth - (cols * spacing)) / 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const alien = document.createElement('div');
      alien.className = 'alien';
      alien.style.left = `${startX + col * spacing}px`;
      alien.style.top = `${50 + row * spacing}px`;
      gameArea.appendChild(alien);
    }
  }
  
  moveAliens();
  alienShootLoop();
}

// Move os aliens
function moveAliens() {
  let direction = 1;
  const moveInterval = setInterval(() => {
    if (gamePaused) return;
    
    const aliens = document.querySelectorAll('.alien');
    if (aliens.length === 0) {
      clearInterval(moveInterval);
      return;
    }
    
    let shouldChangeDirection = false;
    
    aliens.forEach(alien => {
      const currentLeft = parseInt(alien.style.left);
      const newLeft = currentLeft + direction * 5;
      alien.style.left = `${newLeft}px`;
      
      if (newLeft <= 20 || newLeft >= window.innerWidth - 60) {
        shouldChangeDirection = true;
      }
    });
    
    if (shouldChangeDirection) {
      direction *= -1;
      aliens.forEach(alien => {
        const currentTop = parseInt(alien.style.top);
        alien.style.top = `${currentTop + 20}px`;
      });
    }
  }, 500);
}

// Aliens atiram
function alienShootLoop() {
  setInterval(() => {
    if (gamePaused) return;
    
    const aliens = document.querySelectorAll('.alien');
    if (aliens.length === 0) return;
    
    const shooter = aliens[Math.floor(Math.random() * aliens.length)];
    const bullet = document.createElement('div');
    bullet.className = 'alien-bullet';
    bullet.style.left = `${parseInt(shooter.style.left) + 20}px`;
    bullet.style.top = `${parseInt(shooter.style.top) + 40}px`;
    gameArea.appendChild(bullet);
    
    const bulletInterval = setInterval(() => {
      if (gamePaused) return;
      
      const currentTop = parseInt(bullet.style.top);
      const newTop = currentTop + 8;
      bullet.style.top = `${newTop}px`;
      
      // Verifica colisão com a nave
      const shipRect = ship.getBoundingClientRect();
      const bulletRect = bullet.getBoundingClientRect();
      
      if (
        bulletRect.left < shipRect.right &&
        bulletRect.right > shipRect.left &&
        bulletRect.top < shipRect.bottom &&
        bulletRect.bottom > shipRect.top
      ) {
        clearInterval(bulletInterval);
        bullet.remove();
        lives--;
        lifeEl.textContent = lives;
        
        if (lives <= 0) {
          alert(`Game Over! Seu score: ${alienCounter}`);
          location.reload();
        }
      }
      
      // Verifica se saiu da tela
      if (newTop > window.innerHeight) {
        clearInterval(bulletInterval);
        bullet.remove();
      }
    }, 50);
  }, 1500);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') moveShip(-1);
  else if (e.code === 'ArrowRight') moveShip(1);
  else if (e.code === 'Space') shootMissile();
  else if (e.code === 'KeyP') togglePause();
});

// Inicia o jogo
window.onload = () => {
  ship.style.left = `${shipX}px`;
  interval = setInterval(updateTimer, 1000);
  spawnAliens();
};

// Redimensionamento da tela
window.addEventListener('resize', () => {
  shipX = Math.max(30, Math.min(shipX, window.innerWidth - 30));
  ship.style.left = `${shipX}px`;
});