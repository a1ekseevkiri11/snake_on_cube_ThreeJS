import { optHeadSnake, optTailSnake } from "./config three.js";


export const snake = (() => {

    class Snake {
        constructor(params) {
            this.params = params;

            this.dead = false;

            this.snakeLen = 1;
            this.position = new THREE.Vector3(optHeadSnake.x, optHeadSnake.y, optHeadSnake.z);
            this.direction = 'up';
            this.headMesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optHeadSnake.sizeX,optHeadSnake.sizeY,optHeadSnake.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optHeadSnake.color
                }),
            );
            this.headMesh.position.copy(this.position);
            params.scene.add(this.headMesh);

            this.tailGeometry = new THREE.BoxBufferGeometry(optTailSnake.sizeX, optTailSnake.sizeY, optTailSnake.sizeZ);
            this.tailMaterial = new THREE.MeshStandardMaterial({
                color: optTailSnake.color,
            });
            this.tail = [];
            this.grow();
            this.initInput();
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
            this.tail.push(new THREE.Mesh(this.tailGeometry, this.tailMaterial));
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

        update() {
            this.checkColisionsSnake();
            for(let i = this.tail.length - 1; i >= 1; i--){
                this.tail[i].position.copy(this.tail[i-1].position);
            }
            this.tail[0].position.copy(this.position);
            switch(this.direction){
                case 'up':
                    this.position.z--;
                    break;
                case 'down':
                    this.position.z++;
                    break;
                case 'left':
                    this.position.x--;
                    break;
                case 'right':
                    this.position.x++;
                    break;
            }
            this.headMesh.position.copy(this.position);
        }
    }
    return {
        Snake: Snake,
    }
  })();