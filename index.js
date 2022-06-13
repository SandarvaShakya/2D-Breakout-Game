const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

addEventListener('keydown', (event) => {
    platform.move(event.key)
})

let bricks
let platform

function init(){
    bricks = []

    //Brick Information
    let brickX = 40
    let brickY = 20
    const noOfRows = 10
    const brickWidth = 60
    const brickHeight = 20
    const noOfColumns = Math.floor((canvas.width - 40) / (brickWidth + 10))

    //Bricks Generation
    for(let i = 0; i < noOfRows; i++){
        brickX = 40
        let color = randomColor()
        for(let j = 0; j < noOfColumns; j++){
            const brick = new Brick(brickX, brickY, brickWidth, brickHeight, color)
            bricks.push(brick)
            brickX += 70
        }
        brickY += 30
    }

    //Platform Generation
    const platformWidth = 120
    const platFormHeight = 20
    const platformX = (canvas.width / 2) - (platformWidth / 2)
    const platformY = canvas.height - 100
    platform = new Platform(platformX, platformY, platformWidth, platFormHeight, 'white')
}

function animate(){
    requestAnimationFrame(animate)
    context.fillStyle = "rgba(29, 22, 22, 0.3)"
    context.fillRect(0,0, canvas.width, canvas.height)
    platform.draw()
    bricks.forEach(brick => {
        brick.update()
    })
}

init()
animate()