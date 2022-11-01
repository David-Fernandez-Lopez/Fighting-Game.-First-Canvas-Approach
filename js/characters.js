class Character {           
    constructor(ctx, canvasSize, enemyPos, enemySize, keys, charHealth, charName, charDamage, playerPos, color, enemyTag) {
        console.log(enemyPos)
        console.log(enemySize)
        
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        this.charHealth = charHealth
        this.name = charName
        this.damage = charDamage
        this.color = color
        this.enemyTag = enemyTag
        this.characterSize = {
            w: 100,
            h: 200
        }
        this.characterPos = {
            x: playerPos,
            y: this.floor
        }
        
        this.speed = {
            x: 10,
            y: 10   
        }
        this.floor = this.canvasSize.h - this.characterSize.h - 50
        this.gravity = 0.4

        this.attackBoxSize = {
            w: this.characterSize.w + 50,
            h: this.characterSize.h / 2
        }

        console.log(keys)
        this.keys = {
           
            moveLeft: {
                name: keys.moveLeft.name,
                pressed : false
            },
          
            moveRight: {
                name: keys.moveRight.name,
                pressed : false
            },
            jump: {
                name: keys.jump.name,
                pressed : false
            },
            attack: {
                name: keys.attack.name,
                pressed : false
            },
            shoot: {
                name: keys.shoot.name,
                pressed : false
            },

        }

        this.attackCounter = 0
        this.distanceCounter = 10

        
        this.projectileArray = []
        
        this.init()
        
    }
    init() {

        this.drawCharacter()
        
    }

    drawCharacter() {

        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.characterPos.x, this.characterPos.y, this.characterSize.w, this.characterSize.h)
        this.move()

        this.projectileArray.forEach(elem => elem.drawProjectile())
        
        
        // console.log('person')
    }

    move() {

        if (this.characterPos.y < this.floor) {
            this.characterPos.y += this.speed.y
            this.speed.y += this.gravity
        } else {
            this.characterPos.y = this.floor
            this.speed.y = 1
        }

        if (this.characterPos.x > this.canvasSize.w) {
            this.characterPos.x = 0
        }

        if (this.characterPos.x < 0) {
            this.characterPos.x = this.canvasSize.w - this.characterSize.w
        }

        if (this.keys.moveLeft.pressed) {
            this.characterPos.x -= this.speed.x
            // console.log('true left') 
        }

        if (this.keys.moveRight.pressed) {
            this.characterPos.x += this.speed.x
        } 
    }
    
    
    jump() {
        //  console.log('salto')
        this.characterPos.y -= 100
        this.speed.y -= 12
    }

    physicalAttackBox(enemyPos) {
        // console.log('green box')

        if (enemyPos.x < this.characterPos.x) {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.characterPos.x - 100, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)
        } else {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.characterPos.x + 50, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)

        }
        
    }

    physicalAttack(enemyPos, enemySize) {

        this.physicalAttackBox(enemyPos)
        // console.log('attack box', this.physicalAttackBox.x)
        // console.log('enemy', this.enemyData)
        if (this.characterPos.x + 50 < enemyPos.x + enemySize.w &&
            this.characterPos.x + 50 + this.attackBoxSize.w > enemyPos.x &&
            this.characterPos.y < enemyPos.y + enemySize.h &&
            this.attackBoxSize.h + this.characterPos.y > enemyPos.y) {
            
            document.querySelector(this.enemyTag).style.width = 50%
            console.log('ATTACK')
        }
        
        if  (enemyPos.x < this.characterPos.x - 100 + this.attackBoxSize.w &&
            enemyPos.x + enemySize.w > this.characterPos.x -100 &&
            enemyPos.y < this.characterPos.y + this.attackBoxSize.h &&
            enemySize.h + enemyPos.y > this.characterPos.y) {
            document.querySelector(this.enemyTag).style.width = 50%
            console.log('ataca')
        }
    }


    distanceAttack(enemyPos, enemySize) {

        this.projectileArray.push(new Projectile (this.ctx, this.characterPos, this.characterSize, enemyPos, enemySize))
        // console.log('distance')
        
    }    

    clearProjectile(enemyPos, enemySize) {
        
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x <= this.canvasSize.w)
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x > 0)     
        
        this.projectileArray.forEach(elem => {
            if (elem.projectilePos.x < enemyPos.x + enemySize.w &&
                elem.projectilePos.x + elem.projectileSize.w > enemyPos.x &&
                elem.projectilePos.y < enemyPos.y + enemySize.h &&
                elem.projectileSize.h + elem.projectilePos.y > enemyPos.y) {
                // console.log('clearing collision')
                // console.log(document.querySelector(this.enemyTag))
                console.log(this.enemyTag)
                document.querySelector(this.enemyTag).style.width = 20%
                console.log('colisión 1')
                    let index = this.projectileArray.indexOf(elem)
                    this.projectileArray.splice(index,1)
                } 
        }) 
    }


}
