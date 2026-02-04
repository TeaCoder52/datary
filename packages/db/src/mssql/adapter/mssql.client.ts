import sql from 'mssql'

import type { QueryResult } from '../../shared/sql.types'

import type { MssqlConnectionConfig } from './mssql.types'

export class MssqlClient {
	private pool: sql.ConnectionPool | null = null

	public constructor(private readonly config: MssqlConnectionConfig) {}

	public async connect() {
		this.pool = await sql.connect({
			user: this.config.user,
			password: (this.config as any).password,
			server: this.config.host,
			port: this.config.port,
			database: this.config.database,
			options: {
				encrypt: this.config.ssl,
				trustServerCertificate: !this.config.ssl
			}
		})
	}

	public async disconnect() {
		if (this.pool) {
			await this.pool.close()

			this.pool = null
		}
	}

	public async query<T = any>(sqlText: string, params?: any[]): Promise<QueryResult<T>> {
		if (!this.pool) throw new Error('MSSQL client is not connected')

		const request = this.pool.request()

		params?.forEach((value, index) => {
			request.input(`p${index}`, value)
		})

		const result = await request.query(sqlText.replace(/\?/g, (_, i) => `@p${i}`))

		return {
			rows: result.recordset as T[],
			rowCount: result.rowsAffected?.[0] ?? 0
		}
	}
}
