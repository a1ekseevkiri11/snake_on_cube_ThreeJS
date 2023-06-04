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
        console.log(this.plane.plane1);
        console.log(this.plane.plane2);
        console.log(this.plane.plane3);
        console.log(this.plane.plane4);
        console.log(this.plane.plane5);
        console.log(this.plane.plane6);
    }
}