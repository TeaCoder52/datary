interface ResultScalarProps {
	value: string | number | null
}

export function ResultScalar({ value }: ResultScalarProps) {
	return (
		<div className="flex h-full items-center justify-center p-8">
			<div className="text-center">
				<p className="text-foreground text-4xl font-bold">{String(value)}</p>
				<p className="text-muted-foreground mt-2 text-sm">Query returned a single value</p>
			</div>
		</div>
	)
}
