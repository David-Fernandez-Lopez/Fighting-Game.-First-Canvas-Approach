class Projectile {

    constructor(ctx, characterPos, characterSize, enemyPos, enemySize) {

        this.ctx = ctx
        this.characterPos = characterPos
        this.characterSize = characterSize
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        
        this.projectilePos = {
            x: characterPos.x + 25,
            y: characterPos.y + 50  
        }
        
        this.projectileSize = {
            w: 50,
            h: 50
        }
        
        this.projectileSpeed = 10


        if (this.enemyPos.x <= this.characterPos.x) {
            this.projectileSpeed = -10
        }

        // this.projectileOrientationLeft = false
        

    }

    drawProjectile() {
        // console.log('projectil')

        
        this.ctx.fillStyle = 'lightblue'
        this.ctx.fillRect(this.projectilePos.x, this.projectilePos.y, this.projectileSize.w, this.projectileSize.h)
        
        this.move()
        // this.projectileCollision()
    }

    move() {

        this.projectilePos.x += this.projectileSpeed
    }

    
}