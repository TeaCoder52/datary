import { ConnectionItem } from './ConnectionItem'
import type { DatabaseConnection } from '@/entities/connection/model/connection.types'

interface Props {
	connections: DatabaseConnection[]
	selectedId?: string
	isCollapsed: boolean
	onSelect: (c: DatabaseConnection) => void
	onDelete?: (id: string) => void
	onConnect?: (c: DatabaseConnection) => void
}

export function ConnectionList({
	connections,
	selectedId,
	isCollapsed,
	onSelect,
	onDelete,
	onConnect
}: Props) {
	return (
		<ul className="space-y-1">
			{connections.map(connection => (
				<li key={connection.id}>
					<ConnectionItem
						connection={connection}
						active={connection.id === selectedId}
						collapsed={isCollapsed}
						onSelect={() => onSelect(connection)}
						onConnect={() => onConnect?.(connection)}
						onDelete={() => onDelete?.(connection.id)}
					/>
				</li>
			))}
		</ul>
	)
}
