// export function randomInt(min, max){

// }


export function rotation(object, directionRotation){
    switch(directionRotation){
        case 'up':
            [object.position.x, object.position.z] = [object.position.z, -object.position.x]
            break;
        case 'down':
            [object.position.x, object.position.z] = [-object.position.z, object.position.x]
            break;
        case 'left':
            [object.position.y, object.position.z] = [-object.position.z, object.position.y]
            break;
        case 'right':
            [object.position.y, object.position.z] = [object.position.z, -object.position.y]
            break;
    }
    object.mesh.position.copy(object.position);
}