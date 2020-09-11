import {distanceBetween} from './util.js'; 

class MovingObject {
    constructor(options) {
        this.pos = options.pos; 
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color; 
        this.game = options.game
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill(); 
    }

    move() { 
        let newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]; 
        if (this.game.isOutOfBounds(newPos) && this.escape === true) {
            this.pos = newPos; 
            this.remove(); 
        } else if (!this.game.isOutOfBounds(newPos)) {
            this.pos = newPos; 
        }
    }

    remove() {
        this.game.remove(this); 
    }

    didCollideWith(otherObj) {
        const centerDist = distanceBetween(this.pos, otherObj.pos); 
        return centerDist < (this.radius + otherObj.radius);
    }

    collideWith(otherObj) {
        
    }

}

export default MovingObject; 