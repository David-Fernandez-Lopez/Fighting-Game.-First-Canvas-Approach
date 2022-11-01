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
    backgrounds:[],
    characters: [],

    tempEnemyData: {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined
    },

    healthPL1: {
        x: 50,
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

    countDown : 120,
    

    init() {
        this.setDimensions()
        this.setContext()
        this.drawAll()
        this.createBackground()
        this.createCharacter()
        this.eventHandlers()
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
            this.drawAll()
            // this.moveAll()
            this.eventHandlers()

        }, 1000 / this.FPS)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        
        this.backgrounds.forEach(elem => elem.drawBackground())
        this.characters.forEach(elem => elem.drawCharacter())
        this.healthBarrPL1()
        this.healthBarrPL2()
        this.drawCountDown()
        this.tempEnemy()
    },

    
    createCharacter() {
        
        this.characters.push(this.character = new Character(
            this.ctx,
            this.canvasSize,
            this.tempEnemyData)
        )
        },
        
    createBackground() {
    
        // console.log('background')
        this.backgrounds.push(this.background = new Background(
            this.ctx,
            this.canvasSize))
    },

    // moveAll() {
                
    //     this.characters.forEach(elem => elem.move()) 
    // } ,

    eventHandlers() {
        
        this.characters.forEach(elm => elm.setEventHandlers())
    }, 

    tempEnemy() {
        
        this.tempEnemyData.x = this.canvasSize.w / 2 -50
        this.tempEnemyData.y = this.canvasSize.h - 250
        this.tempEnemyData.w = 100
        this.tempEnemyData.h = 200
    
        // console.log('enemy')
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.tempEnemyData.x, this.tempEnemyData.y, this.tempEnemyData.w, this.tempEnemyData.h)
    },


    healthBarrPL1() {
        
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.healthPL1.x, this.healthPL1.y, this.healthPL1.w, this.healthPL1.h)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.healthPL1.x, this.healthPL1.y, this.healthPL1.w, this.healthPL1.h)


    },

    healthBarrPL2() {
        
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.canvasSize.w - 550, this.healthPL2.y, this.healthPL2.w, this.healthPL2.h)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.canvasSize.w - 550, this.healthPL2.y, this.healthPL2.w, this.healthPL2.h)
    },
     
    drawCountDown() {
        
        this.ctx.fillStyle = 'orange'
        this.ctx.fillRect(this.canvasSize.w / 2 - 50, this.countDownData.y, this.countDownData.w, this.countDownData.h)
        

        this.ctx.fillStyle = 'black'
        this.ctx.font = '50px arial';

        if (this.countDown < 0) {
            this.ctx.fillText(`000`, this.canvasSize.w / 2 - 40, this.countDownData.h + 20)

        } else if (this.countDown < 10) {
            this.ctx.fillText(`00${this.countDown}`, this.canvasSize.w / 2 -40, this.countDownData.h + 20)
             
        } else if (this.countDown <= 99){            
            this.ctx.fillText(`0${this.countDown}`, this.canvasSize.w / 2 -40, this.countDownData.h + 20)
             
        } else {
            this.ctx.fillText(`${this.countDown}`, this.canvasSize.w / 2 -40, this.countDownData.h + 20)
        }
    }

    
}