import {startGame} from './util.js'; 
import Sprite from './sprites/explosion.js'; 
import Game from './game.js';
import GameView from './game_view.js'; 
import Menus from './menus.js'; 

document.addEventListener("DOMContentLoaded", function () {

    const canvasEl = document.getElementById("game-canvas");
    const ctx = canvasEl.getContext("2d");
    const canvasST = document.getElementById("star-canvas"); 
    const ctxStar = canvasST.getContext("2d"); 

    const game = new Game();
    new GameView(game, ctx, ctxStar).menu.titleScreen(); 
    
})
