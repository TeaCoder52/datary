import { useMemo } from 'react'

import type { Tab } from '../../types/explorer.types'

import { useTableDataStore } from '@/app/store/table-data.store'
import { DataGrid } from '@/widgets/data-grid/DataGrid'
import { QueryEditor } from '@/widgets/query-editor/components/QueryEditor'

interface Props {
	tab: Tab
}

export function TabContent({ tab }: Props) {
	const tableMap = useTableDataStore(s => s.tables)

	if (tab.type === 'query') {
		return <QueryEditor />
	}

	const key = `public.${tab.name}`
	const data = tableMap[key]

	if (!data) {
		return (
			<div className="text-muted-foreground flex h-full items-center justify-center">
				Loading table…
			</div>
		)
	}

	const gridData = useMemo(() => {
		return {
			rows: data.rows,
			columns: data.columns.map(col => ({
				name: col.name,
				type: col.type
			}))
		}
	}, [data])

	return <DataGrid data={gridData} rowHeight={32} renderer="dom" editable />
}
