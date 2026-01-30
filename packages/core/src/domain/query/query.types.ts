export type QueryType = 'read' | 'write' | 'schema' | 'dangerous'

export interface QueryResult<T = any> {
	rows: T[]
	rowCount: number
}
