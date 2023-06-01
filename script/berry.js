import { optBerry, optPlatform } from "./config three.js";

export const berry = (() => {

    class Berry{
        constructor(params) {
            this.params = params;
            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                (optPlatform.sizeZ + optBerry.sizeZ) / 2
            );
            this.mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optBerry.sizeX, optBerry.sizeY, optBerry.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optBerry.color
                }),
            );
            this.mesh.position.copy(this.position);
            params.scene.add(this.mesh);
        }

        newPositionBerry(){
            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                (optPlatform.sizeZ + optBerry.sizeZ) / 2
            );
            this.mesh.position.copy(this.position);
        }
    }
    return{
        Berry: Berry,
    }
})();