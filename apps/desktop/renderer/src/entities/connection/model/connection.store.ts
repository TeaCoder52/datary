import { create } from 'zustand'

import type { DatabaseConnection } from './connection.types'

interface ConnectionState {
	connection: (Omit<DatabaseConnection, 'id' | 'lastConnected'> & { password: string }) | null
	selectedDatabase: string
	databases: string[]
	setConnection: (
		conn: Omit<DatabaseConnection, 'id' | 'lastConnected'> & { password: string }
	) => void
	setSelectedDatabase: (db: string) => void
	setDatabases: (dbs: string[]) => void
	reset: () => void
}

export const useConnectionStore = create<ConnectionState>(set => ({
	connection: null,
	selectedDatabase: '',
	databases: [],
	setConnection: conn => set({ connection: conn, selectedDatabase: conn.database || '' }),
	setSelectedDatabase: db => set({ selectedDatabase: db }),
	setDatabases: dbs => set({ databases: dbs }),
	reset: () => set({ connection: null, selectedDatabase: '', databases: [] })
}))
