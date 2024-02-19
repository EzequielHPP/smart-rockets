function DNA(parsedGene){

    if (parsedGene) {
        this.dna = parsedGene;
    } else {
        this.dna = [];
        angleMode(DEGREES);
        for (let dnaX = 0; dnaX < lifeSpan; dnaX++) {
            let newVectorPosition = p5.Vector.random2D();
            newVectorPosition.setMag(maxForce);
            this.dna[dnaX] = newVectorPosition;
        }
    }
}

DNA.prototype.mate = function(targetPartner){
    const newDNA = [];

    // Get a random midpoint to start getting the data from partner
    const randomBreaker = Math.floor(random(this.dna.length));

    // Loop through all the genes and get the "baby"
    for(let tmpGene = 0; tmpGene < this.dna.length; tmpGene++){
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
    const newGenes = [];
    const mid = Math.floor(random(this.dna.length));
    for (let i = 0; i < this.dna.length; i++) {
        if (i > mid) {
            newGenes[i] = this.dna[i];
        } else {
            newGenes[i] = partner.dna[i];
        }
    }
    return new DNA(newGenes);
};

// As a real DNA there's a small percentage of having a mutation
DNA.prototype.mutation = function() {
    for (let i = 0; i < this.dna.length; i++) {
        if (random(1) < mutationRate) {
            this.dna[i] = p5.Vector.random2D();
            this.dna[i].setMag(maxForce);
        }
    }

    // there's a small chance of having full-blown mutation
    if (random(1) < mutationRate) {
        this.dna = [];
        for(let dnaX = 0; dnaX < lifeSpan; dnaX++){
            let newVectorPosition = p5.Vector.random2D();
            newVectorPosition.setMag(maxForce);
            this.dna[dnaX] = newVectorPosition;
        }
    }
};
