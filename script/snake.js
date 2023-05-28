import { optHeadSnake, optTailSnake } from "./config three.js";


export const snake = (() => {

    class Snake {
        constructor(params) {
            this.params = params;


            this.snakeLen = 1;
            this.position = new THREE.Vector3(optHeadSnake.x, optHeadSnake.y, optHeadSnake.z);
            this.direction = 'up';
            this.headMesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optHeadSnake.sizeX,optHeadSnake.sizeY,optHeadSnake.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optHeadSnake.color
                }),
            );
            params.scene.add(this.headMesh);

            this.tailGeometry = new THREE.BoxGeometry(optTailSnake.x, optTailSnake.y, optTailSnake.z);
            this.tailMaterial = new THREE.MeshLambertMaterial({
                color: optTailSnake.color,
            });
            this.tail = [];
            for(let i = 0; i < 10; i++){
                this.grow();
            }
            this.clock = new THREE.Clock(true);

            
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

        update() {
            if (this.clock.getElapsedTime() > optHeadSnake.spead) {
                this.tail[0].position.copy(this.position);
                for(let i = this.tail.length - 1; i >= 1; i--){
                    this.tail[i].position.copy(this.tail[i-1].position);
                }
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
                this.clock.start();
            }
        }
    }
    return {
        Snake: Snake,
    }
  })();