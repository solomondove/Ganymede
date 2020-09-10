import Debris from './debris.js'; 
import Ship from './ship'; 
import * as Util from './util.js'; 
import { explosionRender } from './sprites/explosion.js'; 
import { rocketFireRender } from './sprites/rocket_fire.js'; 
import { teleportSwirlRender } from './sprites/teleport.js'; 

class Game {
    constructor(options) {
        this.num_debris = 3; 
        this.debris = []; 
        this.ships = []; 
        this.over = false; 
        this.end_position = [0,0]; 
        this.frameNum = 0; 
        this.width = 750; 
        this.height = 500; 
        
        
        this.addDebris(); 
        this.draw = this.draw.bind(this); 
        this.incrementNumDebris = this.incrementNumDebris.bind(this); 
        setTimeout(this.incrementNumDebris, 10000)
    }

    incrementNumDebris() {
        this.num_debris += 1; 
        setTimeout(this.incrementNumDebris, 10000);
    }

    add(object) {
        if (object instanceof Debris) {
            this.debris.push(object); 
        } else if (object instanceof Ship) {
            this.ships.push(object); 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    addDebris() {
            const debris = {
                vel: Util.randomVel(), 
                game: this, 
            }; 
            this.add(new Debris(debris)); 
    }

    addShip() {
        const ship = new Ship({
            pos: [150, 250], 
            game: this
        })
        this.add(ship); 
        return ship; 
    }


    allObjects() {
        return [].concat(this.debris).concat(this.ships); 
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);  
       

        if (this.over === true && this.frameNum < 33) {
            explosionRender(this.end_position, ctx, this.frameNum)();
            this.frameNum += 1;
        } else if (this.ships.length > 0) {
            let ship = this.ships[0]; 
            rocketFireRender(ship.pos, ctx, this.frameNum)(); 
            this.frameNum += 1; 
            if (this.frameNum > 34) this.frameNum = 0; 
        }

        if (this.ships.length > 0 && this.ships[0].teleport === true) {
            let ship = this.ships[0]; 
            teleportSwirlRender(ship.oldPos, ctx, ship.teleFrame)(); 
            ship.teleFrame += 1;
            if (ship.teleFrame > 39) {
                ship.teleFrame = 0; 
            }
        }
        
        this.allObjects().forEach(object => {
            object.draw(ctx)
        })
    }

    moveObjects(delta) {
        this.allObjects().forEach(object => {
            object.move(delta);
        });

    }

    isOutOfBounds(pos){
        return (pos[0] < 0 || pos[0] > this.width || pos[1] < 0 || pos[1] > this.height )
    }

    checkCollisions() {
        let allObjects = this.allObjects(); 
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                if (i !== j) {
                    const obj1 = allObjects[i]; 
                    const obj2 = allObjects[j]; 
                    
                    if (obj1.didCollideWith(obj2) && obj1.collideWith(obj2)) {
                        this.over = true; 
                        this.end_position = obj2.pos; 
                        this.frameNum = 0; //resets for animation render
                    }
                }
            }
        }
    }

    remove(object) {
        if (object instanceof Debris) {
            this.debris.splice(this.debris.indexOf(object), 1); 
        } else if (object instanceof Ship) {
            this.ships = []; 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    step(delta) {
        this.moveObjects(delta); 
        this.checkCollisions(); 
        if (this.debris.length < this.num_debris) {
            this.addDebris(); 
        }
    }

    gameOver() {
        
    }
}

export default Game; 