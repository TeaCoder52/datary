import { PanelLeftOpen } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

interface Props {
	isCollapsed: boolean
	count: number
	onToggle: () => void
}

export function SidebarFooter({ isCollapsed, count, onToggle }: Props) {
	return (
		<div className="border-sidebar-border border-t px-4 py-3">
			{isCollapsed ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<button onClick={onToggle} className="flex w-full justify-center">
							<PanelLeftOpen className="h-4 w-4" />
						</button>
					</TooltipTrigger>
					<TooltipContent side="right">Expand sidebar</TooltipContent>
				</Tooltip>
			) : (
				<p className="text-muted-foreground text-xs">
					{count} saved connection{count !== 1 ? 's' : ''}
				</p>
			)}
		</div>
	)
}
