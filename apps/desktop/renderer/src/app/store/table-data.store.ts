import toast from 'react-hot-toast'
import { create } from 'zustand'

import type { TableData } from '@/shared/types/table-data'

interface TableDataState {
	tables: Record<string, TableData>
	loading: boolean
	loadTable: (schema: string, table: string) => Promise<void>
	reset: () => void
}

export const useTableDataStore = create<TableDataState>((set, get) => ({
	tables: {},
	loading: false,

	loadTable: async (schema, table) => {
		const key = `${schema}.${table}`
		if (get().tables[key]) return

		if (!window.datary?.db) {
			toast.error('DB not ready')
			console.warn('DB not ready')
			return
		}

		set({ loading: true })

		const data = await window.datary.db.loadTableData(schema, table)

		set(state => ({
			tables: {
				...state.tables,
				[key]: data
			},
			loading: false
		}))
	},
	reset: () =>
		set({
			tables: {},
			loading: false
		})
}))
