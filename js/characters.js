class Character {           // extends Player
    constructor(ctx, canvasSize, tempEnemyData) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.tempEnemyData = tempEnemyData
        this.name = 'name'
        this.characterSize = {
            w: 100,
            h: 200
        }
        this.characterPos = {
            x: 100,
            y: this.canvasSize.h - this.characterSize.h
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
        this.ctx.fillRect(this.characterPos.x, this.characterPos.y, this.characterSize.w, this.characterSize.h)
        this.move()

        this.projectileArray.forEach(elem => elem.drawProjectile())
        this.clearProjectile()
        
        // console.log('person')
    }

    move() {

        if (this.characterPos.y < this.floor) {
            this.characterPos.y += this.speed.y
            this.speed.y += this.gravity
        } else if (this.characterPos.y < this.floor) {
            this.characterPos.y -= this.speed.y
            this.speed.y -= this.gravity
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
                    if (this.characterPos.y === this.floor) {
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
            this.characterPos.x -= this.speed.x
            // console.log('true left') 
        }

        if (this.keys.ArrowRight.pressed) {
            this.characterPos.x += this.speed.x
        } 
    }
    
    jump() {
        //  console.log('salto')
        this.characterPos.y -= 100
        this.speed.y -= 12
        // this.characterPos.y -= this.speed.y
    }

    physicalAttackBox() {
        // console.log('green box')

        if (this.tempEnemyData.x < this.characterPos.x) {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.characterPos.x - 100, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)
        } else {
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.characterPos.x + 50, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)

        }
        
    }

    physicalAttack() {

        this.physicalAttackBox()
        // console.log('attack box', this.physicalAttackBox.x)
        // console.log('enemy', this.tempEnemyData)
        if (this.characterPos.x + 50 < this.tempEnemyData.x + this.tempEnemyData.w &&
            this.characterPos.x + 50 + this.attackBoxSize.w > this.tempEnemyData.x &&
            this.characterPos.y < this.tempEnemyData.y + this.tempEnemyData.h &&
            this.attackBoxSize.h + this.characterPos.y > this.tempEnemyData.y) {
             
            console.log('ATTACK')
        }
        
        if  (this.tempEnemyData.x < this.characterPos.x - 100 + this.attackBoxSize.w &&
            this.tempEnemyData.x + this.tempEnemyData.w > this.characterPos.x -100 &&
            this.tempEnemyData.y < this.characterPos.y + this.attackBoxSize.h &&
            this.tempEnemyData.h + this.tempEnemyData.y > this.characterPos.y) {
            
            console.log('ataca')
        }
    }


    distanceAttack() {

        this.projectileArray.push(new Projectile (this.ctx, this.characterPos, this.characterSize, this.tempEnemyData))
        // console.log('distance')
        
    }    

    clearProjectile() {
        
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x <= this.canvasSize.w)
        this.projectileArray = this.projectileArray.filter(elem => elem.projectilePos.x > 0)     
        
        this.projectileArray.forEach(elem => {
            if (elem.projectilePos.x < this.tempEnemyData.x + this.tempEnemyData.w &&
                elem.projectilePos.x + elem.projectileSize.w > this.tempEnemyData.x &&
                elem.projectilePos.y < this.tempEnemyData.y + this.tempEnemyData.h &&
                elem.projectileSize.h + elem.projectilePos.y > this.tempEnemyData.y) {
                // console.log('clearing collision')
                    let index = this.projectileArray.indexOf(elem)
                    this.projectileArray.splice(index,1)
                } 
        }) 

        this.projectileArray.forEach(elem => {
             if (this.tempEnemyData.x < elem.projectilePos.x - 5 + elem.projectileSize.w &&
                this.tempEnemyData.x + this.tempEnemyData.w > elem.projectilePos.x - 5 &&
                this.tempEnemyData.y < elem.projectilePos.y + elem.projectileSize.h &&
                this.tempEnemyData.h + this.tempEnemyData.y > elem.projectilePos.y) {
                    let index = this.projectileArray.indexOf(elem)
                    this.projectileArray.splice(index,1)
                }
        }) 
        
    }


}
