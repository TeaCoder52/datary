import { countTablesAndViews } from '../../lib/utils'

import { cn } from '@/shared/lib/utils'
import { useSchemaTree } from '@/widgets/schema-tree/hooks/useSchemaTree'

interface Props {
	collapsed: boolean
	database?: string
	className?: string
}

export function SidebarFooter({ collapsed, database, className }: Props) {
	if (collapsed) {
		return <div className="border-sidebar-border border-t px-2 py-2.5"></div>
	}

	const { tree } = useSchemaTree(database)
	const { tables, views } = countTablesAndViews(tree)

	return (
		<div
			className={cn(
				'border-sidebar-border text-sidebar-muted shrink-0 border-t px-3 py-2 text-xs',
				className
			)}
		>
			{tables} tables {' • '} {views} views
		</div>
	)
}
