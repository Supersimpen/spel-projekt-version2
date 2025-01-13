export default class Input {
    constructor(game){
        this.game = game
        this.keys = new Set()

        window.addEventListener("keydown", (event) => {
                this.keys.add(event.key)
        })

        window.addEventListener("keyup", (event) => {
                this.keys.delete(event.key)
        }) 
    }
}