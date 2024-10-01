!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";function i(){return[750,Math.floor(500*Math.random())]}s.r(e);var r=class{constructor(t){this.pos=t.pos,this.vel=t.vel,this.radius=t.radius,this.color=t.color,this.game=t.game}draw(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI,!0),t.fill()}move(){let t=[this.pos[0]+this.vel[0],this.pos[1]+this.vel[1]];this.game.isOutOfBounds(t)&&!0===this.escape?(this.pos=t,this.remove()):this.game.isOutOfBounds(t)||(this.pos=t)}remove(){this.game.remove(this)}didCollideWith(t){var e,s;return(e=this.pos,s=t.pos,Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2)))<this.radius+t.radius}collideWith(t){}};var h=class extends r{constructor(t){super(t),this.pos=t.pos,this.radius=15,this.vel=t.vel||[0,0],this.color="pink",this.escape=!1,this.oldPos=[0,0],this.teleport=!1,this.warpDelay=this.warp.bind(this)}draw(t){const e=document.getElementById("ship");t.drawImage(e,this.pos[0]-20,this.pos[1]-15,40,30)}moves(t){switch(t){case"i":this.vel=[0,-5];break;case"k":this.vel=[0,5];break;case"j":this.vel=[-5,0];break;case"l":this.vel=[5,0]}}angleLeft(t){switch(t){case"i":this.vel=[-5,-5];break;case"k":this.vel=[-5,5]}}angleRight(t){switch(t){case"i":this.vel=[5,-5];break;case"k":this.vel=[5,5]}}angleUp(t){switch(t){case"j":this.vel=[-5,-5];break;case"l":this.vel=[5,-5]}}angleDown(t){switch(t){case"j":this.vel=[-5,5];break;case"l":this.vel=[5,5]}}warp(t,e){if(console.log(t,this.teleport),!1===e){let t=document.getElementById("warp-sound");t.volume=.2,t.play()}if(!1===this.teleport){let e=this.warpDestination(t);console.log("destination",e),window.setTimeout(()=>{this.pos=e},600)}}warpDestination(t){this.oldPos=this.pos;let e=this.pos.slice();switch(this.pos=[1e3,0],this.teleport=!0,t){case"i":return e[1]+=-150,this.adjustDestination(e);case"k":return e[1]+=150,this.adjustDestination(e);case"j":return e[0]+=-200,this.adjustDestination(e);case"l":return e[0]+=200,this.adjustDestination(e);case"ji":return e[0]+=-120,e[1]+=-120,this.adjustDestination(e);case"li":return e[0]+=120,e[1]+=-120,this.adjustDestination(e);case"lk":return e[0]+=120,e[1]+=120,this.adjustDestination(e);case"jk":return e[0]+=-120,e[1]+=120,this.adjustDestination(e);default:return this.destination}}adjustDestination(t){return t[1]<0&&(t[1]=0),t[1]>500&&(t[1]=500),t[0]<0&&(t[0]=0),t[0]>750&&(t[0]=750),t}stops(t){switch(t){case"i":case"k":this.vel[1]=0;break;case"j":case"l":this.vel[0]=0}}};var a=class extends r{constructor(t){super(t),this.color="white",this.radius=25,this.pos=i(),this.escape=!0}draw(t){let e=document.getElementById("debris");t.drawImage(e,this.pos[0]-30,this.pos[1]-33,63,63)}collideWith(t){return t instanceof h&&(this.vel[1]=this.vel[1]+Math.floor(t.vel[1]/3),t.remove(),!0)}};var n=class extends r{constructor(t){super(t),this.radius=3,this.vel=[-8,0],this.pos=i(),this.escape=!0}draw(t){t.fillStyle="rgba(255, 255, 255, 0.8)",t.beginPath(),t.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI,!0),t.fill()}};var o=class{constructor(){this.pos=[0,700],this.score=0}increment(){this.score+=1}reset(){this.score=0}draw(t){t.fillStyle="white",t.textAlign="right",t.font="10px scream_when_youre_ready_to_Rg",t.fillText(this.score,700,20)}};var d=class{constructor(){this.num_debris=0,this.debris=[],this.bonus=1,this.num_stars=12,this.stars=[],this.ships=[],this.over=!1,this.end_position=[0,0],this.frameNums={rocket:0,explosion:0,warp:0},this.width=750,this.height=500,this.score=new o,this.timers=[],this.intervals=[],this.debrisInterval,this.endRendered=!1,this.muted=!0,this.add=this.add.bind(this),this.step=this.step.bind(this),this.draw=this.draw.bind(this),this.addStar=this.addStar.bind(this),this.addDebris=this.addDebris.bind(this),this.incrementNumDebris=this.incrementNumDebris.bind(this)}start(){this.timers.push(setTimeout(()=>{this.num_debris=3},3e3)),this.timers.push(setTimeout(this.addDebris,1e4)),this.addStar(),this.debrisInterval=setInterval(this.incrementNumDebris,1e4),this.intervals.push(this.debrisInterval),this.intervals.push(setInterval(this.incrementScore,10))}reset(){this.timers.forEach(t=>{clearTimeout(t)}),this.intervals.forEach(t=>{clearInterval(t)}),this.score.reset(),this.num_debris=0,this.debris=[],this.bonus=1,this.ships=[],this.stars=[],this.endRendered=!1,this.over=!1,this.frameNums={rocket:0,explosion:0,warp:0},this.score=new o}incrementNumDebris(){this.num_debris+=1}incrementBonus(){this.bonus+=1}add(t){if(t instanceof a)this.debris.push(t);else if(t instanceof h)this.ships.push(t);else{if(!(t instanceof n))throw new Error("unknown type of object");this.stars.push(t)}}addDebris(){const t={vel:[Math.floor(-2*Math.random()-3),[-1,0,1][Math.floor(3*Math.random())]],game:this};this.add(new a(t))}addStar(){if(this.stars.length<this.num_stars){const t=new n({game:this});this.add(t)}this.timers.push(setTimeout(this.addStar,110))}addShip(){const t=new h({pos:[150,250],game:this});return this.add(t),t}allObjects(){return[].concat(this.debris).concat(this.ships).concat(this.stars)}allDescructableObjects(){return[].concat(this.debris).concat(this.ships)}draw(t,e){if(t.clearRect(0,0,this.width,this.height),e.clearRect(0,0,this.width,this.height),!1===this.over&&this.score.draw(t),!0===this.over&&this.frameNums.explosion<34)!function(t,e,s){let i=Math.floor(s/6);const r=document.getElementById("explosion");return{0:()=>e.drawImage(r,0,0,32,32,t[0]-60,t[1]-15,64,64),1:()=>e.drawImage(r,32,0,32,32,t[0]-60,t[1]-15,64,64),2:()=>e.drawImage(r,64,0,32,32,t[0]-60,t[1]-15,64,64),3:()=>e.drawImage(r,96,0,32,32,t[0]-60,t[1]-15,64,64),4:()=>e.drawImage(r,128,0,32,32,t[0]-60,t[1]-15,64,64),5:()=>e.drawImage(r,160,0,32,32,t[0]-60,t[1]-15,64,64),6:()=>e.drawImage(r,192,0,32,32,t[0]-60,t[1]-15,64,64)}[i]}(this.end_position,t,this.frameNums.explosion)(),this.frameNums.explosion+=1;else if(this.ships.length>0&&!1===this.over){!function(t,e,s){let i=Math.floor(s/9);const r=document.getElementById("rocket-fire");return{0:()=>e.drawImage(r,0,0,128,128,t[0]-68,t[1]-50,100,100),1:()=>e.drawImage(r,0,128,128,128,t[0]-68,t[1]-50,100,100),2:()=>e.drawImage(r,0,256,128,128,t[0]-68,t[1]-50,100,100),3:()=>e.drawImage(r,0,384,128,128,t[0]-68,t[1]-50,100,100)}[i]}(this.ships[0].pos,t,this.frameNums.rocket)(),this.frameNums.rocket+=1,this.frameNums.rocket>33&&(this.frameNums.rocket=0)}if(this.ships.length>0&&!0===this.ships[0].teleport){let e=this.ships[0];!function(t,e,s){let i=13-Math.floor(s/3);const r=document.getElementById("teleport-swirl");return{0:()=>e.drawImage(r,0,0,140,140,t[0]-40,t[1]-18,70,40),1:()=>e.drawImage(r,420,0,140,140,t[0]-40,t[1]-18,70,40),2:()=>e.drawImage(r,840,0,140,140,t[0]-40,t[1]-18,70,40),3:()=>e.drawImage(r,280,140,140,140,t[0]-40,t[1]-18,70,40),4:()=>e.drawImage(r,700,140,140,140,t[0]-40,t[1]-18,70,40),5:()=>e.drawImage(r,140,280,140,140,t[0]-40,t[1]-18,70,40),6:()=>e.drawImage(r,560,280,140,140,t[0]-40,t[1]-18,70,40),7:()=>e.drawImage(r,0,420,140,140,t[0]-40,t[1]-18,70,40),8:()=>e.drawImage(r,420,420,140,140,t[0]-40,t[1]-18,70,40),9:()=>e.drawImage(r,840,420,140,140,t[0]-40,t[1]-18,70,40),10:()=>e.drawImage(r,280,560,140,140,t[0]-40,t[1]-18,70,40),11:()=>e.drawImage(r,700,560,140,140,t[0]-40,t[1]-18,70,40),12:()=>e.drawImage(r,140,700,140,140,t[0]-40,t[1]-18,70,40),13:()=>e.drawImage(r,560,700,140,140,t[0]-40,t[1]-18,70,40)}[i]}(e.oldPos,t,this.frameNums.warp)(),this.frameNums.warp+=1,this.frameNums.warp>39&&(this.frameNums.warp=0,e.teleport=!1)}this.allObjects().forEach(s=>{s instanceof n?s.draw(e):s.draw(t)})}moveObjects(){this.allObjects().forEach(t=>{t.move()})}isOutOfBounds(t){return t[0]<0||t[0]>this.width||t[1]<0||t[1]>this.height}checkCollisions(){let t=this.allDescructableObjects();for(let e=0;e<t.length;e++)for(let s=0;s<t.length;s++)if(e!==s){const i=t[e],r=t[s];if(i.didCollideWith(r)&&(i.collideWith(r),r instanceof h||i instanceof h)){if(!1===this.muted){let t=document.getElementById("explosion-sound");t.play(),this.timers.push(setTimeout(()=>{t.pause(),t.currentTime=0},1e3))}this.over=!0,this.end_position=r.pos}}}remove(t){if(t instanceof a)this.debris.splice(this.debris.indexOf(t),1);else if(t instanceof h)this.ships=[];else{if(!(t instanceof n))throw new Error("unknown type of object");this.stars.splice(this.stars.indexOf(t),1)}}step(){this.moveObjects(),this.checkCollisions(),this.debris.length<this.num_debris&&this.addDebris(),!1===this.over&&this.score.increment()}gameOver(t){clearInterval(this.debrisInterval),this.timers.push(setTimeout(()=>{this.endRendered=!0,t.gameOverScreen(this.score.score)},1500))}};var l=class{constructor(t){this.ctx=t.ctx,this.game=t.game,this.overRendered=!1,this.ctxStar=t.ctxStar,this.title=document.getElementById("title-screen"),this.gameOver=document.getElementById("game-over"),this.controls=document.getElementById("controls"),this.finalScore=document.getElementById("final-score")}titleScreen(){this.ctx.clearRect(0,0,this.game.width,this.game.height),this.ctxStar.clearRect(0,0,this.game.width,this.game.height),this.title.style.display="block"}gameOverScreen(t){!1===this.overRendered&&(this.overRendered=!0,this.finalScore.innerText+=t,this.gameOver.style.display="block")}controlsScreen(){this.controls.style.display="block"}clearControls(){this.controls.style.display="none"}clearMenus(){this.title.style.display="none",this.overRendered=!1,this.finalScore.innerText="Score:",this.gameOver.style.display="none"}};var c=class{constructor(t,e,s){this.ctx=e,this.ctxStar=s,this.game=t,this.moves=["i","j","k","l"],this.ship,this.paused=!1,this.keysPressed={},this.animationFrame,this.animate=this.animate.bind(this),this.pause=this.pause.bind(this),this.mute=this.mute.bind(this),this.pauseTime=0,this.controlsShown=!1,this.menu=new l({ctx:e,ctxStar:s,game:t}),document.addEventListener("keydown",t=>{if("u"===t.key){if(!0===this.game.over&&!0===this.game.endRendered)return void this.start();if(!1===this.game.over)return void this.start()}else"o"===t.key?this.pause():"r"===t.key?this.showControls():"q"===t.key&&this.mute();!0===this.keysPressed.f?this.ship.warp(t.key,this.game.muted):!0===this.keysPressed.j?("f"===t.key&&(!0===this.keysPressed.i?this.ship.warp("ji",this.game.muted):!0===this.keysPressed.k?this.ship.warp("jk",this.game.muted):this.ship.warp("j",this.game.muted)),this.ship.angleLeft(t.key)):!0===this.keysPressed.l?("f"===t.key&&(!0===this.keysPressed.i?this.ship.warp("li",this.game.muted):!0===this.keysPressed.k?this.ship.warp("lk",this.game.muted):this.ship.warp("l",this.game.muted)),this.ship.angleRight(t.key)):!0===this.keysPressed.i?("f"===t.key&&this.ship.warp("i",this.game.muted),this.ship.angleUp(t.key)):!0===this.keysPressed.k?("f"===t.key&&this.ship.warp("k",this.game.muted),this.ship.angleDown(t.key)):this.ship&&this.ship.moves(t.key),this.keysPressed[t.key]=!0}),document.addEventListener("keyup",t=>{this.ship&&this.ship.stops(t.key),delete this.keysPressed[t.key]})}animate(){!0!==this.paused&&(!0===this.game.over&&this.game.gameOver(this.menu),this.game.step(),this.game.draw(this.ctx,this.ctxStar),this.animationFrame=requestAnimationFrame(this.animate))}start(){cancelAnimationFrame(this.animationFrame),this.keysPressed={},this.game.reset(),this.menu.clearMenus(),this.paused=!1,this.ctx.clearRect(0,0,this.game.width,this.game.height),this.ctxStar.clearRect(0,0,this.game.width,this.game.height),this.ship=this.game.addShip(),this.game.start(),this.animationFrame=requestAnimationFrame(this.animate)}pause(){!0===this.paused?(this.paused=!1,this.animate(),this.pauseTime=0):(this.paused=!0,cancelAnimationFrame(this.animationFrame))}showControls(){!0===this.controlsShown?(this.menu.clearControls(),this.controlsShown=!1,this.pause()):(this.menu.controlsScreen(),this.controlsShown=!0,this.pause())}mute(){if(!1===this.game.muted){this.game.muted=!0;let t=document.getElementsByTagName("AUDIO");Object.values(t).forEach(t=>{t.pause()})}else{this.game.muted=!1,document.getElementById("game-music").play()}}};document.addEventListener("DOMContentLoaded",(function(){const t=document.getElementById("game-canvas").getContext("2d"),e=document.getElementById("star-canvas").getContext("2d"),s=new d;new c(s,t,e).menu.titleScreen()}))}]);
//# sourceMappingURL=bundle.js.map