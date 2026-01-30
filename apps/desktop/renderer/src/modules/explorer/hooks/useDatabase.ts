import { useEffect } from 'react'

import { useConnectionStore } from '@/entities/connection/model/connection.store'

export function useDatabase() {
	const connection = useConnectionStore(s => s.connection)

	const selectedDatabase = useConnectionStore(s => s.selectedDatabase)
	const setSelectedDatabase = useConnectionStore(s => s.setSelectedDatabase)

	const databases = useConnectionStore(s => s.databases)
	const setDatabases = useConnectionStore(s => s.setDatabases)

	useEffect(() => {
		if (!connection) return

		const init = async () => {
			await window.datary.db.connect({
				...connection,
				database: connection.database || 'postgres'
			})
			const dbs = await window.datary.db.loadDatabases()

			setDatabases(dbs.map(d => d.name))
			setSelectedDatabase(connection.database || dbs[0].name)
		}

		init()
	}, [connection])

	const selectDatabase = async (dbName: string) => {
		if (!connection) return

		await window.datary.db.connect({ ...connection, database: dbName })

		setSelectedDatabase(dbName)
	}

	return { selectedDatabase, databases, selectDatabase }
}
