import Menu from './menus.js';
import {START, PAUSE, SHOW_CONTROLS, MUTE, WARP, LEFT, UP, DOWN, RIGHT} from './control_constants.js'; 


class GameView {
    constructor(game, ctx, ctxStar) {
        this.ctx = ctx; 
        this.ctxStar = ctxStar; 
        this.game = game; 
        this.moves = [DOWN, LEFT, RIGHT, UP]; 
        this.ship; 
        this.paused = false; 
        this.keysPressed = {}; 
        this.animationFrame; 
        this.animate = this.animate.bind(this); 
        this.pause = this.pause.bind(this); 
        this.mute = this.mute.bind(this); 
        this.pauseTime = 0; 
        this.controlsShown = false; 
        this.menu = new Menu({
            ctx: ctx, 
            ctxStar: ctxStar, 
            game: game
        }); 

        document.addEventListener("keydown", e => {
            if (this.moves.includes(e.key)) {
                this.keysPressed[e.key] = true;
            }

            let depressedKeys = Object.keys(this.keysPressed).sort().join(''); 

            switch (e.key) {
                case START: 
                    this.start();  
                    break; 
                case PAUSE: 
                    this.pause(); 
                    break; 
                case SHOW_CONTROLS: 
                    this.showControls(); 
                    break; 
                case MUTE: 
                    this.mute(); 
                    break; 
                case WARP: 
                    this.ship.warp(depressedKeys, this.game.muted); 
                    break; 
                default: 
                    this.ship.moves(depressedKeys); 
                    break; 
            }
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
        if (this.controlsShown === true) return; 

        cancelAnimationFrame(this.animationFrame); 
        this.keysPressed = {}; 
        this.game.reset(); 
        this.menu.clearMenus(); 
        this.paused = false; 
        this.ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.ctxStar.clearRect(0, 0, this.game.width, this.game.height) 
        this.ship = this.game.addShip();
        this.game.start(); 
       
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