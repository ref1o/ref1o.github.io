const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Sand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.color = '#f5deb3';
  }

  update() {
    this.vy += 0.1;
    this.x += this.vx;
    this.y += this.vy;

    // Limita la velocità massima della particella
    if (this.vy > 5) {
      this.vy = 5;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 1, 1);
  }

  collidesWith(otherParticle) {
    const dx = otherParticle.x - this.x;
    const dy = otherParticle.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 1;
  }
}

class Floor {
  constructor() {
    this.x = 0;
    this.y = canvas.height - 10;
    this.width = canvas.width;
    this.height = 10;
    this.color = '#663300';
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collidesWith(particle) {
    return (
      particle.x >= this.x &&
      particle.x <= this.x + this.width &&
      particle.y + 1 >= this.y &&
      particle.y + 1 <= this.y + this.height
    );
  }
}

const particles = [];
const grid = [];
const gridWidth = Math.ceil(canvas.width / 10);
const gridHeight = Math.ceil((canvas.height - 10) / 10);
const floor = new Floor();

for (let x = 0; x < gridWidth; x++) {
  grid[x] = [];
  for (let y = 0; y < gridHeight; y++) {
    grid[x][y] = [];
  }
}

function createParticle(x, y) {
  const particle = new Sand(x, y);
  particles.push(particle);

  const gridX = Math.floor(x / 10);
  const gridY = Math.floor(y / 10);
  grid[gridX][gridY].push(particle);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    particles.forEach(particle => {
      particle.update();
  
      const gridX = Math.floor(particle.x / 10);
      const gridY = Math.floor(particle.y / 10);
  
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const cellX = gridX + i;
          const cellY = gridY + j;
  
          if (cellX >= 0 && cellX < gridWidth && cellY >= 0 && cellY < gridHeight) {
            const cell = grid[cellX][cellY];
  
            for (let k = 0; k < cell.length; k++) {
              const otherParticle = cell[k];
  
              if (particle !== otherParticle && particle.collidesWith(otherParticle)) {
                // Gestisci la collisione tra le particelle
                particle.vy = 0;
                particle.vx = 0;
              }
            }
            cell.push(particle);
          }
        }
      }
  
      // Gestisci la collisione con il pavimento
      if (floor.collidesWith(particle)) {
        particle.vy = 0;
        particle.y = floor.y - 1;
      }
  
      particle.draw();
    });
  
    floor.draw();
    requestAnimationFrame(update);
  }
  canvas.addEventListener('mouseclick', e => {
    createParticle(e.clientX, e.clientY);
  });

  update();