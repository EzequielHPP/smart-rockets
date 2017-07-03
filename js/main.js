/**
 * Created by ezequielpereira on 03/07/2017.
 */

var rockets = [];
var numberOfRockets = 10;
var lifeSpan = 400;
var rocketSize = {"width": 5, "height": 30};
var maxforce = 1;
var currentLifeSpanFrame = 0;
var obstacles = [];
var target;
var animationOfTarget = 0;
var animationOfTargetLength = 0;
var animationOfTargetCircles = [];

function setup() {
    // Create canvas and setup background
    createCanvas(640, 480);
    background(0);

    // Generate Target
    target = createVector(width / 2, 50);
    animationOfTargetCircles[0] = [18,18];

    // Generate Obstacles
    generateObstacles();

    generateRockets();
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
        rect(obstacles[obstacleX].x, obstacles[obstacleX].y + ((height / (obstacles.length+1)) * obstacleX) , obstacles[obstacleX].w, 20);
    }

    // Render Rockets
    for (var rocketX = 0; rocketX < rockets.length; rocketX++) {
        rockets[rocketX].show();
    }

    currentLifeSpanFrame++;
    if(currentLifeSpanFrame >= lifeSpan){
        currentLifeSpanFrame = 0;
    }
}

// Add Rockets
function generateRockets() {
    for (var rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        rockets.push(new Rocket(rocketSize['width'], rocketSize['height'], new DNA()));
    }
}

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

function generateObstacles() {

    for (var obstacleX = 0; obstacleX < 2; obstacleX++) {
        var randomY = random(1, (height / 4));
        var randomX = random(0, width);
        var randomW = random(0, width / 2);

        if(randomW < 100){
            randomW = 100;
        }
        obstacles[obstacleX] = {'x': randomX, 'y': randomY + target.y + 20, 'w': randomW, 'h': 10};
    }
}