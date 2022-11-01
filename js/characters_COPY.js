class Character extends Player {           // extends Player
    constructor(ctx, canvasSize, enemyData,playerPos,playerSize, floor) {
        super (ctx, canvasSize,enemyData,playerPos, playerSize, floor)
        this.name = 'name'
        
        this.speed = {
            x: 10,
            y: 10
        }
        this.floor = this.canvasSize.h - this.playerSize.h - 50
        this.gravity = 0.4

        this.attackBoxSize = {
            w: this.playerSize.w + 50,
            h: this.playerSize.h / 2
        }

        this.health = 100
        
        this.keys = {

            a: {
                pressed: false
            },
            w: {
                pressed: false
            },
            d: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
            ArrowUp: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            }

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

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.move()

        this.projectileArray.forEach(elem => elem.drawProjectile())
        this.clearProjectile()
        
        // console.log('person')
    }

    move() {

        if (this.playerPos.y < this.floor) {
            this.playerPos.y += this.speed.y
            this.speed.y += this.gravity
        } else if (this.playerPos.y < this.floor) {
            this.playerPos.y -= this.speed.y
            this.speed.y -= this.gravity
        } else {
            this.playerPos.y = this.floor
            this.speed.y = 1
        }

        if (this.playerPos.x > this.canvasSize.w) {
            this.playerPos.x = 0
        }

        if (this.playerPos.x < 0) {
            this.playerPos.x = this.canvasSize.w - this.playerSize.w
        }
    }
    
    setEventHandlers() {
                  
    
        document.onkeydown = event => {
            event.preventDefault()
            switch (event.key) {
                case 'ArrowLeft':
                    this.keys.ArrowLeft.pressed = true
                    // console.log('left')
                    break;
                case 'ArrowRight':
                    this.keys.ArrowRight.pressed = true
                    break;
                case 'ArrowUp':
                    if (this.playerPos.y === this.floor) {
                        this.jump()
                    }
                    break;
                case ' ':
                    this.attackCounter++
                    if(this.attackCounter === 1 || this.attackCounter % 15 === 0) this.physicalAttack()
                    break;
                case 'Control':
                    this.distanceCounter++
                    if (this.distanceCounter === 1 || this.distanceCounter % 20 === 0) this.distanceAttack()
                    break;
                    
            }
            
        }

        document.onkeyup = event => {
            event.preventDefault()
            // console.log(event.key)
            switch (event.key) {
                case 'ArrowLeft':
                    this.keys.ArrowLeft.pressed = false
                    break;
                case 'ArrowRight':
                    this.keys.ArrowRight.pressed = false
                    break;
                case ' ':
                    if (this.attackCounter > 0) this.attackCounter = 0
                    break;
                case 'Control':
                    // console.log('distance attack')
                    if (this.distanceCounter % 4 === 0) this.distanceCounter = 0
                    break;
            }
        }

        if (this.keys.ArrowLeft.pressed) {
            this.playerPos.x -= this.speed.x
            // console.log('true left') 
        }

        if (this.keys.ArrowRight.pressed) {
            this.playerPos.x += this.speed.x
        } 
    }
    
    jump() {
        //  console.log('salto')
        this.playerPos.y -= 100
        this.speed.y -= 12
        // this.playerPos.y -= this.speed.y
    }

    physicalAttackBox() {
        // console.log('green box')

        if (this.enemyData.x < this.playerPos.x) {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.playerPos.x - 100, this.playerPos.y, this.attackBoxSize.w, this.attackBoxSize.h)
        } else {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.playerPos.x + 50, this.playerPos.y, this.attackBoxSize.w, this.attackBoxSize.h)

        }
        
    }

    physicalAttack() {

        this.physicalAttackBox()
        // console.log('attack box', this.physicalAttackBox.x)
        // console.log('enemy', this.enemyData)
        if (this.playerPos.x + 50 < this.enemyData.x + this.enemyData.w &&
            this.playerPos.x + 50 + this.attackBoxSize.w > this.enemyData.x &&
            this.playerPos.y < this.enemyData.y + this.enemyData.h &&
            this.attackBoxSize.h + this.playerPos.y > this.enemyData.y) {
             
            console.log('ATTACK')
        }
        
        if  (this.enemyData.x < this.playerPos.x - 100 + this.attackBoxSize.w &&
            this.enemyData.x + this.enemyData.w > this.playerPos.x -100 &&
            this.enemyData.y < this.playerPos.y + this.attackBoxSize.h &&
            this.enemyData.h + this.enemyData.y > this.playerPos.y) {
            
            console.log('ataca')
        }
    }


    distanceAttack() {

        this.projectileArray.push(new Projectile (this.ctx, this.playerPos, this.playerSize, this.enemyData))
        // console.log('distance')
        
    }    

    clearProjectile() {
        
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x <= this.canvasSize.w)
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x > 0)     
        
        this.projectileArray.forEach(elem => {
            if (elem.projectilePos.x < this.enemyData.x + this.enemyData.w &&
                elem.projectilePos.x + elem.projectileSize.w > this.enemyData.x &&
                elem.projectilePos.y < this.enemyData.y + this.enemyData.h &&
                elem.projectileSize.h + elem.projectilePos.y > this.enemyData.y) {
                // console.log('clearing collision')
                    let index = this.projectileArray.indexOf(elem)
                    this.projectileArray.splice(index,1)
                } 
        }) 

        this.projectileArray.forEach(elem => {
             if (this.enemyData.x < elem.projectilePos.x - 5 + elem.projectileSize.w &&
                this.enemyData.x + this.enemyData.w > elem.projectilePos.x - 5 &&
                this.enemyData.y < elem.projectilePos.y + elem.projectileSize.h &&
                this.enemyData.h + this.enemyData.y > elem.projectilePos.y) {
                    let index = this.projectileArray.indexOf(elem)
                    this.projectileArray.splice(index,1)
                }
        }) 
        
    }


}
