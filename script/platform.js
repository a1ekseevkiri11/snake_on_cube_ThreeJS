import { optPlatform} from "./config three.js";

export class Platform{
    constructor(params){
        this.params = params;
        this.intPlatform();
    }

    intPlatform(){
        this.platformMesh = new THREE.Mesh(
            new THREE.BoxGeometry(optPlatform.sizeX, optPlatform.sizeY, optPlatform.sizeZ),
            new THREE.MeshStandardMaterial({
                color: optPlatform.color
            }),
        );
        this.platformMesh.position.set(0, 0, 0);
        this.params.scene.add(this.platformMesh);
    }
}