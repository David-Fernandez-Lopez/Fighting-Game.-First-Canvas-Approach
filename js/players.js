class Player {

    constructor(ctx, canvasSize) {
        
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.playerPos = {
            x: undefined,
            y: undefined
        }

        this.playerSize = {
            w: undefined,
            h: undefined
        }

        this.health = 100

    }
}