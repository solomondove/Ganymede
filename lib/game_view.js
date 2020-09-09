
class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 

        this.animate = this.animate.bind(this); 
    }

    animate(time) {
        const timeDelta = time - this.lastTime; 

        this.game.step(timeDelta); 
        this.game.draw(this.ctx); 
        this.lastTime = time; 

        requestAnimationFrame(this.animate); 
    }

    start() {
        this.lastTime = 0; 
        requestAnimationFrame(this.animate); 
    }
}

export default GameView; 