import {startGame} from './util.js'; 


class GameView {
    constructor(game, ctx, ctxStar) {
        this.ctx = ctx; 
        this.ctxStar = ctxStar; 
        this.game = game; 
        this.moves = ["i", "j", "k", "l"]; 
        // this.ship = this.game.addShip(); 
        this.ship; 
        this.paused = false; 
        this.keysPressed = {}; 
        this.animationFrame; 
        this.animate = this.animate.bind(this); 
        this.pause = this.pause.bind(this); 
        this.startDebris = this.startDebris.bind(this); 
        this.pauseTime = 0; 

        document.addEventListener("keydown", e => {
            if (e.key === "u") {
                this.start(); 
            } else if (e.key === "o") {
                this.pause(); 
            }

            if (this.keysPressed["f"] === true) {
                this.ship.warp(e.key); 
            } else if (this.keysPressed["j"] === true){
                if (e.key === "f") {
                    if (this.keysPressed["i"] === true ){
                        this.ship.warp("ji")
                    } else if (this.keysPressed["k"] === true) {
                        this.ship.warp("jk")
                    } else {
                        this.ship.warp("j"); 
                    }
                }
                this.ship.angleLeft(e.key); 
 
            } else if (this.keysPressed["l"] === true) {
                if (e.key === "f") {
                    if (this.keysPressed["i"] === true){
                        this.ship.warp("li")
                    } else if (this.keysPressed["k"] === true) {
                        this.ship.warp("lk")
                    } else {
                        this.ship.warp("l"); 
                    }
                } 
                this.ship.angleRight(e.key)
            } else if (this.keysPressed["i"] === true) {
                if (e.key === "f") {
                    this.ship.warp("i"); 
                }
                this.ship.angleUp(e.key);
            } else if (this.keysPressed["k"] === true) {
                if (e.key === "f") {
                    this.ship.warp("k")
                }
                this.ship.angleDown(e.key);
            }else {
                this.ship.moves(e.key); 
            }
            this.keysPressed[e.key] = true;
        }); 

        document.addEventListener("keyup", e => {
            this.ship.stops(e.key);
            delete this.keysPressed[e.key]; 
        }); 
    }

    animate() {
        if (this.paused === true ) {
            return; 
        }; 
        this.game.step(); 
        this.game.draw(this.ctx, this.ctxStar); 
         



        this.animationFrame = requestAnimationFrame(this.animate); 
    }

    start() {
        this.game.timers.forEach(timer => {
            clearTimeout(timer); 
        })
        cancelAnimationFrame(this.animationFrame); 
        // this.game = new Game(); 
        this.game.reset(); 
        this.ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.ctxStar.clearRect(0, 0, this.game.width, this.game.height) 
        this.ship = this.game.addShip();
        this.game.addStar(); 
        // this.game.bonusTimer = setInterval(() => this.game.incrementBonus(), 30000)
        // this.game.scoreTimer = setInterval(() => this.game.incrementScore(), 10)
        this.game.timers.push(setTimeout(this.startDebris, 3000)); 
        this.animationFrame = requestAnimationFrame(this.animate); 
    }
     
    startDebris() {
        this.game.num_debris = 3; 
        this.game.timers.push(setTimeout(() => this.game.incrementNumDebris(), 10000)); 
    }

    pause() {
        if (this.paused === true) {
            this.paused = false; 
            this.animate(this.pauseTime); 
            this.pauseTime = 0; 
        } else {
            this.paused = true;
            cancelAnimationFrame(this.animationFrame); 
        }
    }
}

export default GameView; 