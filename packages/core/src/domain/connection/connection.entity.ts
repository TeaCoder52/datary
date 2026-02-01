import type { ConnectionProps } from './connection.types'

export class Connection {
	private readonly props: ConnectionProps

	public constructor(props: ConnectionProps) {
		this.props = props
	}

	public get id() {
		return this.props.id
	}

	public get type() {
		return this.props.type
	}

	public get host() {
		return this.props.host
	}

	public get port() {
		return this.props.port
	}

	public get database() {
		return this.props.database
	}

	public get user() {
		return this.props.user
	}
}
