class Score {
    constructor() { 
        this.pos = [0, 700];
        this.score = 0; 
    }

    increment() {
        this.score += 1;
    }

    reset() {
        this.score = 0; 
    }

    draw(ctx) {
        ctx.fillStyle = "white"; 
        ctx.textAlign = "right"; 
        ctx.font = '10px scream_when_youre_ready_to_Rg';
        ctx.fillText(this.score, 700, 20);
    }
}

export default Score; 