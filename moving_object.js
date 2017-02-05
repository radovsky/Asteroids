(function (root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
        this.centerX = pos[0];
        this.centerY = pos[1];
        this.vel = vel;
        this.radius = radius;
        this.color = color;
    };
    
    MovingObject.prototype.move = function() {
        // vel === [xSpeed, ySpeed]
        
        this.centerX += this.vel[0];
        this.centerY += this.vel[1];
    };
    
    MovingObject.prototype.bounce = function(dimX, dimY) {
        if (this.centerX + this.radius > dimX) {
            this.vel[0] *= -1;
        }
        if (this.centerY + this.radius > dimY) {
            this.vel[1] *= -1;
        }
        if (this.centerX - this.radius < 0) {
            this.vel[0] *= -1;
        }
        if (this.centerY - this.radius < 0) {
            this.vel[1] *= -1;
        }
    };
	
    MovingObject.prototype.wrap = function(dimX, dimY) {
        if (this.centerX + this.radius > dimX) {
            this.centerX = 0 + this.radius;
        }
        if (this.centerY + this.radius > dimY) {
            this.centerY = 0 + this.radius;
        }
        if (this.centerX - this.radius < 0) {
            this.centerX = dimX - this.radius;
        }
        if (this.centerY - this.radius < 0) {
            this.centerY = dimY - this.radius;
        }
    };
    
    MovingObject.prototype.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        ctx.arc(
            this.centerX,
            this.centerY,
            this.radius,
            0,
            2 * Math.PI,
            false
        );
        
        ctx.fill();
        
    };
    
    MovingObject.prototype.isCollidedWith = function(otherObject) {
        var distance = Math.sqrt(
			Math.pow((this.centerX - otherObject.centerX), 2) +
            Math.pow((this.centerY - otherObject.centerY), 2)
		);
        return ( (this.radius + otherObject.radius) > distance);
    };
})(this);