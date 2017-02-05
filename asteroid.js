(function (root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var Asteroid = Asteroids.Asteroid = function (pos, vel, radius, color) {
        Asteroids.MovingObject.call(this, pos, vel, radius, color);
    };
    
    Asteroid.inherits(Asteroids.MovingObject);
    
    Asteroid.COLOR = "black";
    Asteroid.RADIUS = 10;
    Asteroid.MAX_SPEED = 5;
    
    var randomVec = function() {
        var xIsNeg = (Math.random() > 0.5 ? 1 : -1);
        var yIsNeg = (Math.random() > 0.5 ? 1 : -1);
        
        return [(Math.floor(Asteroid.MAX_SPEED * Math.random()) + 1) * xIsNeg, 
        (Math.floor(Asteroid.MAX_SPEED * Math.random()) + 1) * yIsNeg];
    };
    
    //fix edge spawning problem
    Asteroid.randomAsteroid = function (dimX, dimY) {
        var centerX = dimX * Math.random();
        var centerY = dimY * Math.random();
        var asteroid = new Asteroid(
            [centerX, centerY], randomVec(), Asteroid.RADIUS, Asteroid.COLOR
        );
        return asteroid;
    }; 
})(this);