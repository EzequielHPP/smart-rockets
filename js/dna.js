/**
 * Created by ezequielpereira on 03/07/2017.
 */
function DNA(parsedGene){

    if(parsedGene){
        this.dna = parsedGene;
    } else {
        this.dna = [];
        for(var dnaX = 0; dnaX < lifeSpan; dnaX++){
            this.dna[dnaX] = p5.Vector.random2D();
            this.dna[dnaX].setMag(maxforce);
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