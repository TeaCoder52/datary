import mysql from 'mysql2/promise'

import type { QueryResult } from '../shared/sql.types'

import type { MysqlConnectionConfig } from './mysql.types'

export class MysqlClient {
	private connection: mysql.Connection | null = null

	constructor(private config: MysqlConnectionConfig) {}

	public async connect() {
		const sslConfig = typeof this.config.ssl === 'object' ? this.config.ssl : undefined

		this.connection = await mysql.createConnection({
			host: this.config.host,
			port: this.config.port,
			user: this.config.user,
			password: this.config.password,
			database: this.config.database,
			ssl: sslConfig
		})
	}

	public async disconnect() {
		if (this.connection) {
			await this.connection.end()
			this.connection = null
		}
	}

	public async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		if (!this.connection) throw new Error('MySQL client is not connected')

		const [rows] = await this.connection.execute(sql, params)
		return { rows: rows as T[], rowCount: Array.isArray(rows) ? rows.length : 0 }
	}
}
