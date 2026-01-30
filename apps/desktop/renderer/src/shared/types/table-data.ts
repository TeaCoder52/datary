export interface TableColumn {
	name: string
	type: string
	nullable: boolean
}

export interface TableData {
	columns: TableColumn[]
	rows: Record<string, any>[]
}
