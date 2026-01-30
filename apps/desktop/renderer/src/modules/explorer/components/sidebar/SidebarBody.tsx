import { Layers } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { SchemaTree } from '@/widgets/schema-tree/components/schema-tree'

interface Props {
	collapsed: boolean
	database?: string
	selectedTable?: string
	onSelectTable: (tableName: string) => void
	className?: string
}

export function SidebarBody({
	collapsed,
	database,
	selectedTable,
	onSelectTable,
	className
}: Props) {
	if (collapsed) {
		return (
			<div
				className={cn(
					'border-sidebar-border flex items-center justify-center border-b py-2.5',
					className
				)}
			>
				<Tooltip>
					<TooltipTrigger asChild>
						<button className="text-muted-foreground hover:bg-sidebar-accent hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md">
							<Layers className="h-4 w-4" />
						</button>
					</TooltipTrigger>
					<TooltipContent side="right">Schemas</TooltipContent>
				</Tooltip>
			</div>
		)
	}

	return (
		<SchemaTree
			database={database}
			selectedTable={selectedTable}
			onSelectTable={onSelectTable}
		/>
	)
}
