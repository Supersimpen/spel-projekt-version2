import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  constructor(x, y, width, height, color, player) {
    super(x, y, width, height, color);
    this.player = player; 
    this.speed = 0.05; 

    this.image = new Image();
    this.image.src = "./src/assets/isbjörn.png";
    this.frameWidth = 783; // Width of a single frame
    this.frameHeight = 380; // Height of a single frame
    this.frameX = 0; // Current frame index
    this.frameY = 0; // Current row index (if using multiple rows)
    this.maxFrames = 1; // Total number of frames in the sprite sheet
    this.timer = 0; // Timer for frame updates
    this.fps = 20; // Frames per second
    this.interval = 1000 / this.fps; // Time interval for frame updates

    // New property to track flipping
    this.flip = false; 
  }

  update() {
    // Move towards the player
    if (this.x < this.player.x) {
        this.x += this.speed;
        this.direction = 'right'; // Facing right
    } else if (this.x > this.player.x) {
        this.x -= this.speed;
        this.direction = 'left'; // Facing left
    }

    if (this.y < this.player.y) {
        this.y += this.speed;
    } else if (this.y > this.player.y) {
        this.y -= this.speed;
    }

    // Handle frame updates for animation
    this.timer += this.interval;
    if (this.timer > this.interval) {
        this.frameX++;
        if (this.frameX >= this.maxFrames) {
            this.frameX = 0; // Reset to first frame
        }
        this.timer = 0; // Reset timer
    }
}

draw(ctx) {
  ctx.save();

  // Check the direction and apply flipping accordingly
  if (this.direction === 'left') {
      ctx.scale(-1, 1); // Flip horizontally for left direction
      ctx.drawImage(
          this.image,
          this.frameWidth * this.frameX,
          this.frameHeight * this.frameY,
          this.frameWidth,
          this.frameHeight,
          -this.x - this.width, // Adjust x position for flipped image
          this.y,
          this.width,
          this.height
      );
  } else {
      // Draw normally for right direction
      ctx.drawImage(
          this.image,
          this.frameWidth * this.frameX,
          this.frameHeight * this.frameY,
          this.frameWidth,
          this.frameHeight,
          this.x,
          this.y,
          this.width,
          this.height
      );
  }

    ctx.restore();
  }
}