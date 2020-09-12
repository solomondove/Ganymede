import Menu from './menus.js';



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
        // this.startDebris = this.startDebris.bind(this); 
        this.pauseTime = 0; 
        this.controlsShown = false; 
        this.menu = new Menu({
            ctx: ctx, 
            ctxStar: ctxStar, 
            game: game
        }); 

        document.addEventListener("keydown", e => {
            if (e.key === "u") {
                this.start(); 
            } else if (e.key === "o") {
                this.pause(); 
            } else if (e.key === "r") {
                this.showControls(); 
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
        if (this.game.over === true) {
            this.game.gameOver(this.menu); 
        }
        this.game.step(); 
        this.game.draw(this.ctx, this.ctxStar); 
        this.animationFrame = requestAnimationFrame(this.animate); 
    }

    start() {
        cancelAnimationFrame(this.animationFrame); 
        this.game.reset(); 
        // this.menu.scoreDisplay(this.game.score); 
        this.menu.clearMenus(); 
        this.paused = false; 
        this.ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.ctxStar.clearRect(0, 0, this.game.width, this.game.height) 
        this.ship = this.game.addShip();
        this.game.start(); 
        // this.game.bonusTimer = setInterval(() => this.game.incrementBonus(), 30000)
       
        this.animationFrame = requestAnimationFrame(this.animate); 
    }
     

    pause() {
        if (this.paused === true) {
            this.paused = false; 
            this.animate(); 
            this.pauseTime = 0; 
        } else {
            this.paused = true; 
            cancelAnimationFrame(this.animationFrame); 
        }
    }

    showControls() {
        if (this.controlsShown === true) {
            this.menu.clearControls(); 
            this.controlsShown = false; 
            this.pause(); 
        } else {
            this.menu.controlsScreen(); 
            this.controlsShown = true; 
            this.pause(); 
        }
    }
}

export default GameView; 