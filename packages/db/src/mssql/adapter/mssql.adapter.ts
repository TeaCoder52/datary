import type { DbAdapterPort, QueryResult } from '@datary/core'

import { DBQueryError } from '../../shared/errors'

import { MssqlClient } from './mssql.client'
import type { MssqlConnectionConfig } from './mssql.types'

export class MssqlAdapter implements DbAdapterPort {
	private client: MssqlClient | null = null

	public constructor(private readonly config: MssqlConnectionConfig) {}

	public async connect(): Promise<void> {
		if (!this.client) {
			this.client = new MssqlClient(this.config)

			await this.client.connect()
		}
	}

	public async disconnect(): Promise<void> {
		if (this.client) {
			await this.client.disconnect()

			this.client = null
		}
	}

	public async query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		if (!this.client) {
			throw new DBQueryError('MSSQL client is not connected')
		}

		return this.client.query<T>(sql, params)
	}
}
