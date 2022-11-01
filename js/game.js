const game = {
    appName: 'Game',
    version: '1.0.0',
    license: undefined,
    author: 'David & David',
    description: 'Fighting Game',
    ctx: undefined,
    imageInstance: undefined,
    canvasSize: {
        w: undefined, h: undefined
    },
    framesCounter: 0,
    FPS: 60,
    backgrounds: [],
    characters: [],

    tempEnemyData: {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined
    },

    healthPL1: {
        x: 100,
        y: 50,
        w: 500,
        h: 50
    },

    healthPL2: {
        x: undefined,
        y: 50,
        w: 500,
        h: 50
    },

    countDownData: {
        x: undefined,
        y: 50,
        w: 100,
        h: 100
    },

    player1Keys: {
        moveLeft: {
            name: 'a'
        },
        moveRight: {
            name: 'd'
        },
        jump: {
            name: 'w'
        },
        attack: {
            name: ' '
        },
        shoot: {
            name: 'b'
        }
    },

    player2Keys: {
        moveLeft: {
            name: 'ArrowLeft'
        },
        moveRight: {
            name: 'ArrowRight'
        },
        jump: {
            name: 'ArrowUp'
        },
        attack: {
            name: '+'
        },
        shoot: {
            name: '-'
        }
    },

    player1Pos: {
        x: 50,
        y: 500
    },

    player1Size: {
        x: undefined,
        y: undefined
    },

    player2Pos: {
        x: 250,
        y: 500
    },
    
    player2Size: {
        x: undefined,
        y: undefined
    },

    player1Color: 'red',
    
    player2Color: 'blue',

    countDown: 120,
    
    floor: undefined,
    

    init() {
        this.setDimensions()
        this.setContext()
        this.drawAll()
        this.createBackground()
        this.createcharacter1()
        this.createcharacter2()
        this.setEventHandlers()
        this.start()
        // console.log('Me he iniciado')
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        document.querySelector('#canvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('#canvas').setAttribute('width', this.canvasSize.w)
        this.floor = this.canvasSize.h - 200 - 50
    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
    },

    start() {
       

        const intervalID = setInterval(() => {

            this.framesCounter++
            // console.log(this.framesCounter)

            if (this.framesCounter % 60 === 0) {
                this.countDown--
                // console.log(this.countDown)
            }
            
            this.clearAll()
            // this.moveAll()
            // this.setEventHandlers()
            this.clearProjectiles()
            this.drawAll()

        }, 1000 / this.FPS)
    },
    setEventHandlers() {
                  
    
        document.onkeydown = event => {
            event.preventDefault()
            // console.log(event.key)
            switch (event.key) {
                case 'a':
                    this.characters[0].keys.moveLeft.pressed = true
                    // console.log('left')
                    break;
                case 'd':
                    this.characters[0].keys.moveRight.pressed = true
                    break;
                case 'w':
                    if (this.characters[0].characterPos.y === this.floor) {
                        this.characters[0].jump()
                    }
                    break;
                case ' ':
                    console.log(this.characters[1].characterPos)
                    this.characters[0].attackCounter++
                    if (this.characters[0].attackCounter === 1 || this.characters[0].attackCounter % 15 === 0) this.characters[0].physicalAttack(this.characters[1].characterPos, this.characters[1].characterSize)
                    break;
                case 'b':
                    this.characters[0].distanceCounter++
                    if (this.characters[0].distanceCounter === 1 || this.characters[0].distanceCounter % 20 === 0) this.characters[0].distanceAttack(this.characters[1].characterPos, this.characters[1].characterSize)
                    break;
                
                case 'ArrowLeft':
                    this.characters[1].keys.moveLeft.pressed = true
                    // console.log('left')
                    break;
                case 'ArrowRight':
                    this.characters[1].keys.moveRight.pressed = true
                    break;
                case 'ArrowUp':
                    if (this.characters[1].characterPos.y === this.floor) {
                        this.characters[1].jump()
                    }
                    break;
                case '+':
                    this.characters[1].attackCounter++
                    if (this.characters[1].attackCounter === 1 || this.characters[1].attackCounter % 15 === 0) this.characters[1].physicalAttack(this.characters[0].characterPos, this.characters[0].characterSize)
                    break;
                case '-':
                    this.characters[1].distanceCounter++
                    if (this.characters[1].distanceCounter === 1 || this.characters[1].distanceCounter % 20 === 0) this.characters[1].distanceAttack(this.characters[0].characterPos, this.characters[0].characterSize)
                    break;
                    
            }
            
        }

        document.onkeyup = event => {
            event.preventDefault()
            // console.log(event.key)
            switch (event.key) {
               
                case 'a':
                    this.characters[0].keys.moveLeft.pressed = false
                    // console.log('left')
                    break;
                case 'd':
                    this.characters[0].keys.moveRight.pressed = false
                    break;
               
                case ' ':
                    if (this.characters[0].attackCounter > 0) this.characters[0].attackCounter = 0
                    break;
                case 'b':
                   
                    if (this.characters[0].distanceCounter % 4 === 0) this.characters[0].distanceCounter = 0
                    break;
                case 'ArrowLeft':
                    this.characters[1].keys.moveLeft.pressed = false
                    // console.log('left')
                    break;
                case 'ArrowRight':
                    this.characters[1].keys.moveRight.pressed = false
                    break;
               
                case '+':
                    if (this.characters[1].attackCounter > 0) this.characters[1].attackCounter = 0
                    break;
                case '-':
                   
                    if (this.characters[1].distanceCounter % 4 === 0) this.characters[1].distanceCounter = 0
                    break;
            }
        }
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        
        this.backgrounds.forEach(elem => elem.drawBackground())
        this.characters.forEach(elem => elem.drawCharacter())
        // this.healthBarrPL1()
        // this.healthBarrPL2()
        this.drawCountDown()
        // this.tempEnemy()
    },

    
    createcharacter1() {
        // ctx, canvasSize, enemyData, keys, charHealth, charName, charDamage, playerPos
        //indice[1]
    
        this.characters.push(this.character = new Character(
            this.ctx,
            this.canvasSize,
            this.player2Pos,
            this.player2Size,
            this.player1Keys,
            this.charHealth,
            this.charName,
            this.charDamage,
            200,
            this.player1Color
        )
        )
    },
    createcharacter2() {
        // ctx, canvasSize, enemyData, keys, charHealth, charName, charDamage, playerPos
        this.characters.push(this.character = new Character(
            this.ctx,
            this.canvasSize,
            this.player1Pos,
            this.player1Size,
            this.player2Keys,
            this.charHealth,
            this.charName,
            this.charDamage,
            this.canvasSize.w - 300,
            this.player2Color
        )
        )
    },
        
    createBackground() {
    
        // console.log('background')
        this.backgrounds.push(this.background = new Background(
            this.ctx,
            this.canvasSize))
    },

    healthBarrPL1() {
        
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.healthPL1.x, this.healthPL1.y + 25, this.healthPL1.w, this.healthPL1.h)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.healthPL1.x, this.healthPL1.y + 25, this.healthPL1.w, this.healthPL1.h)


    },

    healthBarrPL2() {
        
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.canvasSize.w - 600, this.healthPL2.y + 25, this.healthPL2.w, this.healthPL2.h)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.canvasSize.w - 600, this.healthPL2.y + 25, this.healthPL2.w, this.healthPL2.h)
    },
     
    drawCountDown() {
        
        this.ctx.fillStyle = 'orange'
        this.ctx.fillRect(this.canvasSize.w / 2 - 50, this.countDownData.y, this.countDownData.w, this.countDownData.h)
        

        this.ctx.fillStyle = 'black'
        this.ctx.font = '50px arial';

        if (this.countDown < 0) {
            this.ctx.fillText(`000`, this.canvasSize.w / 2 - 40, this.countDownData.h + 20)

        } else if (this.countDown < 10) {
            this.ctx.fillText(`00${this.countDown}`, this.canvasSize.w / 2 - 40, this.countDownData.h + 20)
             
        } else if (this.countDown <= 99) {
            this.ctx.fillText(`0${this.countDown}`, this.canvasSize.w / 2 - 40, this.countDownData.h + 20)
             
        } else {
            this.ctx.fillText(`${this.countDown}`, this.canvasSize.w / 2 - 40, this.countDownData.h + 20)
        }
    },

    clearProjectiles() {
        
        this.characters[0].clearProjectile(this.characters[1].characterPos, this.characters[1].characterSize)

        this.characters[1].clearProjectile(this.characters[0].characterPos, this.characters[0].characterSize)

    }
}