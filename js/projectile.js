class Projectile {

    constructor(ctx, characterPos, characterSize, tempEnemyData) {

        this.ctx = ctx
        this.characterPos = characterPos
        this.characterSize = characterSize
        this.tempEnemyData = tempEnemyData
        
        this.projectilePos = {
            x: characterPos.x + 25,
            y: characterPos.y + 50  
        }
        
        this.projectileSize = {
            w: 50,
            h: 50
        }
        
        this.projectileSpeed = 10
        

    }

    drawProjectile() {
        // console.log('projectil')

        
        this.ctx.fillStyle = 'lightblue'
        this.ctx.fillRect(this.projectilePos.x, this.projectilePos.y, this.projectileSize.w, this.projectileSize.h)
        
        this.move()
        this.projectileCollision()
    }

    move() {


        if (this.tempEnemyData.x <= this.characterPos.x) {
            this.projectilePos.x -= this.projectileSpeed
        }
        
        if (this.tempEnemyData.x > this.characterPos.x) {
            this.projectilePos.x +=this.projectileSpeed
        }
        // console.log(this.projectilePos.x)
    }

    projectileCollision() {

        if (this.projectilePos.x < this.tempEnemyData.x + this.tempEnemyData.w &&
            this.projectilePos.x + this.projectileSize.w > this.tempEnemyData.x &&
            this.projectilePos.y < this.tempEnemyData.y + this.tempEnemyData.h &&
            this.projectileSize.h + this.projectilePos.y > this.tempEnemyData.y) {
            console.log('LEFT BALL ATTACK')
        }
        
        if  (this.tempEnemyData.x < this.projectilePos.x -5 + this.projectileSize.w &&
            this.tempEnemyData.x + this.tempEnemyData.w > this.projectilePos.x - 5 &&
            this.tempEnemyData.y < this.projectilePos.y + this.projectileSize.h &&
            this.tempEnemyData.h + this.tempEnemyData.y > this.projectilePos.y) {
            
            console.log('RIGHT BALL ATTACK')
        }
        
    }
    
}