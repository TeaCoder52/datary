import { IPC_CHANNELS } from '@datary/ipc'
import { ipcMain } from 'electron'
import Store from 'electron-store'

import { logger } from '../../utils/logger'

export interface ConnectionHistoryItem {
	id?: string
	name?: string
	host: string
	port: number
	user: string
	password?: string
	database: string
	type: 'postgresql' | 'mysql' | 'mariadb' | 'mssql'
	ssl?: boolean
	lastUsed?: number
}

const ENCRYPTION_KEY = 'datary-secret-key-123'
const store = new Store<{ history: ConnectionHistoryItem[] }>({
	name: 'connections',
	defaults: { history: [] },
	encryptionKey: ENCRYPTION_KEY
})

export function registerConnectionHandlers() {
	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.GET, () => {
		return store.get('history') ?? []
	})

	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.ADD, (_, connection: ConnectionHistoryItem) => {
		const history = store.get('history') ?? []
		const index = history.findIndex(
			c =>
				c.host === connection.host &&
				c.port === connection.port &&
				c.user === connection.user &&
				c.database === connection.database &&
				c.type === connection.type
		)

		const newConnection = { ...connection, lastUsed: Date.now() }

		if (index > -1) {
			history[index] = newConnection
		} else {
			history.unshift(newConnection)
		}

		store.set('history', history)
		return history
	})

	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.DELETE, (_, connection: ConnectionHistoryItem) => {
		const history = store.get('history') ?? []
		const filtered = history.filter(
			c =>
				!(
					c.host === connection.host &&
					c.port === connection.port &&
					c.user === connection.user &&
					c.database === connection.database &&
					c.type === connection.type
				)
		)
		store.set('history', filtered)
		return filtered
	})

	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.CLEAR, () => {
		store.set('history', [])
		return []
	})

	logger.info('Connection handlers registered')
}
