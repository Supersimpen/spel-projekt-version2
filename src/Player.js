import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(x, y, width, height, color, game) {
    super(x, y, width, height, color)
    this.game = game

    this.image = new Image()
    this.image.src = "./src/assets/Grabbmedspade1.png"


    this.frameWidth = 253
    this.frameHeight = 263
    this.frameX = 0
    this.frameY = 0
    this.maxFrames = 10
    this.timer = 0
    this.fps = 20
    this.interval = 1000 / this.fps

    this.speedX = 0
    this.speedY = 0
    this.maxSpeedX = 0.2
    this.maxSpeedY = 0.2
  }

  update(deltaTime) {
    if (this.game.input.keys.has("ArrowLeft")) {
      this.speedX -= this.maxSpeedX
      this.flip = true
    }
    if (this.game.input.keys.has("ArrowRight")) {
      this.speedX += this.maxSpeedX
      this.flip = false
    }
    if (this.game.input.keys.has("ArrowRight") && this.game.input.keys.has("ArrowLeft")) {
      this.speedX = 0
    }
    if (!this.game.input.keys.has("ArrowRight") && !this.game.input.keys.has("ArrowLeft")) {
      this.speedX -= this.speedX
    }

    if (this.game.input.keys.has("ArrowUp")) {
      this.speedY -= this.maxSpeedY
      
    }
    if (this.game.input.keys.has("ArrowDown")) {
      this.speedY += this.maxSpeedY
      
    }
    if (this.game.input.keys.has("ArrowUp") && this.game.input.keys.has("ArrowDown")) {
      this.speedY = 0
    }
    if (!this.game.input.keys.has("ArrowUp") && !this.game.input.keys.has("ArrowDown")) {
      this.speedY -= this.speedY
    }

    this.y += this.speedY
    this.x += this.speedX


    if (this.speedX != 0) {
      this.frameY = 0
      this.maxFrames = 1
    } else {
      this.frameY = 0
      this.maxFrames = 1
    }
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }
    if (this.frameX >= this.maxFrames) {
      this.frameX = 0
    }

    if (this.x < 0) {
      this.x = 0
      this.speedX = 0
    }
    if (this.x > 1140) {
      this.x = 1140
      this.speedX = 0
    }
    if (this.y < 0){
      this.y = 0
      this.speedY = 0
    }
    if (this.y > 480){
      this.y = 480
      this.speedY = 0
    }

  }


  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    //ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.frameWidth * this.frameX,
      this.frameHeight * this.frameY,
      this.frameWidth,
      this.frameHeight,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height,
    )
    if (this.flip) {
      ctx.restore()
    }
  }
}