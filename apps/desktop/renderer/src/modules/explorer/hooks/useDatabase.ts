import { useCallback, useEffect } from 'react'

import { useTableDataStore } from '@/app/store/table-data.store'
import { useConnectionStore } from '@/entities/connection/model/connection.store'

export function useDatabase() {
	const connection = useConnectionStore(s => s.connection)

	const selectedDatabase = useConnectionStore(s => s.selectedDatabase)
	const setSelectedDatabase = useConnectionStore(s => s.setSelectedDatabase)

	const databases = useConnectionStore(s => s.databases)
	const setDatabases = useConnectionStore(s => s.setDatabases)

	const resetTables = useTableDataStore(s => s.reset)

	const connect = useCallback(
		async (dbName?: string) => {
			if (!connection) return

			await window.datary.db.connect({
				...connection,
				database: dbName ?? connection.database ?? 'postgres'
			})

			const dbs = await window.datary.db.loadDatabases()

			setDatabases(dbs.map(d => d.name))
			setSelectedDatabase(dbName ?? connection.database ?? dbs[0]?.name)
		},
		[connection]
	)

	useEffect(() => {
		if (!connection) return
		connect()
	}, [connection])

	const selectDatabase = async (dbName: string) => {
		resetTables()

		await connect(dbName)
	}

	const refresh = async () => {
		if (!connection) return

		resetTables()

		await window.datary.db.connect({
			...connection,
			database: selectedDatabase
		})

		const dbs = await window.datary.db.loadDatabases()
		setDatabases(dbs.map(d => d.name))
	}

	return {
		selectedDatabase,
		databases,
		selectDatabase,
		refresh
	}
}
