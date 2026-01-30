import { useState } from 'react'

import { useTableDataStore } from '@/app/store/table-data.store'

export function useExplorerActions(tabs: any) {
	const loadTable = useTableDataStore(s => s.loadTable)
	const [isRefreshing, setIsRefreshing] = useState(false)

	const handleRefresh = async () => {
		setIsRefreshing(true)
		await new Promise(r => setTimeout(r, 800))
		setIsRefreshing(false)
	}

	const handleOpenQueryTab = () => tabs.addTab({ name: 'Query', type: 'query' })

	const handleSelectTable = async (tableName: string) => {
		await loadTable('public', tableName)

		tabs.addTab({ name: tableName, type: 'table' })
	}

	const handleDisconnect = () => {
		window.location.hash = '/'
	}

	return {
		isRefreshing,
		handleRefresh,
		handleOpenQueryTab,
		handleSelectTable,
		handleDisconnect
	}
}
