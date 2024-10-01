import MovingObject from './moving_object.js'; 
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
            case "i":
                this.vel = [0, -5]; 
                break; 
            case "k": 
                this.vel = [0, 5]; 
                break; 
            case "j":
                this.vel = [-5, 0];
                break; 
            case "l": 
                this.vel = [5, 0];
                break;  
            default:
                break;
        }
    }

    angleLeft(direction) {
        switch(direction) {
            case "i": 
                this.vel = [-5, -5]; 
                break; 
            case "k": 
                this.vel = [-5, 5]; 
                break; 
            default: 
                break; 
        }
    }

    angleRight(direction) {
        switch (direction) {
            case "i":
                this.vel = [5, -5];
                break;
            case "k":
                this.vel = [5, 5];
                break;
            default:
                break;
        }
    }

    angleUp(direction) {
        switch (direction) {
            case "j":
                this.vel = [-5, -5];
                break;
            case "l":
                this.vel = [5, -5];
                break;
            default:
                break;
        }
    }

    angleDown(direction) {
        switch (direction) {
            case "j":
                this.vel = [-5, 5];
                break;
            case "l":
                this.vel = [5, 5];
                break;
            default:
                break;
        }
    }

    warp(direction, muted) {
        console.log(direction, this.teleport); 
        if ( muted === false ) {
            let sound = document.getElementById("warp-sound"); 
            sound.volume = 0.2; 
            sound.play(); 
        }
        
        if (this.teleport === false) {
            let destination  = this.warpDestination(direction); 
            console.log('destination', destination)
            window.setTimeout(() => {
                this.pos = destination;
            }, 600)
        }
    }
    
    //Adjust and returns the new destination after warp for a ship
    warpDestination(direction) {
        let destination = this.pos.slice(); 
    
        // sets ships current position off screen 
        this.pos = [1000, 0]
    
        this.teleport = true; 
        this.oldPos = this.pos; 
    
        // adjusts destination based on the direction of input 
        switch (direction) {
            case "i":  
                    destination[1] += -150;
                    return this.adjustDestination(destination);
            case "k":
                    destination[1] += 150;
                    return this.adjustDestination(destination);
            case "j":
                    destination[0] += -200;
                    return this.adjustDestination(destination);
            case "l":
                    destination[0] += 200;
                    return this.adjustDestination(destination);
            case "ji":
                    destination[0] += -120;
                    destination[1] += -120; 
                    return this.adjustDestination(destination);
            case "li":
                    destination[0] += 120;
                    destination[1] += -120;
                    return this.adjustDestination(destination);
            case "lk":
                    destination[0] += 120;
                    destination[1] += 120;
                    return this.adjustDestination(destination);
            case "jk":
                    destination[0] += -120;
                    destination[1] += 120;
                    return this.adjustDestination(destination);
            default:
                return this.destination; 
        }
    
       
       
    
        // sets ships position to the destination with a slight delay
        return destination; 
    }

    // Readjust destination within the bounds of the playfield 
    adjustDestination(destination) {
        if (destination[1] < 0) destination[1] = 0;
        if (destination[1] > 500) destination[1] = 500;
        if (destination[0] < 0) destination[0] = 0;
        if (destination[0] > 750) destination[0] = 750;
        return destination; 
    }

    stops(direction) {
        switch (direction) {
            case "i":
                this.vel[1] = 0;
                break; 
            case "k":
                this.vel[1] = 0;
                break; 
            case "j":
                this.vel[0] = 0;
                break; 
            case "l":
                this.vel[0] = 0;
                break; 
            default:
                break;
        }
    }


}

export default Ship; 