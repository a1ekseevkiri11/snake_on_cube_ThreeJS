import { optBerry, optPlatform } from "./config three.js";

export const berry = (() => {

    class Berry{
        constructor(params) {
            this.params = params;
            this.satiety = 1;
            this.position = new THREE.Vector3(5, 5, (optPlatform.sizeZ + optBerry.sizeZ) / 2);
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

        //переписать
        newPosition(){
            this.position = new THREE.Vector3(
                Math.round(Math.random() * optPlatform.sizeX - optPlatform.sizeX / 2),
                Math.round(Math.random() * optPlatform.sizeY - optPlatform.sizeY / 2), 
                (optPlatform.sizeZ + optBerry.sizeZ) / 2
            );
            this.mesh.position.copy(this.position);
        }

        //переписать
        updateBerry(tail){
            if(tail.length > optPlatform.sizeX * optPlatform.sizeY){
                console.log("Ладно ты победил");
                return;
            }
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