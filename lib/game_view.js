import Menu from './menus.js';
import {START, PAUSE, SHOW_CONTROLS, MUTE, WARP, LEFT, UP, DOWN, RIGHT} from './control_constants.js'; 


class GameView {
    constructor(game, ctx, ctxStar) {
        this.ctx = ctx; 
        this.ctxStar = ctxStar; 
        this.game = game; 
        this.moves = [UP, LEFT, DOWN, RIGHT]; 
        // this.ship = this.game.addShip(); 
        this.ship; 
        this.paused = false; 
        this.keysPressed = {}; 
        this.animationFrame; 
        this.animate = this.animate.bind(this); 
        this.pause = this.pause.bind(this); 
        this.mute = this.mute.bind(this); 
        // this.startDebris = this.startDebris.bind(this); 
        this.pauseTime = 0; 
        this.controlsShown = false; 
        this.menu = new Menu({
            ctx: ctx, 
            ctxStar: ctxStar, 
            game: game
        }); 

        document.addEventListener("keydown", e => {
            
            if (e.key === START) {
                if (this.game.over === true && this.game.endRendered === true) {
                    this.start(); 
                    return; 
                } else if (this.game.over === false) {
                    this.start(); 
                    return; 
                }
            } else if (e.key === PAUSE) {
                this.pause(); 
            } else if (e.key === SHOW_CONTROLS) {
                this.showControls(); 
            } else if (e.key === MUTE) {
                this.mute(); 
            }

            if (this.keysPressed[WARP] === true) {
                this.ship.warp(e.key, this.game.muted); 
            } else  if (this.keysPressed[LEFT] === true){
                if (e.key === WARP) {
                    if (this.keysPressed[UP] === true ){
                        this.ship.warp(LEFT + UP, this.game.muted)
                    } else if (this.keysPressed[DOWN] === true) {
                        this.ship.warp(LEFT + DOWN, this.game.muted)
                    } else {
                        this.ship.warp(LEFT, this.game.muted); 
                    }
                }
                this.ship.angleLeft(e.key); 
 
            } else if (this.keysPressed[RIGHT] === true) {
                if (e.key === WARP) {
                    if (this.keysPressed[UP] === true){
                        this.ship.warp(RIGHT + UP, this.game.muted)
                    } else if (this.keysPressed[DOWN] === true) {
                        this.ship.warp(RIGHT + DOWN, this.game.muted)
                    } else {
                        this.ship.warp(RIGHT, this.game.muted); 
                    }
                } 
                this.ship.angleRight(e.key)
            } else if (this.keysPressed[UP] === true) {
                if (e.key === WARP) {
                    this.ship.warp(UP, this.game.muted); 
                }
                this.ship.angleUp(e.key);
            } else if (this.keysPressed[DOWN] === true) {
                if (e.key === WARP) {
                    this.ship.warp(DOWN, this.game.muted)
                }
                this.ship.angleDown(e.key);
            }else {
                if (this.ship) {
                    this.ship.moves(e.key); 
                }
            }
            this.keysPressed[e.key] = true;
        }); 

        document.addEventListener("keyup", e => {
            if (this.ship) {
                this.ship.stops(e.key);
            }
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
        this.keysPressed = {}; 
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

    mute() {
        if (this.game.muted === false) {
            this.game.muted = true; 
            let audios = document.getElementsByTagName("AUDIO"); 
            Object.values(audios).forEach(audio => {
                audio.pause(); 
            })
        } else {
            this.game.muted = false; 
            let music = document.getElementById("game-music"); 
            music.play(); 
        }
    }
}

export default GameView; 