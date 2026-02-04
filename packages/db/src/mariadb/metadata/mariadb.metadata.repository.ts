import { MysqlClient } from '../../mysql/adapter/mysql.client'
import { MysqlMetadataRepository } from '../../mysql/metadata/mysql.metadata.repository'

export class MariaDbMetadataRepository extends MysqlMetadataRepository {
	public constructor(client: MysqlClient) {
		super(client)
	}
}
