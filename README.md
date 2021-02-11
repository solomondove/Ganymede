![atl text](https://github.com/solomondove/Ganymede/blob/master/assets/screenshot.png?raw=true)

**by Solomon Dove**

Welcome to the starship Ganymede! We are peaceful crew, slogging our way through the galaxy with only a short-range warp to 
keep us safe. There seems to be an upcoming asteroid field that we must navigate through, how long can you keep us alive? 

## Development

This app is strictly JavaScript with HTML5, leveraging the power of canvas to render seamless animations for the ship, 
asteroids, and stars. Development primarily progressed over the course of 7 days. More features are planned for future implementation.

**Rendering of Sprites**

Sprites were rendered by creating a frame count that iterates as each sprite is drawn in each frame of the game. 
This occurs roughly 60 times per second utilizing Canva's built in requestAnimationFrame. To temper the rate at which 
each of these sprites are shown, an object holding each sprites frame was instantiated on the game model then tempering 
it based on how slow the animation needed to be for optimal rendering. Below you can see an example of the code 
utilized to render the rocket burst behind the ship itself.

```javascript
export function rocketFireRender(position, ctx, frame) {
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
```

**Controlling the Ship**

In order build in comprehensive controls to ensure that adequate maneuvering was possible, each keydown was logged
and added into an object instantiated on the game view and subsequently deleted out on the associated keyup event. 
By continuing to monitor which keys were actively depressed at any given moment controls that required two or three 
simulations key presses were possible. This included things as complicated as warping at an angle. Below you can see 
the keyup event listener that deletes the keypress out of the object.


```javascript
document.addEventListener("keyup", e => {
            this.ship.stops(e.key);
            delete this.keysPressed[e.key];
}); 
```

## Future Work

Further features we have considered are: 

1. mutliple lives
2. collectable objects
3. score multiplier
4. hiscore ranking 
