import type { DBConnectionConfig } from '@datary/db'
import { IPC_CHANNELS } from '@datary/ipc'
import { ipcRenderer } from 'electron'

export const dbApi = {
	connect: (config: DBConnectionConfig) => ipcRenderer.invoke(IPC_CHANNELS.DB_CONNECT, config),

	loadDatabases: () => ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_DATABASES),

	loadSchemas: (database: string) => ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_SCHEMAS, database),

	loadTables: (database: string, schema: string) =>
		ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_TABLES, database, schema),

	loadViews: (database: string, schema: string) =>
		ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_VIEWS, database, schema),

	loadColumns: (database: string, schema: string, table: string) =>
		ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_COLUMNS, database, schema, table),

	loadTableData: (schema: string, table: string) =>
		ipcRenderer.invoke(IPC_CHANNELS.DB_LOAD_DATA, { schema, table }),

	disconnect: () => ipcRenderer.invoke(IPC_CHANNELS.DB_DISCONNECT)
}
