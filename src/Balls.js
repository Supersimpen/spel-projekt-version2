import GameObject from "./GameObject";

export default class Ball extends GameObject{
    constructor(width, height, x, y, color){
        super(width, height, x, y, color)
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, 2*Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}