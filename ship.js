(function (root) {  
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var Ship = Asteroids.Ship = function (pos, vel, radius, color) {
        Asteroids.MovingObject.call(this, pos, vel, radius, color);
    };
    
    Ship.COLOR = "red";
    Ship.RADIUS = 10;
    
    Ship.inherits(Asteroids.MovingObject);
    
    //add friction
    Ship.prototype.power = function(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
        console.log("inside power");
    };
    
    Ship.prototype.fireBullet = function(game) {
        var bulletVel = [this.vel[0] * 3, this.vel[1] * 3];
        return new Asteroids.Bullet([this.centerX, this.centerY], bulletVel, this.radius/2, "yellow", game);
    };
})(this);