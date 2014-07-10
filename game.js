(function (root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    

    
    var Game = Asteroids.Game = function (ctx) {
        this.ctx = ctx;
        this.myAsteroids = [];
        this.myBullets = [];
        this.addAsteroids(5
		);
        this.ship = new Asteroids.Ship([Game.DIM_X / 2, Game.DIM_Y / 2], [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    };
    
    Game.DIM_X = 500;
    Game.DIM_Y = 500;
    Game.REFRESH_MS = 20;
    
    Game.prototype.addAsteroids = function (numAsteroids) {
        for (var i = 0; i < numAsteroids; i++){
            this.myAsteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
        }     
    };

    
    Game.prototype.draw = function () {
        this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        for (var i = 0; i < this.myAsteroids.length; i++) {
            this.myAsteroids[i].draw(this.ctx);
        }
        
        for (var j = 0; j < this.myBullets.length; j++) {
            this.myBullets[j].draw(this.ctx);
        }
        
        this.ship.draw(this.ctx);
        
    };
    
    Game.prototype.move = function () {
        for (var i = 0; i < this.myAsteroids.length; i++) {
            this.myAsteroids[i].move();
            this.myAsteroids[i].bounce(Game.DIM_X, Game.DIM_Y);
        }
        
        for (var j = 0; j < this.myBullets.length; j++) {
            this.myBullets[j].move();
            this.myBullets[j].bounce(Game.DIM_X, Game.DIM_Y);
        }
        
        this.ship.move();
        
        this.ship.bounce(Game.DIM_X, Game.DIM_Y);
    };
    
    Game.prototype.step = function () {
        this.move();
        this.draw();
        this.checkCollisions();
    };
    
    Game.prototype.start = function () {
        var game = this;
        this.bindKeyHandlers();
        this.timerId = window.setInterval ( function () {
            game.step();
        }, Game.REFRESH_MS);
    };
    
    Game.prototype.checkCollisions = function() {
        for (var i = 0; i < this.myAsteroids.length; i++) {
            var currentAsteroid = this.myAsteroids[i];
            if(this.ship.isCollidedWith(currentAsteroid)) {
                window.alert("You lost.");
                this.stop();
            }
			
			for (var j = 0; j < this.myBullets.length; j++) {
				var currentBullet = this.myBullets[j];
				if (currentAsteroid.isCollidedWith(currentBullet)) {
					this.removeBullet(currentBullet);
					this.removeAsteroid(currentAsteroid);
				}
			}
        }
    };
    
    Game.prototype.fireBullet = function () {
        console.log("firing bullet!");
        var newBullet = this.ship.fireBullet(this);
        this.myBullets.push(newBullet);
    };
    
    Game.prototype.removeAsteroid = function(asteroid) {
		console.log("removing asteroid");
        var deleteIndex = this.myAsteroids.indexOf(asteroid);
        this.myAsteroids.splice(deleteIndex, 1);
    };
    
    Game.prototype.removeBullet = function(bullet) {
		console.log("removing bullet");
        var deleteIndex = this.myAsteroids.indexOf(bullet);
        this.myAsteroids.splice(deleteIndex, 1);
    };
    
    Game.prototype.stop = function() {
        clearInterval(this.timerId);
    };
    
    Game.prototype.bindKeyHandlers = function () {
        var that = this;
        window.key('up', function() { 
            that.ship.power([0, -1]);
        });
        window.key('down', function() { 
            that.ship.power([0, 1]);
        });
        window.key('left', function() { 
            that.ship.power([-1, 0]);
        });
        window.key('right', function() { 
            that.ship.power([1, 0]);
        });
        window.key('space', function() { 
            that.fireBullet();
        });
    };

    
})(this);