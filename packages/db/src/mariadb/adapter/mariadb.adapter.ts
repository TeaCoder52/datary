import type { ConnectionProps, DbAdapterPort, QueryResult } from '@datary/core'

import { MysqlAdapter } from '../../mysql/adapter/mysql.adapter'

export class MariaDbAdapter implements DbAdapterPort {
	private adapter: MysqlAdapter

	public constructor(config: ConnectionProps) {
		this.adapter = new MysqlAdapter(config)
	}

	public connect(): Promise<void> {
		return this.adapter.connect()
	}

	public disconnect(): Promise<void> {
		return this.adapter.disconnect()
	}

	public query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		return this.adapter.query(sql, params)
	}
}
