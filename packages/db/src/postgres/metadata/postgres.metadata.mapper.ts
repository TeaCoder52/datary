import type { Row } from '../../shared/sql.types'

import { ColumnMeta } from './postgres.metadata.repository'

export function mapTableSchema(rows: Row[]): ColumnMeta[] {
	return rows.map(row => ({
		columnName: row.column_name,
		type: row.data_type === 'USER-DEFINED' ? row.udt_name : row.data_type,
		nullable: row.is_nullable === 'YES'
	}))
}
