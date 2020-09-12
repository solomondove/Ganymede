export function warpUtil(direction, ship) {
    switch (direction) {
        case "i":
            if (ship.teleport === false) {
                let holder = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder[1] += -150;
                if (holder[1] < 0) holder[1] = 0;
                if (holder[1] > 500) holder[1] = 500;
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
                if (holder2[1] < 0) holder2[1] = 0;
                ship.pos = [1000, 0];
                ship.warpDelay(holder2);
            }
            break;
        case "j":
            if (ship.teleport === false) {
                let holder3 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder3[0] += -200;
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
                holder4[0] += 200;
                if (holder4[0] > 750) holder4[0] = 750;
                ship.pos = [1000, 0];
                ship.warpDelay(holder4);
            }
            break;
        case "ji":
            if (ship.teleport === false) {
                let holder5 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder5[0] += -120;
                holder5[1] += -120; 
                if (holder5[0] < 0) holder5[0] = 0; 
                if (holder5[1] < 0) holder5[1] = 0; 
                ship.pos = [1000, 0];
                ship.warpDelay(holder5);
            }
            break;
        case "li":
            if (ship.teleport === false) {
                let holder6 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder6[0] += 120;
                holder6[1] += -120;
                if (holder6[0] > 750) holder6[0] = 750;
                if (holder6[1] < 0) holder6[1] = 0;
                ship.pos = [1000, 0];
                ship.warpDelay(holder6);
            }
            break;
        case "lk":
            if (ship.teleport === false) {
                let holder7 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder7[0] += 120;
                holder7[1] += 120;
                if (holder7[0] > 750) holder7[0] = 750;
                if (holder7[1] > 500) holder7[1] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder7);
            }
            break;
        case "jk":
            if (ship.teleport === false) {
                let holder8 = ship.pos.slice();
                ship.teleport = true;
                ship.oldPos = ship.pos;
                holder8[0] += -120;
                holder8[1] += 120;
                if (holder8[0] < 0) holder8[0] = 0;
                if (holder8[1] > 500) holder8[1] = 500;
                ship.pos = [1000, 0];
                ship.warpDelay(holder8);
            }
            break;
        default:
            break;
    }
}