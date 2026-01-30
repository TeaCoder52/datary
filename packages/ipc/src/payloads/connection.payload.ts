export interface DBConnectionPayload {
	host: string
	port: number
	user: string
	password: string
	database: string
	connectionType: 'postgresql' | 'mysql'
	ssl?: boolean
}
