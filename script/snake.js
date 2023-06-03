import { optHeadSnake, optTailSnake } from "./config three.js";

import { rotation } from "./support functions.js";

export const snake = (() => {

    class Snake {
        constructor(params) {
            this.params = params;
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
            this.headMesh.position.copy(this.position);
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
            const tailMesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optTailSnake.sizeX, optTailSnake.sizeY, optTailSnake.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optTailSnake.color,
                }),
            );
            this.tail.push(tailMesh);
            this.params.scene.add(this.tail[this.tail.length - 1]);
        }

        //проверка пересечений
        checkColisions(berry, platform){
            this.checkColisionsSnake();
            this.checkColisionsBerry(berry, platform);
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

        checkColisionsBerry(platform, berry){
            if(this.headMesh.position.x === berry.position.x &&
                this.headMesh.position.y === berry.position.y &&
                this.headMesh.position.z === berry.position.z){
                for(let i = 0; i < berry.satiety; i++){
                    this.grow();
                }
                berry.updateBerry(platform, this.tail);
            }
        }

        //"переход" на другую сторону
        checkPlane(platform, berry){
            if(this.position.indexHeight > platform.tileMap.plane2[0].length - 1){
                this.position.indexHeight = 0;
                this.rotationTail('down');
                rotation(berry, 'down');
                return;
            }

            if(this.position.indexHeight < 0){
                this.position.indexHeight = platform.tileMap.plane2[0].length - 1;
                this.rotationTail('up');
                rotation(berry, 'up');
                return;
            }

            if(this.position.indexWidth > platform.tileMap.plane2.length - 1){
                this.position.indexWidth = 0;
                this.rotationTail('left');
                rotation(berry, 'left');
                return;
            }

            if(this.position.indexWidth < 0){
                this.position.indexWidth = platform.tileMap.plane2.length - 1;
                this.rotationTail('right');
                rotation(berry, 'right');
                return;
            }
        } 
        
        
        update(berry, platform) {
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
                    this.checkPlane(platform, berry);
                    this.headMesh.position.copy(platform.tileMap.plane2[this.position.indexHeight][this.position.indexWidth]);
                    this.checkColisions(platform, berry);
                    this.clock.start();
                }
            }
            else{
                return false;
            }            
        }

        //support function
        rotationTail(directionRotation){
            for(let i = 0; i < this.tail.length; i++){
                switch(directionRotation){
                    case 'up':
                        [this.tail[i].position.y, this.tail[i].position.z] = [this.tail[i].position.z, -this.tail[i].position.y];
                        break;
                    case 'down':
                        [this.tail[i].position.y, this.tail[i].position.z] = [-this.tail[i].position.z, this.tail[i].position.y];
                        break;
                    case 'left':
                        [this.tail[i].position.x, this.tail[i].position.z] = [-this.tail[i].position.z, this.tail[i].position.x];
                        break;
                    case 'right':
                        [this.tail[i].position.x, this.tail[i].position.z] = [this.tail[i].position.z, -this.tail[i].position.x];
                        break;
                }
            }
        }
    }
    return {
        Snake: Snake,
    }
})();