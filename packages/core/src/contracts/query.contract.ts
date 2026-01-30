import type { QueryResult, QueryType } from '../domain/query/query.types'

export interface ExecuteQueryContract {
	sql: string
	params?: any[]
}

export interface QueryResponseContract<T = any> {
	type: QueryType
	result: QueryResult<T>
}
