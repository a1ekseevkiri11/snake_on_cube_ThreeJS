import { optHeadSnake, optTailSnake, optPlatform } from "./config three.js";
import { berry } from './berry.js';


export const snake = (() => {

    class Snake {
        constructor(params) {
            this.params = params;
            this.dead = false;
            this.snakeLen = 0;
            this.position = new THREE.Vector3(0, 0, (optPlatform.sizeY  + optHeadSnake.sizeY) / 2);
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
            for(let i = 0; i < 50; i++){
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
            this.snakeLen++;
            const tailMesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optTailSnake.sizeX, optTailSnake.sizeY, optTailSnake.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optTailSnake.color,
                }),
            );
            this.tail.push(tailMesh);
            this.params.scene.add(this.tail[this.tail.length - 1]);
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

        checkPlane(){
            //1 this.position.y > (optPlatform.sizeY - optHeadSnake.sizeY) / 2
            //2 this.position.z > (optPlatform.sizeZ - optHeadSnake.sizeZ) / 2
            //3 this.position.x > (optPlatform.sizeX - optHeadSnake.sizeX) / 2
            //4 this.position.x < -(optPlatform.sizeX - optHeadSnake.sizeX) / 2
            //5 this.position.z < -(optPlatform.sizeZ - optHeadSnake.sizeZ) / 2
            //6 this.position.y < -(optPlatform.sizeY - optHeadSnake.sizeY) / 2

            if(this.position.x < -(optPlatform.sizeX) / 2){
                this.position.x = (optPlatform.sizeX - optHeadSnake.sizeX) / 2;
                for(let i = 0; i < this.tail.length; i++){
                    [this.tail[i].position.x, this.tail[i].position.z] = [this.tail[i].position.z, -this.tail[i].position.x]
                }
                return;
            }
            if(this.position.x > (optPlatform.sizeX - optHeadSnake.sizeX) / 2){
                this.position.x = -(optPlatform.sizeX - optHeadSnake.sizeX) / 2;
                for(let i = 0; i < this.tail.length; i++){
                    [this.tail[i].position.x, this.tail[i].position.z] = [-this.tail[i].position.z, this.tail[i].position.x]
                }
                return;
            }
            if(this.position.y > (optPlatform.sizeY - optHeadSnake.sizeY) / 2){
                this.position.y = -(optPlatform.sizeY - optHeadSnake.sizeY) / 2;
                for(let i = 0; i < this.tail.length; i++){
                    [this.tail[i].position.y, this.tail[i].position.z] = [-this.tail[i].position.z, this.tail[i].position.y]
                }
                return;
            }
            if(this.position.y < -(optPlatform.sizeY - optHeadSnake.sizeY) / 2){
                this.position.y = (optPlatform.sizeY - optHeadSnake.sizeY) / 2;
                for(let i = 0; i < this.tail.length; i++){
                    [this.tail[i].position.y, this.tail[i].position.z] = [this.tail[i].position.z, -this.tail[i].position.y]
                }
                return;
            }
        }

        update() {
            this.checkColisionsSnake();
            for(let i = this.tail.length - 1; i >= 1; i--){
                this.tail[i].position.copy(this.tail[i - 1].position);
            }
            this.tail[0].position.copy(this.position);
            switch(this.direction){
                case 'up':
                    this.position.y++;
                    break;
                case 'down':
                    this.position.y--;
                    break;
                case 'left':
                    this.position.x--;
                    break;
                case 'right':
                    this.position.x++;
                    break;
            }
            // this.position.z = (optPlatform.sizeZ + optHeadSnake.sizeZ) / 2;
            this.checkPlane();
            this.headMesh.position.copy(this.position);
        }
    }
    return {
        Snake: Snake,
    }
})();