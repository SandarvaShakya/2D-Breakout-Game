/**
 * Represents the bricks
 */
class Brick{
    /**
     * 
     * @param {int} x the x coordinate of the brick
     * @param {int} y the y coordinate of the brick
     * @param {int} width width of the brick
     * @param {int} height height of the brick
     * @param {string} color color of the brick
     */
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    /**
     * draws the brick
     */
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
        context.closePath()
    }

    update(){
        this.draw()
    }
}

/**
 * Represents the platform
 */
class Platform{
    /**
     * 
     * @param {int} x the x coordinate of the platform
     * @param {int} y the y coordinate of the platform
     * @param {int} width width of the platform
     * @param {int} height height of the platform
     * @param {string} color color of the platform
     */
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    /**
     * draws the platform
     */
    draw(){
        context.beginPath()
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
        context.closePath()
    }

    /**
     * Moves the platform left or right
     * @param {string} direction the key pressed by the user 
     */
    move(direction){
        if(direction === 'ArrowLeft' && this.x > 0){
            this.x -= 20
        } else if(direction === 'ArrowRight' && (this.x + this.width) < canvas.width){
            this.x += 20
        }
        this.draw()
    }
}

/**
 * Represents the ball
 */
class Projectile{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
            x: undefined,
            y: undefined
        }
    }

    draw(){
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
    }

    update(){
        if(this.velocity.x){
            this.x += this.velocity.x
            this.y += this.velocity.y
        }
        this.draw()
    }

    move(direction){
        if(direction === 'ArrowLeft' && (this.x - this.radius - 50) > 0){
            this.x -= 20 
        } else if(direction === 'ArrowRight' && (this.x + this.radius + 50) < canvas.width){
            this.x += 20
        }
    }
}