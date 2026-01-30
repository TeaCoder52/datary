import type { QueryResult } from '../../domain/query/query.types'
import type { DbAdapterPort } from '../ports/db.adapter.port'
import { QueryAnalyzerService } from '../services/query-analyzer.service'

export class ExecuteQueryUseCase {
	private readonly analyzer = new QueryAnalyzerService()

	public constructor(private readonly dbAdapter: DbAdapterPort) {}

	public async execute<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
		const type = this.analyzer.analyze(sql)

		if (type === 'dangerous') {
			throw new Error('Dangerous SQL query blocked by core')
		}

		return this.dbAdapter.query<T>(sql, params)
	}
}
