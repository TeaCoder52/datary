import { IPC_CHANNELS } from '@datary/ipc'
import { ipcMain } from 'electron'

import { ConnectionManager } from '../../services/db/connection.manager'
import { logger } from '../../utils/logger'

const manager = new ConnectionManager()

export function registerMetadataHandlers() {
	ipcMain.handle(IPC_CHANNELS.DB_CONNECT, async (_, config) => {
		try {
			await manager.connect(config)

			return true
		} catch (err) {
			logger.error('DB_CONNECT failed', err)
			throw err
		}
	})

	ipcMain.handle(IPC_CHANNELS.DB_GET_ADAPTER_TYPE, async () => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.getAdapterType()
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_DATABASES, async () => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadDatabases()
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_SCHEMAS, async (_e, database: string) => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadSchemas()
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_TABLES, async (_e, database: string, schema: string) => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadTables(schema)
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_VIEWS, async (_e, database: string, schema: string) => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadViews(schema)
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_COLUMNS, async (_e, schema: string, table: string) => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadColumns(schema, table)
	})

	ipcMain.handle(IPC_CHANNELS.DB_LOAD_DATA, async (_e, { schema, table }) => {
		if (!manager.isConnected()) throw new Error('DB not connected')

		return manager.loadTableData(schema, table)
	})

	ipcMain.handle(IPC_CHANNELS.DB_DISCONNECT, async () => {
		await manager.disconnect()

		return true
	})

	logger.info('Metadata handlers registered')
}
