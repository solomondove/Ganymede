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

    move(timeDelta) {
        const NORMAL_FRAME_TIME_DELTA = 1000 / 60 
        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
            offsetX = this.vel[0] * velocityScale,
            offsetY = this.vel[1] * velocityScale;

        let newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY]; 
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