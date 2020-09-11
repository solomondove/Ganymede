/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/debris.js":
/*!***********************!*\
  !*** ./lib/debris.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving_object.js */ "./lib/moving_object.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ "./lib/ship.js");
 
 
 


class Debris extends _moving_object_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(options) {
        super(options); 
        this.color = "white"; 
        this.radius = 25; 
        this.pos = _util_js__WEBPACK_IMPORTED_MODULE_0__["randomPos"](); 
        this.escape = true; 
    }

    draw(ctx) {
        let img = document.getElementById("debris"); 
        ctx.drawImage(img, this.pos[0] - 30, this.pos[1]- 33, 63, 63);
        // ctx.beginPath();
        // ctx.arc(
        //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        // );
        // ctx.stroke(); 
    }

    collideWith(otherObj) {
        if (otherObj instanceof _ship_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            otherObj.remove(); 
            this.remove(); 
            return true; 
        }
        return false; 
    }
}


/* harmony default export */ __webpack_exports__["default"] = (Debris); 

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _debris_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debris.js */ "./lib/debris.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./lib/ship.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
/* harmony import */ var _sprites_explosion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprites/explosion.js */ "./lib/sprites/explosion.js");
/* harmony import */ var _sprites_rocket_fire_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprites/rocket_fire.js */ "./lib/sprites/rocket_fire.js");
/* harmony import */ var _sprites_teleport_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sprites/teleport.js */ "./lib/sprites/teleport.js");
 
 
 
 
 
 

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
        if (object instanceof _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            this.debris.push(object); 
        } else if (object instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            this.ships.push(object); 
        } else {
            throw new Error("unknown type of object"); 
        }
    }

    addDebris() {
            const debris = {
                vel: _util_js__WEBPACK_IMPORTED_MODULE_2__["randomVel"](), 
                game: this, 
            }; 
            this.add(new _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"](debris)); 
    }

    addShip() {
        const ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]({
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
            Object(_sprites_explosion_js__WEBPACK_IMPORTED_MODULE_3__["explosionRender"])(this.end_position, ctx, this.frameNum)();
            this.frameNum += 1;
        } else if (this.ships.length > 0) {
            let ship = this.ships[0]; 
            Object(_sprites_rocket_fire_js__WEBPACK_IMPORTED_MODULE_4__["rocketFireRender"])(ship.pos, ctx, this.frameNum)(); 
            this.frameNum += 1; 
            if (this.frameNum > 34) this.frameNum = 0; 
        }

        if (this.ships.length > 0 && this.ships[0].teleport === true) {
            let ship = this.ships[0]; 
            Object(_sprites_teleport_js__WEBPACK_IMPORTED_MODULE_5__["teleportSwirlRender"])(ship.oldPos, ctx, ship.teleFrame)(); 
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
        if (object instanceof _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            this.debris.splice(this.debris.indexOf(object), 1); 
        } else if (object instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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

/* harmony default export */ __webpack_exports__["default"] = (Game); 

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
 


class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 
        this.moves = ["i", "j", "k", "l"]; 
        this.ship = this.game.addShip(); 
        this.paused = false; 
        this.keysPressed = {}; 

        this.animate = this.animate.bind(this); 
        this.pause = this.pause.bind(this); 
        // this.bindKeyHandlers = this.bindKeyHandlers.bind(this); 

        document.addEventListener("keydown", e => {
            if (e.key === "u") {
                Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["startGame"])(); 
            } else if (e.key === "o") {
                this.pause(); 
            }

            if (this.keysPressed["f"] === true) {
                this.ship.warp(e.key); 
            } else if (this.keysPressed["j"] === true){
                if (e.key === "f") {
                    if (this.keysPressed["i"] === true ){
                        this.ship.warp("ji")
                    } else if (this.keysPressed["k"] === true) {
                        this.ship.warp("jk")
                    } else {
                        this.ship.warp("j"); 
                    }
                }
                this.ship.angleLeft(e.key); 
 
            } else if (this.keysPressed["l"] === true) {
                if (e.key === "f") {
                    if (this.keysPressed["i"] === true){
                        this.ship.warp("li")
                    } else if (this.keysPressed["k"] === true) {
                        this.ship.warp("lk")
                    } else {
                        this.ship.warp("l"); 
                    }
                } 
                this.ship.angleRight(e.key)
            } else if (this.keysPressed["i"] === true) {
                if (e.key === "f") {
                    this.ship.warp("i"); 
                }
                this.ship.angleUp(e.key);
            } else if (this.keysPressed["k"] === true) {
                if (e.key === "f") {
                    this.ship.warp("k")
                }
                this.ship.angleDown(e.key);
            }else {
                this.ship.moves(e.key); 
            }
            this.keysPressed[e.key] = true;
        }); 

        document.addEventListener("keyup", e => {
            this.ship.stops(e.key);
            delete this.keysPressed[e.key]; 
        }); 
    }

    animate(time) {
        if (this.paused === true ) return; 
    
        const timeDelta = time - this.lastTime; 
        this.game.step(timeDelta); 
        this.game.draw(this.ctx); 
        this.lastTime = time; 



        requestAnimationFrame(this.animate); 
    }

    start() {
        // this.bindKeyHandlers(); 
        this.lastTime = 0; 
        requestAnimationFrame(this.animate); 
    }

    pause() {
        if (this.paused === true) {
            this.paused = false;
            requestAnimationFrame(() => this.animate(0)); 
        } else {
            this.paused = true;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView); 

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
/* harmony import */ var _sprites_explosion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprites/explosion.js */ "./lib/sprites/explosion.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");
 
 

 

document.addEventListener("DOMContentLoaded", function () {

    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "white"; 
    ctx.textAlign = "center"; 
    ctx.font = '30px VerminVibes'; 
    ctx.fillText("Ganymede", canvasEl.width/2, canvasEl.height/2);

    const game = new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    new _game_view_js__WEBPACK_IMPORTED_MODULE_3__["default"](game, ctx); 

    
})


/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
 

class MovingObject {
    constructor(options) {
        this.pos = options.pos; 
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color; 
        this.game = options.game
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill(); 
    }

    move(timeDelta) {
        const NORMAL_FRAME_TIME_DELTA = 1000 / 60 
        const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
            offsetX = this.vel[0] * velocityScale,
            offsetY = this.vel[1] * velocityScale;

        let newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY]; 
        if (this.game.isOutOfBounds(newPos) && this.escape === true) {
            this.pos = newPos; 
            this.remove(); 
        } else if (!this.game.isOutOfBounds(newPos)) {
            this.pos = newPos; 
        }
    }

    remove() {
        this.game.remove(this); 
    }

    didCollideWith(otherObj) {
        const centerDist = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["distanceBetween"])(this.pos, otherObj.pos); 
        return centerDist < (this.radius + otherObj.radius);
    }

    collideWith(otherObj) {
        
    }

}

/* harmony default export */ __webpack_exports__["default"] = (MovingObject); 

/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object.js */ "./lib/moving_object.js");
/* harmony import */ var _sprites_explosion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprites/explosion.js */ "./lib/sprites/explosion.js");
/* harmony import */ var _ship_controls_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship_controls_util.js */ "./lib/ship_controls_util.js");
 
 
 

class Ship extends _moving_object_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
        Object(_ship_controls_util_js__WEBPACK_IMPORTED_MODULE_2__["warpUtil"])(direction, this); 
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

/* harmony default export */ __webpack_exports__["default"] = (Ship); 

/***/ }),

/***/ "./lib/ship_controls_util.js":
/*!***********************************!*\
  !*** ./lib/ship_controls_util.js ***!
  \***********************************/
/*! exports provided: warpUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warpUtil", function() { return warpUtil; });
function warpUtil(direction, ship) {
    switch (direction) {
        case "i":
            if (ship.teleport === false) {
                let holder = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder[1] += -150;
                if (holder[1] < 0) holder[1] = 0;
                ship.pos = [1000, 0];
                ship.warpDelay(holder);
            }

            break;
        case "k":
            if (ship.teleport === false) {
                let holder2 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder2[1] += 150;
                if (holder2[1] > 500) holder2[1] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder2);
            }
            break;
        case "j":
            if (ship.teleport === false) {
                let holder3 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder3[0] += -150;
                if (holder3[0] < 0) holder3[0] = 0;
                ship.pos = [1000, 0];
                ship.warpDelay(holder3);
            }
            break;
        case "l":
            if (ship.teleport === false) {
                let holder4 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder4[0] += 150;
                if (holder4[0] > 500) holder4[0] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder4);
            }
            break;
        case "ji":
            if (ship.teleport === false) {
                let holder5 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder5[0] += -150;
                holder5[1] += -150; 
                if (holder5[0] > 500) holder5[0] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder5);
            }
            break;
        case "li":
            if (ship.teleport === false) {
                let holder6 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder6[0] += 150;
                holder6[1] += -150;
                if (holder6[0] > 500) holder6[0] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder6);
            }
            break;
        case "lk":
            if (ship.teleport === false) {
                let holder7 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder7[0] += 150;
                holder7[1] += 150;
                if (holder7[0] > 500) holder7[0] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder7);
            }
            break;
        case "jk":
            if (ship.teleport === false) {
                let holder8 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder8[0] += -150;
                holder8[1] += 150;
                if (holder8[0] > 500) holder8[0] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder8);
            }
            break;
        default:
            break;
    }
}

/***/ }),

/***/ "./lib/sprites/explosion.js":
/*!**********************************!*\
  !*** ./lib/sprites/explosion.js ***!
  \**********************************/
/*! exports provided: explosionRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "explosionRender", function() { return explosionRender; });

function explosionRender(position, ctx, frame) {
    let frameNumber = Math.floor( frame / 5)
    const explosionImage = document.getElementById('explosion');
    const frames = {
        0: () => ctx.drawImage(explosionImage, 0, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64), 
        1: () => ctx.drawImage(explosionImage, 32, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64),     
        2: () => ctx.drawImage(explosionImage, 64, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64),       
        3: () => ctx.drawImage(explosionImage, 96, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64),        
        4: () => ctx.drawImage(explosionImage, 128, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64),      
        5: () => ctx.drawImage(explosionImage, 160, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64),     
        6: () => ctx.drawImage(explosionImage, 192, 0, 32, 32, position[0] - 20, position[1] - 15, 64, 64)
        
    }
    return frames[frameNumber]
}



/***/ }),

/***/ "./lib/sprites/rocket_fire.js":
/*!************************************!*\
  !*** ./lib/sprites/rocket_fire.js ***!
  \************************************/
/*! exports provided: rocketFireRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rocketFireRender", function() { return rocketFireRender; });
function rocketFireRender(position, ctx, frame) {
    let frameNumber = Math.floor(frame / 9)
    const rocketFireImage = document.getElementById('rocket-fire'); 
    const frames = {
        0: () => ctx.drawImage(rocketFireImage, 0, 0, 128, 128, position[0] - 68, position[1] - 50, 100, 100),
        1: () => ctx.drawImage(rocketFireImage, 0, 128, 128, 128, position[0] - 68, position[1] - 50, 100, 100),
        2: () => ctx.drawImage(rocketFireImage, 0, 256, 128, 128, position[0] - 68, position[1] - 50, 100, 100),
        3: () => ctx.drawImage(rocketFireImage, 0, 384, 128, 128, position[0] - 68, position[1] - 50, 100, 100)
    }
    return frames[frameNumber]
}

/***/ }),

/***/ "./lib/sprites/teleport.js":
/*!*********************************!*\
  !*** ./lib/sprites/teleport.js ***!
  \*********************************/
/*! exports provided: teleportSwirlRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "teleportSwirlRender", function() { return teleportSwirlRender; });


function teleportSwirlRender(position, ctx, frame) {
    let frameNumber = 13 - Math.floor(frame/3);
    const teleportImage = document.getElementById('teleport-swirl');
    const frames = {
        0: () => ctx.drawImage(teleportImage, 0, 0, 140, 140, position[0] - 40, position[1] - 18, 70, 40),
        1: () => ctx.drawImage(teleportImage, 420, 0, 140, 140, position[0] - 40, position[1] - 18, 70, 40),
        2: () => ctx.drawImage(teleportImage, 840, 0, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        3: () => ctx.drawImage(teleportImage, 280, 140, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        4: () => ctx.drawImage(teleportImage, 700, 140, 140, 140, position[0] - 40, position[1] - 18, 70, 40),    
        5: () => ctx.drawImage(teleportImage, 140, 280, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        6: () => ctx.drawImage(teleportImage, 560, 280, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        7: () => ctx.drawImage(teleportImage, 0, 420, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        8: () => ctx.drawImage(teleportImage, 420, 420, 140, 140, position[0] - 40, position[1] - 18, 70, 40),
        9: () => ctx.drawImage(teleportImage, 840, 420, 140, 140, position[0] - 40, position[1] - 18, 70, 40),       
        10: () => ctx.drawImage(teleportImage, 280, 560, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        11: () => ctx.drawImage(teleportImage, 700, 560, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        12: () => ctx.drawImage(teleportImage, 140, 700, 140, 140, position[0] - 40, position[1] - 18, 70, 40),        
        13: () => ctx.drawImage(teleportImage, 560, 700, 140, 140, position[0] - 40, position[1] - 18, 70, 40)
    }
    return frames[frameNumber]
}

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: randomVel, randomPos, scale, distanceBetween, startGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomVel", function() { return randomVel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomPos", function() { return randomPos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceBetween", function() { return distanceBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startGame", function() { return startGame; });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");

 

 // Return a randomly oriented vector with the given length.
function randomVel() {
    let possibleY = [-1, 0, 1]
    const x = Math.floor(Math.random()*(-2) - 3);
    const y = Math.floor(Math.random()*3);
    return [x, possibleY[y]]
    // return [0, 0]
}

function randomPos() {
    const x = 750; 
    // const x = Math.floor(Math.random() * (500)); 
    const y = Math.floor(Math.random()*(500)); 
    return [x , y]
}

// Scale the length of a vector by the given amount.
function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
}

function distanceBetween(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    ); 
}

function startGame() {
    const canvasEl = document.getElementById("game-canvas")
    const ctx = canvasEl.getContext("2d");
    const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    new _game_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](game, ctx).start();
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map