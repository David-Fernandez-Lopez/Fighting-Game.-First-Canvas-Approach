class Character {           
    constructor(ctx, canvasSize, enemyPos, enemySize, keys, charHealth, charName, charDamage, playerPos, color, enemyTag, animations, initPosition) {
        // console.log(enemyPos)
        // console.log(enemySize)
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        this.charHealth = charHealth
        this.LookingPosition = initPosition
        this.name = charName
        this.charName = undefined
        // console.log(this.charName)
        this.damage = charDamage
        this.color = color
        this.enemyTag = enemyTag
        this.animations = animations
        this.characterSize = {
            w: 150,
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
        this.floor = this.canvasSize.h - this.characterSize.h-50
        this.gravity = 0.6

        this.attackBoxSize = {
            w: this.characterSize.w,
            h: this.characterSize.h / 2
        }

        // console.log(keys)
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

        this.gameFrame = 0

        this.enemyHealth = 100

        this.attackCounter = 0
        this.distanceCounter = 10
        
        this.projectileArray = []
        
        this.spidermanRightImage = new Image()
        this.spidermanRightImage.src = './img/spiderman.png'
        this.spidermanRightImage.cols = 13
        this.spidermanRightImage.rows = 12.8
        this.spidermanRightImage.rowsIndex = 0
        this.spidermanRightImage.colsIndex = 0

        this.spidermanLeftImage = new Image()
        this.spidermanLeftImage.src = './img/spidermanFLIP.png'
        this.spidermanLeftImage.cols = 13
        this.spidermanLeftImage.rows = 12.8
        this.spidermanLeftImage.rowsIndex = 11
        this.spidermanLeftImage.colsIndex = 0

        // console.log(this.animations)

        this.currentMood = 'idle'

        this.spidermanRightAnimations = [
            {
                name: 'walk',
                frames: 9
            },{
                name: 'extra',
                frames: 4
            },{
                name: 'extra',
                frames: 9
            },{
                name: 'attack',
                frames: 5
            },{
                name: 'extra',
                frames: 3
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'extra',
                frames: 7
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'idle',
                frames: 7
            },{
                name: 'jump',
                frames: 12
            }
        ]

        this.spidermanLeftAnimations = [
            {
                name: 'walk',
                frames: 11,
                limit: 5
            },{
                name: 'extra',
                frames: 4
            },{
                name: 'extra',
                frames: 9
            },{
                name: 'attack',
                frames: 11,
                limit: 6.9
            },{
                name: 'extra',
                frames: 3
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'extra',
                frames: 7
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'idle',
                frames: 11,
                limit: 6
            },{
                name: 'jump',
                frames: 12,
                limit: 4
            }
        ]

        this.hollowImageLookingLeft = new Image()
        this.hollowImageLookingLeft.src = './img/hollow_knight_sprite - copia.png'
        this.hollowImageLookingLeft.cols = 16
        this.hollowImageLookingLeft.rows = 16
        this.hollowImageLookingLeft.rowsIndex = 15
        this.hollowImageLookingLeft.colsIndex = 0
        // console.log(this.spidermanImage.src)
        
        this.hollowImageLookingRight = new Image()
        this.hollowImageLookingRight.src = './img/hollow_knight_sprite.png'
        this.hollowImageLookingRight.cols = 16
        this.hollowImageLookingRight.rows = 16
        this.hollowImageLookingRight.rowsIndex = 0
        this.hollowImageLookingRight.colsIndex = 0

        this.hollowLeftAnimations = [
            {
                name: 'walk',
                frames: 16,
                limit:9
            },{
                name: 'caterpillar',
                frames: 4
            },{
                name: 'extra',
                frames: 1
            },{
                name: 'extra',
                frames: 4
            },{
                name: 'attack',
                frames: 14,
                limit: 12
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'extra',
                frames: 7
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'idle',
                frames: 16,
                limit: 9
            },{
                name: 'jump',
                frames: 16,
                limit: 7
            },{
                name: 'extra',
                frames: 3
            },{
                name: 'extra',
                frames: 2
            },{
                name: 'sword',
                frames: 3,
                limit: 2
            }
        ]

        this.hollowRightAnimations = [
            {
                name: 'walk',
                frames: 9
            },{
                name: 'caterpillar',
                frames: 4
            },{
                name: 'extra',
                frames: 1
            },{
                name: 'extra',
                frames: 4
            },{
                name: 'attack',
                frames: 7
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'extra',
                frames: 7
            },{
                name: 'extra',
                frames: 6
            },{
                name: 'idle',
                frames: 7
            },{
                name: 'jump',
                frames: 16
            },{
                name: 'extra',
                frames: 3
            },{
                name: 'extra',
                frames: 2
            },{
                name: 'sword',
                frames: 3,
                limit: 2
            }
        ]

        this.init()
        
    }
    init() {

        this.drawCharacter()

    }

    drawCharacter() {
            this.charName = `${this.name}` + ` ${this.LookingPosition}`
        if (this.charName === 'spiderman Right') {
            // console.log('spiderman')

            this.ctx.drawImage(
                this.spidermanRightImage,                
                this.spidermanRightImage.rowsIndex * (this.spidermanRightImage.width / this.spidermanRightImage.cols),
                this.spidermanRightImage.colsIndex * (this.spidermanRightImage.height / this.spidermanRightImage.rows),
                this.spidermanRightImage.width / this.spidermanRightImage.cols,
                this.spidermanRightImage.height / this.spidermanRightImage.rows,
                this.characterPos.x,
                this.characterPos.y,
                this.characterSize.w,
                this.characterSize.h
            )
            this.animate()

        } else if (this.charName === 'spiderman Left') {

            this.ctx.drawImage(
                this.spidermanLeftImage,
                this.spidermanLeftImage.rowsIndex * (this.spidermanLeftImage.width / this.spidermanLeftImage.cols),
                this.spidermanLeftImage.colsIndex * (this.spidermanLeftImage.height / this.spidermanLeftImage.rows),
                this.spidermanLeftImage.width / this.spidermanLeftImage.cols,
                this.spidermanLeftImage.height / this.spidermanLeftImage.rows,
                this.characterPos.x,
                this.characterPos.y,
                this.characterSize.w,
                this.characterSize.h
            )
            this.animate()

        } else if (this.charName === 'Hollow Knight Right') {

            // console.log(this.spidermanImage.height)
            // console.log(this.spidermanImage)
            this.ctx.drawImage(
                this.hollowImageLookingRight,                
                this.hollowImageLookingRight.rowsIndex * (this.hollowImageLookingRight.width / this.hollowImageLookingRight.cols),      
                this.hollowImageLookingRight.colsIndex * (this.hollowImageLookingRight.height / this.hollowImageLookingRight.rows),      
                this.hollowImageLookingRight.width / this.hollowImageLookingRight.cols,      
                this.hollowImageLookingRight.height / this.hollowImageLookingRight.rows,      
                this.characterPos.x,
                this.characterPos.y,
                this.characterSize.w,
                this.characterSize.h
            )            
            this.animate()

        } else if (this.charName === 'Hollow Knight Left') {

            // console.log(this.spidermanImage.height)
            // console.log(this.spidermanImage)
            this.ctx.drawImage(
                this.hollowImageLookingLeft,                
                this.hollowImageLookingLeft.rowsIndex * (this.hollowImageLookingLeft.width / this.hollowImageLookingLeft.cols),      
                this.hollowImageLookingLeft.colsIndex * (this.hollowImageLookingLeft.height / this.hollowImageLookingLeft.rows),      
                this.hollowImageLookingLeft.width / this.hollowImageLookingLeft.cols,      
                this.hollowImageLookingLeft.height / this.hollowImageLookingLeft.rows,      
                this.characterPos.x,
                this.characterPos.y,
                this.characterSize.w,
                this.characterSize.h
            )            
                this.animate()

        }

        this.move()

        this.projectileArray.forEach(elem => elem.drawProjectile())
        
        
        // console.log('person')
    }

    animate() {
        this.gameFrame++

            //SPIDERMAN 

        const spidermanMoodCols = this.spidermanRightAnimations.find(elm => elm.name === this.currentMood).frames
        const spidermanMoodRows = this.spidermanRightAnimations.indexOf(this.spidermanRightAnimations.find(elm => elm.name === this.currentMood))
        this.spidermanRightImage.colsIndex = spidermanMoodRows

        if (this.gameFrame % spidermanMoodCols == 0) {
            this.spidermanRightImage.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.spidermanRightImage.rowsIndex >= spidermanMoodCols) {

            this.spidermanRightImage.rowsIndex = 0;
        }      

        const spidermanLeftMoodCols = this.spidermanLeftAnimations.find(elm => elm.name === this.currentMood).frames
        const spidermanLeftLimit = this.spidermanLeftAnimations.find(elm => elm.name === this.currentMood).limit
        const spidermanLeftMoodRows = this.spidermanLeftAnimations.indexOf(this.spidermanLeftAnimations.find(elm => elm.name === this.currentMood))
        this.spidermanLeftImage.colsIndex = spidermanLeftMoodRows

        if (this.gameFrame % spidermanLeftMoodCols == 0) {
            this.spidermanLeftImage.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.spidermanLeftImage.rowsIndex >= spidermanLeftMoodCols) {

            this.spidermanLeftImage.rowsIndex = spidermanLeftLimit;
        }

            //HOLLOW KNIGHT
        
        const hollowLeftMoodCols = this.hollowLeftAnimations.find(elm => elm.name === this.currentMood).frames
        const hollowLeftLimit = this.hollowLeftAnimations.find(elm => elm.name === this.currentMood).limit
        const hollowLeftMoodRows = this.hollowLeftAnimations.indexOf(this.hollowLeftAnimations.find(elm => elm.name === this.currentMood))
        this.hollowImageLookingLeft.colsIndex = hollowLeftMoodRows

        if (this.gameFrame % hollowLeftMoodCols == 0) {
            this.hollowImageLookingLeft.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.hollowImageLookingLeft.rowsIndex >= hollowLeftMoodCols) {

            this.hollowImageLookingLeft.rowsIndex = hollowLeftLimit;
        }
        

        const hollowRightMoodCols = this.hollowRightAnimations.find(elm => elm.name === this.currentMood).frames

        const hollowRightMoodRows = this.hollowRightAnimations.indexOf(this.hollowRightAnimations.find(elm => elm.name === this.currentMood))

        this.hollowImageLookingRight.colsIndex = hollowRightMoodRows

        if (this.gameFrame % hollowRightMoodCols == 0) {
            this.hollowImageLookingRight.rowsIndex++
            // this.spidermanImage.colsIndex = moodRows
        } if (this.hollowImageLookingRight.rowsIndex >= hollowRightMoodCols) {

            this.hollowImageLookingRight.rowsIndex = 0;
        }
        
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
        this.characterPos.y -= 120
        this.speed.y -= 12
    }

    physicalAttackBox(enemyPos) {
        // console.log('green box')

        if (enemyPos.x < this.characterPos.x) {
            // this.ctx.fillStyle = 'green'
            // this.ctx.fillRect(this.characterPos.x - 20, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)
        } else {
            // this.ctx.fillStyle = 'green'
            // this.ctx.fillRect(this.characterPos.x + 20, this.characterPos.y, this.attackBoxSize.w, this.attackBoxSize.h)

        }
    }

    drawPhysicalAnimation(enemyPos) {
        this.slashLeftImage = new Image()
        this.slashLeftImage.src = './img/one slash.png'
        
        this.slashRightImage = new Image()
        this.slashRightImage.src = './img/one slash - right.png'

        this.hitLeftImage = new Image()
        this.hitLeftImage.src = './img/hit left.png'

        this.hitRightImage = new Image()
        this.hitRightImage.src = './img/hit right.png'

        if (enemyPos.x < this.characterPos.x){
            
            if (this.keys.attack.pressed) {
                // console.log(this.charName)
                if ((this.charName === 'spiderman Left')) {
            
                    this.ctx.drawImage(
                        this.slashLeftImage,
                        this.characterPos.x - 70,
                        this.characterPos.y + 20,
                        this.attackBoxSize.w,
                        this.attackBoxSize.h
                    )
                
                    setTimeout(() => {
                        this.keys.attack.pressed === false
                    }, 500)

                } else if ((this.charName === 'Hollow Knight Left')) {
                    // console.log(this.charName)
                    this.ctx.drawImage(
                        this.hitLeftImage,
                        this.characterPos.x - 70,
                        this.characterPos.y + 20,
                        this.attackBoxSize.w,
                        this.attackBoxSize.h
                    )
                    
                    setTimeout(() => {
                        this.keys.attack.pressed === false
                    }, 500)
                }
            }
            } else if (enemyPos.x > this.characterPos.x) {

                if (this.keys.attack.pressed) {

                    if ((this.charName === 'spiderman Right')) {
                
                        this.ctx.drawImage(
                            this.slashRightImage,
                            this.characterPos.x + 70,
                            this.characterPos.y + 20,
                            this.attackBoxSize.w,
                            this.attackBoxSize.h
                        )
                                            
                        setTimeout(() => {
                            this.keys.attack.pressed === false
                        }, 500)

                    } else if ((this.charName === 'Hollow Knight Right')) {
                        console.log(this.charName)
                        this.ctx.drawImage(
                            this.hitRightImage,
                            this.characterPos.x + 70,
                            this.characterPos.y + 20,
                            this.attackBoxSize.w,
                            this.attackBoxSize.h
                        )
                    
                        setTimeout(() => {
                            this.keys.attack.pressed === false
                        }, 500)
                    }
                }
            }
        }
    

    physicalAttack(enemyPos, enemySize) {
        this.physicalAttackBox(enemyPos)
        // console.log('attack box', this.physicalAttackBox.x)
        // console.log('enemy', this.enemyData)
        if (this.characterPos.x + 20 < enemyPos.x + enemySize.w &&
            this.characterPos.x + 20 + this.attackBoxSize.w > enemyPos.x &&
            this.characterPos.y < enemyPos.y + enemySize.h &&
            this.attackBoxSize.h + this.characterPos.y > enemyPos.y) {
            this.enemyHealth -= 10
            document.querySelector(this.enemyTag).style.width = `${this.enemyHealth}%`
            let punchSound = new Audio("./sounds/karate-chop-6357.mp3")
            punchSound.play()
            console.log('ATTACK')
        }
        
        if  (enemyPos.x < this.characterPos.x - 20 + this.attackBoxSize.w &&
            enemyPos.x + enemySize.w > this.characterPos.x -20 &&
            enemyPos.y < this.characterPos.y + this.attackBoxSize.h &&
            enemySize.h + enemyPos.y > this.characterPos.y) {
            this.enemyHealth -= 10
            document.querySelector(this.enemyTag).style.width = `${this.enemyHealth}%`
            let punchSound = new Audio("./sounds/karate-chop-6357.mp3")
            punchSound.play()
            console.log('ataca')
        }
    }


    distanceAttack(enemyPos, enemySize) {

        this.newName = `${this.name}` + ` ${this.LookingPosition}`
        this.projectileArray.push(new Projectile (this.ctx, this.characterPos, this.characterSize, enemyPos, enemySize, this.newName))
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
                // console.log(document.querySelectorAll(this.enemyTag))
                this.enemyHealth -= 6
                document.querySelector(this.enemyTag).style.width = `${this.enemyHealth}%`
                // console.log('colisión 1')
                    let index = this.projectileArray.indexOf(elem)
                this.projectileArray.splice(index, 1)
                let punchSound = new Audio("./sounds/punch-2-37333.mp3")
                punchSound.play()
                } 
        }) 
    } 
}
