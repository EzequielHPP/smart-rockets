/**
 * Created by Ezequiel Pereira on 04/07/2017.
 */
function Population() {
    rockets = [];
    this.genePool = [];

    for (var i = 0; i < numberOfRockets; i++) {
        rockets[i] = new Rocket(rocketSize['width'], rocketSize['height'], new DNA());
    }
}

Population.prototype.run = function () {
    for (var i = 0; i < numberOfRockets; i++) {
        rockets[i].update();
        rockets[i].show();
    }
};

Population.prototype.evaluate = function() {

    // Get the fittest rocket to be reproduced
    var fittestRocket = 0;
    for (var rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        rockets[rocketX].calcFitness();
        if (rockets[rocketX].fitness > fittestRocket) {
            fittestRocket = rockets[rocketX].fitness;
        }
    }

    // get the percentage of the fitness
    for (var rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        rockets[rocketX].fitness /= fittestRocket;
    }

    // Add rockets DNA to the gene pool and make sure that the ones closer to the target get a better chance to be
    // parsed on to the next generation
    this.genePool = [];
    for (var rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        var n = rockets[rocketX].fitness * 100;
        for (var j = 0; j < n; j++) {
            this.genePool.push(rockets[rocketX]);
        }
    }
};

Population.prototype.selection = function() {
    var newRockets = [];
    for (var rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        var randomA = random(this.genePool);
        var parentA = randomA.DNA;

        var randomB = random(this.genePool);
        var parentB = randomB.DNA;

        var child = parentA.crossover(parentB);
        child.mutation();
        newRockets[rocketX] = new Rocket(rocketSize['width'],rocketSize['height'],child);
    }
    rockets = newRockets;
};
