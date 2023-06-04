const optVoxel = {
	sizeX: 1,
	sizeY: 1,
	sizeZ: 1,
}

export const optCamera = {
	x: 20,
	y: 20,
	z: 25,
	fov: 65,
	near: 0.1,
	far: 1000,
}

export const optScene = {
	x: 0,
	y: 0,
	z: 0,
	color: 0xDDDDDD,
}


export const optHeadSnake = {
	sizeX: 1 * optVoxel.sizeX,
	sizeY: 1 * optVoxel.sizeY,
	sizeZ: 1 * optVoxel.sizeZ,
	color: 0x80FFFF,
	spead: 0.1,
}

export const optTailSnake = {
	sizeX: 1 * optVoxel.sizeX,
	sizeY: 1 * optVoxel.sizeY,
	sizeZ: 1 * optVoxel.sizeZ,
	color: 0x80FF80,
}

export const optBerry = {
	sizeX: 1 * optVoxel.sizeX,
	sizeY: 1 * optVoxel.sizeY,
	sizeZ: 1 * optVoxel.sizeZ,
	color: 0x8B0000,
	satiety: 1,
}

//only cube
export const optPlatform = {
	sizeX: 31 * optVoxel.sizeX,
	sizeY: 31 * optVoxel.sizeY,
	sizeZ: 31 * optVoxel.sizeZ,
	color: 0x1b222e,
}

export const optDirLight = {
	x: 20,
	y: 100,
	z: 10,
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