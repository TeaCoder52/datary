import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { CellValue, Column, ColumnarData, RowObject } from './types'

export function rowsToColumnar(rows: RowObject[], columnsHint?: { name: string; type?: string }[]) {
	if (!rows.length) {
		const cols = (columnsHint ?? []).map(c => ({
			name: c.name,
			type: c.type,
			data: [] as CellValue[]
		}))

		return { columns: cols, rowCount: 0 } as ColumnarData
	}

	const colNames = columnsHint?.map(c => c.name) ?? Object.keys(rows[0])
	const columns: Column[] = colNames.map(name => ({ name, type: undefined, data: [] }))

	for (let r = 0; r < rows.length; r++) {
		const row = rows[r]

		for (let c = 0; c < colNames.length; c++) {
			const name = colNames[c]

			;(columns[c].data as CellValue[]).push(row[name])
		}
	}

	return { columns, rowCount: rows.length } as ColumnarData
}

export function useGridEngine(
	initialData: ColumnarData | { rows: RowObject[]; columns?: { name: string; type?: string }[] }
) {
	const normalized = useMemo(() => {
		if ('rowCount' in initialData) return initialData as ColumnarData

		return rowsToColumnar(initialData.rows, initialData.columns)
	}, [initialData])

	const [columns, setColumns] = useState<Column[]>(() =>
		normalized.columns.map(c => ({ ...c, data: Array.from(c.data as any) }))
	)
	const [rowCount, setRowCount] = useState<number>(normalized.rowCount)

	const [indices, setIndices] = useState<number[]>(() => {
		return Array.from({ length: normalized.rowCount }, (_, i) => i)
	})

	// @ts-ignore
	const [globalFilter, setGlobalFilter] = useState<string | null>(null)

	const columnsRef = useRef(columns)

	useEffect(() => {
		columnsRef.current = columns
	}, [columns])

	useEffect(() => {
		setColumns(normalized.columns.map(c => ({ ...c, data: Array.from(c.data as any) })))
		setRowCount(normalized.rowCount)
		setIndices(Array.from({ length: normalized.rowCount }, (_, i) => i))
		setGlobalFilter(null)
	}, [normalized])

	const getCell = useCallback(
		(logicalRowIndex: number, columnName: string): CellValue => {
			const physicalIndex = indices[logicalRowIndex]
			const col = columnsRef.current.find(c => c.name === columnName)

			return col ? (col.data as any)[physicalIndex] : undefined
		},
		[indices]
	)

	const getRow = useCallback(
		(logicalRowIndex: number) => {
			const physicalIndex = indices[logicalRowIndex]
			const row: Record<string, CellValue> = {}

			for (const c of columnsRef.current) {
				row[c.name] = (c.data as any)[physicalIndex]
			}

			return row
		},
		[indices]
	)

	const updateCell = useCallback(
		(physicalRowIndex: number, columnName: string, value: string | number | null) => {
			setColumns(prev => {
				const idx = prev.findIndex(c => c.name === columnName)
				if (idx === -1) return prev
				const col = prev[idx]
				const newData = Array.from(col.data as any)
				newData[physicalRowIndex] = value
				const newCol = { ...col, data: newData }
				const next = [...prev]
				// @ts-ignore
				next[idx] = newCol
				return next
			})
		},
		[]
	)

	const sortByColumn = useCallback(
		(columnName: string, direction: 'asc' | 'desc' | null) => {
			if (!direction) {
				return
			}

			const col = columnsRef.current.find(c => c.name === columnName)
			if (!col) return

			const colData = col.data as any[]

			setIndices(prevIndices => {
				const arr = prevIndices.map(i => ({ i, v: colData[i] }))

				arr.sort((a, b) => {
					const aV = a.v,
						bV = b.v
					if (aV === null || aV === undefined) return 1
					if (bV === null || bV === undefined) return -1
					const cmp = String(aV).localeCompare(String(bV), undefined, { numeric: true })
					return direction === 'asc' ? cmp : -cmp
				})

				return arr.map(item => item.i)
			})
		},
		[rowCount]
	)

	const applyGlobalFilter = useCallback(
		(query: string | null) => {
			setGlobalFilter(query)

			if (!query) {
				setIndices(Array.from({ length: rowCount }, (_, i) => i))
				return
			}

			const q = query.toLowerCase()

			const cols = columnsRef.current
			const matches: number[] = []

			for (let i = 0; i < rowCount; i++) {
				let matched = false

				for (let c = 0; c < cols.length; c++) {
					const val = (cols[c].data as any)[i]

					if (val !== null && val !== undefined) {
						if (String(val).toLowerCase().includes(q)) {
							matched = true
							break
						}
					}
				}

				if (matched) matches.push(i)
			}

			setIndices(matches)
		},
		[rowCount]
	)

	const reset = useCallback(() => {
		setIndices(Array.from({ length: rowCount }, (_, i) => i))
		setGlobalFilter(null)
	}, [rowCount])

	return {
		columns: columns,
		rowCount,
		visibleCount: indices.length,
		indices,
		getCell,
		getRow,
		updateCell,
		sortByColumn,
		applyGlobalFilter,
		reset
	}
}
