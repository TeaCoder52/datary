import path from 'path'

export const getPreloadPath = (dirname: string) => {
	return path.join(dirname, '../../preload/index.js')
}

export const getRendererIndex = (dirname: string) =>
	path.join(dirname, '../../../renderer/dist/index.html')
