import { Database, PanelLeftClose } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

interface Props {
	isCollapsed: boolean
	onToggle: () => void
}

export function SidebarHeader({ isCollapsed, onToggle }: Props) {
	return (
		<div className="border-sidebar-border flex items-center justify-between border-b px-4 py-4">
			{isCollapsed ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<button onClick={onToggle} className="text-primary hover:text-primary/80">
							<Database className="h-5 w-5" />
						</button>
					</TooltipTrigger>
					<TooltipContent side="right">Datary</TooltipContent>
				</Tooltip>
			) : (
				<>
					<div className="flex items-center gap-2">
						<Database className="text-primary h-5 w-5" />
						<span className="text-sm font-medium">Datary</span>
					</div>
					<Button size="icon" variant="ghost" onClick={onToggle} className="h-7 w-7">
						<PanelLeftClose className="h-4 w-4" />
					</Button>
				</>
			)}
		</div>
	)
}
