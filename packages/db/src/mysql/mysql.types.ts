import type { DBConnectionConfig } from '../shared/base.adapter'

export interface MysqlConnectionConfig extends DBConnectionConfig {
	ssl?: boolean | { rejectUnauthorized: boolean }
}
