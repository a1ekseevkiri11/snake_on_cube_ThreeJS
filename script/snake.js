import { optHeadSnake, optTailSnake, optPlatform } from "./config geometry.js";
import { Score } from './score.js';
import { rotation } from "./support functions.js";
import { GameOverSound, GameStartSound } from './sound.js';

export class Snake {
    
    constructor(params, tileMap, berry) {
        this.params = params;
        this.tileMap = tileMap;
        this.berry = berry;
        this.score = new Score();
        this.clock = new THREE.Clock(true);
        this.dead = false;
        this.position = {
            indexHeight: 0,
            indexWidth: 0,
        };
        this.direction = 'up';
        this.forbiddenDirection = 'down';
        this.tail = [];
        this.initInput();
        this.initSnake();
    }
    
    initInput() {
        document.addEventListener("keydown",  (e) => {
            if ( e.code === "KeyW" &&  this.forbiddenDirection !== 'up') {
                this.direction = 'up';
            }else if ( e.code === "KeyS" && this.forbiddenDirection !== 'down') {
                this.direction = 'down';
            } else if ( e.code === "KeyA" && this.forbiddenDirection !== 'left') {
                this.direction = 'left';
            }  else if ( e.code === "KeyD" && this.forbiddenDirection !== 'right') {
                this.direction = 'right';
            }
        });

        //для мобилки
        let initialPoint;
        let finalPoint;
        document.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            initialPoint=e.changedTouches[0];
        }, false);
        
        document.addEventListener('touchend', (e) => {
            e.stopPropagation();
            finalPoint=e.changedTouches[0];

            let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX && this.forbiddenDirection !== 'left'){
                        this.direction = 'left';
                    }
                    else if(finalPoint.pageX > initialPoint.pageX && this.forbiddenDirection !== 'right'){
                        this.direction = 'right';
                    }
                }
                else {
                    if (finalPoint.pageY < initialPoint.pageY && this.forbiddenDirection !== 'up'){
                        this.direction = 'up';
                    }
                    else if (finalPoint.pageY > initialPoint.pageY && this.forbiddenDirection !== 'down'){
                        this.direction = 'down';
                    }
                }
            }
        }, false);


        //звук
        if(localStorage.getItem('muted') === 'noisy'){
            this.muted = localStorage.getItem('muted');
            document.getElementById('muted').classList.add('active');
        }
        else{
            this.muted = 'muted';
            document.getElementById('muted').classList.remove('active');
        }

        document.getElementById("muted").addEventListener("click", () => {
            if(this.muted !== 'noisy'){
                document.getElementById('muted').classList.add('active');
                this.muted = 'noisy';
                return;
            }
            document.getElementById('muted').classList.remove('active');
            this.muted = 'muted';
        });
    }

    initSnake(){
        if(this.muted !== 'muted'){
            GameOverSound.load();
            GameStartSound.load();
            GameStartSound.play();
        }
        this.headMesh = new THREE.Mesh(
            new THREE.BoxGeometry(optHeadSnake.sizeX,optHeadSnake.sizeY,optHeadSnake.sizeZ),
            new THREE.MeshLambertMaterial({
                color: optHeadSnake.color
            }),
        );
        this.headMesh.name = "head";
        this.params.scene.add(this.headMesh);
        for(let i = 0; i < optTailSnake.initLength; i++){
            this.grow();
        }
        this.berry.updateBerry(this.tail.slice());
    }

    grow(){
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(optTailSnake.sizeX, optTailSnake.sizeY, optTailSnake.sizeZ),
            new THREE.MeshLambertMaterial({
                color: optTailSnake.color,
            }),
        );
        mesh.name = "tail";
        this.tail.push(mesh);
        this.params.scene.add(this.tail[this.tail.length - 1]);
    }

    //проверка пересечений
    checkColisions(){
        this.checkColisionsSnake();
        this.checkColisionsBerry();
    }

    checkColisionsSnake(){
        for(let i = 1; i < this.tail.length; i++){
            if(this.headMesh.position.x === this.tail[i].position.x &&
                this.headMesh.position.y === this.tail[i].position.y &&
                this.headMesh.position.z === this.tail[i].position.z){
                    if(this.muted !== 'muted'){
                        GameStartSound.load();
                        GameOverSound.play();
                    }
                    this.dead = true;
                    break;
            }
        }
    }

    checkColisionsBerry(){
        if(this.headMesh.position.x === this.berry.meshBerry.position.x &&
            this.headMesh.position.y ===  this.berry.meshBerry.position.y &&
            this.headMesh.position.z ===  this.berry.meshBerry.position.z){
                if(this.muted !== 'muted'){
                    this.berry.sound.load();
                    this.berry.sound.play();
                }
                if(this.berry.typeBerry === 'unfoldBerry'){
                    this.unfoldTail(); 
                }
                for(let i = 0; i < this.berry.satiety; i++){
                    this.grow();
                }
                for(let i = 0; i < this.berry.score; i++){
                    this.score.incScore();
                }
                if(!this.berry.updateBerry(this.tail.slice())){
                    this.dead = true;
                    return;
                }
        }
    }

    //"переход" на другую сторону
    checkPlane(){
        if(this.position.indexHeight > this.tileMap.plane.plane2.length - 1){
            this.position.indexHeight = 0;
            this.rotationWorld('down');
            return;
        }

        if(this.position.indexHeight < 0){
            this.position.indexHeight = this.tileMap.plane.plane2[0].length - 1;
            this.rotationWorld('up');
            return;
        }

        if(this.position.indexWidth > this.tileMap.plane.plane2[0].length - 1){
            this.position.indexWidth = 0;
            this.rotationWorld('left');
            return;
        }

        if(this.position.indexWidth < 0){
            this.position.indexWidth = this.tileMap.plane.plane2.length - 1;
            this.rotationWorld('right');
            return;
        }
    }
    
    update() {
        if (this.clock.getElapsedTime() > optHeadSnake.spead){
            this.clock.start();
            for(let i = this.tail.length - 1; i >= 1; i--){
                this.tail[i].position.copy(this.tail[i - 1].position);
            }
            switch(this.direction){
                case 'up':
                    this.position.indexHeight++;
                    this.forbiddenDirection = 'down';
                    break;
                case 'down':
                    this.position.indexHeight--;
                    this.forbiddenDirection = 'up';
                    break;
                case 'left':
                    this.position.indexWidth--;
                    this.forbiddenDirection = 'right';
                    break;
                case 'right':
                    this.position.indexWidth++;
                    this.forbiddenDirection = 'left';
                    break;
            }
            this.checkPlane();
            this.headMesh.position.copy(this.tileMap.plane.plane2[this.position.indexHeight][this.position.indexWidth]);
            this.tail[0].position.copy(this.headMesh.position);
            this.checkColisions();
        }
    }

    unfoldTail(){
        switch(this.tileMap.getPlane(this.tail[this.tail.length - 1])){
            case 'plane1':
                this.rotationWorld('down');
                break;
            case 'plane2':
                break;
            case 'plane3':
                this.rotationWorld('left');
                break;
            case 'plane4':
                this.rotationWorld('right');
                break;
            case 'plane5':
                this.rotationWorld('up');
                this.rotationWorld('up');
                break;
            case 'plane6':
                this.rotationWorld('up');
                break;
        }
        this.getHeadPositionIndex(this.tail[this.tail.length - 1]);
        this.tail.reverse(); 
        if(this.tail[1].position.x < this.tail[0].position.x){
            this.direction = 'right';
            this.forbiddenDirection = 'left';
        }
        else if(this.tail[1].position.x > this.tail[0].position.x){
            this.direction = 'left';
            this.forbiddenDirection = 'right';
        }
        else if(this.tail[1].position.y < this.tail[0].position.y){
            this.direction = 'up';
            this.forbiddenDirection = 'down';
        }
        else if(this.tail[1].position.y > this.tail[0].position.y){
            this.direction = 'down';
            this.forbiddenDirection = 'up';
        }
    }

    getHeadPositionIndex(object){
        for(let i = 0; i < this.tileMap.plane.plane2.length; i++){
            for(let j = 0; j < this.tileMap.plane.plane2[0].length; j++){
                if(object.position.x === this.tileMap.plane.plane2[i][j].x &&
                    object.position.y === this.tileMap.plane.plane2[i][j].y &&
                    object.position.z === this.tileMap.plane.plane2[i][j].z){
                        this.position.indexHeight = i;
                        this.position.indexWidth = j;
                        return;
                }
            }
        }
    }

    rotationWorld(directionRotation){
        switch(directionRotation){
            case 'up':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'up');
                }
                rotation(this.berry.meshBerry, 'up');
                rotation(this.headMesh, 'up');
                break;
            case 'down':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'down');
                }
                rotation(this.berry.meshBerry, 'down');
                rotation(this.headMesh, 'down');
                break;
            case 'left':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'left');
                }
                rotation(this.berry.meshBerry, 'left');
                rotation(this.headMesh, 'left');
                break;
            case 'right':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'right');
                }
                rotation(this.berry.meshBerry, 'right');
                rotation(this.headMesh, 'right');
                break;
        }
    }

    deleteSnake(){
        this.score.setToZeroScore();
        localStorage.setItem('muted', this.muted);
        this.params.scene.remove(this.headMesh);
        for(let i = 0; i < this.tail.length; i++){
            this.params.scene.remove(this.tail[i]);
        }
        this.berry.deleteBerry();
    }
}