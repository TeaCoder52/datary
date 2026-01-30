import type { DbAdapterPort } from '../ports/db.adapter.port'

export class ConnectDBUseCase {
	public constructor(private readonly dbAdapter: DbAdapterPort) {}

	public async execute(): Promise<void> {
		await this.dbAdapter.connect()
	}
}
