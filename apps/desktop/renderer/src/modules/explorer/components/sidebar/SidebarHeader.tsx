import { Database, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react'
import { useState } from 'react'

import { CreateDatabaseDialog } from '../CreateDatabaseDialog'

import { Button } from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

interface Props {
	collapsed: boolean
	selectedDatabase?: string
	databases: string[]
	onToggle: () => void
	onSelectDatabase: (db: string) => Promise<void> | void
	onNewQuery?: () => void
}

export function SidebarHeader({
	collapsed,
	selectedDatabase,
	databases,
	onToggle,
	onSelectDatabase,
	onNewQuery
}: Props) {
	const [createDialogOpen, setCreateDialogOpen] = useState(false)

	if (collapsed) {
		return (
			<div className="border-sidebar-border flex items-center justify-center border-b py-2.5">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggle}>
							<PanelLeftOpen className="h-4 w-4" />
							<span className="sr-only">Expand sidebar</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="right">Expand sidebar</TooltipContent>
				</Tooltip>
			</div>
		)
	}

	return (
		<div className="border-sidebar-border flex items-center gap-2 border-b px-3 py-2">
			<Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onToggle}>
				<PanelLeftClose className="h-4 w-4" />
				<span className="sr-only">Collapse sidebar</span>
			</Button>

			<Select value={selectedDatabase} onValueChange={val => onSelectDatabase(val)}>
				<SelectTrigger className="bg-sidebar h-8 min-w-0 flex-1 text-sm">
					<SelectValue>
						<span className="block truncate">{selectedDatabase}</span>
					</SelectValue>
				</SelectTrigger>

				<SelectContent position="popper">
					{databases.map(db => (
						<SelectItem key={db} value={db}>
							<div className="flex items-center gap-2">
								<Database className="text-primary h-4 w-4" />
								{db}
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon">
						<Plus className="h-4 w-4" />
						<span className="sr-only">New</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
						New Database
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onNewQuery}>New Query</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<CreateDatabaseDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
		</div>
	)
}
