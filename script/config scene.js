import { optPlatform } from './config geometry.js'

export const optCamera = {
	x: 0,
	y: 0,
	z: 20 + optPlatform.sizeZ,
	fov: 65,
	near: 0.1,
	far: 1000,
}

export const optScene = {
	x: 0,
	y: 0,
	z: 0,
	color: 0x008B8B,
}


export const optDirLight = {
	x: 0,
	y: 10,
	z: 60,
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