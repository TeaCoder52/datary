export type Row = Record<string, any>

export type QueryResult<T = any> = {
	rows: T[]
	rowCount: number
}
