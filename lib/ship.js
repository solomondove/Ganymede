import MovingObject from './moving_object.js'; 
import {RIGHT, DOWN, LEFT, UP} from './control_constants.js'; 
import {explosionRender} from './sprites/explosion.js'; 

class Ship extends MovingObject {
    constructor (options) {
        super(options)
        this.pos = options.pos
        this.radius = 15; 
        this.vel = options.vel || [0, 0]; 
        this.color = "pink"; 
        this.escape = false;
        this.oldPos = [0, 0]; 
        this.teleport = false; 
        this.warpDelay = this.warp.bind(this); 
    }

    draw(ctx) {
        const img = document.getElementById('ship')
        ctx.drawImage(img, this.pos[0]-20, this.pos[1]-15, 40, 30); 
    }

    moves(direction) {
        switch (direction) {
            case UP:
                this.vel = [0, -5]; 
                break; 
            case DOWN: 
                this.vel = [0, 5]; 
                break; 
            case LEFT:
                this.vel = [-5, 0];
                break; 
            case RIGHT: 
                this.vel = [5, 0];
                break;  
            case UP + LEFT: 
                this.vel = [-5, -5]; 
                break; 
            case LEFT + DOWN: 
                this.vel = [-5, 5]; 
                break; 
            case UP + RIGHT: 
                this.vel = [5, -5];
                break;
            case DOWN + RIGHT: 
                this.vel = [5, 5];
                break;
            default:
                break;
        }
    }

    warp(direction, muted) {
        if ( muted === false ) {
            let sound = document.getElementById("warp-sound"); 
            sound.volume = 0.2; 
            sound.play(); 
        }
        
        if (this.teleport === false) {
            let destination  = this.warpDestination(direction); 
            window.setTimeout(() => {
                this.pos = destination;
            }, 600)
        }
    }
    
    //Adjust and returns the new destination after warp for a ship
    warpDestination(direction) {
        this.oldPos = this.pos; 
        let destination = this.pos.slice(); 
        this.pos = [1000, 0]
        this.teleport = true; 
    
        // adjusts destination based on the direction of input 
        switch (direction) {
            case UP:  
                    destination[1] += -150;
                    return this.adjustDestination(destination);
            case DOWN:
                    destination[1] += 150;
                    return this.adjustDestination(destination);
            case LEFT:
                    destination[0] += -200;
                    return this.adjustDestination(destination);
            case RIGHT:
                    destination[0] += 200;
                    return this.adjustDestination(destination);
            case UP + LEFT:
                    destination[0] += -120;
                    destination[1] += -120; 
                    return this.adjustDestination(destination);
            case UP + RIGHT:
                    destination[0] += 120;
                    destination[1] += -120;
                    return this.adjustDestination(destination);
            case DOWN + RIGHT:
                    destination[0] += 120;
                    destination[1] += 120;
                    return this.adjustDestination(destination);
            case LEFT + DOWN:
                    destination[0] += -120;
                    destination[1] += 120;
                    return this.adjustDestination(destination);
            default:
                return this.destination; 
        }
    }

    // Readjust destination of warp to within the bounds of the playfield 
    adjustDestination(destination) {
        if (destination[1] < 0) destination[1] = 0;
        if (destination[1] > 500) destination[1] = 500;
        if (destination[0] < 0) destination[0] = 0;
        if (destination[0] > 750) destination[0] = 750;
        return destination; 
    }

    stops(direction) {
        switch (direction) {
            case UP:
                this.vel[1] = 0;
                break; 
            case DOWN:
                this.vel[1] = 0;
                break; 
            case LEFT:
                this.vel[0] = 0;
                break; 
            case RIGHT:
                this.vel[0] = 0;
                break; 
            default:
                break;
        }
    }
}

export default Ship; 