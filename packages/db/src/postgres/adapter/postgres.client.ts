import { Pool } from 'pg'

import type { PostgresConnectionConfig } from './postgres.types'

export class PostgresClient {
	private pool: Pool

	public constructor(config: PostgresConnectionConfig) {
		this.pool = new Pool({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
			database: config.database,
			ssl: config.ssl ?? false
		})
	}

	public async query<T = any>(
		sql: string,
		params?: any[]
	): Promise<{ rows: T[]; rowCount: number }> {
		const result = await this.pool.query(sql, params)

		return { rows: result.rows, rowCount: result.rowCount ?? 0 }
	}

	public async connect() {
		await this.pool.connect()
	}

	public async disconnect() {
		await this.pool.end()
	}
}
