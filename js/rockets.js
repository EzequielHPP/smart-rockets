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
}

Rocket.prototype.update = function () {
    var distanceFromTarget = dist(this.position.x, this.position.y, target.x, target.y);
    if (distanceFromTarget < 10) {
        this.completed = true;
        this.pos = target.copy();
    }

    // Did it crash into any obstacles?
    for (var tmpObsctacle = 0; tmpObsctacle < obstacles.length; tmpObsctacle++) {
        if (this.position.x + this.width / 2 > obstacles[tmpObsctacle].x && this.position.x + this.width / 2 < obstacles[tmpObsctacle].x + obstacles[tmpObsctacle].w && this.position.y + this.height / 2 > obstacles[tmpObsctacle].y && this.position.y + this.height / 2  < obstacles[tmpObsctacle].y + obstacles[tmpObsctacle].h) {
            this.crashed = true;
        }
    }

    // Did we hit any of the walls?
    if (this.position.x > width - this.width / 2  || this.position.x < this.width / 2) {
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
    fill(255);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, this.height, this.width);
    pop();
};

Rocket.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};