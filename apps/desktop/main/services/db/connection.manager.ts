import { PostgresAdapter, PostgresMetadataRepository } from '@datary/db'
import type { DBConnectionConfig } from '@datary/db'

import { logger } from '../../utils/logger'

export class ConnectionManager {
	private adapter: PostgresAdapter | null = null

	private metadataRepo: PostgresMetadataRepository | null = null

	public async connect(config: DBConnectionConfig) {
		this.adapter = new PostgresAdapter(config)

		await this.adapter.connect()

		this.metadataRepo = new PostgresMetadataRepository(this.adapter['client']!)

		logger.info('DB connected')
	}

	public isConnected() {
		return !!this.metadataRepo
	}

	public async disconnect() {
		if (this.adapter) await this.adapter.disconnect()

		this.adapter = null
		this.metadataRepo = null

		logger.info('DB disconnected')
	}

	public async loadDatabases() {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadDatabases()
	}

	public async loadSchemas() {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadSchemas()
	}

	public async loadTables(schema: string) {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadTables(schema)
	}

	public async loadViews(schema: string) {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadViews(schema)
	}

	public async loadColumns(schema: string, table: string) {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadColumns(schema, table)
	}

	public async loadTableData(schema: string, table: string) {
		if (!this.metadataRepo) throw new Error('DB not connected')

		return this.metadataRepo.loadTableData(schema, table)
	}
}
