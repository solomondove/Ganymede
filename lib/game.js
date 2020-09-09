import Debris from './debris.js'; 

class Game {
    constructor(options) {
        this.num_debris = 8; 
        this.debris = []
        this.addDebris(); 

        this.draw = this.draw.bind(this); 
    }

    add(object) {
        if (object instanceof Debris) {
            this.debris.push(object); 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    addDebris() {
       
            const debris = {
                vel: [-6, 0], 
                game: this, 
            }; 
            this.add(new Debris(debris)); 
        
    }

    allObjects() {
        return [].concat(this.debris)
    }

    draw(ctx) {
        ctx.clearRect(0, 0, 500, 500); 
        ctx.fillStyle = "white"; 
        ctx.fillRect(0, 0, 500, 500); 

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
        return (pos[0] < 0 || pos[0] > 500 || pos[1] < 0 || pos[1] > 500 )
    }

    remove(object) {
        if (object instanceof Debris) {
            this.debris.splice(this.debris.indexOf(object), 1); 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    step(delta) {
        this.moveObjects(delta); 
        if (this.debris.length < this.num_debris) {
            this.addDebris(); 
        }
    }
}

export default Game; 