import { SidebarBody } from './SidebarBody'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarResizer } from './SidebarResizer'
import { cn } from '@/shared/lib/utils'

interface Props {
	collapsed: boolean
	width: number
	isResizing?: boolean
	databases: string[]
	selectedDatabase?: string
	selectedTable?: string
	onToggle: () => void
	onStartResize: () => void
	onSelectDatabase: (db: string) => Promise<void> | void
	onSelectTable: (tableName: string) => void
	onNewQuery?: () => void
	className?: string
}

export function ExplorerSidebar({
	collapsed,
	width,
	isResizing,
	databases,
	selectedDatabase,
	selectedTable,
	onToggle,
	onStartResize,
	onSelectDatabase,
	onSelectTable,
	onNewQuery,
	className
}: Props) {
	return (
		<aside
			className={cn(
				'border-border bg-sidebar relative flex h-full flex-col border-r transition-[width] duration-200 ease-out',
				isResizing && 'transition-none',
				className
			)}
			style={{ width }}
		>
			<SidebarHeader
				collapsed={collapsed}
				selectedDatabase={selectedDatabase}
				databases={databases}
				onToggle={onToggle}
				onSelectDatabase={onSelectDatabase}
				onNewQuery={onNewQuery}
			/>

			{!collapsed && (
				<div className="flex-1 overflow-y-auto px-2">
					<SidebarBody
						collapsed={collapsed}
						database={selectedDatabase}
						selectedTable={selectedTable}
						onSelectTable={onSelectTable}
					/>
				</div>
			)}

			<SidebarFooter collapsed={collapsed} database={selectedDatabase} />

			{!collapsed && <SidebarResizer isResizing={isResizing} onMouseDown={onStartResize} />}
		</aside>
	)
}
