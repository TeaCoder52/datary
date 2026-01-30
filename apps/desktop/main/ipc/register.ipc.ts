import { logger } from '../utils/logger'

import { registerConnectionHandlers } from './handlers/connection.handler'
import { registerMetadataHandlers } from './handlers/metadata.handler'
import { registerSettingsHandlers } from './handlers/settings.handler'

export async function registerIpc() {
	logger.info('Registering main IPC handlers...')

	registerConnectionHandlers()
	registerMetadataHandlers()
	registerSettingsHandlers()

	logger.info('IPC handlers registered')
}
