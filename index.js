class Canvas{
    constructor(nextblock){
       this.canvas =document.querySelector('canvas')
       this.rows = {}
       this.blocks = ["line", "box", "L1", "L2", "T", 'Z1', "Z2"]
       this.nextblock = nextblock
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
                cords.push(`${x},${y}`)
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
        c.fillStyle = "blue"
        c.fillRect(311,1,188,185)

    }


    Render = (block, x, y, orientation) =>  {
        var c = this.canvas.getContext('2d')
        var check = 0
        var tempY = y
        var tempX = x
        let orgX = x
        let orgY = y

        //render functions
        let AddY = (numofrun, remember) => {
            while(check != numofrun){
                tempY = tempY+31
                if(remember === true){
                    y = tempY
                }
                c.fillRect(x,tempY,30,30)
                tempY = y
                check++
            }
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
            }
            tempY = y
            check = 0
        }


        //block render instructions
        if (block === "line"){
            c.fillStyle = "lightblue"
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
            c.fillRect(x,y,30,30)
            MinusY(1,true)
            AddX(1,true)
            AddY(1, true)
        }
        else if(block === "L1"){
            c.fillStyle = "red"
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
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){

            }
            else if (orientation === "r2") {
  
            }
            else if (orientation === "r3") {

            }
            else if (orientation === "r4") {

            }  
        }
        else if(block === "Z1"){
            c.fillStyle = "Yellow"
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){

            }
            else if (orientation === "r2") {

            }
            else if (orientation === "r3") {

            }
            else if (orientation === "r4") {

            }  
        }
        else if(block === "Z2"){
            c.fillStyle = "Lightgreen"
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){

            }
            else if (orientation === "r2") {

            }
            else if (orientation === "r3") {

            }
            else if (orientation === "r4") {

            }  
        }
        else if(block === "T"){
            c.fillStyle = "Orange"
            c.fillRect(x,y,30,30)
            if (orientation === "r1"){

            }
            else if (orientation === "r2") {

            }
            else if (orientation === "r3") {

            }
            else if (orientation === "r4") {

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
        this.Render(this.nextblock, x, y, "r4")

    }
}
const canvas = new Canvas();

canvas.drawCanvas()
canvas.NextBlock()


class Game{
    constructor(){
        this.speed = 400
    }


    Update = async () =>{
        
        const delay = ms => new Promise(res => setTimeout(res, ms));
        let gameStarted = true
        
        while(gameStarted === true){
            await delay (this.speed)
                
        }
    }

}