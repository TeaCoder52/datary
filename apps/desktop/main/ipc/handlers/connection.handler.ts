import { IPC_CHANNELS } from '@datary/ipc'
import { ipcMain } from 'electron'
import Store from 'electron-store'

import { buildCredentialId } from '../../services/credential/credential.utils'
import { CredentialVault } from '../../services/credential/credential.vault'
import { logger } from '../../utils/logger'

export interface ConnectionHistoryItem {
	id: string
	name?: string
	host: string
	port: number
	user: string
	database: string
	type: 'postgresql' | 'mysql' | 'mariadb' | 'mssql'
	ssl?: boolean
	lastUsed?: number
}

const store = new Store<{ history: ConnectionHistoryItem[] }>({
	name: 'connections',
	defaults: { history: [] }
})

const vault = new CredentialVault()

export function registerConnectionHandlers() {
	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.GET, () => {
		return store.get('history') ?? []
	})

	ipcMain.handle(
		IPC_CHANNELS.CONNECTIONS.ADD,
		async (_, connection: ConnectionHistoryItem & { password?: string }) => {
			const history = store.get('history') ?? []

			const credentialId = buildCredentialId(connection)

			if (connection.password) await vault.save(credentialId, connection.password)

			const index = history.findIndex(
				c =>
					c.host === connection.host &&
					c.port === connection.port &&
					c.user === connection.user &&
					c.database === connection.database &&
					c.type === connection.type
			)

			const newConnection = { ...connection, lastUsed: Date.now() }

			if (index > -1) history[index] = newConnection
			else history.unshift(newConnection)

			store.set('history', history)
			return history
		}
	)

	ipcMain.handle(
		IPC_CHANNELS.CONNECTIONS.DELETE,
		async (_, connection: ConnectionHistoryItem) => {
			if (connection.id) await vault.delete(connection.id)

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
		}
	)

	ipcMain.handle(IPC_CHANNELS.CONNECTIONS.CLEAR, () => {
		store.set('history', [])
		return []
	})

	logger.info('Connection handlers registered')
}
