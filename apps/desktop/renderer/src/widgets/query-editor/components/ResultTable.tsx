import { cn } from '@/shared/lib/utils'

interface ResultTableProps {
	result: {
		columns: string[]
		rows: Record<string, any>[]
	}
}

export function ResultTable({ result }: ResultTableProps) {
	return (
		<div className="min-w-full">
			<table className="w-full border-collapse text-sm">
				<thead className="bg-card sticky top-0">
					<tr>
						{result.columns.map((col, i) => (
							<th
								key={i}
								className="border-border text-foreground border-r border-b px-4 py-2 text-left font-medium"
							>
								{col}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.rows.map((row, rowIndex) => (
						<tr
							key={rowIndex}
							className={cn(
								'hover:bg-primary/5 transition-colors',
								rowIndex % 2 === 0 ? 'bg-background' : 'bg-card/50'
							)}
						>
							{result.columns.map((col, colIndex) => (
								<td
									key={colIndex}
									className="border-border text-foreground border-r border-b px-4 py-2"
								>
									{row[col] === null ? (
										<span className="text-muted-foreground italic">NULL</span>
									) : (
										String(row[col])
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
