import { optBerry, optPlatform, optHeadSnake  } from "./config three.js";
import { getRandomIndexFromArray, getTilesWithoutSnake } from "./support functions.js";

const planesWithoutSnake = ['plane1', 'plane3', 'plane4', 'plane5', 'plane6'];

export class Berry{
    constructor(params, tileMap) {
        this.params = params;
        this.tileMap = tileMap;
        this.satiety = 10;
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

    updateBerry(tail){
        const plane = planesWithoutSnake[getRandomIndexFromArray(planesWithoutSnake)];
        let tileWithoutSnake = [];
        switch(plane){
            case 'plane1':
                tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane.plane1);
                break;
            case 'plane3':
                tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane.plane3);
                break;
            case 'plane4':
                tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane.plane4);
                break;
            case 'plane5':
                tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane.plane5);
                break;
            case 'plane6':
                tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane.plane6);
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