import { optPlatform} from "./config three.js";

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
        this.platformMesh.castShadow = true;
        this.platformMesh.receiveShadow = true;
        this.platformMesh.position.set(0, 0, 0);
        this.params.scene.add(this.platformMesh);
    }
}