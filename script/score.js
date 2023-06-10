export class Score{
    constructor(){
        this.scoreBlock = document.getElementById('score-text');
        this.score = 0;
        this.write();
    }

    incScore(){
        this.score++;
        this.write();
    }
    
    write(){
        this.scoreBlock.textContent = this.score;
    }
}