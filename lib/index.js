import {startGame} from './util.js'; 
import Sprite from './sprites/explosion.js'; 
import Game from './game.js';
import GameView from './game_view.js'; 

document.addEventListener("DOMContentLoaded", function () {

    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "white"; 
    ctx.textAlign = "center"; 
    ctx.font = '30px VerminVibes'; 
    ctx.fillText("Ganymede", canvasEl.width/2, canvasEl.height/2);

    const game = new Game();
    new GameView(game, ctx); 

    
})
