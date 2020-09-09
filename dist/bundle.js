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
 
 



class Debris extends _moving_object_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(options) {
        super(options); 
        this.color = "#00FF00"; 
        this.radius = 25; 
        this.pos = _util_js__WEBPACK_IMPORTED_MODULE_0__["randomPos"](); 
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
 

class Game {
    constructor(options) {
        this.num_debris = 8; 
        this.debris = []
        this.addDebris(); 

        this.draw = this.draw.bind(this); 
    }

    add(object) {
        if (object instanceof _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
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
            this.add(new _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"](debris)); 
        
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
        if (object instanceof _debris_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
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

class GameView {
    constructor(game, ctx) {
        this.ctx = ctx; 
        this.game = game; 

        this.animate = this.animate.bind(this); 
    }

    animate(time) {
        const timeDelta = time - this.lastTime; 

        this.game.step(timeDelta); 
        this.game.draw(this.ctx); 
        this.lastTime = time; 

        requestAnimationFrame(this.animate); 
    }

    start() {
        this.lastTime = 0; 
        requestAnimationFrame(this.animate); 
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
/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object.js */ "./lib/moving_object.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");
 
 
 

document.addEventListener("DOMContentLoaded", function () {
    
    const canvasEl = document.getElementById("game-canvas")
    
    const ctx = canvasEl.getContext("2d"); 
    
    const game = new _game_js__WEBPACK_IMPORTED_MODULE_1__["default"](); 
    new _game_view_js__WEBPACK_IMPORTED_MODULE_2__["default"](game, ctx).start(); 
    console.log("is it working?")
    window.ctx = ctx; 
    window.MovingObject = _moving_object_js__WEBPACK_IMPORTED_MODULE_0__["default"]; 
    window.Game = _game_js__WEBPACK_IMPORTED_MODULE_1__["default"]; 
    window.GameView = _game_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]; 

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

        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY]; 
        if (this.game.isOutOfBounds(this.pos)) {
            this.remove(); 
        }
    }

    remove() {
        this.game.remove(this); 
    }
}

/* harmony default export */ __webpack_exports__["default"] = (MovingObject); 

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: randomVec, randomPos, scale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomVec", function() { return randomVec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomPos", function() { return randomPos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });

 // Return a randomly oriented vector with the given length.
function randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
}

function randomPos() {
    const x = 500; 
    const y = Math.floor(Math.random()*(500)); 
    return [x , y]
}

// Scale the length of a vector by the given amount.
function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map