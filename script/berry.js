import { optBerry, optPlatform, optHeadSnake  } from "./config three.js";
import { getRandomIndexFromArray, getTilesWithoutSnake } from "./support functions.js";

const planesWithoutSnake = ['plane1', 'plane3', 'plane4', 'plane5', 'plane6'];

export const berry = (() => {

    class Berry{
        constructor(params) {
            this.params = params;
            this.satiety = 1;
            this.position = new THREE.Vector3(0, 0, (optPlatform.sizeY  + optHeadSnake.sizeY) / 2);
            this.initBerry();
        }

        initBerry(){
            this.mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optBerry.sizeX, optBerry.sizeY, optBerry.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optBerry.color
                }),
            );
            this.mesh.position.copy(this.position);
            this.params.scene.add(this.mesh);
        }

        updateBerry(platform, tail){
            const plane = planesWithoutSnake[getRandomIndexFromArray(planesWithoutSnake)];
            let tileWithoutSnake = [];
            switch(plane){
                case 'plane1':
                    tileWithoutSnake = getTilesWithoutSnake(tail, platform.tileMap.plane1);
                    break;
                case 'plane3':
                    tileWithoutSnake = getTilesWithoutSnake(tail, platform.tileMap.plane3);
                    break;
                case 'plane4':
                    tileWithoutSnake = getTilesWithoutSnake(tail, platform.tileMap.plane4);
                    break;
                case 'plane5':
                    tileWithoutSnake = getTilesWithoutSnake(tail, platform.tileMap.plane5);
                    break;
                case 'plane6':
                    tileWithoutSnake = getTilesWithoutSnake(tail, platform.tileMap.plane6);
                    break;
            }
            if(tileWithoutSnake.length === 0){
                console.log("Ладно, ты победил");
                return;
            }
            this.position = tileWithoutSnake[getRandomIndexFromArray(tileWithoutSnake)];
            this.mesh.position.copy(this.position);
        }
    }

    return{
        Berry: Berry,
    }
})();