const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

//to keep track if the loop has started or not
let gameStart = 0

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

addEventListener('keydown', (event) => {
    if(gameStart === 0){
        ball.move(event.key)
    }
    platform.move(event.key)
})

addEventListener('click', (event) => {
    if(gameStart === 0){
        const projectileAngle = Math.atan2(event.clientY - ball.y, event.clientX - ball.x)
        const xVelocity = Math.cos(projectileAngle) 
        const yVelocity =  Math.sin(projectileAngle)
    
        ball.velocity.x = xVelocity * 8
        ball.velocity.y = yVelocity * 8
        gameStart = 1
    }

})


let bricks
let platform
let ball

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

    //Ball Generation
    const ballRadius = 10
    const ballX = (canvas.width / 2)
    const ballY = platformY - ballRadius
    ball = new Projectile(ballX, ballY, ballRadius, 'white')
}

function animate(){
    requestAnimationFrame(animate)
    context.fillStyle = "rgba(29, 22, 22, 0.3)"
    context.fillRect(0,0, canvas.width, canvas.height)
    platform.move()
    ball.update()
    bricks.forEach(brick => {
        brick.update()
    })
}

init()
animate()