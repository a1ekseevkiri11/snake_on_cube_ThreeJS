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
        this.direction = 'up';
        this.forbiddenDirection = 'down';
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
        for(let i = 0; i < optTailSnake.initLength; i++){
            this.grow();
        }
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
                // this.unfoldTail(berry); 
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
                this.checkPlane(berry);
                this.headMesh.position.copy(this.tileMap.plane.plane2[this.position.indexHeight][this.position.indexWidth]);
                this.tail[0].position.copy(this.headMesh.position);
                this.checkColisions(berry);
                this.clock.start();
            }
        }        
    }

    unfoldTail(berry){
        switch(this.tileMap.getPlane(this.tail[this.tail.length - 1])){
            case 'plane1':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'down');
                }
                rotation(berry.mesh, 'down');
                break;
            case 'plane2':
                break;
            case 'plane3':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'left');
                }
                rotation(berry.mesh, 'left');
                break;
            case 'plane4':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'right');
                }
                rotation(berry.mesh, 'right');
                break;
            case 'plane5':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'up');
                    rotation(this.tail[i], 'up');
                }
                rotation(berry.mesh, 'up');
                rotation(berry.mesh, 'up');
                break;
            case 'plane6':
                for(let i = 0; i < this.tail.length; i++){
                    rotation(this.tail[i], 'up');
                }
                rotation(berry.mesh, 'up');
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


    // rotationWorld(){

    // }
}