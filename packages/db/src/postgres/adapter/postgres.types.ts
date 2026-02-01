import type { ConnectionProps } from '@datary/core'

export interface PostgresConnectionConfig extends ConnectionProps {
	ssl?: boolean
}
