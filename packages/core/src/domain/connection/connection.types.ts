export type ConnectionType = 'postgresql' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql'

export interface ConnectionProps {
	id: string
	type: ConnectionType
	host: string
	port: number
	database?: string
	user: string
	ssl: boolean
}
