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

    intervalID: undefined,
      
    animations: 'idle',

    spidermanPos: 'Right',

    hollowPos: 'Left',
   
    backgroundMusic: new Audio("./sounds/river-stream-moderate-flow-2-24370.mp3"),

    init() {
        this.setDimensions()
        this.setContext()
        this.drawAll()
        this.createBackground()
        this.createcharacter1()
        this.createcharacter2()
        this.setEventHandlers()
        this.createPlayer1Wins()
        this.createPlayer2Wins()
        this.backgroundMusic.play()
        this.backgroundMusic.volume=0.5
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
       

        this.intervalID = setInterval(() => {

            this.framesCounter++
            // console.log(this.framesCounter)

            if (this.framesCounter % 60 === 0) {
                this.countDown--
                // console.log(this.countDown)
            }
            
            this.clearAll()
            
            this.clearProjectiles()
            this.drawAll()
            this.characters[1].drawPhysicalAnimation(this.characters[0].characterPos)
            this.characters[0].drawPhysicalAnimation(this.characters[1].characterPos)

        }, 1000 / this.FPS)
    },
    setEventHandlers() {
                  
    
        document.onkeydown = event => {
            event.preventDefault()
            // console.log(event.key)
            switch (event.key) {
                case 'a':
                    this.characters[0].keys.moveLeft.pressed = true
                    this.characters[0].currentMood = 'walk'
                    this.characters[0].LookingPosition = 'Left'
                    document.querySelector('#a').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    // console.log('left')
                    break;
                case 'd':
                    this.characters[0].keys.moveRight.pressed = true
                    this.characters[0].currentMood = 'walk'
                    this.characters[0].LookingPosition = 'Right'
                    document.querySelector('#d').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case 'w':
                    if (this.characters[0].characterPos.y === this.floor) {
                        this.characters[0].currentMood = 'jump'
                        this.characters[0].jump()
                    }
                    document.querySelector('#w').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case ' ':
                    // console.log(this.characters[1].characterPos)
                    this.characters[0].keys.attack.pressed = true
                    this.characters[0].attackCounter++
                    this.characters[0].currentMood = 'attack'
                    if (this.characters[0].attackCounter === 1 || this.characters[0].attackCounter % 15 === 0) this.characters[0].physicalAttack(this.characters[1].characterPos, this.characters[1].characterSize)
                    document.querySelector('#space').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case 'b':
                    this.characters[0].distanceCounter++
                    this.characters[0].currentMood = 'attack'
                    if (this.characters[0].distanceCounter === 1 || this.characters[0].distanceCounter % 20 === 0) this.characters[0].distanceAttack(this.characters[1].characterPos, this.characters[1].characterSize)
                    document.querySelector('#b').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                
                case 'ArrowLeft':
                    this.characters[1].keys.moveLeft.pressed = true
                    this.characters[1].currentMood = 'walk'
                    this.characters[1].LookingPosition = 'Left'
                    console.log(this.characters[1].LookingPosition)
                    document.querySelector('#arrowLeft').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    // console.log('left')
                    break;
                case 'ArrowRight':
                    this.characters[1].keys.moveRight.pressed = true
                    this.characters[1].currentMood = 'walk'
                    this.characters[1].LookingPosition = 'Right'
                    console.log(this.characters[1].LookingPosition)
                    document.querySelector('#arrowRight').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case 'ArrowUp':
                    if (this.characters[1].characterPos.y === this.floor) {
                        this.characters[1].currentMood = 'jump'
                        this.characters[1].jump()
                    }
                    document.querySelector('#arrowUp').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case '+':
                    this.characters[1].keys.attack.pressed = true
                    this.characters[1].attackCounter++
                    this.characters[1].currentMood = 'attack'
                    if (this.characters[1].attackCounter === 1 || this.characters[1].attackCounter % 15 === 0) this.characters[1].physicalAttack(this.characters[0].characterPos, this.characters[0].characterSize)
                    document.querySelector('#add').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                case '-':
                    this.characters[1].distanceCounter++
                    this.characters[1].currentMood = 'attack'
                    if (this.characters[1].distanceCounter === 1 || this.characters[1].distanceCounter % 20 === 0) this.characters[1].distanceAttack(this.characters[0].characterPos, this.characters[0].characterSize)
                    document.querySelector('#sus').style.backgroundColor = `rgb(163, 52, 255,0.716)`
                    break;
                    
            }
            
        }

        document.onkeyup = event => {
            event.preventDefault()
            // console.log(event.key)
            switch (event.key) {
               
                case 'a':
                    this.characters[0].keys.moveLeft.pressed = false
                    this.characters[0].currentMood = 'idle'
                    document.querySelector('#a').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    // console.log('left')
                    break;
                case 'd':
                    this.characters[0].keys.moveRight.pressed = false
                    this.characters[0].currentMood = 'idle'
                    document.querySelector('#d').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
                case 'w':
                    setTimeout(() => {
                        this.characters[0].currentMood = 'idle'
                    },3000)
                    document.querySelector('#w').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
               
                case ' ':
                    this.characters[0].keys.attack.pressed = false
                    if (this.characters[0].attackCounter > 0) this.characters[0].attackCounter = 0
                    setTimeout(() => {
                        this.characters[0].currentMood = 'idle'
                    }, 400)
                    document.querySelector('#space').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
                case 'b':
                    setTimeout(() => {
                        this.characters[0].currentMood = 'idle'
                    },400)
                    if (this.characters[0].distanceCounter % 4 === 0) this.characters[0].distanceCounter = 0
                    document.querySelector('#b').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
                case 'ArrowLeft':
                    this.characters[1].keys.moveLeft.pressed = false
                    this.characters[1].currentMood = 'idle'
                    document.querySelector('#arrowLeft').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    // console.log('left')
                    break;
                case 'ArrowRight':
                    this.characters[1].keys.moveRight.pressed = false
                    this.characters[1].currentMood = 'idle'
                    document.querySelector('#arrowRight').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
               case 'ArrowUp':
                    setTimeout(() => {
                        this.characters[1].currentMood = 'idle'
                    }, 950)
                    document.querySelector('#arrowUp').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
                case '+':
                    this.characters[1].keys.attack.pressed = false
                    if (this.characters[1].attackCounter > 0) this.characters[1].attackCounter = 0
                    setTimeout(() => {
                        this.characters[1].currentMood = 'idle'
                    }, 400)
                    document.querySelector('#add').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
                    break;
                case '-':
                   setTimeout(() => {
                        this.characters[1].currentMood = 'idle'
                    },400)
                    if (this.characters[1].distanceCounter % 4 === 0) this.characters[1].distanceCounter = 0
                    document.querySelector('#sus').style.backgroundColor = `rgb(255, 255, 255, 0.716)`
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
        
        this.drawCountDown()
        
        this.characters.length > 0 && this.drawEndGame()
    },

    
    createcharacter1() {
        
    
        this.characters.push(this.character = new Character(
            this.ctx,
            this.canvasSize,
            this.player2Pos,
            this.player2Size,
            this.player1Keys,
            this.charHealth,
            'spiderman',
            this.charDamage,
            200,
            this.player1Color,
            '.maxHealth2',
            this.animations,
            this.spidermanPos
        )
        )
    },
    createcharacter2() {
        
        this.characters.push(this.character = new Character(
            this.ctx,
            this.canvasSize,
            this.player1Pos,
            this.player1Size,
            this.player2Keys,
            this.charHealth,
            `Hollow Knight`,
            this.charDamage,
            this.canvasSize.w - 400,
            this.player2Color,
            '.maxHealth1',
            this.animations,
            this.hollowPos
        )
        )
    },
        
    createBackground() {
    
        // console.log('background')
        this.backgrounds.push(this.background = new Background(
            this.ctx,
            this.canvasSize))
    },
     
    drawCountDown() {      
                
        let counter = document.querySelector('.counter');
        
        if (this.countDown < 0) {

            counter.innerHTML = `000`

        } else if (this.countDown < 10) {

            counter.innerHTML = `00${this.countDown}`
             
        } else if (this.countDown <= 99) {

            counter.innerHTML = `0${this.countDown}`
             
        } else {

            counter.innerHTML = `${this.countDown}`
        }
      
    },

    clearProjectiles() {
        
        this.characters[0].clearProjectile(this.characters[1].characterPos, this.characters[1].characterSize)

        this.characters[1].clearProjectile(this.characters[0].characterPos, this.characters[0].characterSize)

    },

    drawEndGame() {
        //    console.log(this.intervalID)
        if (this.countDown === 0) {
            if (this.characters[1].enemyHealth > this.characters[0].enemyHealth) {
                
                                  
                this.drawPlayer1Wins()
                                
                this.backgroundMusic.pause()
                
                clearInterval(this.intervalID)
                
               
                // console.log('PLAYER 1 WINS')
            } else {
                
                this.backgroundMusic.pause()
                
                clearInterval(this.intervalID)
                this.drawPlayer2Wins()
                
                
                // console.log('PLAYER 2 WINS')
            }

        }

        
        if (this.characters[1].enemyHealth < 0) {
            
            this.backgroundMusic.pause()
            
            clearInterval(this.intervalID)
            this.drawPlayer2Wins()
           
           
            // console.log('Player 2 WINS!')
        }
        
        if (this.characters[0].enemyHealth < 0) {
            
            this.backgroundMusic.pause()
            
            clearInterval(this.intervalID)
            this.drawPlayer1Wins()
            
            
            // console.log('PLAYER 1 WINS!')
        }
    },


    createPlayer1Wins() {
       
        this.stewie = new Image();
        this.stewie.src = "./img/p1 wins.png"
        
    },

    createPlayer2Wins() {
        
        this.hollow = new Image();
        this.hollow.src = "./img/p2 wins.png"
        
    },

    
    drawPlayer1Wins() {
       
        this.ctx.drawImage(this.stewie, 0, 0, this.canvasSize.w, this.canvasSize.h)
       
        document.querySelector('.Restart').style.display = 'block'
       
        document.querySelector('.absolute').style.visibility = 'hidden'

        document.querySelector('.key-box').style.visibility = 'hidden'
        
        let deathSound = new Audio("./sounds/videogame-death-sound-43894.mp3")
        deathSound.play()
        
    },

    drawPlayer2Wins() {
        
              
        this.ctx.drawImage(this.hollow, 0, 0, this.canvasSize.w, this.canvasSize.h)
        
        document.querySelector('.Restart').style.display = 'block'
        
        document.querySelector('.absolute').style.visibility = 'hidden'

        document.querySelector('.key-box').style.visibility = 'hidden'
        
        let deathSound = new Audio("./sounds/videogame-death-sound-43894.mp3")
        deathSound.play()
       
    }
}