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

    setToZero() {
        this.score = 0;
        this.draw();
    }
    
    write(){
        this.scoreBlock.textContent = this.score;
    }
}