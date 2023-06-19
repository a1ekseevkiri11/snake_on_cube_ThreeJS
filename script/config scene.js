import { optPlatform } from './config geometry.js';
import { zCoordinatCamera } from './support functions.js';


export const optCamera = {
	x: 0,
	y: 0,
	z: optPlatform.sizeZ * zCoordinatCamera(),
	fov: 65,
	near: 0.5,
	far: 1000,
}

export const optScene = {
	x: 0,
	y: 0,
	z: 0,
	color: 0x008B8B,
	angleRotation: Math.PI / (4 * optPlatform.sizeX),
}


export const optDirLight = {
	x: 0,
	y: 0,
	z: 3 * optPlatform.sizeZ,
	color: 0xffffff,
	inten: 1,
}

export const optAmbLight = {
	x: 0,
	y: 0,
	z: 0,
	color: 0xffffff,
	inten: 0.5,
}