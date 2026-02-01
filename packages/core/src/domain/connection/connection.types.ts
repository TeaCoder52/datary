export type ConnectionType = 'postgresql' | 'mysql' | 'mariadb' | 'mssql'

export interface ConnectionProps {
	id: string
	type: ConnectionType
	host: string
	port: number
	user: string
	password: string
	database?: string
}
