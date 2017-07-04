/**
 * Created by ezequielpereira on 03/07/2017.
 */

function Rocket(w, h, dna) {

    this.width = w;
    this.height = h;
    this.DNA = dna;
    this.dnaPosition = 0;
    // Determine directions that is allowed to fly
    this.velocity = createVector();
    this.acceleration = createVector();
    // Create starting position
    this.position = createVector(width / 2, height - this.height);
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;
}

Rocket.prototype.update = function () {
    var distanceFromTarget = dist(this.position.x, this.position.y, target.x, target.y);
    if (distanceFromTarget < 10) {
        this.completed = true;
        this.pos = target.copy();
    }

    // Did it crash into any obstacles?
    for (var tmpObsctacle = 0; tmpObsctacle < obstacles.length; tmpObsctacle++) {
        var obstacleX = obstacles[tmpObsctacle].x;
        var obstacleY = obstacles[tmpObsctacle].y;
        var obstacleH = obstacles[tmpObsctacle].height;
        var obstacleW = obstacles[tmpObsctacle].width;

        var rocketX = this.position.x;
        var rocketY = this.position.y;
        var rocketH = this.height;
        var rocketW = this.width;

        if ((parseInt(rocketX) + rocketW / 2) > obstacleX && (parseInt(rocketX) + parseInt(rocketW) / 2) < obstacleX + obstacleW) {
            if (((parseInt(rocketY) + rocketH / 2) > obstacleY + obstacleH && (parseInt(rocketY) + rocketH / 2) < obstacleY + obstacleH * 2)) {
                this.crashed = true;
            }
        }
    }

    // Did we hit any of the walls?
    if (this.position.x > width - this.width / 2 || this.position.x < this.width / 2) {
        this.crashed = true;
    }
    if (this.position.y > height || this.position.y < 0) {
        this.crashed = true;
    }

    // Apply movement direction
    this.applyForce(this.DNA.dna[currentLifeSpanFrame]);
    if (!this.completed && !this.crashed) {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(4);
    }
};

Rocket.prototype.show = function () {

    // Update the position
    this.update();

    // Required vector render (push, translate, pop)
    push();
    noStroke();
    if(this.crashed){
        fill(0,0,255,.5);
    } else if(this.completed){
        fill(0,255,0);
    } else {
        fill(255);
    }
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, this.height, this.width);
    pop();
};

Rocket.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};

Rocket.prototype.calcFitness = function() {
    // Get the distance between the rocket and the target
    var distance = dist(this.position.x, this.position.y, target.x, target.y);

    // Calculate the overall fitness values
    this.fitness = map(distance, 0, width, width, 0);

    // Is it completed then give it a boost on fitness
    if (this.completed) {
        this.fitness *= 10;
    }
    // Has it crashed? then bring down the value of fitness
    if (this.crashed) {
        this.fitness /= 10;
    }
};