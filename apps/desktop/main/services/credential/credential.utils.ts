import type { ConnectionHistoryItem } from '../../ipc/handlers/connection.handler'

export function buildCredentialId(connection: ConnectionHistoryItem) {
	return `${connection.type}::/${connection.user}@${connection.host}:${connection.port}/${connection.database}`
}
