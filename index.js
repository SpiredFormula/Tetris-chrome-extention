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


    Render = (block, x, y) =>  {
        console.log(block,x,y)
        // if (this.nextblock === 'line'){
        //     c.fillStyle = "lightblue"
        //     c.fillRect(x+31+31, y, 30, 30)
        // }
        // else if (this.nextblock === 'box'){
            
        // }
        // else if (this.nextblock === 'L1'){
            
        // }
        // else if (this.nextblock === 'L2'){
            
        // }
        // else if (this.nextblock === 'T'){
            
        // }
        // else if (this.nextblock === 'Z1'){
            
        // }
        // else if (this.nextblock === 'Z2'){
            
        // }
    }
    NextBlock = () => {
        let c = this.canvas.getContext('2d')
        let randomNum = Math.floor(Math.random() * this.blocks.length )
        this.nextblock = this.blocks[randomNum]
        console.log(this.nextblock)
        let x = 311
        let y = 32
        this.Render(this.nextblock, x, y);

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