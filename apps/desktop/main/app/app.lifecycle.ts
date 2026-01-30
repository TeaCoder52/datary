import { app, BrowserWindow } from 'electron'

import { createMainWindow } from './window.manager'

export function registerAppLifecycle() {
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit()
	})

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
	})
}
