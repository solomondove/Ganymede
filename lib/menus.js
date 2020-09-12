class Menu {
    constructor(options){
        this.ctx = options.ctx; 
        this.game = options.game; 
        this.overRendered = false; 
        this.ctxStar = options.ctxStar; 
        this.title = document.getElementById("title-screen"); 
        this.gameOver = document.getElementById("game-over"); 
        this.controls = document.getElementById("controls"); 
        // this.score = document.getElementById("score")
    }

    titleScreen() {
        this.ctx.clearRect(0, 0, this.game.width, this.game.height);
        this.ctxStar.clearRect(0, 0, this.game.width, this.game.height); 

        this.title.style.display = "block"; 
    }

    gameOverScreen(score) {
        if (this.overRendered === false ){
            this.overRendered = true; 
            document.getElementById("final-score").innerText += score; 
            this.gameOver.style.display = "block"; 
        }
    }

    controlsScreen() {
        this.controls.style.display = "block"; 
    }

    clearControls() {
        this.controls.style.display = "none"; 
    }

    clearMenus() {
        this.title.style.display = "none"; 
        this.gameOver.style.display = "none"; 
    }
}

export default Menu; 