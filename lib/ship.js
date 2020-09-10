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
        this.teleFrame = 0; 

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
        switch (direction) {
            case "i":
                if (this.teleport === false ) {
                    let holder = this.pos.slice(); 
                    this.teleport = true; 
                    this.oldPos = this.pos; 
                    holder[1] += -150; 
                    if (holder[1] < 0 ) holder[1] = 0; 
                    this.pos = [1000, 0];
                    this.warpDelay(holder); 
                }
                
                break;
            case "k":
                if (this.teleport === false) {
                    let holder2 = this.pos.slice();
                    this.teleport = true; 
                    this.oldPos = this.pos; 
                    holder2[1] += 150;
                    if (holder2[1] > 500) holder2[1] = 500; 
                    this.pos = [1000, 0];
                    this.warpDelay(holder2); 
                }
                break;
            case "j":
                if (this.teleport === false) {
                    let holder3 = this.pos.slice();
                    this.teleport = true; 
                    this.oldPos = this.pos; 
                    holder3[0] += -150;
                    if (holder3[0] < 0) holder3[0] = 0; 
                    this.pos = [1000, 0];
                    this.warpDelay(holder3); 
                }
                break;
            case "l":
                if (this.teleport === false ) {
                    let holder4 = this.pos.slice();
                    this.teleport = true; 
                    this.oldPos = this.pos; 
                    holder4[0] += 150;
                    if (holder4[0] > 500) holder4[0] = 500; 
                    this.pos = [1000, 0];
                    this.warpDelay(holder4); 
                }
                break;
            default:
                break;
        }
    }

    warpDelay(pos){
        window.setTimeout(() => {
            this.pos = pos;
            this.teleport = false; 
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