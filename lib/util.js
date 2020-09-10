import Game from './game.js';
import GameView from './game_view.js'; 

 // Return a randomly oriented vector with the given length.
export function randomVel() {
    let possibleY = [-1, 0, 1]
    const x = Math.floor(Math.random()*(-2) - 3);
    const y = Math.floor(Math.random()*3);
    return [x, possibleY[y]]
    // return [0, 0]
}

export function randomPos() {
    const x = 750; 
    // const x = Math.floor(Math.random() * (500)); 
    const y = Math.floor(Math.random()*(500)); 
    return [x , y]
}

// Scale the length of a vector by the given amount.
export function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
}

export function distanceBetween(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    ); 
}

export function startGame() {
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    const game = new Game();
    new GameView(game, ctx).start();
}
