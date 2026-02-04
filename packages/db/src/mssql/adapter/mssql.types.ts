import type { ConnectionProps } from '@datary/core'

export interface MssqlConnectionConfig extends ConnectionProps {
	ssl?: boolean
}
