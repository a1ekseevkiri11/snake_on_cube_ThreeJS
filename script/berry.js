import { optBerry, optPlatform } from "./config three";



export const berry = (() => {
    class Berry{
        constructor(params) {
            this.params = params;

            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                Math.round(Math.random() * optPlatform.sizeZ - optPlatform.sizeZ / 2)
            );

            this.mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(optBerry.sizeX, optBerry.sizeY, optBerry.sizeZ),
                new THREE.MeshStandardMaterial({
                    color: optBerry.color
                }),
            );
        }

        updateBerry(){
            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                Math.round(Math.random() * optPlatform.sizeZ - optPlatform.sizeZ / 2)
            );
        }
    }
    return{
        Berry: Berry,
    }
})();