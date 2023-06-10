export function rotation(object, directionRotation){
    switch(directionRotation){
        case 'up':
            [object.position.y, object.position.z] = [object.position.z, -object.position.y];
            break;
        case 'down':
            [object.position.y, object.position.z] = [-object.position.z, object.position.y];
            break;
        case 'left':
            [object.position.x, object.position.z] = [-object.position.z, object.position.x];
            break;
        case 'right':
            [object.position.x, object.position.z] = [object.position.z, -object.position.x];
            break;
    }
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


export function getTilesWithoutSnake(tail, plane){
    let tailArray = tail.slice();
    let arrayTileFromPlane = [];

    for(let i = 0; i < plane.plane2.length; i++){
        for(let j = 0; j < plane.plane2[0].length; j++){
            arrayTileFromPlane.push(plane.plane2[i][j]);
        }
    }

    for(let i = 0; i < plane.plane1.length; i++){
        for(let j = 0; j < plane.plane1[0].length; j++){
            arrayTileFromPlane.push(plane.plane1[i][j]);
        }
    }

    for(let i = 0; i < plane.plane3.length; i++){
        for(let j = 0; j < plane.plane3[0].length; j++){
            arrayTileFromPlane.push(plane.plane3[i][j]);
        }
    }

    for(let i = 0; i < plane.plane4.length; i++){
        for(let j = 0; j < plane.plane4[0].length; j++){
            arrayTileFromPlane.push(plane.plane4[i][j]);
        }
    }

    for(let i = 0; i < plane.plane5.length; i++){
        for(let j = 0; j < plane.plane5[0].length; j++){
            arrayTileFromPlane.push(plane.plane5[i][j]);
        }
    }

    for(let i = 0; i < plane.plane6.length; i++){
        for(let j = 0; j < plane.plane6[0].length; j++){
            arrayTileFromPlane.push(plane.plane6[i][j]);
        }
    }

    for(let i = 0; i < arrayTileFromPlane.length; i++){
        let repeat = false;
        for(let j = 0; j < tailArray.length; j++){
            if(arrayTileFromPlane[i].x === tailArray[j].position.x &&
                arrayTileFromPlane[i].y === tailArray[j].position.y &&
                arrayTileFromPlane[i].z === tailArray[j].position.z){
                tailArray.splice(j, 1);
                repeat = true;
                j--;
                break;
            }
        }
        if(repeat){
            arrayTileFromPlane.splice(i, 1);
            i--;
        }
    }
    return arrayTileFromPlane;
}