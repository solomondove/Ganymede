import MovingObject from "./moving_object.js"; 

class SpaceChicken extends MovingObject {
    constructor (options) {
        super(options); 
        this.color = "#00FF00";
        this.radius = 25;
        this.pos = Util.randomPos(); 
    }
}

export default SpaceChicken; 