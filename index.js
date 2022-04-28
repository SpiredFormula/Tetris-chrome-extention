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

        //c.fillStyle = "blue"
        //c.fillRect(311,1,188,185)

    }


    Render = (block, x, y, orientation) =>  {
        var c = this.canvas.getContext('2d')
        var check = 0
        var tempY = y
        var tempX = x
        let orgX = x
        let orgY = y

        this.BlockPos.push(`${x} ${y}`)
        
        //render functions
        let AddY = (numofrun, remember) => {
            while(check != numofrun){
                tempY = tempY+31
                if(remember === true){
                    y = tempY
                }
                c.fillRect(x,tempY,30,30)
                check++
                this.BlockPos.push(`${x} ${tempY}`)
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
                this.BlockPos.push(`${tempX} ${y}`)
                
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
                this.BlockPos.push(`${tempX} ${y}`)
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
                this.BlockPos.push(`${x} ${tempY}`)
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

    RefreshCanvas = () => {
        let cordlen = this.cord.length
        let i = 0
        while(i != cordlen){
            let pos = this.cord[i]
            pos = pos.split(' ')
            let posX = pos[0]
            let posY = pos[1]
            let c = this.canvas.getContext('2d')
            c.fillStyle = 'gray'
            c.fillRect(posX,posY,30,30)
            i++
            
        }
        this.BlockPos = []
    }

    NextBlock = () => {
        let c = this.canvas.getContext('2d')
        let randomNum = Math.floor(Math.random() * this.blocks.length )
        this.nextblock = this.blocks[randomNum]
        console.log(this.nextblock)
        let x = 373
        let y = 94
        //this.Render(this.nextblock, x, y, "r2", "null")

    }
}
const canvas = new Canvas();

canvas.drawCanvas()
canvas.NextBlock()


class Game{
    constructor(){
        this.speed = 400
        this.movement = "null"
        this.x = 156
        this.y = 156
        
    }


    Update = async () =>{
        console.log(canvas.cord)
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
            
            canvas.RefreshCanvas()
            if (spawn = true){
                
                
                canvas.Render(canvas.nextblock, x,y, "r2", false)
                spawn =false
            }
            
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
            
            if(checkList.includes(false) != true){

                
                    
                canvas.RefreshCanvas()
                canvas.Render(canvas.nextblock, x,y,"r2", false)
                console.log(canvas.BlockPos)
                preY = y
                preX = x
                y= y+31
                x=x
                this.movement = "null"
                this.x = x
                this.y = y
                    
                


                
            }
            if(checkList.includes(false) === true){
                console.log(canvas.BlockPos)

                x = 156
                y = 156
                preY = y-31
                spawn = true
                
                let z = canvas.BlockPos.length
                let v = 0
                let removecords = []
                console.log(canvas.BlockPos)
                while(v != z){
                    let numberofcord = canvas.cord.indexOf(canvas.BlockPos[v])
                    removecords.push(numberofcord)
                    console.log(numberofcord)
                    canvas.cord.splice(numberofcord, 1)
                    console.log(canvas.cord)

                    v++
                }
                console.log(canvas.cord)
                //canvas.BlockPos = ["156 156"]
                canvas.NextBlock()
                i = 0

            }


            

            
            
    

        }
    }
    // MoveLeft(){
    //     canvas.Render(canvas.nextblock, this.x, this.y-31, true )
    //     canvas.Render(canvas.nextblock, this.x-31, this.y, false )

    // }

}
const game = new Game()
game.Update()
// document.addEventListener("keydown", function(event){
//     if(event.keyCode == 37){
//         console.log('a')
//         game.MoveLeft()
//     }
//     else if(event.keyCode == 39){
//         game.movement = "right"
//         console.log('b')
//     }
// })

