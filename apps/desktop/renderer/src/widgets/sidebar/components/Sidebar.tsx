import { useSidebarState } from '../hooks/useSidebarState'

import { ConnectionList } from './ConnectionList'
import { SidebarEmpty } from './SidebarEmpty'
import { SidebarFooter } from './SidebarFooter'
import { SidebarHeader } from './SidebarHeader'
import { SidebarResizer } from './SidebarResizer'
import type { DatabaseConnection } from '@/entities/connection/model/connection.types'
import { useHotkeys } from '@/shared/hooks/useHotKeys'
import { cn } from '@/shared/lib/utils'

interface SidebarProps {
	connections: DatabaseConnection[]
	selectedId?: string
	onSelect: (connection: DatabaseConnection) => void
	onDelete?: (id: string) => void
	onConnect?: (connection: DatabaseConnection) => void
}

export function Sidebar({ connections, selectedId, onSelect, onDelete, onConnect }: SidebarProps) {
	const sidebar = useSidebarState()

	useHotkeys({
		'ctrl+b': sidebar.toggleCollapse
	})

	return (
		<aside
			className={cn(
				'bg-sidebar border-sidebar-border relative flex h-full flex-col border-r transition-[width] duration-200',
				sidebar.isResizing && 'transition-none'
			)}
			style={{ width: sidebar.width }}
		>
			<SidebarHeader isCollapsed={sidebar.isCollapsed} onToggle={sidebar.toggleCollapse} />

			<nav className="flex-1 overflow-y-auto px-2 py-2">
				{connections.length === 0 && !sidebar.isCollapsed ? (
					<SidebarEmpty />
				) : (
					<ConnectionList
						connections={connections}
						selectedId={selectedId}
						isCollapsed={sidebar.isCollapsed}
						onSelect={onSelect}
						onDelete={onDelete}
						onConnect={onConnect}
					/>
				)}
			</nav>

			<SidebarFooter
				isCollapsed={sidebar.isCollapsed}
				count={connections.length}
				onToggle={sidebar.toggleCollapse}
			/>

			{!sidebar.isCollapsed && <SidebarResizer onMouseDown={sidebar.startResize} />}
		</aside>
	)
}
