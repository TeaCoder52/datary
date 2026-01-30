export class Query {
	public constructor(
		public readonly sql: string,
		public readonly params?: any[]
	) {}

	public isEmpty(): boolean {
		return this.sql.trim().length === 0
	}
}
