import { Clock, Database, MoreVertical, Server, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { getConnectionIcon } from '../lib/get-connection-icon'

import type { DatabaseConnection } from '@/entities/connection/model/connection.types'
import { useContextMenu } from '@/shared/hooks/useContextMenu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

interface Props {
	connection: DatabaseConnection
	collapsed?: boolean
	onSelect: () => void
	onConnect?: () => void
	onDelete?: () => void
}

export function ConnectionItem({ connection, collapsed, onSelect, onConnect, onDelete }: Props) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const { open, onContextMenu, openAtButton, close } = useContextMenu()

	const handleDeleteConfirm = () => {
		onDelete?.()
		setIsDeleteDialogOpen(false)
		close()
	}

	if (collapsed) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						onClick={onSelect}
						className="hover:bg-sidebar-accent/50 flex w-full items-center justify-center rounded-md p-2"
					>
						{getConnectionIcon(connection.type)}
					</button>
				</TooltipTrigger>
				<TooltipContent side="right">{connection.name}</TooltipContent>
			</Tooltip>
		)
	}

	return (
		<>
			<DropdownMenu open={open} onOpenChange={val => !val && close()}>
				<DropdownMenuTrigger asChild>
					<button
						onClick={onSelect}
						onContextMenu={onContextMenu}
						className="group hover:bg-sidebar-accent/50 relative flex w-full gap-3 rounded-md px-3 py-2.5 text-left"
					>
						<div className="mt-0.5 shrink-0">{getConnectionIcon(connection.type)}</div>

						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{connection.name}</p>

							<div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
								<Server className="h-3 w-3" />
								{connection.host}:{connection.port}
							</div>

							{connection.lastConnected && (
								<div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
									<Clock className="h-3 w-3" />
									{connection.lastConnected}
								</div>
							)}
						</div>

						<Button
							size="icon"
							variant="ghost"
							onClick={e => {
								e.stopPropagation()
								openAtButton()
							}}
							className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
						>
							<MoreVertical className="h-3.5 w-3.5" />
						</Button>
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" side="right" className="w-28">
					<DropdownMenuItem
						onClick={() => {
							onConnect?.()
							close()
						}}
					>
						<Database className="mr-2 h-4 w-4" />
						Connect
					</DropdownMenuItem>
					<DropdownMenuItem
						className="text-destructive"
						onClick={() => {
							setIsDeleteDialogOpen(true)
						}}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Connection?</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete <b>{connection.name}</b>? <br />
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction variant="destructive" onClick={handleDeleteConfirm}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
