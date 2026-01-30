import { DatabaseMetadataContract } from '../../contracts/metadata.contract'
import type { QueryResult } from '../../domain/query/query.types'

export interface DbAdapterPort {
	connect(): Promise<void>
	disconnect(): Promise<void>
	query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>
	testConnection?(): Promise<boolean>
}
