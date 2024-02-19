/**
 * Created by Ezequiel Pereira on 04/07/2017.
 */
function Population() {
    rockets = [];
    this.genePool = [];

    for (let i = 0; i < numberOfRockets; i++) {
        rockets[i] = new Rocket(rocketSize['width'], rocketSize['height'], new DNA());
    }
}

Population.prototype.run = function () {
    for (let i = 0; i < numberOfRockets; i++) {
        rockets[i].update();
        rockets[i].show();
    }
};

Population.prototype.evaluate = function() {

    let rocketX;
    // Get the fittest rocket to be reproduced
    let fittestRocket = 0;
    for (rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        rockets[rocketX].calcFitness();
        if (rockets[rocketX].fitness > fittestRocket) {
            fittestRocket = rockets[rocketX].fitness;
        }
    }

    // get the percentage of the fitness
    for (rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        rockets[rocketX].fitness /= fittestRocket;
    }

    // Add rockets DNA to the gene pool and make sure that the ones closer to the target get a better chance to be
    // parsed on to the next generation
    this.genePool = [];
    for (rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        const n = rockets[rocketX].fitness * 100;
        for (let j = 0; j < n; j++) {
            this.genePool.push(rockets[rocketX]);
        }
    }
};

Population.prototype.selection = function() {
    const newRockets = [];
    for (let rocketX = 0; rocketX < numberOfRockets; rocketX++) {
        const randomA = random(this.genePool);
        const parentA = randomA.DNA;

        const randomB = random(this.genePool);
        const parentB = randomB.DNA;

        const child = parentA.crossover(parentB);
        child.mutation();
        newRockets[rocketX] = new Rocket(rocketSize['width'],rocketSize['height'],child);
    }
    rockets = newRockets;
};
