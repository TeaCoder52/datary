import type { DatabaseConnection } from './connection.types'

export const getConnectionById = (connections: DatabaseConnection[], id?: string) =>
	connections.find(c => c.id === id)
