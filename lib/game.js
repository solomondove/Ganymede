import Debris from './debris.js'; 
import Ship from './ship.js'; 
import Star from './star.js'; 
import Score from './score.js'; 
import * as Util from './util.js'; 
import { explosionRender } from './sprites/explosion.js'; 
import { rocketFireRender } from './sprites/rocket_fire.js'; 
import { teleportSwirlRender } from './sprites/teleport.js'; 

class Game {
    constructor() {
        this.num_debris = 0; 
        this.debris = []; 
        this.bonus = 1; 
        this.num_stars = 12; 
        this.stars = []; 
        this.ships = []; 
        this.over = false; 
        this.end_position = [0,0]; 
        this.frameNums = {
            rocket: 0, 
            explosion: 0, 
            warp: 0
        }; 
        this.width = 750; 
        this.height = 500; 
        this.score = new Score(); 
        this.timers = []; 
        this.intervals = []; 
        this.debrisInterval; 
        this.endRendered = false; 

        this.add = this.add.bind(this); 
        this.step = this.step.bind(this); 
        this.draw = this.draw.bind(this); 
        this.addStar = this.addStar.bind(this); 
        this.incrementNumDebris = this.incrementNumDebris.bind(this); 
    }
    
    start() {
        this.timers.push(setTimeout(() => {this.num_debris = 3}, 3000)); 
        this.timers.push(setTimeout(this.addDebris, 10000)); 
        this.addStar(); 
        this.debrisInterval = setInterval(this.incrementNumDebris, 10000)
        this.intervals.push(this.debrisInterval); 
        this.intervals.push(setInterval(this.incrementScore, 10)); 
    }

    reset() {
        this.timers.forEach(timer => {
            clearTimeout(timer);
        })
        this.intervals.forEach(interval => {
            clearInterval(interval); 
        })
        this.score.reset(); 
        this.num_debris = 0;
        this.debris = [];
        this.bonus = 1;
        this.ships = [];
        this.stars = []; 
        this.endRendered = false; 
        this.over = false;
        this.frameNums = {
            rocket: 0,
            explosion: 0,
            warp: 0
        };
        this.score = new Score();
    }

    incrementNumDebris() {
        this.num_debris += 1; 
    }

    incrementBonus() {
        this.bonus += 1; 
    }

    

    add(object) {
        if (object instanceof Debris) {
            this.debris.push(object); 
        } else if (object instanceof Ship) {
            this.ships.push(object); 
        } else if (object instanceof Star) {
            this.stars.push(object); 
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

    addStar() {
        if (this.stars.length < this.num_stars) {
            const star = new Star({
                game: this, 
            }); 
            this.add(star)
        }
        this.timers.push(setTimeout(this.addStar, 110)); 
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
        return [].concat(this.debris).concat(this.ships).concat(this.stars); 
    }

    allDescructableObjects() {
        return [].concat(this.debris).concat(this.ships);
    }

    draw(ctx, ctxStar) {
        ctx.clearRect(0, 0, this.width, this.height);  
        ctxStar.clearRect(0, 0, this.width, this.height)

        if (this.over === false) {
            this.score.draw(ctx); 
        }

        if (this.over === true && this.frameNums.explosion < 34) {
            explosionRender(this.end_position, ctx, this.frameNums.explosion)();
            this.frameNums.explosion += 1;
        } else if (this.ships.length > 0 && this.over === false) {
            let ship = this.ships[0]; 
            rocketFireRender(ship.pos, ctx, this.frameNums.rocket)(); 
            this.frameNums.rocket += 1; 
            if (this.frameNums.rocket > 33) this.frameNums.rocket = 0; 
        }

        if (this.ships.length > 0 && this.ships[0].teleport === true) {
            let ship = this.ships[0]; 
            teleportSwirlRender(ship.oldPos, ctx, this.frameNums.warp)(); 
            this.frameNums.warp += 1;
            if (this.frameNums.warp > 39) {
                this.frameNums.warp = 0; 
                ship.teleport = false; 
            }
        }
        
        this.allObjects().forEach(object => {
            if (object instanceof Star) {
                object.draw(ctxStar); 
            } else {
                object.draw(ctx)
            }
        })
    }

    moveObjects() {
        this.allObjects().forEach(object => {
            object.move();
        });

    }

    isOutOfBounds(pos){
        return (pos[0] < 0 || pos[0] > this.width || pos[1] < 0 || pos[1] > this.height )
    }

    checkCollisions() {
        let allObjects = this.allDescructableObjects(); 
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                if (i !== j) {
                    const obj1 = allObjects[i]; 
                    const obj2 = allObjects[j]; 
                    
                    if (obj1.didCollideWith(obj2)) {
                        obj1.collideWith(obj2); 
                        if (obj2 instanceof Ship || obj1 instanceof Ship) {
                            let sound = document.getElementById("explosion-sound");
                            sound.play(); 
                            this.timers.push(setTimeout(() => {
                                sound.pause(); 
                                sound.currentTime = 0; 
                            }, 1000))
                            this.over = true; 
                            this.end_position = obj2.pos; 
                        }
                    
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
        } else if (object instanceof Star) {
            this.stars.splice(this.stars.indexOf(object), 1); 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    step() {
        this.moveObjects(); 
        this.checkCollisions(); 
        if (this.debris.length < this.num_debris) {
            this.addDebris(); 
        }
        if (this.over === false) {
            this.score.increment(); 
        }
    }

    gameOver(menu) {
        clearInterval(this.debrisInterval); 
        this.timers.push(setTimeout(() => {
            this.endRendered = true; 
            menu.gameOverScreen(this.score.score);
        }
        , 1500)); 
    }
}

export default Game; 