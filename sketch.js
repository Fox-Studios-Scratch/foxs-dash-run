let player;
let obstacles = [];
let gameOver = false;
let gameStarted = false;

function setup() {
    createCanvas(800, 600); // Increase the height
    setupMenu();
}


function draw() {
    if (gameStarted) {
      if (gameOver) {
        // Reset game state and show the menu
        gameStarted = false;
        gameOver = false;
        setupMenu();
      } else {
        drawGame();
      }
    } else {
      drawMenu();
    }
  }
  

function drawGame() {
  background(220);
  
  // Draw floor
  fill(200);
  rect(0, height - 10, width, 10);

  if (!gameOver) {
    player.show();
    player.update();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].update();

      if (player.hits(obstacles[i])) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
} else {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
  }
}

function startGame() {
  gameStarted = true;
  player = new Player();
}

class Player {
    constructor() {
      this.width = 20;
      this.height = 20;
      this.x = width / 4;
      this.y = height - this.height - 10; // Adjust the initial y position
      this.gravity = 0.5;
      this.lift = -10;
      this.velocity = 0;
    }
  
    show() {
      fill(0, 0, 255);
      rect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
  
      // Ensure the player stays above the floor
      if (this.y > height - this.height - 10) {
        this.y = height - this.height - 10;
        this.velocity = 0;
      }
  
      if (keyIsDown(32)) {
        this.jump();
      }
    }
  
    jump() {
      if (this.y === height - this.height - 10) {
        this.velocity += this.lift;
      }
    }
  
    // Updated collision detection
    hits(obstacle) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      );
    }
  }
  

class Obstacle {
    constructor() {
      this.width = 20;
      this.height = random(20, 60); // Adjust the maximum height
      this.x = width;
      this.y = height - this.height;
      this.speed = 5;
    }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < 0;
  }
}
