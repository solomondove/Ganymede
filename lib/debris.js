import * as Util from './util.js'; 
import MovingObject from './moving_object.js'; 



class Debris extends MovingObject {
    constructor(options) {
        super(options); 
        this.color = "#00FF00"; 
        this.radius = 25; 
        this.pos = Util.randomPos(); 
    }
}


export default Debris; 