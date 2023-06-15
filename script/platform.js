import { optPlatform } from "./config geometry.js";

export class Platform{
    constructor(params){
        this.params = params;
        this.intPlatform();
    }

    intPlatform(){
        this.platformMesh = new THREE.Mesh(
            new THREE.BoxGeometry(optPlatform.sizeX, optPlatform.sizeY, optPlatform.sizeZ),
            new THREE.MeshLambertMaterial({
                color: optPlatform.color
            }),
        );
        this.platformMesh.position.set(0, 0, 0);
        this.params.scene.add(this.platformMesh);
    }
}