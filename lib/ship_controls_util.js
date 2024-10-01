export function warpUtil(direction, ship) {
    if (ship.teleport === false) return; 
    let destination = ship.pos.slice(); 

    // sets ships current position off screen 
    ship.pos = [1000, 0]

    ship.teleport = true; 
    ship.oldPos = ship.pos; 

    // adjusts destination based on the direction of input 
    switch (direction) {
        case "i":  
                destination[1] += -150;
            break;
        case "k":
                destination[1] += 150;
            break;
        case "j":
                destination[0] += -200;
            break;
        case "l":
                destination[0] += 200;
            break;
        case "ji":
                destination[0] += -120;
                destination[1] += -120; 
            break;
        case "li":
                destination[0] += 120;
                destination[1] += -120;
            break;
        case "lk":
                destination[0] += 120;
                destination[1] += 120;
               
            break;
        case "jk":
                destination[0] += -120;
                destination[1] += 120;
            break;
        default:
            break;
    }

    // Readjust destination within the bounds of the playfield 
    if (destination[1] < 0) destination[1] = 0;
    if (destination[1] > 500) destination[1] = 500;
    if (destination[0] < 0) destination[0] = 0;
    if (destination[0] > 750) destination[0] = 750;

    // sets ships position to the destination with a slight delay
    return destination; 
}