

export function teleportSwirlRender(position, ctx, frame) {
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