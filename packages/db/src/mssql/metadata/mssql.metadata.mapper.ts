import type { Row } from '../../shared/sql.types'

export function mapTableSchema(rows: Row[]) {
	return rows.map(row => ({
		columnName: row.COLUMN_NAME,
		type: row.DATA_TYPE,
		nullable: row.IS_NULLABLE === 'YES'
	}))
}
