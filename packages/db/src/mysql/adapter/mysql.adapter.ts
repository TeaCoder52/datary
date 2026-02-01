import type { ConnectionProps, DbAdapterPort, QueryResult } from '@datary/core'

import { DBQueryError } from '../../shared'

import { MysqlClient } from './mysql.client'

export class MysqlAdapter implements DbAdapterPort {
	private client: MysqlClient | null = null

	public constructor(private readonly config: ConnectionProps) {}

	public async connect(): Promise<void> {
		if (!this.client) {
			this.client = new MysqlClient(this.config)

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
		if (!this.client) throw new DBQueryError('MySQL client is not connected')

		return this.client.query<T>(sql, params)
	}
}
