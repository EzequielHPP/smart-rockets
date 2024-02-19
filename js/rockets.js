function Rocket(w, h, dna) {

    this.width = w;
    this.height = h;
    this.DNA = dna;
    // Determine directions that is allowed to fly
    this.velocity = createVector();
    this.acceleration = createVector();
    // Create starting position
    this.position = createVector(width / 2, height - this.height);
    this.spawnPosition = this.position.copy();
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;
    this.timeToReachTarget = 0;
}

Rocket.prototype.update = function () {
    this.timeToReachTarget++;

    // Did we hit the target? Hurray!!
    // the target is a circle

    const distanceFromTarget = dist(this.position.x, this.position.y, target.x, target.y);
    // check if the rocket is inside the target
    if (distanceFromTarget < targetHalfWidth - 20) {
        this.completed = true;
        this.timeToReachTarget--;
    }

    // draw a line from the rocket to the target
    let alpha = map(distanceFromTarget, 0, 300, 255, 0);

    stroke(255, 255, 255, alpha);
    line(this.position.x, this.position.y, target.x + 20, target.y + 20);
    // text that follows the rocket saying the distance from the target
    noStroke();
    fill(255, 255, 255, 100);
    textAlign(CENTER);
    textSize(12);
    text(parseInt(distanceFromTarget), this.position.x, this.position.y - 10);


    // Did it crash into any obstacles?
    for (let tmpObstacle = 0; tmpObstacle < obstacles.length; tmpObstacle++) {
        const obstacleX = obstacles[tmpObstacle].x;
        const obstacleY = obstacles[tmpObstacle].y;
        const obstacleH = obstacles[tmpObstacle].height;
        const obstacleW = obstacles[tmpObstacle].width;

        const rocketX = this.position.x;
        const rocketY = this.position.y;
        const rocketH = this.height;
        const rocketW = this.width;

        if ((parseInt(rocketX) + rocketW / 2) > obstacleX && (parseInt(rocketX) + parseInt(rocketW) / 2) < obstacleX + obstacleW) {
            if (((parseInt(rocketY) + rocketH / 2) > obstacleY + obstacleH && (parseInt(rocketY) + rocketH / 2) < obstacleY + obstacleH * 2)) {
                this.crashed = true;
            }
        }
    }

    // Did we hit any of the walls?
    if (this.position.x > width - this.width / 2 || this.position.x < 0) {
        this.crashed = true;
    }
    if (this.position.y > height - this.height / 2 || this.position.y < 0) {
        this.crashed = true;
    }

    // Apply movement direction
    this.applyForce(this.DNA.dna[currentLifeSpanFrame]);
    if (!this.completed && !this.crashed) {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(maximumVelocity);
    }

    // get travel distance from spawn point
    // for each dna position get the distance from the spawn point

    if (this.distanceFromSpawn < 10 && this.timeToReachTarget > 100) {
        // this means it didn't move
        this.crashed = true;
    }

};

Rocket.prototype.show = function () {

    // Update the position
    this.update();

    if (this.completed) {
        let alreadyInThePile = false;
        for (let completedRockets = 0; completedRockets <= totalCompleted.length; completedRockets++) {
            if (totalCompleted[completedRockets] === this) {
                alreadyInThePile = true;
            }
        }
        if (!alreadyInThePile) {
            totalCompleted.push(this);
        }
    }

    if (this.crashed) {
        let alreadyInThePile = false;
        for (let failedRockets = 0; failedRockets <= totalFailed.length; failedRockets++) {
            if (totalFailed[failedRockets] === this) {
                alreadyInThePile = true;
            }
        }
        if (!alreadyInThePile) {
            totalFailed.push(this);
        }
    }

    push();
    noStroke();
    fill(255,255,255,.4);
    translate(this.position.x, this.position.y);
    // rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, this.height, this.width);
    // rotate(this.velocity.heading());

    if (this.completed) {
        image(rocket_success, 0, 0, this.width, this.height - (this.height/2));
    } else if (this.crashed) {
        image(rocket_failed, 0, 0, this.width / 2, this.height / 4);
    } else {
        image(rocket, 0, 0, this.width, this.height - (this.height/2));
    }
    pop();
};

Rocket.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};

Rocket.prototype.calcFitness = function() {
    // Get the distance between the rocket and the target
    const distance = dist(this.position.x, this.position.y, target.x, target.y);

    // Calculate the overall fitness values
    this.fitness = map(distance, 0, width, width, 0);

    // Is it completed then give it a boost on fitness
    if (this.completed) {
        this.fitness *= 10;
        if (totalCompleted[0] === this) {
            this.fitness *= 10000;
        }
    }
    // how long did it take to reach the target
    this.fitness += map(this.timeToReachTarget, 0, 1000, 1000, 0);

    // Has it crashed? then bring down the value of fitness
    if (this.crashed) {
        this.fitness /= 100;
    }
};
