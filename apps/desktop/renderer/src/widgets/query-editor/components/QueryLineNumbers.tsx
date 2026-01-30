interface QueryLineNumbersProps {
	lineNumbers: number[]
}

export function QueryLineNumbers({ lineNumbers }: QueryLineNumbersProps) {
	return (
		<div className="border-border bg-card text-muted-foreground flex flex-col border-r px-3 py-3 text-right text-xs leading-6 select-none">
			{lineNumbers.map(num => (
				<span key={num}>{num}</span>
			))}
		</div>
	)
}
