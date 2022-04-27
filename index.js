class Canvas{
    constructor(nextblock){
       this.canvas =document.querySelector('canvas')
       this.rows = {}
       this.cordsProperties = {}
       this.cord = []
       this.blocks = ["line", "box", "L1", "L2", "T", 'Z1', "Z2"]
       this.nextblock = nextblock
       this.BlockPos = []
    }
    drawCanvas = () => {
        this.canvas.width = 497
        this.canvas.height = 622
        let c = this.canvas.getContext('2d')
        c.fillStyle = "gray"
        let rows = 0
        let collums = 0
        let x = 1
        let y = 1
        let numRows = 10
        let numCollums = 20
        let cords = []
        let rownum = 1
        while(collums != numCollums){
            while(rows != numRows){
                
                c.fillRect(x,y,30,30)
                cords.push(`${x} ${y}`)
                this.cordsProperties[`${x} ${y}`] = {
                    Color: "gray",
                    isFull: false
                }
                this.cord.push(`${x} ${y}`)
                x = x+31
                rows++
            }
            let name = `row${rownum}`
            this.rows[name] = cords
            cords = []
            rownum++
            y=y+31
            x=1
            rows = 0
            collums++
        }
        console.log(this.rows);
        console.log(this.cordsProperties)
        console.log(this.cord)
        c.fillStyle = "blue"
        c.fillRect(311,1,188,185)

    }


    Render = (block, x, y, orientation, unrender) =>  {
        var c = this.canvas.getContext('2d')
        var check = 0
        var tempY = y
        var tempX = x
        let orgX = x
        let orgY = y

        if(unrender === false){
            this.BlockPos.push(`${x} ${y}`)
        }
        if(unrender === true){
            this.BlockPos = []
            console.log('bruh')
        }
        //render functions
        let AddY = (numofrun, remember) => {
            while(check != numofrun){
                tempY = tempY+31
                if(remember === true){
                    y = tempY
                }
                c.fillRect(x,tempY,30,30)
                check++
                if(unrender === false){
                    this.BlockPos.push(`${x} ${tempY}`)
                }
            }
            tempY = y
            check = 0
        }
        let AddX = (numofrun, remember) => {
            while(check != numofrun){
                tempX = tempX+31
                if(remember === true){
                    x = tempX
                }
                c.fillRect(tempX,y,30,30)
                check++
                if(unrender === false){
                    this.BlockPos.push(`${tempX} ${y}`)
                }
            }
            tempX = x
            check = 0
        }
        let MinusX = (numofrun, remember) => {
            while(check != numofrun){
                tempX = tempX-31
                if(remember === true){
                    x = tempX
                }
                c.fillRect(tempX,y,30,30)
                check++
                if(unrender === false){
                    this.BlockPos.push(`${tempX} ${y}`)
                }
            }
            tempX = x
            check = 0
        }
        let MinusY = (numofrun, remember) => {
            while(check != numofrun){
                tempY = tempY-31
                if(remember === true){
                    y = tempY
                }
                c.fillRect(x,tempY,30,30)
                check++
                if(unrender === false){
                    this.BlockPos.push(`${x} ${tempY}`)
                }
            }
            tempY = y
            check = 0
        }


        //block render instructions
        if (block === "line"){
            c.fillStyle = "lightblue"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            
            if (orientation === "r2" || orientation === "r4"){
                AddY(1, false)
                MinusY(2, false)
            }
            else if (orientation === "r1" || orientation === "r3") {
                AddX(2, false)
                MinusX(1, false)
            }
        }
        else if(block === "box"){
            c.fillStyle = "green"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            MinusY(1,true)
            AddX(1,true)
            AddY(1, true)
        }
        else if(block === "L1"){
            c.fillStyle = "red"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){
                AddX(1, false)
                MinusX(1,true)
                AddY(1,true)

            }
            else if (orientation === "r2") {
                AddY(1,false)
                MinusY(1,true)
                MinusX(1,true)
            }
            else if (orientation === "r3") {
                MinusX(1,false)
                AddX(1,true)
                MinusY(1,true)
            }
            else if (orientation === "r4") {
                MinusY(1,false)
                AddY(1,true)
                AddX(1,true)
            }
        }
        else if(block === "L2"){
            c.fillStyle = "Purple"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){
                MinusX(1, false)
                AddX(1,true)
                AddY(1,true)
            }
            else if (orientation === "r2") {
                MinusY(1,false)
                AddY(1,true)
                MinusX(1,true)
            }
            else if (orientation === "r3") {
                AddX(1,false)
                MinusX(1,true)
                MinusY(1,true)

            }
            else if (orientation === "r4") {
                AddY(1,false)
                MinusY(1,true)
                AddX(1,true)
            }  
        }
        else if(block === "Z1"){
            c.fillStyle = "Yellow"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            if (orientation === "r1" || orientation === "r3"){
                AddX(1,false)
                AddY(1,true)
                MinusX(1,true)
            }
            else if (orientation === "r2" || orientation === "r4") {
                AddY(1,false)
                MinusX(1,true)
                MinusY(1,true)
            }
        }
        else if(block === "Z2"){
            c.fillStyle = "Lightgreen"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            if (orientation === "r1" || orientation === "r3") {
                MinusX(1,false)
                AddY(1,true)
                AddX(1,true)
            }
            else if (orientation === "r2" || orientation === "r4") {
                MinusY(1,false)
                MinusX(1,true)
                AddY(1,true)
            }
        }
        else if(block === "T"){
            c.fillStyle = "Orange"
            if (unrender === true){
                c.fillStyle = "gray"
            }
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){
                AddY(1,false)
                MinusX(1,false)
                AddX(1,false)
            }
            else if (orientation === "r2") {
                AddY(1,false)
                MinusX(1,false)
                MinusY(1,false)
            }
            else if (orientation === "r3") {
                MinusY(1,false)
                AddX(1,false)
                MinusX(1,false)
            }
            else if (orientation === "r4") {
                AddY(1,false)
                AddX(1,false)
                MinusY(1,false)
            }   
        }

    }
    NextBlock = () => {
        let c = this.canvas.getContext('2d')
        let randomNum = Math.floor(Math.random() * this.blocks.length )
        this.nextblock = this.blocks[randomNum]
        console.log(this.nextblock)
        let x = 373
        let y = 94
        this.Render(this.nextblock, x, y, "r2", "null")

    }
}
const canvas = new Canvas();

canvas.drawCanvas()
canvas.NextBlock()


class Game{
    constructor(){
        this.speed = 400
        this.movement = "null"
        
    }


    Update = async () =>{
        console.log("yay")
        const delay = ms => new Promise(res => setTimeout(res, ms));
        let gameStarted = true
        let x = 156
        let y = 156
        let spawn = false
        canvas.Render(canvas.nextblock, x,y,"r2", false)
        let preY = y-31
        let preX = x-31
        
        while(gameStarted === true){
            await delay (this.speed)
            if (spawn = true){
                canvas.Render(canvas.nextblock, x,preY,"r2", true)
                canvas.Render(canvas.nextblock, x,y, "r2", false)
                spawn =false
            }
            console.log(canvas.BlockPos)
            console.log(x,y)
            let len = canvas.BlockPos.length
            let i = 0
            let checkList = []
            let NextblockposX = []
            let NextblockposY = []
            let Nextblockpos = []
            
            
            while(i != len){
                let nextxandy = canvas.BlockPos[i].split(' ')
                let nextx = nextxandy[0]
                let nexty = nextxandy[1]
                nextx = Number(nextx) + 31
                nexty = Number(nexty) + 31 
                Nextblockpos.push(`${nextx} ${nexty}`)
                NextblockposX.push(`${nextx} ${y}`)
                NextblockposY.push(`${x} ${nexty}`)
                
                i++
            }
            
            
            
            i = 0
            while(i != len){
                
                checkList.push(canvas.cord.includes(NextblockposY[i]))
                i++
            }
            console.log(NextblockposY)
            if(checkList.includes(false) != true){

                if(this.movement === "right"){
                    canvas.Render(canvas.nextblock, preX,preY,"r2", true)
                    canvas.Render(canvas.nextblock, x,y,"r2", false)
                    preY = y
                    preX = x
                    y = y+31
                    x = x+31
                }
                else if (this.movement === "left") {
                    canvas.Render(canvas.nextblock, preX,preY,"r2", true)
                    canvas.Render(canvas.nextblock, x,y,"r2", false)
                    preY = y
                    preX = x
                    y = y+31
                    x = x-31
                }
                else{
                    canvas.Render(canvas.nextblock, x,preY,"r2", true)
                    canvas.Render(canvas.nextblock, x,y,"r2", false)
                    preY = y
                    preX = x
                    y= y+31
                    x=x
                }

                console.log("moved")
            }
            if(checkList.includes(false) === true){
                x = 156
                y = 156
                preY = y-31
                spawn = true
                canvas.NextBlock()
                
                
                i = 0

            }


            

            
            
    

        }
    }

}

const game = new Game()
game.Update()