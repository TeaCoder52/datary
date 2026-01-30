import {
	AlertCircle,
	Check,
	CheckCircle2,
	ChevronDown,
	ChevronUp,
	Clock,
	Copy,
	Download,
	Maximize2,
	Minimize2
} from 'lucide-react'

import { ResultScalar } from './ResultScalar'
import { ResultTable } from './ResultTable'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface QueryResultsPanelProps {
	result: any
	error: string | null
	isRunning: boolean
	isExpanded: boolean
	isMaximized: boolean
	panelHeight: number
	isResizing: boolean
	onToggleExpand: () => void
	onToggleMaximize: () => void
	onCopy: () => void
	onResizeMouseDown: (e: React.MouseEvent) => void
	copied: boolean
}

export function QueryResultsPanel({
	result,
	error,
	isRunning,
	isExpanded,
	isMaximized,
	panelHeight,
	isResizing,
	onToggleExpand,
	onToggleMaximize,
	onCopy,
	onResizeMouseDown,
	copied
}: QueryResultsPanelProps) {
	return (
		<div
			className={`border-border flex flex-col border-t ${isMaximized ? 'bg-background absolute inset-0 z-10' : ''}`}
			style={{ height: isMaximized ? '100%' : isExpanded ? panelHeight : 40 }}
		>
			{isExpanded && !isMaximized && (
				<div
					className={cn(
						'absulute top-0 right-0 h-1 cursor-row-resize transition-colors',
						'hover:bg-primary/10',
						isResizing && 'bg-primary/50'
					)}
					onMouseDown={onResizeMouseDown}
				/>
			)}

			<div className="border-border flex items-center justify-between border-b px-4 py-1.5">
				<div className="flex items-center gap-3">
					{!isMaximized && (
						<button
							type="button"
							onClick={() => onToggleExpand()}
							className="text-foreground hover:text-primary flex items-center gap-2 text-sm font-medium"
						>
							{isExpanded ? (
								<ChevronDown className="h-4 w-4" />
							) : (
								<ChevronUp className="h-4 w-4" />
							)}
							Results
						</button>
					)}

					{result && (
						<div className="text-muted-foreground flex items-center gap-3 text-xs">
							<span className="flex items-center gap-1">
								<CheckCircle2 className="text-chart-2 h-3.5 w-3.5" />
								{result.rowCount} row{result.rowCount !== 1 ? 's' : ''}
							</span>
							<span className="flex items-center gap-1">
								<Clock className="h-3.5 w-3.5" />
								{result.executionTime}ms
							</span>
						</div>
					)}

					{error && (
						<span className="text-destructive flex items-center gap-1 text-xs">
							<AlertCircle className="h-3.5 w-3.5" />
							Error
						</span>
					)}

					{isRunning && (
						<span className="text-muted-foreground text-xs">Executing...</span>
					)}
				</div>

				{isExpanded && result && (
					<div className="flex items-center gap-1">
						<Button variant="ghost" size="icon" className="h-7 w-7" onClick={onCopy}>
							{copied ? (
								<Check className="text-chart-2 h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
							<span className="sr-only">Copy results</span>
						</Button>
						<Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {}}>
							<Download className="h-4 w-4" />
							<span className="sr-only">Export results</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							onClick={onToggleMaximize}
						>
							{isMaximized ? (
								<Minimize2 className="h-4 w-4" />
							) : (
								<Maximize2 className="h-4 w-4" />
							)}
							<span className="sr-only">Toggle maximize</span>
						</Button>
					</div>
				)}
			</div>

			{isExpanded && (
				<div className="flex-1 overflow-auto">
					{isRunning && (
						<div className="flex h-full items-center justify-center">
							<div className="text-muted-foreground flex items-center gap-3">
								<div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
								<span className="text-sm">Executing query...</span>
							</div>
						</div>
					)}

					{error && (
						<div className="p-4">
							<div className="border-destructive/50 bg-destructive/10 rounded-lg border p-4">
								<div className="flex items-start gap-3">
									<AlertCircle className="text-destructive h-5 w-5 shrink-0" />
									<div>
										<p className="text-destructive font-medium">Query Error</p>
										<p className="text-muted-foreground mt-1 text-sm">
											{error}
										</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{result &&
						(result.isScalar ? (
							<ResultScalar value={result.scalarValue} />
						) : (
							<ResultTable result={result} />
						))}
				</div>
			)}
		</div>
	)
}
