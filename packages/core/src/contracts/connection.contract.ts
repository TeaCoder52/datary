import type { ConnectionType } from '../domain/connection/connection.types'

export interface CreateConnectionContract {
	id: string
	type: ConnectionType

	host: string
	port: number
	database?: string

	user: string
	password: string
	ssl: boolean
}

export interface ConnectionViewContract {
	id: string
	type: ConnectionType

	host: string
	port: number
	database?: string

	user: string
	ssl: boolean
}
