class Projectile {

    constructor(ctx, characterPos, characterSize, enemyPos, enemySize, charName) {

        this.ctx = ctx
        this.characterPos = characterPos
        this.characterSize = characterSize
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        this.charName = charName
        // console.log(this.charName)
        this.projectilePos = {
            x: characterPos.x + 50,
            y: characterPos.y + 75  
        }
        
        this.projectileSize = {
            w: 50,
            h: 50
        }
        
        this.projectileSpeed = 10
        this.gameFrame = 0


        this.bulletImage = new Image()
        this.bulletImage.src = './img/fireball.png'
        this.bulletImage.cols = 6
        this.bulletImage.rows = 1
        this.bulletImage.rowsIndex = 0
        this.bulletImage.colsIndex = 0

        this.hollowProjectileImage = new Image()
        this.hollowProjectileImage.src = './img/butterflies.png'
        this.hollowProjectileImage.cols = 12
        this.hollowProjectileImage.rows = 1
        this.hollowProjectileImage.rowsIndex = 12
        this.hollowProjectileImage.colsIndex = 0

        if (this.enemyPos.x <= this.characterPos.x) {
            this.projectileSpeed = -10
        }
    }

    drawProjectile() {
        // console.log('projectil')

        if (this.charName === 'spiderman Left') {
            console.log(this.charName)
            this.ctx.drawImage(
                this.bulletImage,
                this.bulletImage.rowsIndex * (this.bulletImage.width / this.bulletImage.cols),
                0,
                this.bulletImage.width / this.bulletImage.cols,
                this.bulletImage.height / this.bulletImage.rows,
                this.projectilePos.x,
                this.projectilePos.y,
                this.projectileSize.w,
                this.projectileSize.h
            )

        } else if (this.charName === 'spiderman Right') {
            console.log(this.charName)
            this.ctx.drawImage(
                this.bulletImage,
                this.bulletImage.rowsIndex * (this.bulletImage.width / this.bulletImage.cols),
                0,
                this.bulletImage.width / this.bulletImage.cols,
                this.bulletImage.height / this.bulletImage.rows,
                this.projectilePos.x,
                this.projectilePos.y,
                this.projectileSize.w,
                this.projectileSize.h
            )
        } else if (this.charName === 'Hollow Knight Right') {

            console.log(this.charName)
            this.ctx.drawImage(
                this.hollowProjectileImage,                
                this.hollowProjectileImage.rowsIndex * (this.hollowProjectileImage.width / this.hollowProjectileImage.cols),      
                this.hollowProjectileImage.colsIndex * (this.hollowProjectileImage.height / this.hollowProjectileImage.rows),      
                this.hollowProjectileImage.width / this.hollowProjectileImage.cols,      
                this.hollowProjectileImage.height / this.hollowProjectileImage.rows,      
                this.projectilePos.x,
                this.projectilePos.y,
                this.projectileSize.w,
                this.projectileSize.h
                )
        } else if (this.charName === 'Hollow Knight Left' ) {

            console.log(this.charName)
            this.ctx.drawImage(
                this.hollowProjectileImage,                
                this.hollowProjectileImage.rowsIndex * (this.hollowProjectileImage.width / this.hollowProjectileImage.cols),      
                this.hollowProjectileImage.colsIndex * (this.hollowProjectileImage.height / this.hollowProjectileImage.rows),      
                this.hollowProjectileImage.width / this.hollowProjectileImage.cols,      
                this.hollowProjectileImage.height / this.hollowProjectileImage.rows,      
                this.projectilePos.x,
                this.projectilePos.y,
                this.projectileSize.w,
                this.projectileSize.h
                )
                

        }
        
        this.animateProjectile()
        this.move()
    }

    animateProjectile() {
        
        this.gameFrame++



        if (this.gameFrame % this.bulletImage.cols == 0) {
            this.bulletImage.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.bulletImage.rowsIndex >= this.bulletImage.cols) {

            this.bulletImage.rowsIndex = 0;
    }
        
                
        if (this.gameFrame % this.hollowProjectileImage.cols == 0) {
            this.hollowProjectileImage.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.hollowProjectileImage.rowsIndex >= this.hollowProjectileImage.cols) {

            this.hollowProjectileImage.rowsIndex = 0;
    }

    //     if (this.gameFrame % hollowMoodCols == 0) {
    //         this.hollowProjectileImage.rowsIndex++
    //         // this.spidermanImage.colsIndex = moodRows
    //     } if (this.hollowProjectileImage.rowsIndex >= hollowMoodCols) {

    //         this.hollowProjectileImage.rowsIndex = hollowLimit;
    // }

    }

    move() {

        this.projectilePos.x += this.projectileSpeed
    }


    
}