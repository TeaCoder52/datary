import { Play, Square, Trash2 } from 'lucide-react'

import { Button } from '@/shared/ui/button'

interface QueryToolbarProps {
	query: string
	isRunning: boolean
	onRun: () => void
	onClear: () => void
}

export function QueryToolbar({ query, isRunning, onRun, onClear }: QueryToolbarProps) {
	return (
		<div className="border-border flex items-center justify-between border-b px-4 py-2">
			<div className="flex items-center gap-2">
				<Button
					size="sm"
					onClick={onRun}
					disabled={isRunning || !query.trim()}
					className="gap-2"
				>
					{isRunning ? (
						<>
							<Square className="h-4 w-4" /> Running...
						</>
					) : (
						<>
							<Play className="h-4 w-4" /> Run Query
						</>
					)}
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={onClear}
					className="gap-2 bg-transparent"
				>
					<Trash2 className="h-4 w-4" /> Clear
				</Button>
			</div>

			<div className="text-muted-foreground flex items-center gap-4 text-xs">
				<span className="flex items-center gap-1.5">
					<kbd className="border-border bg-secondary rounded border px-1.5 py-0.5">
						Ctrl
					</kbd>
					<span>+</span>
					<kbd className="border-border bg-secondary rounded border px-1.5 py-0.5">
						Enter
					</kbd>
					<span className="ml-1">to run</span>
				</span>
			</div>
		</div>
	)
}
