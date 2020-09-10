
export function explosionRender(position, ctx, frame) {
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

