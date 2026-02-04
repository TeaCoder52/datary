import { LogOut, RefreshCw, Terminal } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface ExplorerHeaderProps {
	isRefreshing: boolean
	onRefresh: () => void
	onOpenQuery: () => void
	onDisconnect: () => void
}

export function ExplorerHeader({
	isRefreshing,
	onRefresh,
	onOpenQuery,
	onDisconnect
}: ExplorerHeaderProps) {
	return (
		<header className="border-border flex items-center justify-between border-b px-4 py-2">
			<div className="flex items-center gap-4">
				<span className="text-foreground text-sm font-medium">Datary</span>
			</div>

			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					className="gap-2 bg-transparent"
					onClick={onRefresh}
					disabled={isRefreshing}
				>
					<RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
					{isRefreshing ? 'Refreshing' : 'Refresh'}
				</Button>

				<Button
					variant="outline"
					size="sm"
					className="gap-2 bg-transparent"
					onClick={onOpenQuery}
				>
					<Terminal className="h-4 w-4" />
					Query
				</Button>

				<Button
					variant="ghost"
					size="icon"
					className="text-muted-foreground hover:text-foreground h-8 w-8"
					onClick={onDisconnect}
				>
					<LogOut className="h-4 w-4" />
					<span className="sr-only">Disconnect</span>
				</Button>
			</div>
		</header>
	)
}
