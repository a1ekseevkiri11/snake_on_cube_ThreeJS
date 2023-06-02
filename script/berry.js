import { optBerry, optPlatform } from "./config three.js";
import { rotation } from "./support functions.js";

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


        newPosition(){
            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                (optPlatform.sizeZ + optBerry.sizeZ) / 2
            );
            this.mesh.position.copy(this.position);
        }


        updateBerry(tail){
            let inTail = true;
            while(inTail){
              inTail = false;
              this.newPosition();
              for(let i = 0; i < tail.length; i++){
                if(tail[i].position.x === this.mesh.position.x &&
                  tail[i].position.y === this.mesh.position.y &&
                  tail[i].position.z === this.mesh.position.z){
                    inTail = true;
                    break;
                }
              }
            }
        }
    }
    return{
        Berry: Berry,
    }
})();