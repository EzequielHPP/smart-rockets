/**
 * Created by ezequielpereira on 03/07/2017.
 */

var moon;
var planet;
var rocket;
var rocket_success;
var rocket_failed;
var nebula;
var stars;

var population = [];
var rockets = [];
var randomNumberOfStars = 50;
var numberOfRockets = 25;
var numberOfObstacles = 1;
var lifeSpan = 500;
var maximumVelocity = 2;
var rocketSize = {"width": 15, "height": 40};
var maxForce = 1;
var currentLifeSpanFrame = 0;
var obstacles = [];
var target;
var animationOfTarget = 0;
var animationOfTargetLength = 0;
var animationOfTargetCircles = [];
var currentGeneration = 0;
var totalCompleted = [];

function setup() {
    // Create canvas and setup background
    var canvas = createCanvas(640, 480);
    canvas.parent('canvasContainer');
    background(0);

    rocket = loadImage("img/rocket.png");
    rocket_success = loadImage("img/rocket_success.png");
    rocket_failed = loadImage("img/rocket_failed.png");
    moon = loadImage("img/moon.png");
    planet = loadImage("img/planet.png");
    nebula = loadImage("img/nebula.png");
    stars = loadImage("img/stars.JPG");

    // Generate Target
    target = createVector(width / 2, 50);
    animationOfTargetCircles[0] = [18, 18];

    // Generate Obstacles
    generateObstacles();

    // Generate star field
    generateStars();

    population = new Population();
}

// Loop trough frames
function draw() {
    background(0);

    // Render Stars
    image(stars, 0 - (currentLifeSpanFrame/2), 0, width * 2, height);

    // Render Target
    animateTarget();

    // Render Planet
    image(planet, width / 2 - ((50 * width) / 100), height - 50, ((50 * width) / 100) * 2, 180);

    // Render Obstacles
    for (var obstacleX = 0; obstacleX < obstacles.length; obstacleX++) {
        noFill();
        noStroke();
        rect(obstacles[obstacleX].x, obstacles[obstacleX].y + ((height / (obstacles.length + 1)) * obstacleX), obstacles[obstacleX].width, obstacles[obstacleX].height);
        image(nebula, obstacles[obstacleX].x, obstacles[obstacleX].y, obstacles[obstacleX].width, obstacles[obstacleX].height + ((height / (obstacles.length + 1)) * obstacleX));
    }

    // Render Stars
    for (var starX = 0; starX < stars.length; starX++) {
        push();
        translate(stars[starX].x * 0.5, stars[starX].y * 0.5);
        rotate(currentLifeSpanFrame / 50.0);
        star(stars[starX].x * 0.5, stars[starX].y * 0.5, 80, 100, 40);
        pop();
    }

    // Make all the rockets move
    population.run();

    currentLifeSpanFrame++;
    if (currentLifeSpanFrame >= lifeSpan) {
        population.evaluate();
        population.selection();

        totalCompleted = [];
        currentLifeSpanFrame = 0;
        currentGeneration++;
    }

    if(currentGeneration > 60 && totalCompleted.length === 0){
        population = new Population();
    }

    document.getElementById('generation').innerHTML = "Generation " + currentGeneration + ' (Completed: ' + (totalCompleted.length) + '/' + numberOfRockets + ')';
}

/**
 * Performs an orb animation in the target
 */
function animateTarget() {
    // Draw target
    fill(255);
    ellipse(target.x, target.y, 50, 50);

    // Draw Moon
    image(moon, target.x - 25, target.y - 25, 50, 50);

    noFill();
    stroke(255);
    animationOfTarget++;
    animationOfTargetLength++;
    if (animationOfTarget > lifeSpan / 6) {
        animationOfTarget = 0;
        animationOfTargetLength = 0;
        animationOfTargetCircles = [[50, 50]];
    }
    for (var circleX = 0; circleX < animationOfTargetCircles.length; circleX++) {
        stroke(255, 255, 255, (100 - (animationOfTarget * 100 ) / (lifeSpan / 6)));
        ellipse(target.x, target.y, 50 + animationOfTarget - (50 * circleX ), 50 + animationOfTarget - (50 * circleX ));
    }

    if (animationOfTargetLength === 50 || animationOfTargetLength === 100) {
        animationOfTargetCircles.push([50, 50]);
    }
}

/**
 * This places an n amount of obstacles randomly on the screen
 */
function generateObstacles() {

    for (var obstacleX = 0; obstacleX < numberOfObstacles; obstacleX++) {
        var randomY = random(1, (height / 4));
        var randomX = random(0, width - ((20 * width) / 100));
        var randomW = random(0, width / 2);
        if (randomX < ((10 * width) / 100)) {
            randomX = ((10 * width) / 100);
        } else if (randomX + randomW > width - ((10 * width) / 100)) {
            randomX = width - ((10 * width) / 100) - randomW;
        }

        if (randomW < 100) {
            randomW = 100;
        }
        obstacles[obstacleX] = {'x': randomX, 'y': randomY + target.y + 20, 'width': randomW, 'height': 30};
    }
}

/**
 * This places stars randomly on the screen
 */
function generateStars() {
    for (var starX = 0; starX < randomNumberOfStars; starX++) {
        var randomY = random(1, height);
        var randomX = random(0, width);

        stars[starX] = {'x': randomX, 'y': randomY};
    }
}