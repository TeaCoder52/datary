export interface DatabaseMetadataContract {
	name: string
	tables: TableMetadataContract[]
}

export interface TableMetadataContract {
	name: string
	columns: ColumnMetadataContract[]
}

export interface ColumnMetadataContract {
	name: string
	type: string
	nullable: boolean
}
