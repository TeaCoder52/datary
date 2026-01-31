import type { DbAdapterPort } from '@datary/core'
import { type DBConnectionConfig, MysqlAdapter, PostgresAdapter } from '@datary/db'

type AdapterConstructor = new (config: DBConnectionConfig) => DbAdapterPort

const adapters: Record<string, AdapterConstructor> = {
	postgresql: PostgresAdapter,
	mysql: MysqlAdapter
}

export function getAdapter(config: DBConnectionConfig): DbAdapterPort {
	const AdapterClass = adapters[config.connectionType]
	if (!AdapterClass) {
		throw new Error(`Unsupported database type: ${config.connectionType}`)
	}
	return new AdapterClass(config)
}
