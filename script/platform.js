import { optPlatform, optHeadSnake } from "./config three.js";
import { rotationPlane } from "./support functions.js";


export const platform = (() => {
    class Platform{
        constructor(params){
            this.params = params;
            this.tileMap = {
                plane1: [],
                plane2: [],
                plane3: [],
                plane4: [],
                plane5: [],
                plane6: []
            };
            this.intPlatform();
            this.initTileMap();
        }

        intPlatform(){
            this.platformMesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optPlatform.sizeX, optPlatform.sizeY, optPlatform.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optPlatform.color
                }),
            );
            this.platformMesh.position.set(0, 0, 0);
            this.params.scene.add(this.platformMesh);
        }

        initTileMap(){
            for(let i = -(optPlatform.sizeX - optHeadSnake.sizeX) / 2; i <= (optPlatform.sizeX - optHeadSnake.sizeX) / 2; i++){
                let line = [];
                for(let j = -(optPlatform.sizeY - optHeadSnake.sizeY) / 2; j <= (optPlatform.sizeY - optHeadSnake.sizeY) / 2; j++){
                    line.push(new THREE.Vector3(j, i, (optPlatform.sizeY  + optHeadSnake.sizeY) / 2));
                }
                this.tileMap.plane2.push(line);
            }
            this.tileMap.plane1 = rotationPlane(this.tileMap.plane2, 'up');
            this.tileMap.plane3 = rotationPlane(this.tileMap.plane2, 'right');
            this.tileMap.plane4 = rotationPlane(this.tileMap.plane2, 'left');
            this.tileMap.plane6 = rotationPlane(this.tileMap.plane2, 'down');
            this.tileMap.plane5 = rotationPlane(this.tileMap.plane6, 'down');
        }
    }
    return{
        Platform: Platform,
    }
})();