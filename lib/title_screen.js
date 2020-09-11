export function renderTitle(ctx, canvas, game) {
    // ctx.clearRect(0, 0, game.width, game.height)
    ctx.clear
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = '30px VerminVibes'; 
    ctx.fillText("Ganymede", canvas.width / 2, canvas.height / 2);
}