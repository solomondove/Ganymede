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