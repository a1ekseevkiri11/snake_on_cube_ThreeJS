import { optVoxel } from './config voxel.js';

//only cube
export const optPlatform = {
	sizeX: 11 * optVoxel.sizeX,
	sizeY: 11 * optVoxel.sizeY,
	sizeZ: 11 * optVoxel.sizeZ,
	color: 0x1b222e,
}

export const optHeadSnake = {
	sizeX: 0.91 * optVoxel.sizeX,
	sizeY: 0.91 * optVoxel.sizeY,
	sizeZ: 0.91 * optVoxel.sizeZ,
	color: 0x80FFFF,
	spead: 0.1,
}

export const optTailSnake = {
	sizeX: 0.9 * optVoxel.sizeX,
	sizeY: 0.9 * optVoxel.sizeY,
	sizeZ: 0.9 * optVoxel.sizeZ,
	color: 0x80FF80,
	initLength: 2,
}

export const optBerry = {
	sizeX: 1 * optVoxel.sizeX,
	sizeY: 1 * optVoxel.sizeY,
	sizeZ: 1 * optVoxel.sizeZ,
}

export const optCommonBerry = {
	type: 'commonBerry',
	color: 0x8B0000,
	satiety: 1,
	score: 1,
	sound: CommonBerrySound,
}

export const optSuperBerry = {
	type: 'superBerry',
	probability: 0.1,
	color: 0xFF69B4,
	satiety: 5,
	score: 10,
	sound: SuperBerrySound,
}

export const optUnfoldBerry = {
	type: 'unfoldBerry',
	probability: 0.3,
	color: 0xFFE4B5,
	satiety: 1,
	score: 5,
	sound: UnfoldBerrySound,
}