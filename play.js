// https://www.shutterstock.com/search/animation+frames?page=3&section=1&searchterm=animation%20frames&language=nl

function ImageSrc(source) {
    
    var image = new Image()
    image.src = source
    return image

}

function rover(controls, grid, sprites) {

    this.x = 0
    this.y = 0
    this.facing = "r"
    this.images = {}
    
    for(let key in sprites) {
        this.images[key] = ImageSrc(sprites[key])
    } 

    document.addEventListener("keydown", function(e) {
        debugger
        switch(e.key.toLowerCase()) {
            case controls.left:
                if(this.x < 0) this.x = grid[0]
                this.facing = "l"
                break;
            case controls.right:
                this.x += 1
                this.x % grid[0]
                debugger
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

    this.image = ImageSrc(sprite)

}

var roverA = new rover({left: "a", up: "w", right: "d", down: "s"}, [5,5])
var obstacleA = new obstacle(0,0, "sfsdf")

function game(gameElements, dimensions) {

    var canvas = document.getElementById("game")
    var ctx = canvas.getContext("2d")

    this.gameImages = []

    for(let i = 0; gameElements.length; i++) {

        for(let key in gameElements[i].images) {
            this.gameElements.push(gameElements[i].images[key])
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

    this.animate() = function() {
        for(let j = 0; gameElements.length; j++) {
            ctx.drawImage(gameElements[j], gameElements.x, gameElements.y)
        }
        window.requestAnimationFrame(this.animate)
        
    }.bind(this)
}