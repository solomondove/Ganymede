import MovingObject from './moving_object.js'; 
import {explosionRender} from './sprites/explosion.js'; 
import {warpUtil} from './ship_controls_util.js'; 

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

        this.warpDelay = this.warpDelay.bind(this); 
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

    warp(direction) {
        let sound = document.getElementById("warp-sound"); 
        sound.play(); 
      
        warpUtil(direction, this); 
    }

    warpDelay(pos){
        window.setTimeout(() => {
            this.pos = pos;
        }, 600)
        // this.pos = pos; 
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