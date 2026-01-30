import { BrowserWindow } from 'electron'

let _mainWindow: BrowserWindow | null = null

export const mainWindow = {
	get: () => _mainWindow,
	set: (win: BrowserWindow | null) => {
		_mainWindow = win
	}
}
