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
        this.NextRotationPos = []
        this.rowname  = `row`
    }
    drawCanvas = () => {``
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
    Render = (block, x, y, orientation, pushToNextRotation) => {
        var c = this.canvas.getContext('2d')
        var check = 0
        var tempY = y
        var tempX = x
        if(pushToNextRotation === false){
        this.BlockPos.push(`${x} ${y}`)
        this.NextblockposY.push(`${x} ${y + 31}`)
        this.NextblockposXr.push(`${x +31} ${y+31}`)
        this.NextblockposXl.push(`${x -31} ${y+31}`)
        }
        else if(pushToNextRotation === true){
            this.NextRotationPos.push(`${x} ${y}`)
            orientation = orientation.split('')
            let orientationNum = Number[orientation[1]]
            if (orientationNum >= 4){
                orientation = 'r1'
            }
            else if (orientationNum < 4){
                orientation = `r${orientationNum + 1}`
            }
        }
        

        //render functions
        let AddY = (numofrun, remember) => {
            while (check != numofrun) {
                tempY = tempY + 31
                if (remember === true) {
                    y = tempY
                }
                check++
                if(pushToNextRotation === false){
                    this.BlockPos.push(`${x} ${tempY}`)
                    this.NextblockposY.push(`${x} ${tempY + 31}`)
                    this.NextblockposXr.push(`${x+31} ${tempY+31}`)
                    this.NextblockposXl.push(`${x-31} ${tempY+31}`)
                    c.fillRect(x, tempY, 30, 30)
                }
                else if(pushToNextRotation === true){
                    this.NextRotationPos.push(`${x} ${tempY}`)
                }
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
               
                check++
                if(pushToNextRotation === false){
                    c.fillRect(tempX, y, 30, 30)
                    this.BlockPos.push(`${tempX} ${y}`)
                    this.NextblockposY.push(`${tempX} ${y + 31}`)
                    this.NextblockposXr.push(`${tempX+31} ${y+31}`)
                    this.NextblockposXl.push(`${tempX-31} ${y+31}`)
                }
                else if(pushToNextRotation === true){
                    this.NextRotationPos.push(`${tempX} ${y}`)
                }
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
                
                check++
                if(pushToNextRotation === false){
                    c.fillRect(tempX, y, 30, 30)
                    this.BlockPos.push(`${tempX} ${y}`)
                    this.NextblockposY.push(`${tempX} ${y + 31}`)
                    this.NextblockposXr.push(`${tempX+31} ${y+31}`)
                    this.NextblockposXl.push(`${tempX-31} ${y+31}`)
                }
                else if(pushToNextRotation === true){
                    this.NextRotationPos.push(`${tempX} ${y}`)
                }
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
                
                check++
                if (pushToNextRotation === false){
                    c.fillRect(x, tempY, 30, 30)
                    this.BlockPos.push(`${x} ${tempY}`)
                    this.NextblockposY.push(`${x} ${tempY + 31}`)
                    this.NextblockposXr.push(`${x+31} ${tempY+31}`)
                    this.NextblockposXl.push(`${x-31} ${tempY+31}`)
                }
                else if(pushToNextRotation === true){
                    this.NextRotationPos.push(`${x} ${tempY}`)
                }
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
                    c.fillStyle = 'gray'
                }
                else {
                 c.fillStyle = 'white'
                    c.fillRect(x, y, 30, 30)
                    c.fillStyle = 'gray'
                }
                x = x + 31
                rows++
            }
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
        this.NextRotationPos = []
    }

    NextBlock = () => {
        let c = this.canvas.getContext('2d')
        c.fillStyle = "blue"
        c.fillRect(311, 1, 300, 300)
        c.font = "30px Arial"
        c.fillStyle = "white"
        c.fillText("Next block", 400, 30)
        c.font = "10px Arial"
        let randomNum = Math.floor(Math.random() * this.blocks.length)
        this.nextblock = this.blocks[randomNum]
        let x = 373
        let y = 94
        this.Render(this.nextblock, x, y, 'r2', false)
        this.Render(this.nextblock, x, y, 'r2', true)
    }
    CurrentBlock = () => {
        let c = this.canvas.getContext('2d')
        c.fillStyle = "blue"
        c.fillRect(311, 302, 300, 300)
        c.fillStyle = "white"
        c.font = "30px Arial"
        c.fillText("Current block", 400, 333)
        c.font = "10px Arial"
        let x = 373
        let y = 394
        this.Render(this.currentblock, x, y, 'r2', false)
        this.Render(this.currentblock, x, y, 'r2', true)
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
        this.removedcords = []
    }
    Move = async (direction) => {
        let len = canvas.BlockPos.length
        let i = 0
        let len2 = canvas.NextRotationPos.length
        let ii = 0
        let checkListR = []
        let checkListL = []
        let checkListRo = []
        if(this.canmove === false){
            this.rembermovements.push(direction)
            console.log(this.rembermovements)
        }
        
        while (i != len) {
            checkListR.push(canvas.cord.includes(canvas.NextblockposXr[i]))
            checkListL.push(canvas.cord.includes(canvas.NextblockposXl[i]))
            i++
        }

        while(ii != len2){
            checkListRo.push(canvas.cord.includes(canvas.NextRotationPos[ii]))
            console.log(checkListRo)
            ii++
        }
        //console.log(checkListR, checkListL)
         if (direction === "left" && checkListL.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true) {
            canvas.RefreshCanvas()
            canvas.Render(canvas.currentblock, this.x-31, this.y, this.rotation, false)
            canvas.Render(canvas.currentblock, this.x-31, this.y, this.rotation, true)
            console.log(canvas.BlockPos)
            this.x = this.x - 31
        }
        else if(direction === "right" && checkListR.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true) {
            canvas.RefreshCanvas()
            canvas.Render(canvas.currentblock, this.x + 31, this.y, this.rotation, false)
            canvas.Render(canvas.currentblock, this.x + 31, this.y, this.rotation, true)
            console.log(canvas.BlockPos)
            this.x = this.x + 31
        }
        else if(direction === 'r' && checkListRo.includes(false) != true && this.canmove === true && this.checkList.includes(false) != true){
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
        let spawn = false
        canvas.Render(block, this.x, this.y, this.rotation, false)
        canvas.Render(block, this.x, this.y, this.rotation, true)
        while (gameStarted === true) {
            console.log(`REMOVED: ${this.removedcords}`)
            block = canvas.currentblock
            this.canmove = true
            let remlen = this.rembermovements.length
            if (remlen >= 1 ){
                let n = this.rembermovements.length
                let m = 0
                while(m != n){
                    this.Move(this.rembermovements[0])
                    this.rembermovements.shift()
                    n = this.rembermovements.length
                }
            }
            await delay(this.speed)
            this.canmove = false

            canvas.RefreshCanvas()
            if (spawn = true) {
                canvas.Render(block, this.x, this.y, this.rotation, false)
                canvas.Render(block, this.x, this.y, this.rotation, true)
                spawn = false
            }

            this.checkList = []
            let len = canvas.BlockPos.length
            let i = 0
            while (i != len) {
                this.checkList.push(canvas.cord.includes(canvas.NextblockposY[i]))
                i++
            }
            if (this.checkList.includes(false) != true) {
                canvas.RefreshCanvas()
                canvas.Render(block, this.x, this.y, this.rotation, false)
                canvas.Render(block, this.x, this.y, this.rotation, true)
                this.y = this.y + 31
                this.x = this.x
            }
            // making blocks stop
            if (this.checkList.includes(false) === true) {
                this.x = 156
                this.y = 32
                spawn = true
                let z = canvas.BlockPos.length
                let v = 0
                while (v != z) {
                    let numberofcord = canvas.cord.indexOf(canvas.BlockPos[v])
                    let cordinate = canvas.BlockPos[v]
                    let rowofcord = canvas.cordsProperties[cordinate].row
                    canvas.cordsProperties[cordinate] = {
                        Color: canvas.blockcolor,
                        isFull: true,
                        row: rowofcord
                    }
                    this.removedcords.push(canvas.BlockPos[v])
                    canvas.cord.splice(numberofcord, 1)
                    v++
                }
                canvas.currentblock = canvas.nextblock
                canvas.NextBlock()
                canvas.CurrentBlock()
                i = 0
                let spot = 0
                let rowArrayLength = canvas.rows.length

                // checks for full row
                while (spot != rowArrayLength){
                    let rowBeingChecked = canvas.rows[spot]
                    console.log(`row${spot+1}: ${rowBeingChecked}`)
                    let CurrentRowLength = rowBeingChecked.length
                    let checkingForFill = []
                    let rowSpot = 0
                    while(rowSpot != CurrentRowLength){
                        let pos = rowBeingChecked[rowSpot]
                        let posIsFull = canvas.cordsProperties[pos].isFull
                        console.log(`pos${rowSpot+1}: ${pos} IsFull: ${posIsFull}`)
                        checkingForFill.push(posIsFull)
                        rowSpot++
                    }
                    // If the row is full 
                    if(checkingForFill.indexOf(false) === -1){
                        console.log('ROW FULL')
                       // removes the row
                        let CurrentRowLength = rowBeingChecked.length
                        let rowSpot = 0
                        while(rowSpot != CurrentRowLength){
                            let pos = rowBeingChecked[rowSpot]
                            console.log(`(Position Being Added Back) pos${rowSpot+1}: ${pos}`)
                            canvas.cordsProperties[pos] ={
                                Color: canvas.blockcolor,
                                isFull: false,
                                row: canvas.cordsProperties[pos].row
                            }
                            canvas.cord.push(pos)
                            this.removedcords.splice(this.removedcords.indexOf(pos), 1)
                            rowSpot++
                        }
                        // check for blocks above
                        
                        let pos = rowBeingChecked[0]
                        pos = pos.split(' ')
                        let posY = Number(pos[1])
                        let posX = Number(pos[0])

                        console.log(`Position :${rowBeingChecked[0]}    x: ${posX}  y(IMPORTANT THIS MATCHES): ${posY}}`)
                        // Check each cords and see if they are above the row that was cleared
                        let removeCordsLength = this.removedcords.length
                        let removeCordSpot = 0
                        let CordsNeedMoving = []
                        while(removeCordSpot != removeCordsLength){
                            let currentCordPos = this.removedcords[removeCordSpot]
                            let currentXandY = currentCordPos.split(' ')
                            let CurrentY = Number(currentXandY[1])
                            let currentPosIsFull = canvas.cordsProperties[currentCordPos].isFull
                            console.log(`Checking removed cord: ${currentCordPos} isFull: ${currentPosIsFull}`)
                            if(currentPosIsFull === true && CurrentY < posY){
                                console.log(`Position ${currentCordPos} is full adding to array :) `)
                                CordsNeedMoving.push(currentCordPos)

                            }
                            else if(currentPosIsFull === false){
                                console.log(`Position ${currentCordPos} is not full that's not right!!!!`)
                            }
                            else if(CurrentY > posY){
                                console.log(`${currentCordPos} is below the row that was cleared`)
                            }
                            else if(CurrentY === posY){
                                console.log(`WARNING ${currentCordPos} is in the row that was cleared this should not happen!!!!`)
                            }
                            removeCordSpot++
                            // if the position is full 
                        }
                        console.log(`These are the pos that will be moved ${CordsNeedMoving}`)
                        let CordsNeedMovingLength = CordsNeedMoving.length
                        let CordsNeedMovingSpot = 0
                        while(CordsNeedMovingSpot != CordsNeedMovingLength){
                            let currentCordNeedMovingPos = CordsNeedMoving[CordsNeedMovingSpot]
                            let currentNeedMoveXandY = currentCordNeedMovingPos.split(' ')
                            let currentNeedMoveX = Number(currentNeedMoveXandY[0])
                            let currentNeedMoveY = Number(currentNeedMoveXandY[1])
                            console.log(`position ${currentCordNeedMovingPos} x:${currentNeedMoveX} y: ${currentNeedMoveY}`)
                            
                            canvas.cordsProperties[currentCordNeedMovingPos] = {
                                Color: 'gray',
                                isFull: false,
                                row: canvas.cordsProperties[currentCordNeedMovingPos].row
                            }
                            canvas.cord.push(currentCordNeedMovingPos)
                            this.removedcords.splice(this.removedcords.indexOf(currentCordNeedMovingPos),1)
                            let currentNeedMoveYBelow = currentNeedMoveY+31
                            let currentCordNeedMovingPosBelow = `${currentNeedMoveX} ${currentNeedMoveYBelow}`
                            console.log(`position Below: ${currentCordNeedMovingPosBelow} x:${currentNeedMoveX} y:${currentNeedMoveYBelow}`)
                            canvas.cordsProperties[currentCordNeedMovingPosBelow] = {
                                Color: canvas.blockcolor,
                                isFull: true,
                                row: canvas.cordsProperties[currentCordNeedMovingPosBelow].row
                            }
                            canvas.cord.splice(canvas.cord.indexOf(currentCordNeedMovingPosBelow),1)
                            this.removedcords.push(currentCordNeedMovingPosBelow)
                            CordsNeedMovingSpot++
                        }
                    }
                    spot++
                }
            }
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
    else if (event.keyCode === 40) {
        game.Move('down')
    }
})
game.Update()