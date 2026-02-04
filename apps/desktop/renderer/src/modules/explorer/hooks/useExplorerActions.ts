import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useTableDataStore } from '@/app/store/table-data.store'

export function useExplorerActions(tabs: any, database: any) {
	const loadTable = useTableDataStore(s => s.loadTable)

	const [isRefreshing, setIsRefreshing] = useState(false)
	const navigate = useNavigate()

	const handleRefresh = async () => {
		if (isRefreshing) return

		setIsRefreshing(true)

		try {
			await database.refresh()

			for (const tab of tabs.tabs) {
				if (tab.type === 'table') {
					await loadTable('public', tab.name)
				}
			}
		} catch (e: any) {
			toast.error(`Refresh error: ${e.message}`)
			console.error(e)
		} finally {
			setIsRefreshing(false)
		}
	}

	const handleOpenQueryTab = () => tabs.addTab({ name: 'Query', type: 'query' })

	const handleSelectTable = async (tableName: string) => {
		await loadTable('public', tableName)

		tabs.addTab({ name: tableName, type: 'table' })
	}

	const handleDisconnect = async () => {
		await window.datary.db.disconnect()

		navigate('/')
	}

	return {
		isRefreshing,
		handleRefresh,
		handleOpenQueryTab,
		handleSelectTable,
		handleDisconnect
	}
}
