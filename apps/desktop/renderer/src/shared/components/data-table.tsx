import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Filter,
	Pencil,
	Search
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '../lib/utils'
import type { TableData } from '../types/table-data'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface DataTableProps {
	data: TableData
	onCellUpdate?: (rowIndex: number, column: string, value: string) => void
}

type SortDirection = 'asc' | 'desc' | null

interface EditingCell {
	rowIndex: number
	column: string
}

interface EditableCellProps {
	value: string | number | null | undefined
	rowIndex: number
	column: string
	isEditing: boolean
	onStartEdit: () => void
	onEndEdit: (value: string) => void
	onCancel: () => void
}

function EditableCell({ value, isEditing, onStartEdit, onEndEdit, onCancel }: EditableCellProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [editValue, setEditValue] = useState(String(value ?? ''))

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	useEffect(() => {
		setEditValue(String(value ?? ''))
	}, [value])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			onEndEdit(editValue)
		} else if (e.key === 'Escape') {
			e.preventDefault()
			setEditValue(String(value ?? ''))
			onCancel()
		} else if (e.key === 'Tab') {
			onEndEdit(editValue)
		}
	}

	const handleBlur = () => {
		onEndEdit(editValue)
	}

	if (isEditing) {
		return (
			<input
				ref={inputRef}
				type="text"
				value={editValue}
				onChange={e => setEditValue(e.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={handleBlur}
				className="text-foreground ring-primary w-full rounded-sm bg-transparent px-0 py-0 text-sm ring-1 outline-none"
				style={{
					minWidth: '60px',
					fontFamily: 'inherit'
				}}
			/>
		)
	}

	const displayValue = value !== null && value !== undefined ? String(value) : null

	return (
		<div
			className="group/cell relative flex cursor-text items-center"
			onDoubleClick={onStartEdit}
		>
			<span className="block max-w-xs truncate">
				{displayValue !== null ? (
					displayValue
				) : (
					<span className="text-muted-foreground italic">null</span>
				)}
			</span>
			<Pencil className="text-muted-foreground ml-2 h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/cell:opacity-100" />
		</div>
	)
}

export function DataTable({ data, onCellUpdate }: DataTableProps) {
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [sortColumn, setSortColumn] = useState<string | null>(null)
	const [sortDirection, setSortDirection] = useState<SortDirection>(null)
	const [editingCell, setEditingCell] = useState<EditingCell | null>(null)
	const [localData, setLocalData] = useState(data.rows)

	useEffect(() => {
		setLocalData(data.rows)
	}, [data.rows])

	const processedData = useMemo(() => {
		let result = [...localData]

		if (search) {
			const searchLower = search.toLowerCase()
			result = result.filter(row =>
				Object.values(row).some(value => String(value).toLowerCase().includes(searchLower))
			)
		}

		if (sortColumn && sortDirection) {
			result.sort((a, b) => {
				const aVal = a[sortColumn]
				const bVal = b[sortColumn]

				if (aVal === null || aVal === undefined) return 1
				if (bVal === null || bVal === undefined) return -1

				const comparison = String(aVal).localeCompare(String(bVal), undefined, {
					numeric: true
				})

				return sortDirection === 'asc' ? comparison : -comparison
			})
		}

		return result
	}, [localData, search, sortColumn, sortDirection])

	const totalPages = Math.ceil(processedData.length / rowsPerPage)
	const startIndex = (currentPage - 1) * rowsPerPage
	const paginatedData = processedData.slice(startIndex, startIndex + rowsPerPage)

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			if (sortDirection === 'asc') {
				setSortDirection('desc')
			} else if (sortDirection === 'desc') {
				setSortColumn(null)
				setSortDirection(null)
			}
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}

	const getSortIcon = (column: string) => {
		if (sortColumn !== column) {
			return (
				<ArrowUpDown className="text-muted-foreground h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
			)
		}
		if (sortDirection === 'asc') {
			return <ArrowUp className="text-primary h-3.5 w-3.5" />
		}
		return <ArrowDown className="text-primary h-3.5 w-3.5" />
	}

	const handleStartEdit = useCallback((rowIndex: number, column: string) => {
		setEditingCell({ rowIndex, column })
	}, [])

	const handleEndEdit = useCallback(
		(rowIndex: number, column: string, newValue: string) => {
			const actualIndex = startIndex + rowIndex

			setLocalData(prev => {
				const newData = [...prev]
				if (newData[actualIndex]) {
					newData[actualIndex] = {
						...newData[actualIndex],
						[column]: newValue
					}
				}
				return newData
			})

			if (onCellUpdate) {
				onCellUpdate(actualIndex, column, newValue)
			}

			setEditingCell(null)
		},
		[startIndex, onCellUpdate]
	)

	const handleCancelEdit = useCallback(() => {
		setEditingCell(null)
	}, [])

	return (
		<div className="flex h-full flex-col">
			<div className="border-border flex items-center gap-4 border-b px-4 py-3">
				<div className="relative max-w-sm flex-1">
					<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input
						placeholder="Search all columns..."
						value={search}
						onChange={e => {
							setSearch(e.target.value)
							setCurrentPage(1)
						}}
						className="pl-9"
					/>
				</div>
				<Button variant="outline" size="sm" className="gap-2 bg-transparent">
					<Filter className="h-4 w-4" />
					Filters
				</Button>
				<div className="text-muted-foreground ml-auto flex items-center gap-3 text-sm">
					<span className="flex items-center gap-1.5">
						<Pencil className="h-3.5 w-3.5" />
						Double-click to edit
					</span>
					<span className="text-border">|</span>
					<span>
						{processedData.length} row{processedData.length !== 1 ? 's' : ''}
					</span>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				<table className="w-full border-collapse">
					<thead className="bg-card sticky top-0 z-10">
						<tr>
							{data.columns.map(column => (
								<th
									key={column.name}
									className="group border-border cursor-pointer border-b px-4 py-3 text-left"
									onClick={() => handleSort(column.name)}
								>
									<div className="flex items-center gap-2">
										<span className="text-foreground text-xs font-medium tracking-wider uppercase">
											{column.name}
										</span>
										<span className="text-muted-foreground text-xs">
											{column.type}
										</span>
										{getSortIcon(column.name)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{paginatedData.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={cn(
									'hover:bg-secondary/50 transition-colors',
									rowIndex % 2 === 0 ? 'bg-background' : 'bg-card/50'
								)}
							>
								{data.columns.map(column => {
									const isEditing =
										editingCell?.rowIndex === rowIndex &&
										editingCell?.column === column.name

									return (
										<td
											key={column.name}
											className={cn(
												'border-border/50 text-foreground border-b px-4 py-2.5 text-sm',
												isEditing && 'bg-primary/5'
											)}
										>
											<EditableCell
												value={row[column.name]}
												rowIndex={rowIndex}
												column={column.name}
												isEditing={isEditing}
												onStartEdit={() =>
													handleStartEdit(rowIndex, column.name)
												}
												onEndEdit={value =>
													handleEndEdit(rowIndex, column.name, value)
												}
												onCancel={handleCancelEdit}
											/>
										</td>
									)
								})}
							</tr>
						))}
						{paginatedData.length === 0 && (
							<tr>
								<td
									colSpan={data.columns.length}
									className="text-muted-foreground px-4 py-12 text-center"
								>
									No results found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="border-border flex items-center justify-between border-t px-4 py-3">
				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">Rows per page:</span>
					<Select
						value={String(rowsPerPage)}
						onValueChange={value => {
							setRowsPerPage(Number(value))
							setCurrentPage(1)
						}}
					>
						<SelectTrigger className="h-8 w-16">
							<SelectValue />
						</SelectTrigger>
						<SelectContent position="popper" side="top">
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-muted-foreground text-sm">
						Page {currentPage} of {totalPages || 1}
					</span>
					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => setCurrentPage(1)}
							disabled={currentPage === 1}
						>
							<ChevronsLeft className="h-4 w-4" />
							<span className="sr-only">First page</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous page</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages || totalPages === 0}
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next page</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 bg-transparent"
							onClick={() => setCurrentPage(totalPages)}
							disabled={currentPage === totalPages || totalPages === 0}
						>
							<ChevronsRight className="h-4 w-4" />
							<span className="sr-only">Last page</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
