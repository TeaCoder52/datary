import type { Row } from '../../shared/sql.types'

export function mapTableSchema(
	rows: Row[]
): { columnName: string; type: string; nullable: boolean }[] {
	return rows.map(row => ({
		columnName: row.column_name,
		type: row.data_type,
		nullable: row.is_nullable === 'YES'
	}))
}
