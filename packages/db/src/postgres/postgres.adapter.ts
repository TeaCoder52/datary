import type { DbAdapterPort, QueryResult } from '@datary/core'

import { DBConnectionConfig, DBQueryError } from '../shared'

import { PostgresClient } from './postgres.client'

export class PostgresAdapter implements DbAdapterPort {
	private client: PostgresClient | null = null

	public constructor(private readonly config: DBConnectionConfig) {}

	public async connect(): Promise<void> {
		if (!this.client) {
			this.client = new PostgresClient(this.config)

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
		if (!this.client) throw new DBQueryError('Postgres client is not connected')

		return await this.client.query<T>(sql, params)
	}

	public async testConnection(): Promise<boolean> {
		if (this.client) {
			try {
				await this.client.connect()
				await this.client.disconnect()

				return true
			} catch {
				return false
			}
		}

		const tempClient = new PostgresClient(this.config)

		try {
			await tempClient.connect()
			await tempClient.disconnect()

			return true
		} catch {
			return false
		}
	}
}
