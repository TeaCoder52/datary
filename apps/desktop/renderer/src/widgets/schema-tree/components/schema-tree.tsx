import { useSchemaTree } from '../hooks/useSchemaTree'

import { TreeNodeItem } from './tree-node-item'

interface SchemaTreeProps {
	database?: string
	selectedTable?: string
	onSelectTable: (tableName: string) => void
}

export function SchemaTree({ database, selectedTable, onSelectTable }: SchemaTreeProps) {
	const { tree, loading, error } = useSchemaTree(database)

	if (loading) return <div className="text-muted-foreground px-4 py-2 text-sm">Loading...</div>

	if (error) return <div className="text-destructive px-4 py-2 text-sm">{error}</div>

	if (!tree.length)
		return <div className="text-muted-foreground px-4 py-2 text-sm">No data found</div>

	return (
		<div className="custom-scrollbar max-h-full space-y-0.5 overflow-auto py-2">
			{tree.map(node => (
				<TreeNodeItem
					key={`${node.type}-${node.name}`}
					node={node}
					level={0}
					selectedTable={selectedTable}
					onSelectTable={onSelectTable}
				/>
			))}
		</div>
	)
}
