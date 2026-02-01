export interface DBConnectionPayload {
	host: string
	port: number
	user: string
	password: string
	database: string
	type: 'postgresql' | 'mysql'
	ssl?: boolean
}
