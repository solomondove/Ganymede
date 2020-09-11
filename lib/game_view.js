import {startGame} from './util.js'; 


class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 
        this.moves = ["i", "j", "k", "l"]; 
        this.ship = this.game.addShip(); 
        this.paused = false; 
        this.keysPressed = {}; 

        this.animate = this.animate.bind(this); 
        this.pause = this.pause.bind(this); 
        // this.bindKeyHandlers = this.bindKeyHandlers.bind(this); 

        document.addEventListener("keydown", e => {
            if (e.key === "u") {
                startGame(); 
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

    animate(time) {
        if (this.paused === true ) return; 
    
        const timeDelta = time - this.lastTime; 
        this.game.step(timeDelta); 
        this.game.draw(this.ctx); 
        this.lastTime = time; 



        requestAnimationFrame(this.animate); 
    }

    start() {
        // this.bindKeyHandlers(); 
        this.lastTime = 0; 
        requestAnimationFrame(this.animate); 
    }

    pause() {
        if (this.paused === true) {
            this.paused = false;
            requestAnimationFrame(() => this.animate(0)); 
        } else {
            this.paused = true;
        }
    }
}

export default GameView; 