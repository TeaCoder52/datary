import { app } from 'electron'

import { registerAppLifecycle } from './app/app.lifecycle'
import { createMainWindow } from './app/window.manager'
import { registerIpc } from './ipc/register.ipc'

app.commandLine.appendSwitch('disable-background-timer-throttling')
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('disable-extensions')
app.commandLine.appendSwitch('disable-breakpad')
app.commandLine.appendSwitch(
	'disable-features',
	'OutOfBlinkCors,BackForwardCache,TranslateUI,BlinkGenPropertyTrees'
)
app.commandLine.appendSwitch('force-color-profile', 'srgb')

registerAppLifecycle()

app.whenReady().then(async () => {
	createMainWindow()

	await registerIpc()
})
