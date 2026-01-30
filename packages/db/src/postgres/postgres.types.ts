import type { DBConnectionConfig } from '../shared/base.adapter'

export interface PostgresConnectionConfig extends DBConnectionConfig {
	ssl?: boolean
}
