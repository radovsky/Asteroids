(function (root) {
    
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var Bullet = Asteroids.Bullet = function (pos, vel, radius, color, game) {
        Asteroids.MovingObject.call(this, pos, vel, radius, color);
        this.game = game;
    };
    
     Bullet.inherits(Asteroids.MovingObject);
     
     //maybe do this in the game class
     Bullet.prototype.hitAsteroids = function() {
         var allAsteroids = Asteroids.Game.myAsteroids;
         for (var i = 0; i < allAsteroids.length; i++) {
             if (this.isCollidedWith(allAsteroids[i])) {
				 console.log("Asteroid hit");
                 this.game.removeAsteroid(allAsteroids[i]);
                 this.game.removeBullet(this);
             }
         }
     };
     
})(this);