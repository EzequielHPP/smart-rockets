/**
 * Created by ezequielpereira on 03/07/2017.
 */
function DNA(parsedGene){

    if(parsedGene){
        this.dna = parsedGene;
    } else {
        this.dna = [];
        angleMode(DEGREES);
        for(var dnaX = 0; dnaX < lifeSpan; dnaX++){
            this.dna[dnaX] = p5.Vector.random2D();
            this.dna[dnaX].setMag(maxForce / 2);
        }
    }
}

DNA.prototype.mate = function(targetPartner){
    var newDNA = [];

    // Get a random midpoint to start getting the data from partner
    var randomBreaker = floor(random(this.dna.length));

    // Loop trough all the genes and get the "baby"
    for(var tmpGene = 0; tmpGene < this.dna.length; tmpGene++){
        if(tmpGene < randomBreaker){
            newDNA[tmpGene] = this.dna[tmpGene];
        } else {
            newDNA[tmpGene] = targetPartner.dna[tmpGene];
        }
    }

    return new DNA(newDNA);
};

// Have a baby with the genes from himself and a partner
DNA.prototype.crossover = function(partner) {
    var newgenes = [];
    var mid = floor(random(this.dna.length));
    for (var i = 0; i < this.dna.length; i++) {
        if (i > mid) {
            newgenes[i] = this.dna[i];
        } else {
            newgenes[i] = partner.dna[i];
        }
    }
    return new DNA(newgenes);
};

// As a the real DNA there's a small percentage of having a mutation
DNA.prototype.mutation = function() {
    for (var i = 0; i < this.dna.length; i++) {
        if (random(1) < 0.01) {
            this.dna[i] = p5.Vector.random2D();
            this.dna[i].setMag(maxForce);
        }
    }
};
