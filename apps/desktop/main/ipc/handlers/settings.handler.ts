import { IPC_CHANNELS } from '@datary/ipc'
import { ipcMain } from 'electron'
import Store from 'electron-store'

import { logger } from '../../utils/logger'

export interface Settings {
	theme: 'light' | 'dark' | 'system'
	language: string
	sidebarPosition: 'left' | 'right'
	sidebarAutoCollapse: boolean
	sidebarDefaultWidth: number
	confirmOnCellEdit: boolean
	showRowNumbers: boolean
	defaultPageSize: number
	developerMode: boolean
	enableExperimentalFeatures: boolean
	queryTimeout: number
	maxRowsDisplay: number
}

const store = new Store<Settings>({
	name: 'settings',
	defaults: {
		theme: 'system',
		language: 'en',
		sidebarPosition: 'left',
		sidebarAutoCollapse: false,
		sidebarDefaultWidth: 280,
		confirmOnCellEdit: true,
		showRowNumbers: true,
		defaultPageSize: 50,
		developerMode: false,
		enableExperimentalFeatures: false,
		queryTimeout: 30_000,
		maxRowsDisplay: 1_000
	}
})

export function registerSettingsHandlers() {
	ipcMain.handle(IPC_CHANNELS.SETTINGS.GET, (_, key?: keyof Settings) => {
		if (!key) return store.store
		return store.get(key)
	})

	ipcMain.handle(IPC_CHANNELS.SETTINGS.SET, (_, key: keyof Settings, value: any) => {
		store.set(key, value)
		return true
	})

	ipcMain.handle(IPC_CHANNELS.SETTINGS.DELETE, (_, key: keyof Settings) => {
		store.delete(key)
		return true
	})

	ipcMain.handle(IPC_CHANNELS.SETTINGS.CLEAR, () => {
		store.clear()
		return true
	})

	logger.info('Settings handlers registered')
}
