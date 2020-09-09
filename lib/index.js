import MovingObject from './moving_object.js'; 
import Game from './game.js'; 
import GameView from './game_view.js'; 

document.addEventListener("DOMContentLoaded", function () {
    
    const canvasEl = document.getElementById("game-canvas")
    
    const ctx = canvasEl.getContext("2d"); 
    
    const game = new Game(); 
    new GameView(game, ctx).start(); 
    console.log("is it working?")
    window.ctx = ctx; 
    window.MovingObject = MovingObject; 
    window.Game = Game; 
    window.GameView = GameView; 

})
