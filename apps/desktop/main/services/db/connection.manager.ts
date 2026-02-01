import type { ConnectionProps, DbAdapterPort } from '@datary/core'
import {
	MysqlAdapter,
	MysqlMetadataRepository,
	PostgresAdapter,
	PostgresMetadataRepository
} from '@datary/db'

import { logger } from '../../utils/logger'

export class ConnectionManager {
	private adapter: DbAdapterPort | null = null
	private adapterType: string | null = null

	private metadataRepo: any = null

	public async connect(config: ConnectionProps) {
		switch (config.type) {
			case 'postgresql':
				this.adapter = new PostgresAdapter(config)
				await this.adapter.connect()
				// @ts-ignore
				this.metadataRepo = new PostgresMetadataRepository(this.adapter['client']!)
				this.adapterType = 'postgres'
				break

			case 'mysql':
				this.adapter = new MysqlAdapter(config)
				await this.adapter.connect()
				// @ts-ignore
				this.metadataRepo = new MysqlMetadataRepository(this.adapter['client']!)
				this.adapterType = 'mysql'
				break

			default:
				throw new Error(`Unsupported DB type: ${config.type}`)
		}

		logger.info(`DB connected (${config.type})`)
	}

	public getAdapterType() {
		if (!this.adapterType) throw new Error('DB not connected')

		return this.adapterType
	}

	public isConnected() {
		return !!this.metadataRepo
	}

	public async disconnect() {
		if (this.adapter) await this.adapter.disconnect()

		this.adapter = null
		this.metadataRepo = null
		this.adapterType = null

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
