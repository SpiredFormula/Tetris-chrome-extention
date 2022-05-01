class Canvas {
    constructor(nextblock) {
        this.canvas = document.querySelector('canvas')
        this.rows = []
        this.cordsProperties = {}
        this.cord = []
        this.blocks = ["line", "box", "L1", "L2", "T", 'Z1', "Z2"]
        this.nextblock = ''
        this.currentblock = ''
        this.blockcolor = ''
        this.BlockPos = []
        this.NextblockposY = []
        this.NextblockposXr = []
        this.NextblockposXl = []
        this.rowname  = `row`
    }
    drawCanvas = () => {
        this.canvas.width = 615
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
        this.rowname  = `${rownum}`
        while (collums != numCollums) {
            while (rows != numRows) {

                c.fillRect(x, y, 30, 30)
                cords.push(`${x} ${y}`)
                
                this.cordsProperties[`${x} ${y}`] ={
                    Color: "gray",
                    isFull: false,
                    row: this.rowname
                }
                this.cord.push(`${x} ${y}`)
                //c.fillStyle = 'white'
                //c.fillText(`${x},${y}`, x, y + 31)
                c.fillStyle = 'gray'
                x = x + 31
                rows++

            }
            
            this.rows.push(cords)
            cords = []
            rownum++
            this.rowname = `${rownum}`
            y = y + 31
            x = 1
            rows = 0
            collums++
        }



    }


    Render = (block, x, y, orientation) => {
        var c = this.canvas.getContext('2d')
        var check = 0
        var tempY = y
        var tempX = x
        let orgX = x
        let orgY = y

        this.BlockPos.push(`${x} ${y}`)
        this.NextblockposY.push(`${x} ${y + 31}`)
        this.NextblockposXr.push(`${x +31} ${y+31}`)
        this.NextblockposXl.push(`${x -31} ${y+31}`)

        //render functions
        let AddY = (numofrun, remember) => {
            while (check != numofrun) {
                tempY = tempY + 31
                if (remember === true) {
                    y = tempY
                }
                c.fillRect(x, tempY, 30, 30)
                check++
                this.BlockPos.push(`${x} ${tempY}`)
                this.NextblockposY.push(`${x} ${tempY + 31}`)
                this.NextblockposXr.push(`${x+31} ${tempY+31}`)
                this.NextblockposXl.push(`${x-31} ${tempY+31}`)


            }
            tempY = y
            check = 0
        }
        let AddX = (numofrun, remember) => {
            while (check != numofrun) {
                tempX = tempX + 31
                if (remember === true) {
                    x = tempX
                }
                c.fillRect(tempX, y, 30, 30)
                check++
                this.BlockPos.push(`${tempX} ${y}`)
                this.NextblockposY.push(`${tempX} ${y + 31}`)
                this.NextblockposXr.push(`${tempX+31} ${y+31}`)
                this.NextblockposXl.push(`${tempX-31} ${y+31}`)

            }
            tempX = x
            check = 0
        }
        let MinusX = (numofrun, remember) => {
            while (check != numofrun) {
                tempX = tempX - 31
                if (remember === true) {
                    x = tempX
                }
                c.fillRect(tempX, y, 30, 30)
                check++
                this.BlockPos.push(`${tempX} ${y}`)
                this.NextblockposY.push(`${tempX} ${y + 31}`)
                this.NextblockposXr.push(`${tempX+31} ${y+31}`)
                this.NextblockposXl.push(`${tempX-31} ${y+31}`)
                
            }
            tempX = x
            check = 0
        }
        let MinusY = (numofrun, remember) => {
            while (check != numofrun) {
                tempY = tempY - 31
                if (remember === true) {
                    y = tempY
                }
                c.fillRect(x, tempY, 30, 30)
                check++
                this.BlockPos.push(`${x} ${tempY}`)
                this.NextblockposY.push(`${x} ${tempY + 31}`)
                this.NextblockposXr.push(`${x+31} ${tempY+31}`)
                this.NextblockposXl.push(`${x-31} ${tempY+31}`)

            }
            tempY = y
            check = 0
        }


        //block render instructions
        if (block === "line") {
            c.fillStyle = "lightblue"
            this.blockcolor = "lightblue"
            c.fillRect(x, y, 30, 30)

            if (orientation === "r2" || orientation === "r4") {
                AddY(1, false)
                MinusY(2, false)
            }
            else if (orientation === "r1" || orientation === "r3") {
                AddX(2, false)
                MinusX(1, false)
            }
        }
        else if (block === "box") {
            c.fillStyle = "green"
            this.blockcolor = "green"
            c.fillRect(x, y, 30, 30)
            MinusY(1, true)
            AddX(1, true)
            AddY(1, true)
        }
        else if (block === "L1") {
            c.fillStyle = "red"
            this.blockcolor = "red"
            c.fillRect(x, y, 30, 30)
            if (orientation === "r1") {
                AddX(1, false)
                MinusX(1, true)
                AddY(1, true)

            }
            else if (orientation === "r2") {
                AddY(1, false)
                MinusY(1, true)
                MinusX(1, true)
            }
            else if (orientation === "r3") {
                MinusX(1, false)
                AddX(1, true)
                MinusY(1, true)
            }
            else if (orientation === "r4") {
                MinusY(1, false)
                AddY(1, true)
                AddX(1, true)
            }
        }
        else if (block === "L2") {
            c.fillStyle = "Purple"
            this.blockcolor = "Purple"
            c.fillRect(x, y, 30, 30)
            if (orientation === "r1") {
                MinusX(1, false)
                AddX(1, true)
                AddY(1, true)
            }
            else if (orientation === "r2") {
                MinusY(1, false)
                AddY(1, true)
                MinusX(1, true)
            }
            else if (orientation === "r3") {
                AddX(1, false)
                MinusX(1, true)
                MinusY(1, true)

            }
            else if (orientation === "r4") {
                AddY(1, false)
                MinusY(1, true)
                AddX(1, true)
            }
        }
        else if (block === "Z1") {
            c.fillStyle = "Yellow"
            this.blockcolor = "Yellow"
            c.fillRect(x, y, 30, 30)
            if (orientation === "r1" || orientation === "r3") {
                AddX(1, false)
                AddY(1, true)
                MinusX(1, true)
            }
            else if (orientation === "r2" || orientation === "r4") {
                AddY(1, false)
                MinusX(1, true)
                MinusY(1, true)
            }
        }
        else if (block === "Z2") {
            c.fillStyle = "Lightgreen"
            this.blockcolor = "Lightgreen"
            c.fillRect(x, y, 30, 30)
            if (orientation === "r1" || orientation === "r3") {
                MinusX(1, false)
                AddY(1, true)
                AddX(1, true)
            }
            else if (orientation === "r2" || orientation === "r4") {
                MinusY(1, false)
                MinusX(1, true)
                AddY(1, true)
            }
        }
        else if (block === "T") {
            c.fillStyle = "Orange"
            this.blockcolor = "Orange"
            c.fillRect(x, y, 30, 30)
            if (orientation === "r1") {
                AddY(1, false)
                MinusX(1, false)
                AddX(1, false)
            }
            else if (orientation === "r2") {
                AddY(1, false)
                MinusX(1, false)
                MinusY(1, false)
            }
            else if (orientation === "r3") {
                MinusY(1, false)
                AddX(1, false)
                MinusX(1, false)
            }
            else if (orientation === "r4") {
                AddY(1, false)
                AddX(1, false)
                MinusY(1, false)
            }
        }

    }

    RefreshCanvas = () => {
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
        while (collums != numCollums) {
            while (rows != numRows) {


                if (this.cord.includes(`${x} ${y}`)) {
                    c.fillRect(x, y, 30, 30)
                    //c.fillStyle = 'white'
                    //c.fillText(`${x},${y}`, x, y + 31)
                    c.fillStyle = 'gray'
                }


                x = x + 31
                rows++

            }
            let name = `row${rownum}`
            //this.rows[name] = cords
            cords = []
            rownum++
            y = y + 31
            x = 1
            rows = 0
            collums++
        }
        this.BlockPos = []
        this.NextblockposY = []
        this.NextblockposXl = []
        this.NextblockposXr = []
    }

    NextBlock = () => {

        let c = this.canvas.getContext('2d')
        c.fillStyle = "blue"
        c.fillRect(311, 1, 300, 300)
        c.font = "30px Arial"
        c.fillStyle = "white"
        c.fillText("Next block", 400, 30)
        c.font = "10px Arial"
        let randomNum = 0//Math.floor(Math.random() * this.blocks.length)
        this.nextblock = this.blocks[randomNum]
        //console.log(this.nextblock)
        let x = 373
        let y = 94
        this.Render(this.nextblock, x, y, 'r2')

    }
    CurrentBlock = () => {
        let c = this.canvas.getContext('2d')
        c.fillStyle = "blue"
        c.fillRect(311, 302, 300, 300)
        c.fillStyle = "white"
        c.font = "30px Arial"
        c.fillText("Current block", 400, 333)
        c.font = "10px Arial"

        let randomNum = Math.floor(Math.random() * this.blocks.length)

        //console.log(this.currentblock)
        let x = 373
        let y = 394
        this.Render(this.currentblock, x, y, 'r2')
    }
}

const canvas = new Canvas();
let randomNum = Math.floor(Math.random() * canvas.blocks.length)

canvas.currentblock = canvas.blocks[randomNum]




class Game {
    constructor() {
        this.speed = 200

        this.movement = "null"
        this.x = 156
        this.y = 32
        this.canmove = true
        this.rotation = 'r1'
        this.numR = 1
        this.rembermovements = []
        this.checkList = []

    }

    Move = async (direction) => {
        
        let len = canvas.BlockPos.length
        let i = 0
        let checkListR = []
        let checkListL = []
        if(this.canmove === false){
            //console.log("NOOOOOOOOOOOOOOOOOOOOO")
            this.rembermovements.push(direction)
            console.log(this.rembermovements)
        }
        
        while (i != len) {

            checkListR.push(canvas.cord.includes(canvas.NextblockposXr[i]))
            //console.log(`Right: ${canvas.NextblockposXr[i]}`)
            checkListL.push(canvas.cord.includes(canvas.NextblockposXl[i]))
            //console.log(`Left: ${canvas.NextblockposXl[i]}`)
            i++
        }
        //console.log(checkListR, checkListL)
         if (direction === "left" && checkListL.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true) {
            //console.log("left")
            //canvas.Render(this.currentblock, this.x - 31, this.y, "r2")
            canvas.RefreshCanvas()
            canvas.Render(canvas.currentblock, this.x-31, this.y, this.rotation)
            console.log(canvas.BlockPos)
            this.x = this.x - 31
            

        }
        else if(direction === "right" && checkListR.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true) {
            canvas.RefreshCanvas()
            canvas.Render(canvas.currentblock, this.x + 31, this.y, this.rotation)
            console.log(canvas.BlockPos)
            //console.log("right")
            this.x = this.x + 31
        }
        else if(direction === 'r' && checkListR.includes(false) != true && checkListL.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true){
            this.numR = this.numR+1
            if (this.numR > 4){
                this.numR = 1
            }
            this.rotation = `r${this.numR.toString()}`


        }

        this.canmove = true
    }

    Update = async () => {
        let block = canvas.currentblock
        const delay = ms => new Promise(res => setTimeout(res, ms));
        let gameStarted = true
        let x = 156
        let y = 156
        let spawn = false
        canvas.Render(block, this.x, this.y, this.rotation)
        while (gameStarted === true) {
            block = canvas.currentblock

            
            
            this.canmove = true
            //console.log(this.canmove)
            //console.log(this.rembermovements)
            //console.log(this.rembermovements.length)
            let remlen = this.rembermovements.length
            if (remlen >= 1 ){
                let n = this.rembermovements.length
                let m = 0
                while(m != n){
                    //console.log(this.rembermovements)
                    this.Move(this.rembermovements[0])
                    this.rembermovements.shift()
                    
                    n = this.rembermovements.length
                    //console.log(n)
                    
                }
            }
            
            
            
            await delay(this.speed)
            //console.log(canvas.cordsProperties)
            
            this.canmove = false
            //console.log(this.canmove)
            canvas.RefreshCanvas()
            if (spawn = true) {


                canvas.Render(block, this.x, this.y, this.rotation)
                spawn = false
            }

            this.checkList = []
            let len = canvas.BlockPos.length
            let i = 0
            while (i != len) {

                this.checkList.push(canvas.cord.includes(canvas.NextblockposY[i]))
                i++
            }
            //console.log(this.checkList, this.checkList.includes(false))
            if (this.checkList.includes(false) != true) {


                canvas.RefreshCanvas()
                canvas.Render(block, this.x, this.y, this.rotation)
                this.y = this.y + 31
                this.x = this.x

                //console.log(`canvas.BlockPos = ${canvas.BlockPos}`)
                //console.log(`Nextblockpos = ${canvas.NextblockposY}`)

            }
            if (this.checkList.includes(false) === true) {
                //console.log("----------------------------------")
                this.x = 156
                this.y = 32
                spawn = true

                let z = canvas.BlockPos.length
                let v = 0
                

                while (v != z) {
                    let numberofcord = canvas.cord.indexOf(canvas.BlockPos[v])
                    //console.log(`numberofcord = ${numberofcord}`)
                    let cordinate = canvas.BlockPos[v]
                    let rowofcord = canvas.cordsProperties[cordinate].row
                    //console.log(rowofcord)
                    canvas.cordsProperties[cordinate] = {
                        Color: canvas.blockcolor,
                        isFull: true,
                        row: rowofcord
                    }
                    //console.log(`canvas.cord.splice(${numberofcord}, 1)`)
                    canvas.cord.splice(numberofcord, 1)

                    v++
                }
                canvas.currentblock = canvas.nextblock
                canvas.NextBlock()
                canvas.CurrentBlock()
                i = 0

                

            }
            let q = canvas.rows.length -1
            
            //console.log(`this is q ${q}`)
            var r = 0
            //console.log(r)
            var l = null
            var r2 = 0
            var rowslist = null
            var rowisfulllist = ['']
            //console.log(r2)
            //console.log(canvas.rows)
            while(q >= 0){
                //console.log(canvas.rows[q])
                //l = rowslist.length
                //console.log(l)
                while(r2 < 10){
                    //console.log(canvas.rows[q][r2])
                    //console.log(canvas.cordsProperties[canvas.rows[q][r2]])
                    //console.log(canvas.rows[q])
                    rowisfulllist.push(canvas.cordsProperties[canvas.rows[q][r2]].isFull)

                    //console.log(rowcord)
                    r2++
                    
                }

                //console.log("row done")
                //console.log(`number ${q}`)
                console.log(canvas.cordsProperties[canvas.rows[q].length])
                if (rowisfulllist.indexOf(false) === -1 ){
                    console.log('row cleared')
                    console.log(rowisfulllist)
                    let b = 0
                    //while(b != canvas.cordsProperties[canvas.rows[q].length]){
                        //console.log(canvas.cordsProperties[canvas.rows[q]])
                        //b++
                    //}
                    
                }
                
                q--
                r2 = 0
                rowisfulllist = ['']
                //console.log(`number ${q}`)
            }
            //console.log('done')
            //console.log(canvas.rows)
            //console.log(rowisfulllist)
        }
    }


}
const game = new Game()
game.rotation = 'r1'
canvas.drawCanvas()

canvas.NextBlock()
canvas.CurrentBlock()


document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37 ) {
        game.Move("left")
    }
    else if (event.keyCode === 39 ) {
        game.Move("right")
    }
    else if (event.keyCode === 82 ) {
        game.Move("r")
    }
})

game.Update()

