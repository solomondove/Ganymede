
 // Return a randomly oriented vector with the given length.
export function randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
}

export function randomPos() {
    const x = 500; 
    const y = Math.floor(Math.random()*(500)); 
    return [x , y]
}

// Scale the length of a vector by the given amount.
export function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
}


