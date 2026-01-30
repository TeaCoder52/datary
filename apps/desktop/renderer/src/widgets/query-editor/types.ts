// TODO: Совместить с типом из @datary/db
export interface QueryResult {
	columns: string[]
	rows: Record<string, unknown>[]
	rowCount: number
	executionTime: number
	isScalar?: boolean
	scalarValue?: unknown
}

export interface UseQueryEditorProps {
	initialQuery?: string
	onQueryChange?: (query: string) => void
}
