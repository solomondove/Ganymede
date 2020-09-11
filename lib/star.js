import MovingObject from './moving_object.js'; 
import * as Util from './util.js'; 

class Star extends MovingObject {
    constructor(options) {
        super(options); 
        this.radius = 3; 
        this.vel = [-8, 0]; 
        this.pos = Util.randomPos(); 
        this.escape = true; 
    }

   draw(ctx) {
       ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; 
       ctx.beginPath();
       ctx.arc(
           this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true
       ); 
       ctx.fill();  
   }
}

export default Star; 