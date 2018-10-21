// https://www.shutterstock.com/search/animation+frames?page=3&section=1&searchterm=animation%20frames&language=nl

function ImageSrc(source) {
    
    var image = new Image()
    image.src = source
    return image

}

function rover(coordinates, controls, grid, sprites) {

    this.x = coordinates[0]
    this.y = coordinates[1]
    this.facing = "r"
    this.images = {}
    
    for(let key in sprites) {
        this.images[key] = ImageSrc(sprites[key])
    } 

    document.addEventListener("keydown", function(e) {
        switch(e.key.toLowerCase()) {
            case controls.left:
                this.x -= 1
                if(this.x < 0) this.x = grid[0]
                this.facing = "l"
                break;
            case controls.right:
                this.x += 1
                this.x % grid[0]
                this.facing = "r"
                break;
            case controls.up:
                if(this.y < 0) this.y = grid[1]
                else this.y -= 1
                this.facing = "u"
                break;
            case controls.down:
                this.y += 1
                this.y % grid[1]
                this.facing = "d"
                break;
        }
    }.bind(this))

    this.currentImage = function() {
        return this.images[this.facing]
    }

}

function obstacle(coordinates, sprite) {
   
    this.x = coordinates[0]
    this.y = coordinates[1]

    this.images = {ducky: ImageSrc(sprite)}

    this.currentImage = function() {
        return this.images.ducky
    }.bind(this)
}

var roverA = new rover(
    [0,0],
    {
        left: "a", 
        up: "w", 
        right: "d", 
        down: "s"
    }, 
    [5,5], 
    {
        l: "./images/wallL.png",
        r: "./images/wallR.png",
        d: "./images/wallD.png",
        u: "./images/wallU.png"
    })

    var roverB = new rover(
        [0,0],
        {
            left: "j", 
            up: "i", 
            right: "l", 
            down: "k"
        }, 
        [5,5], 
        {
            l: "./images/wallL.png",
            r: "./images/wallR.png",
            d: "./images/wallD.png",
            u: "./images/wallU.png"
        })    

var obstacleA = new obstacle([0,0], "./images/ducky.png")

function game(gameElements, dimensions) {

    var canvas = document.getElementById("game")
    var ctx = canvas.getContext("2d")

    this.gameImages = []

    for(let i = 0; i <  gameElements.length; i++) {
        for(let key in gameElements[i].images) {
            this.gameImages.push(gameElements[i].images[key])
        } 

    }

    this.imagesLoaded = 0

    this.allLoaded = function(cb) {
        for(var i=0; i< this.gameImages.length; i++){

            this.gameImages[i].onload = function(){
                this.imagesLoaded++;
                if(this.imagesLoaded ==  this.gameImages.length){
                    cb();
                }
            }.bind(this)
        }
    }.bind(this)

    this.animate = function() {
        ctx.clearRect(0,0,canvas.width, canvas.height)
        for(let j = 0; j < gameElements.length; j++) {
            ctx.drawImage(gameElements[j].currentImage(), gameElements[j].x, gameElements[j].y)
        }

        for(let k = 0; k < gameElements.length; k++) {
            for(let l = k + 1; l < gameElements.length; l++) {
                //set up interval border collision should set off boom already
                if(gameElements[k].x == gameElements[l].x && gameElements[k].y == gameElements[l].y) {
                    console.log("boem!")
                }
            }
        }
        window.requestAnimationFrame(this.animate)

    }.bind(this)
}

var theGame = new game([roverA, roverB, obstacleA], [100, 100])

theGame.allLoaded(function() {
    //debugger
    theGame.animate()
})