export function rotation(object, directionRotation){
    switch(directionRotation){
        case 'up':
            [object.position.y, object.position.z] = [object.position.z, -object.position.y]
            break;
        case 'down':
            [object.position.y, object.position.z] = [-object.position.z, object.position.y]
            break;
        case 'left':
            [object.position.x, object.position.z] = [-object.position.z, object.position.x]
            break;
        case 'right':
             [object.position.x, object.position.z] = [object.position.z, -object.position.x]
            break;
    }
    object.mesh.position.copy(object.position);
}


export function rotationPlane(plane, directionRotation){
    let newPlane = [];
    for(let i = 0; i < plane.length; i++){
        let newLine = [];
        for(let j = 0; j < plane[0].length; j++){
            switch(directionRotation){
                case 'up':
                    newLine[j] = new THREE.Vector3(plane[i][j].x, plane[i][j].z, -plane[i][j].y);
                    break;
                case 'down':
                    newLine[j] = new THREE.Vector3(plane[i][j].x, -plane[i][j].z, plane[i][j].y);
                    break;
                case 'left':
                    newLine[j] = new THREE.Vector3(-plane[i][j].z, plane[i][j].y, plane[i][j].x);
                    break;
                case 'right':
                    newLine[j] = new THREE.Vector3(plane[i][j].z, plane[i][j].y, -plane[i][j].x);
                    break;
            }
        }
        newPlane.push(newLine);
    }
    return newPlane;
}


export function getRandomIndexFromArray(array){
    return Math.floor(Math.random() * array.length);
}

//эта функция немного не работает, надо переписать!!!!!!
export function getTilesWithoutSnake(tail, plane){
    let tailArray = tail.slice();
    let arrayTileFromPlane = [];
    for(let i = 0; i < plane.length; i++){
        for(let j = 0; j < plane[0].length; j++){
            arrayTileFromPlane.push(plane[i][j]);
        }
    }
    for(let i = 0; i < arrayTileFromPlane.length; i++){
        for(let j = 0; j < tailArray.length; j++){
            if(arrayTileFromPlane[i].x === tailArray[j].position.x &&
                arrayTileFromPlane[i].y === tailArray[j].position.y &&
                arrayTileFromPlane[i].z === tailArray[j].position.z){
                arrayTileFromPlane.splice(i, 1);
                tailArray.splice(j, 1);

                i--;
                j--;
            }
            if(tailArray.length === 0 || arrayTileFromPlane.length === 0){
                break;
            }
        }
        if(tailArray.length === 0 || arrayTileFromPlane.length === 0){
            break;
        }
    }
    return arrayTileFromPlane;
}