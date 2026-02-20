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

		try {
			const [columnsRaw, tableDataRaw] = await Promise.all([
				window.datary.db.loadColumns(schema, table),
				window.datary.db.loadTableData(schema, table)
			])

			// @ts-ignore
			const columns = columnsRaw.map(col => {
				let type = col.type
				if (col.enumValues && col.enumValues.length > 0) {
					type = `enum(${col.enumValues.join(', ')})`
				}
				return {
					columnName: col.columnName,
					type,
					nullable: col.nullable,
					enumValues: col.enumValues
				}
			})

			const tableData: TableData = {
				// @ts-ignore
				columns: columns.map(col => ({
					name: col.columnName,
					type: col.type,
					nullable: col.nullable
				})),
				rows: tableDataRaw.rows
			}

			set(state => ({
				tables: {
					...state.tables,
					[key]: tableData
				},
				loading: false
			}))
		} catch (err: any) {
			toast.error(`Failed to load table ${table}: ${err.message}`)
			console.error(err)
			set({ loading: false })
		}
	},
	reset: () =>
		set({
			tables: {},
			loading: false
		})
}))
