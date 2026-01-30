import { app } from 'electron'

import { registerAppLifecycle } from './app/app.lifecycle'
import { createMainWindow } from './app/window.manager'
import { registerIpc } from './ipc/register.ipc'

app.whenReady().then(async () => {
	await registerIpc()

	createMainWindow()
	registerAppLifecycle()
})
