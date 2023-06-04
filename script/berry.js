import { optBerry } from "./config three.js";
import { getRandomIndexFromArray, getTilesWithoutSnake } from "./support functions.js";

export class Berry{
    constructor(params, tileMap) {
        this.params = params;
        this.tileMap = tileMap;
        this.satiety = 1;
        this.position = this.tileMap.plane.plane2[4][4];
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

    updateBerry(tail){
        let tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane);
        if(tileWithoutSnake.length === 0){
            console.log("Ладно, ты победил");
            return false;
        }
        this.position = tileWithoutSnake[getRandomIndexFromArray(tileWithoutSnake)];
        this.mesh.position.copy(this.position);
        return true;
    }
}