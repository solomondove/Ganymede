import * as Util from './util.js'; 
import MovingObject from './moving_object.js'; 
import Ship from './ship.js'; 


class Debris extends MovingObject {
    constructor(options) {
        super(options); 
        this.color = "white"; 
        this.radius = 25; 
        this.pos = Util.randomPos(); 
        this.escape = true; 
    }

    draw(ctx) {
        let img = document.getElementById("debris"); 
        ctx.drawImage(img, this.pos[0] - 30, this.pos[1]- 33, 63, 63);
        // ctx.beginPath();
        // ctx.arc(
        //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        // );
        // ctx.stroke(); 
    }

    collideWith(otherObj) {
        if (otherObj instanceof Ship) {
            this.vel[1] = (this.vel[1] + Math.floor(otherObj.vel[1]/3)); 
            otherObj.remove(); 
            // this.remove(); 
            return true; 
        } 
        return false; 
    }
}


export default Debris; 