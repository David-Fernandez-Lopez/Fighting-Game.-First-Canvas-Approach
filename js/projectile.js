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

    // projectileCollision() {

    //     if (this.projectilePos.x < this.enemyPos.x + this.enemySize.w &&
    //         this.projectilePos.x + this.projectileSize.w > this.enemyPos.x &&
    //         this.projectilePos.y < this.enemyPos.y + this.enemySize.h &&
    //         this.projectileSize.h + this.projectilePos.y > this.enemyPos.y) {
    //         console.log('LEFT BALL ATTACK')
    //     }
        
    //     if  (this.enemyPos.x < this.projectilePos.x -5 + this.projectileSize.w &&
    //         this.enemyPos.x + this.enemySize.w > this.projectilePos.x - 5 &&
    //         this.enemyPos.y < this.projectilePos.y + this.projectileSize.h &&
    //         this.enemySize.h + this.enemyPos.y > this.projectilePos.y) {
            
    //         console.log('RIGHT BALL ATTACK')
    //     }
        
    // }
    
}