import type { ConnectionProps } from '@datary/core'

export interface MysqlConnectionConfig extends ConnectionProps {
	ssl?: boolean | { rejectUnauthorized: boolean }
}
