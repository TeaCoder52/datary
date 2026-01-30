import type { QueryResult } from './sql.types'

export interface DBConnectionConfig {
	host: string
	port: number
	user: string
	password: string
	database?: string
	connectionType: 'postgresql' | 'mysql'
}

export abstract class BaseAdapter {
	protected config: DBConnectionConfig

	public constructor(config: DBConnectionConfig) {
		this.config = config
	}

	public abstract connect(): Promise<void>

	public abstract disconnect(): Promise<void>

	public abstract query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>

	public async testConnection(): Promise<boolean> {
		try {
			await this.connect()
			await this.disconnect()

			return true
		} catch (err) {
			return false
		}
	}
}
