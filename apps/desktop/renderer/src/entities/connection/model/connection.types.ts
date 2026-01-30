export type ConnectionType = 'postgresql' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql'

export interface DatabaseConnection {
	id: string
	name: string
	host: string
	port: number
	user: string
	database: string
	connectionType: ConnectionType
	ssl: boolean
	lastConnected?: string
}
