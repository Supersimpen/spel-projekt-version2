import Ball from "./Balls";
import GameObject from "./GameObject";
import Input from "./Input";
import Player from "./Player";
import Enemy from "./Enemy"; 
import UserInterface from "./UserInterface";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new Input(this);
    this.player = new Player(0, 0, 60, 60, "green", this);
    this.enemies = []; 
    this.spawnInterval = 2000; 
    this.lastSpawnTime = 0; 
    this.ui = new UserInterface(this)
    this.pause = false
    this.gameOver = false
    this.gameTime = 0


    console.log("ny instans av game", this.width);
    this.box = new GameObject(40, 40, 200, 200, "purple");
    this.ball = new Ball(100, 200, 100, 100, "green");
  }

  update(deltaTime) {
    this.box.update(deltaTime);
    this.ball.update(deltaTime);
    this.player.update(deltaTime);
    if (this.pause) return
    if (!this.gameOver){
      this.gameTime +=deltaTime
    }

    console.log('antal enemies', this.enemies)
    this.lastSpawnTime += deltaTime;
    if (this.lastSpawnTime >= this.spawnInterval && this.enemies.length < 30 ) {
      const enemy = new Enemy(Math.random() * this.width, Math.random() * this.height, 100, 60, "red", this.player);
      this.enemies.push(enemy); 
      this.lastSpawnTime = 0; 
    }
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
          attack();
      }
  });
  function attack() {
    const attackArea = {
        x: player.x + player.width, 
        y: player.y,
        width: 50, 
        height: player.height 
    };

    enemies.forEach((enemy, index) => {
        if (isColliding(attackArea, enemy)) {
            enemies.splice(index, 1);
        }
    });
}
function isColliding(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}


    for (const enemy of this.enemies) {
      enemy.update();
    }
  }

  draw(ctx) {
   // this.box.draw(ctx);
   // this.ball.draw(ctx);
    this.player.draw(ctx);
    this.ui.draw(ctx)


    for (const enemy of this.enemies) {
      enemy.draw(ctx);
    }
  }
}