export type ConnectionType = 'postgresql' | 'mysql' | 'mariadb' | 'mssql'

export interface DatabaseConnection {
	id: string
	name: string
	host: string
	port: number
	user: string
	database: string
	type: ConnectionType
	ssl: boolean
	lastConnected?: string
}
