/**
 * Created by ezequielpereira on 03/07/2017.
 */
let moon;
let planet;
let rocket;
let rocket_success;
let rocket_failed;
let obstacleImages = [];
let stars;

const targetFullWidth = 200;
const targetHalfWidth = targetFullWidth / 2;

let population = [];
let rockets = [];
let randomNumberOfStars = 50;
let numberOfRockets = document.getElementById('numberOfRockets').value;
let mutationRate = document.getElementById('mutationRate').value;
let lifeSpan = document.getElementById('lifeSpan').value;
let maxForce = document.getElementById('maxForce').value;
let numberOfObstacles = document.getElementById('numberOfObstacles').value;
let maximumVelocity = 2;
let rocketSize = {"width": 30, "height": 92};
let currentLifeSpanFrame = 0;
let obstacles = [];
let target;
let animationOfTarget = 0;
let animationOfTargetLength = 0;
let animationOfTargetCircles = [];
let currentGeneration = 0;
let totalCompleted = [];
let totalFailed = [];
let totalTotalFailures = 0;

let startButton = document.getElementById('startButton');
let started = false;
startButton.onclick = function () {
    numberOfRockets = document.getElementById('numberOfRockets').value;
    mutationRate = document.getElementById('mutationRate').value;
    lifeSpan = document.getElementById('lifeSpan').value;
    maxForce = document.getElementById('maxForce').value;
    numberOfObstacles = document.getElementById('numberOfObstacles').value;
    population = new Population();
    generateObstacles();
    started = true;
};

let stopButton = document.getElementById('stopButton');
stopButton.onclick = function () {
    started = false;
    generateObstacles();
    generateStars();
    population = new Population();
    currentGeneration = 0;
    totalCompleted = [];
    totalFailed = [];
    currentLifeSpanFrame = 0;

};

// create draggers
const draggers = [
    {'id': 'numberOfRockets', 'value': 25},
    {'id': 'mutationRate', 'value': 0.01},
    {'id': 'lifeSpan', 'value': 400},
    {'id': 'maxForce', 'value': 0.2},
    {'id': 'numberOfObstacles', 'value': 2}
];
draggers.forEach(function (dragger) {
    let draggerInput = document.getElementById(dragger.id);
    draggerInput.onchange = function () {
        document.querySelector('output[for=' + dragger.id + ']').value = this.value;
    };
    draggerInput.oninput = function () {
        document.querySelector('output[for=' + dragger.id + ']').value = this.value;
    };
});

let resetButton = document.getElementById('resetButton');
resetButton.onclick = function () {
    started = false;

    draggers.forEach(function (dragger) {
        document.getElementById(dragger.id).value = dragger.value;
        document.querySelector('output[for=' + dragger.id + ']').value = dragger.value;
    });

    population = new Population();
    generateObstacles();
    currentGeneration = 0;
    totalCompleted = [];
    totalFailed = [];
};

function setup() {
    // Create canvas and setup background
    const canvas = createCanvas(640, 480);
    canvas.parent('canvasContainer');
    background(0);

    rocket = loadImage("img/rocket.png");
    rocket_success = loadImage("img/rocket_success.png");
    rocket_failed = loadImage("img/rocket_failed.png");
    moon = loadImage("img/moon.png");
    planet = loadImage("img/planet.png");
    stars = loadImage("img/stars.JPG");

    for (let i = 1; i <= 3; i++) {
        obstacleImages.push(loadImage("img/obstacle_" + i + ".png"));
    }

    // Generate Target
    target = createVector((width / 2) -20, targetHalfWidth);
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

    if (!started) {
        return;
    }
    // Render Stars
    image(stars, 0 - (currentLifeSpanFrame / 2), 0, width * 2, height);

    // Render Target
    animateTarget();

    // Render Planet
    image(planet, width / 2 - ((50 * width) / 100), height - 50, ((50 * width) / 100) * 2, 180);

    // Render Obstacles
    for (let obstacleX = 0; obstacleX < obstacles.length; obstacleX++) {
        noFill();
        noStroke();
        rect(obstacles[obstacleX].x, obstacles[obstacleX].y, obstacles[obstacleX].width, obstacles[obstacleX].height);
        // random obstacleImages

        image(obstacles[obstacleX].image, obstacles[obstacleX].x, obstacles[obstacleX].y, obstacles[obstacleX].width, obstacles[obstacleX].height);
    }

    // Render Stars
    for (let starX = 0; starX < stars.length; starX++) {
        push();
        translate(stars[starX].x * 0.5, stars[starX].y * 0.5);
        rotate(currentLifeSpanFrame / 50.0);
        star(stars[starX].x * 0.5, stars[starX].y * 0.5, 80, 100, 40);
        pop();
    }

    // Make all the rockets move
    population.run();

    currentLifeSpanFrame++;
    if (
        currentLifeSpanFrame >= lifeSpan ||
        totalFailed.length >= numberOfRockets ||
        totalCompleted.length + totalFailed.length >= numberOfRockets
    ) {
        population.evaluate();
        population.selection();

        if (totalFailed.length >= numberOfRockets) {
            totalTotalFailures += 1;
            console.log('Total Failures: ' + totalTotalFailures);
        }
        if (currentLifeSpanFrame >= lifeSpan) {
            totalTotalFailures = 0;
        }

        if (totalTotalFailures >= 300) {
            generateObstacles();
            generateStars();
            population = new Population();
            currentGeneration = 0;
            totalTotalFailures = 0;
        }

        totalCompleted = [];
        totalFailed = [];
        currentLifeSpanFrame = 0;
        currentGeneration++;
    }

    if (currentGeneration > 60 && totalCompleted.length === 0) {
        currentGeneration = 0;
        population = new Population();
    }

    document.getElementById('generation').innerHTML = "Generation: " + currentGeneration;
    document.getElementById('completed').innerHTML = "Completed: " + totalCompleted.length;
    document.getElementById('crashed').innerHTML = "Crashed: " + totalFailed.length;
}

/**
 * Performs an orb animation in the target
 */
function animateTarget() {
    // Draw Moon
    rectMode(CENTER);
    image(moon, target.x - targetHalfWidth + 30, target.y -targetHalfWidth + 30, targetFullWidth - 20, targetFullWidth - 20);

    noFill();
    stroke(255);
    animationOfTarget++;
    animationOfTargetLength++;
    if (animationOfTarget > lifeSpan / 6) {
        animationOfTarget = 0;
        animationOfTargetLength = 0;
        animationOfTargetCircles = [[55, 55]];
    }
    for (var circleX = 0; circleX < animationOfTargetCircles.length; circleX++) {
        stroke(255, 255, 255, (targetFullWidth - (animationOfTarget * targetFullWidth) / (lifeSpan / 6)));
        ellipse(target.x, target.y, targetHalfWidth + animationOfTarget - (targetHalfWidth * circleX), targetHalfWidth + animationOfTarget - (targetHalfWidth * circleX));
    }

    if (animationOfTargetLength === targetHalfWidth || animationOfTargetLength === targetHalfWidth) {
        animationOfTargetCircles.push([targetHalfWidth, targetHalfWidth]);
    }

}

/**
 * This places an n amount of obstacles randomly on the screen
 */
function generateObstacles() {

    const originalWidth = 1280;
    const originalHeight = 640;

    for (let obstacleX = 0; obstacleX < numberOfObstacles; obstacleX++) {
        let randomPosition = getRandomXY();
        let randomWidth = Math.ceil(random(0, width / 4));
        if (randomWidth < 50) {
            randomWidth = 50;
        }
        let newHeight = Math.ceil((randomWidth * originalHeight) / originalWidth);

        // make sure it doesn't collide with the target or any other obstacle
        while (
            checkIfCollidesWithObstacle(randomPosition.x, randomPosition.y, randomWidth, newHeight) ||
            checkIfCollidesWithTarget(randomPosition.x, randomPosition.y, randomWidth, newHeight)
            ) {
            randomPosition = getRandomXY();
        }

        const obstacleImage = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
        obstacles[obstacleX] = {
            'x': randomPosition.x,
            'y': randomPosition.y,
            'width': randomWidth,
            'height': newHeight,
            'image': obstacleImage
        };
    }
}

function getRandomXY() {
    return {'x': random(0, width - ((20 * width) / 100)), 'y': random(1, (height / 4) * 3)};
}

function checkIfCollidesWithObstacle(x, y, width, height) {
    for (let obstacleX = 0; obstacleX < obstacles.length; obstacleX++) {
        if (x < obstacles[obstacleX].x + obstacles[obstacleX].width &&
            x + width > obstacles[obstacleX].x &&
            y < obstacles[obstacleX].y + obstacles[obstacleX].height &&
            y + height > obstacles[obstacleX].y) {
            return true;
        }
    }
    return false;
}

function checkIfCollidesWithTarget(x, y, width, height) {
    return x < target.x + targetFullWidth &&
        x + width > target.x &&
        y < target.y + targetFullWidth &&
        y + height > target.y;
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
