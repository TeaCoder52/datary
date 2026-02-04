import { DBQueryError } from '../../shared/errors'
import type { QueryResult } from '../../shared/sql.types'
import { MssqlClient } from '../adapter/mssql.client'

import { mapTableSchema } from './mssql.metadata.mapper'
import { COLUMNS_QUERY, DATABASES_QUERY, SCHEMAS_QUERY, TABLES_QUERY, VIEWS_QUERY } from './queries'

export class MssqlMetadataRepository {
	constructor(private readonly client: MssqlClient) {}

	public async loadDatabases() {
		const res = await this.safeQuery<{ name: string }>(DATABASES_QUERY)
		return res.rows
	}

	public async loadSchemas() {
		const res = await this.safeQuery(SCHEMAS_QUERY)
		return res.rows
	}

	public async loadTables(schema?: string) {
		if (!schema) return []

		const res = await this.safeQuery<{ TABLE_NAME: string }>(TABLES_QUERY, [schema])

		return res.rows.map(r => ({
			name: r.TABLE_NAME,
			type: 'table'
		}))
	}

	public async loadViews(schema?: string) {
		if (!schema) return []

		const res = await this.safeQuery<{ TABLE_NAME: string }>(VIEWS_QUERY, [schema])

		return res.rows.map(r => ({
			name: r.TABLE_NAME,
			type: 'view'
		}))
	}

	public async loadColumns(schema: string, table: string) {
		const res = await this.safeQuery(COLUMNS_QUERY, [schema, table])
		return mapTableSchema(res.rows)
	}

	private async safeQuery<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		try {
			return await this.client.query<T>(sql, params)
		} catch (err) {
			throw new DBQueryError(`MSSQL metadata query failed: ${(err as Error).message}`)
		}
	}
}
