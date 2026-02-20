export type TypedArray =
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array

export type CellValue = string | number | null | undefined

export interface Column<T = CellValue> {
	name: string
	type?: string
	width?: number
	data: ArrayLike<T>
}

export interface ColumnarData {
	columns: Column[]
	rowCount: number
}

export type RowObject = Record<string, CellValue>

export interface DataGridProps {
	data: ColumnarData | { rows: RowObject[]; columns?: { name: string; type?: string }[] }
	rowHeight?: number
	estimatedColumnWidth?: number
	renderer?: 'dom' | 'canvas'
	editable?: boolean
	className?: string
	onCellEdit?: (rowIndex: number, column: string, value: string) => void
}
