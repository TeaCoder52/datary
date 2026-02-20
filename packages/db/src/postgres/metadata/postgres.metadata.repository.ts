import format from 'pg-format'

import { DBQueryError } from '../../shared/errors'
import type { QueryResult } from '../../shared/sql.types'
import type { PostgresClient } from '../adapter/postgres.client'

import { mapTableSchema } from './postgres.metadata.mapper'
import { COLUMNS_QUERY, DATABASES_QUERY, SCHEMAS_QUERY, TABLES_QUERY, VIEWS_QUERY } from './queries'

export type DatabaseMeta = {
	name: string
}

export type SchemaMeta = {
	name: string
}

export type TableMeta = {
	name: string
	type: 'table' | 'view'
}

export type ColumnMeta = {
	columnName: string
	type: string
	nullable: boolean
	enumValues?: string[]
}

export class PostgresMetadataRepository {
	public constructor(private readonly client: PostgresClient) {}

	public async loadDatabases(): Promise<DatabaseMeta[]> {
		const res = await this.safeQuery<{ datname: string }>(DATABASES_QUERY)

		return res.rows.map(row => ({
			name: row.datname
		}))
	}

	public async loadSchemas(): Promise<SchemaMeta[]> {
		const res = await this.safeQuery<{ schema_name: string }>(SCHEMAS_QUERY)

		return res.rows.map(row => ({
			name: row.schema_name
		}))
	}

	public async loadTables(schema: string): Promise<TableMeta[]> {
		const res = await this.safeQuery<{ table_name: string }>(TABLES_QUERY, [schema])

		return res.rows.map(row => ({
			name: row.table_name,
			type: 'table'
		}))
	}

	public async loadViews(schema: string): Promise<TableMeta[]> {
		const res = await this.safeQuery<{ table_name: string }>(VIEWS_QUERY, [schema])

		return res.rows.map(row => ({
			name: row.table_name,
			type: 'view'
		}))
	}

	public async loadColumns(schema: string, table: string): Promise<ColumnMeta[]> {
		const rows = await this.safeQuery(COLUMNS_QUERY, [schema, table])
		const columns = mapTableSchema(rows.rows)

		for (const col of columns) {
			if (col.type === 'USER-DEFINED') {
				const enumValues = await this.loadEnumValues(schema, col.type)
				if (enumValues) {
					col.enumValues = enumValues
					col.type = `enum(${enumValues.join(', ')})`
				}
			}
		}

		return columns
	}

	public async loadTableData(schema: string, table: string, limit = 100, offset = 0) {
		const sql = format('SELECT * FROM %I.%I LIMIT %L OFFSET %L', schema, table, limit, offset)

		const result = await this.safeQuery(sql)

		const columns = Object.keys(result.rows[0] ?? {}).map(name => ({
			name,
			type: 'unknown'
		}))

		return {
			columns,
			rows: result.rows
		}
	}

	private async loadEnumValues(
		schema: string,
		columnType: string
	): Promise<string[] | undefined> {
		const res = await this.safeQuery<{ enumlabel: string }>(
			`SELECT enumlabel
     FROM pg_type t
     JOIN pg_enum e ON t.oid = e.enumtypid
     JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
     WHERE n.nspname = $1
       AND t.typname = $2`,
			[schema, columnType]
		)

		if (res.rows.length === 0) return undefined
		return res.rows.map(r => r.enumlabel)
	}

	private async safeQuery<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		try {
			return await this.client.query<T>(sql, params)
		} catch (err) {
			throw new DBQueryError(`Postgres metadata query failed: ${(err as Error).message}`)
		}
	}
}
