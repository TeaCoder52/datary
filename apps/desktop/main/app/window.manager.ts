import { BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'

import { DEV_SERVER_URL, isDev } from '../config/env'
import { getPreloadPath, getRendererIndex } from '../config/paths'

import { mainWindow } from './app.state'

export function createMainWindow() {
	const preloadPath = getPreloadPath(__dirname)

	console.log('preloadPath: ', preloadPath)

	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		show: false,
		title: 'Datary',
		webPreferences: {
			preload: preloadPath,
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false
		}
	})

	Menu.setApplicationMenu(null)
	mainWindow.set(win)

	if (isDev && DEV_SERVER_URL) {
		win.loadURL(DEV_SERVER_URL)
	} else {
		win.loadFile(getRendererIndex(__dirname))
	}

	win.once('ready-to-show', () => win.show())

	setupWindowIpc(win)
}

function setupWindowIpc(win: BrowserWindow) {
	ipcMain.on('window:minimize', () => win.minimize())
	ipcMain.on('window:toggle-maximize', () =>
		win.isMaximized() ? win.unmaximize() : win.maximize()
	)
	ipcMain.on('window:close', () => win.close())
}
