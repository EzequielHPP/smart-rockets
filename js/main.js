/**
 * Created by ezequielpereira on 03/07/2017.
 */

var population = [];
var rockets = [];
var numberOfRockets = 25;
var numberOfObstacles = 1;
var lifeSpan = 300;
var rocketSize = {"width": 5, "height": 30};
var maxForce = 1;
var currentLifeSpanFrame = 0;
var obstacles = [];
var target;
var animationOfTarget = 0;
var animationOfTargetLength = 0;
var animationOfTargetCircles = [];
var currentGeneration = 0;

function setup() {
    // Create canvas and setup background
    var canvas = createCanvas(640, 480);
    canvas.parent('canvasContainer');
    background(0);

    // Generate Target
    target = createVector(width / 2, 50);
    animationOfTargetCircles[0] = [18,18];

    // Generate Obstacles
    generateObstacles();

    population = new Population();
}

// Loop trough frames
function draw() {
    background(0);

    // Render Target
    animateTarget();

    // Render Obstacles
    for (var obstacleX = 0; obstacleX < obstacles.length; obstacleX++) {
        fill(255);
        noStroke();
        rect(obstacles[obstacleX].x, obstacles[obstacleX].y + ((height / (obstacles.length+1)) * obstacleX) , obstacles[obstacleX].width, obstacles[obstacleX].height);
    }

    population.run();

    currentLifeSpanFrame++;
    if(currentLifeSpanFrame >= lifeSpan){
        population.evaluate();
        population.selection();

        currentLifeSpanFrame = 0;
        currentGeneration++;
        document.getElementById('generation').innerHTML = "Generation " + currentGeneration;
    }
}

/**
 * Performs an orb animation in the target
 */
function animateTarget(){
    fill(255);
    ellipse(target.x, target.y, 16, 16);
    noFill();
    stroke(255);
    animationOfTarget++;
    animationOfTargetLength++;
    if(animationOfTarget > lifeSpan / 6){
        animationOfTarget = 0;
        animationOfTargetLength = 0;
        animationOfTargetCircles = [[18,18]];
    }
    for(var circleX = 0; circleX < animationOfTargetCircles.length; circleX++) {
        stroke(255,255,255,(100 - (animationOfTarget * 100 ) / (lifeSpan / 6)));
        ellipse(target.x, target.y, 18 + animationOfTarget - (18 * circleX ), 18 + animationOfTarget - (18 * circleX ));
    }

    if(animationOfTargetLength === 18 || animationOfTargetLength === 36){
        animationOfTargetCircles.push([18,18]);
    }
}

/**
 * This places an n amount of obstacles randomly on the screen
 */
function generateObstacles() {

    for (var obstacleX = 0; obstacleX < numberOfObstacles; obstacleX++) {
        var randomY = random(1, (height / 4));
        var randomX = random(0, width);
        var randomW = random(0, width / 2);

        if(randomW < 100){
            randomW = 100;
        }
        obstacles[obstacleX] = {'x': randomX, 'y': randomY + target.y + 20, 'width': randomW, 'height': 10};
    }
}