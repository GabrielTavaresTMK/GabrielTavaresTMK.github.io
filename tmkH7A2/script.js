// Elementos do jogo
const ship = document.getElementById('ship');
const timerEl = document.getElementById('timer');
const lifeEl = document.getElementById('life');
const pauseMsg = document.getElementById('pause-message');
const alienCounterEl = document.getElementById('alien-counter');
const gameArea = document.getElementById('game');
const leftMissile = document.querySelector('.left-missile');
const rightMissile = document.querySelector('.right-missile');

// Variáveis do jogo
let shipX = window.innerWidth / 2;
let gamePaused = false;
let time = 0;
let interval;
let alienCounter = 0;
let activeMissiles = [];
let lives = 3;
let availableMissiles = 2;
let missileReloading = false;
let nextMissileToShoot = 'left'; // Alterna entre 'left' e 'right'

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
    document.querySelectorAll('.missile').forEach(missile => {
      missile.style.animationPlayState = 'paused';
    });
  } else {
    interval = setInterval(updateTimer, 1000);
    document.querySelectorAll('.alien-bullet').forEach(bullet => {
      bullet.style.animationPlayState = 'running';
    });
    document.querySelectorAll('.missile').forEach(missile => {
      missile.style.animationPlayState = 'running';
    });
  }
}

// Move a nave
function moveShip(direction) {
  if (gamePaused) return;
  
  shipX += direction * 15;
  shipX = Math.max(30, Math.min(shipX, window.innerWidth - 30));
  ship.style.left = `${shipX}px`;
}

function shootMissile() {
  if (gamePaused || availableMissiles <= 0) return;
  
  const side = nextMissileToShoot;
  availableMissiles--;
  
  // Esconde o míssil fixo que foi disparado
  if (side === 'left') {
    leftMissile.style.display = 'none';
    nextMissileToShoot = 'right';
  } else {
    rightMissile.style.display = 'none';
    nextMissileToShoot = 'left';
  }
  
  const missile = document.createElement('div');
  missile.className = 'missile';
  missile.dataset.side = side;
  
  // Posiciona o míssil no lado correto
  if (side === 'left') {
    missile.style.left = `${shipX - 15}px`;
  } else {
    missile.style.left = `${shipX + 15}px`;
  }
  
  missile.style.bottom = '110px';
  gameArea.appendChild(missile);
  activeMissiles.push({element: missile, side: side});
  
  const missileInterval = setInterval(() => {
    if (gamePaused) return;
    
    const currentBottom = parseInt(missile.style.bottom) || 110;
    const newBottom = currentBottom + 10;
    missile.style.bottom = `${newBottom}px`;
    
    // Verifica colisão com aliens
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
    
    // Verifica se saiu da tela ou acertou um alien
    if (newBottom > window.innerHeight || hit) {
      clearInterval(missileInterval);
      missile.remove();
      
      // Marca este míssil como concluído
      activeMissiles = activeMissiles.filter(m => m.element !== missile);
      
      // Verifica se ambos mísseis foram concluídos
      checkMissilesCompletion();
    }
  }, 30);
}

// Verifica se ambos mísseis foram concluídos
function checkMissilesCompletion() {
  // Conta quantos mísseis de cada lado ainda estão ativos
  const leftActive = activeMissiles.some(m => m.side === 'left');
  const rightActive = activeMissiles.some(m => m.side === 'right');
  
  // Se não há mísseis ativos de nenhum lado, recarrega
  if (!leftActive && !rightActive && !missileReloading) {
    reloadMissiles();
  }
}

// Recarrega os mísseis
function reloadMissiles() {
  missileReloading = true;
  setTimeout(() => {
    availableMissiles = 2;
    leftMissile.style.display = 'block';
    rightMissile.style.display = 'block';
    missileReloading = false;
  }, 1000);
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