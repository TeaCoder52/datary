import type { ConnectionType } from '@datary/core'

export interface DbCredential {
	id: string
	username: string
	password: string
	type: ConnectionType
}
