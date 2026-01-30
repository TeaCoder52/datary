import type { DatabaseMetadata } from './database.types'

export class Database {
	public constructor(private readonly metadata: DatabaseMetadata) {}

	public get name() {
		return this.metadata.name
	}

	public get tables() {
		return this.metadata.tables
	}
}
