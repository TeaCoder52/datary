export class DBConnectionError extends Error {
	public constructor(message: string) {
		super(message)

		this.name = 'DBConnectionError'
	}
}

export class DBQueryError extends Error {
	public constructor(message: string) {
		super(message)

		this.name = 'DBQueryError'
	}
}
