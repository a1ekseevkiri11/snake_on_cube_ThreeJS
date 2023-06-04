import { optHeadSnake, optTailSnake } from "./config three.js";

import { rotation } from "./support functions.js";

export class Snake {
    constructor(params, tileMap) {
        this.params = params;
        this.tileMap = tileMap;
        this.clock = new THREE.Clock(true);
        this.dead = false;
        this.position = {
            indexHeight: 0,
            indexWidth: 0,
        }
        this.plane = 'plane2';
        this.direction = 'up';
        this.headMesh;
        this.tail = [];
        this.initSnake();
        this.initInput();
    }

    initSnake(){
        this.headMesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(optHeadSnake.sizeX,optHeadSnake.sizeY,optHeadSnake.sizeZ),
            new THREE.MeshStandardMaterial({
                color: optHeadSnake.color
            }),
        );
        this.params.scene.add(this.headMesh);
        for(let i = 0; i < 1; i++){
            this.grow();
        }
    }

    initInput() {
        document.addEventListener("keydown",  (e) => {
            if ( e.code === "KeyW" &&  this.direction !== 'down') {
                this.direction = 'up';
            }else if ( e.code === "KeyS" && this.direction !== 'up') {
                this.direction = 'down';
            } else if ( e.code === "KeyA" && this.direction !== 'right') {
                this.direction = 'left';
            }  else if ( e.code === "KeyD" && this.direction !== 'left') {
                this.direction = 'right';
            }
        });
    }

    grow(){
        const mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(optTailSnake.sizeX, optTailSnake.sizeY, optTailSnake.sizeZ),
            new THREE.MeshStandardMaterial({
                color: optTailSnake.color,
            }),
        );
        this.tail.push(mesh);
        this.params.scene.add(this.tail[this.tail.length - 1]);
    }

    //проверка пересечений
    checkColisions(berry){
        this.checkColisionsSnake();
        this.checkColisionsBerry(berry);
    }

    checkColisionsSnake(){
        for(let i = 1; i < this.tail.length; i++){
            if(this.headMesh.position.x === this.tail[i].position.x &&
                this.headMesh.position.y === this.tail[i].position.y &&
                this.headMesh.position.z === this.tail[i].position.z){
                    this.dead = true;
                    break;
            }
        }
    }

    checkColisionsBerry(berry){
        if(this.headMesh.position.x === berry.mesh.position.x &&
            this.headMesh.position.y ===  berry.mesh.position.y &&
            this.headMesh.position.z ===  berry.mesh.position.z){
            for(let i = 0; i < berry.satiety; i++){
                this.grow();
            }
            if(!berry.updateBerry(this.tail.slice())){
                this.dead = true;
            }
            
        }
    }

    //"переход" на другую сторону
    checkPlane(berry){
        if(this.position.indexHeight > this.tileMap.plane.plane2.length - 1){
            this.position.indexHeight = 0;
            for(let i = 0; i < this.tail.length; i++){
                rotation(this.tail[i], 'down');
            }
            rotation(berry.mesh, 'down');
            return;
        }

        if(this.position.indexHeight < 0){
            this.position.indexHeight = this.tileMap.plane.plane2[0].length - 1;
            for(let i = 0; i < this.tail.length; i++){
                rotation(this.tail[i], 'up');
            }
            rotation(berry.mesh, 'up');
            return;
        }

        if(this.position.indexWidth > this.tileMap.plane.plane2[0].length - 1){
            this.position.indexWidth = 0;
            for(let i = 0; i < this.tail.length; i++){
                rotation(this.tail[i], 'left');
            }
            rotation(berry.mesh, 'left');
            return;
        }

        if(this.position.indexWidth < 0){
            this.position.indexWidth = this.tileMap.plane.plane2.length - 1;
            for(let i = 0; i < this.tail.length; i++){
                rotation(this.tail[i], 'right');
            }
            rotation(berry.mesh, 'right');
            return;
        }
    } 
    
    
    update(berry) {
        if(!this.dead){
            if (this.clock.getElapsedTime() > optHeadSnake.spead){
                for(let i = this.tail.length - 1; i >= 1; i--){
                    this.tail[i].position.copy(this.tail[i - 1].position);
                }
                this.tail[0].position.copy(this.headMesh.position);
                switch(this.direction){
                    case 'up':
                        this.position.indexHeight++;
                        break;
                    case 'down':
                        this.position.indexHeight--;
                        break;
                    case 'left':
                        this.position.indexWidth--;
                        break;
                    case 'right':
                        this.position.indexWidth++;
                        break;
                }
                this.checkPlane(berry);
                this.headMesh.position.copy(this.tileMap.plane.plane2[this.position.indexHeight][this.position.indexWidth]);
                this.checkColisions(berry);
                this.clock.start();
            }
        }
        // else{
        //     return false;
        // }            
    }
}