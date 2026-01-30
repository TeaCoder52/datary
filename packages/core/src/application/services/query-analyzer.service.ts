import type { QueryType } from '../../domain/query/query.types'

export class QueryAnalyzerService {
	private DANGEROUS_PATTERS: RegExp[] = [
		/\bdrop\s+table\b/i,
		/\btruncate\s+/i,
		/\bdelete\s+from\s+\w+\s*(;|$)/i
	]

	public analyze(sql: string): QueryType {
		const normalized = (sql || '').trim()

		if (!normalized) return 'read'

		if (this.DANGEROUS_PATTERS.some(r => r.test(normalized))) {
			return 'dangerous'
		}

		const lower = normalized.toLowerCase()

		if (lower.startsWith('select')) return 'read'
		if (lower.startsWith('insert') || lower.startsWith('update')) return 'write'
		if (lower.startsWith('create') || lower.startsWith('alter') || lower.startsWith('drop'))
			return 'schema'

		return 'write'
	}
}
