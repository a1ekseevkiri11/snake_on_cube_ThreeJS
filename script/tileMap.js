import { optHeadSnake, optPlatform } from "./config three.js";
import { rotationPlane } from "./support functions.js";

export class TileMap{
    constructor(){
        this.plane = {
            plane1: [],
            plane2: [],
            plane3: [],
            plane4: [],
            plane5: [],
            plane6: []
        };
        this.initTileMap();
    }

    initTileMap(){
        for(let i = -(optPlatform.sizeX - optHeadSnake.sizeX) / 2; i <= (optPlatform.sizeX - optHeadSnake.sizeX) / 2; i++){
            let line = [];
            for(let j = -(optPlatform.sizeY - optHeadSnake.sizeY) / 2; j <= (optPlatform.sizeY - optHeadSnake.sizeY) / 2; j++){
                line.push(new THREE.Vector3(j, i, (optPlatform.sizeY  + optHeadSnake.sizeY) / 2));
            }
            this.plane.plane2.push(line);
        }
        this.plane.plane1 = rotationPlane(this.plane.plane2, 'up');
        this.plane.plane3 = rotationPlane(this.plane.plane2, 'right');
        this.plane.plane4 = rotationPlane(this.plane.plane2, 'left');
        this.plane.plane6 = rotationPlane(this.plane.plane2, 'down');
        this.plane.plane5 = rotationPlane(this.plane.plane6, 'down');
    }

    getPlane(object){
        if(object.position.y === this.plane.plane1[0][0].y){
            return 'plane1';
        }
        if(object.position.z === this.plane.plane2[0][0].z){
            return 'plane2';
        }
        if(object.position.x === this.plane.plane3[0][0].x){
            return 'plane3';
        }
        if(object.position.x === this.plane.plane4[0][0].x){
            return 'plane4';
        }
        if(object.position.z === this.plane.plane5[0][0].z){
            return 'plane5';
        }
        if(object.position.y === this.plane.plane6[0][0].y){
            return 'plane6';
        }
    }
}