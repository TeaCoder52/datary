import { SCHEMAS_QUERY } from '../postgres/queries'
import { DBQueryError } from '../shared/errors'
import type { QueryResult } from '../shared/sql.types'

import { MysqlClient } from './mysql.client'
import { mapTableSchema } from './mysql.mapper'
import { COLUMNS_QUERY, DATABASES_QUERY, TABLES_QUERY, VIEWS_QUERY } from './queries'

export class MysqlMetadataRepository {
	constructor(private client: MysqlClient) {}

	public async loadDatabases(): Promise<{ name: string }[]> {
		const res = await this.safeQuery<{ SCHEMA_NAME: string }>(DATABASES_QUERY)

		return res.rows.map(row => ({ name: row.SCHEMA_NAME }))
	}

	public async loadSchemas() {
		const res = await this.safeQuery(SCHEMAS_QUERY)

		return res.rows
	}

	public async loadTables(schema?: string) {
		if (!schema) return []

		const res = await this.safeQuery<{ table_name: string }>(TABLES_QUERY, [schema])

		console.log('RES TABLES: ', res.rows)

		return res.rows.map(row => ({
			name: row.table_name,
			type: 'table'
		}))
	}

	public async loadViews(schema?: string) {
		if (!schema) return []

		const res = await this.safeQuery<{ table_name: string }>(VIEWS_QUERY, [schema])

		return res.rows.map(row => ({
			name: row.table_name,
			type: 'view'
		}))
	}

	public async loadColumns(schema: string, table: string) {
		const res = await this.safeQuery(COLUMNS_QUERY, [schema, table])

		return mapTableSchema(res.rows)
	}

	private async safeQuery<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		try {
			const result = await this.client.query<T>(sql, params)

			return result
		} catch (err) {
			throw new DBQueryError(`MySQL metadata query failed: ${(err as Error).message}`)
		}
	}
}
