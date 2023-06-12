import { optBerry, optCommonBerry, optSuperBerry, optUnfoldBerry} from "./config three.js";

import { getRandomIndexFromArray, getTilesWithoutSnake } from "./support functions.js";


export class Berry{
    constructor(params, tileMap) {
        this.params = params;
        this.tileMap = tileMap;
        this.initBerry();
    }

    initBerry(){
        this.meshBerry = new THREE.Mesh(
            new THREE.BoxGeometry(optBerry.sizeX, optBerry.sizeY, optBerry.sizeZ),
        );
        this.meshBerry.name = "berry";
        this.meshBerry.castShadow = true;
        this.meshBerry.receiveShadow = true;
        this.params.scene.add(this.meshBerry);
    }

    updateBerry(tail){
        let color;
        if(Math.random() < optSuperBerry.probability){
            this.typeBerry = optSuperBerry.type;
            this.satiety = optSuperBerry.satiety;
            this.score = optSuperBerry.score;
            this.sound = optSuperBerry.sound;
            color = optSuperBerry.color;
        }
        else if(Math.random() < optUnfoldBerry.probability){
            this.typeBerry = optUnfoldBerry.type;
            this.satiety = optUnfoldBerry.satiety;
            this.score = optUnfoldBerry.score;
            this.sound = optUnfoldBerry.sound;
            color = optUnfoldBerry.color;
        }
        else{
            this.typeBerry = optCommonBerry.type;
            this.satiety = optCommonBerry.satiety;
            this.score = optCommonBerry.score;
            this.sound = optCommonBerry.sound;
            color = optCommonBerry.color;
        }

        this.meshBerry.material = new THREE.MeshStandardMaterial({ color: color});
        
        let tileWithoutSnake = getTilesWithoutSnake(tail, this.tileMap.plane);
        if(tileWithoutSnake.length === 0){
            console.log("Ладно, ты победил!");
            return false;
        }
        this.meshBerry.position.copy(tileWithoutSnake[getRandomIndexFromArray(tileWithoutSnake)]);
        return true;
    }

    deleteBerry(){
        this.params.scene.remove(this.meshBerry);
    }
}