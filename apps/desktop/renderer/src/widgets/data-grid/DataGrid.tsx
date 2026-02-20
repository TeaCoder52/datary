import { useCallback, useEffect, useMemo, useState } from 'react'
import {
	LuChevronDown,
	LuChevronLeft,
	LuChevronRight,
	LuChevronsLeft,
	LuChevronsRight,
	LuChevronsUpDown,
	LuChevronUp
} from 'react-icons/lu'

import { GridViewport } from './GridViewport'
import type { DataGridProps } from './types'
import { rowsToColumnar, useGridEngine } from './useGridEngine'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export function DataGrid(props: DataGridProps) {
	const { data, rowHeight = 36, estimatedColumnWidth = 150, editable = true, className } = props

	const columnar = useMemo(() => {
		if ('rowCount' in (data as any)) return data as any
		return rowsToColumnar((data as any).rows, (data as any).columns)
	}, [data])

	const engine = useGridEngine(columnar)

	const [sortColumn, setSortColumn] = useState<string | null>(null)
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

	const [search, setSearch] = useState('')

	useEffect(() => {
		engine.applyGlobalFilter(search || null)
	}, [search])

	const handleSort = useCallback(
		(colName: string) => {
			let nextDir: 'asc' | 'desc' | null = 'asc'
			if (sortColumn === colName) {
				if (sortDirection === 'asc') nextDir = 'desc'
				else if (sortDirection === 'desc') nextDir = null
			}
			setSortColumn(nextDir ? colName : null)
			setSortDirection(nextDir)

			engine.sortByColumn(nextDir ? colName : '', nextDir)
		},
		[sortColumn, sortDirection, engine]
	)

	const handleCellEdit = useCallback(
		(logicalRowIndex: number, columnName: string, newValue: string) => {
			const physical = engine.indices[logicalRowIndex]

			engine.updateCell(physical, columnName, newValue)
			props.onCellEdit?.(physical, columnName, newValue)
		},
		[engine, props]
	)

	const DOMRenderer = useCallback(() => {
		const columns = engine.columns
		const totalWidth = columns.reduce((s, c) => s + (c.width ?? estimatedColumnWidth), 0)

		return (
			<div className="flex min-h-0 flex-1">
				<GridViewport
					rowCount={engine.indices.length}
					rowHeight={rowHeight}
					className="flex-1 overflow-auto"
					overscan={6}
					contentWidth={totalWidth}
				>
					{virtualRows => {
						return (
							<div className="absolute top-0 right-0 left-0">
								<div
									style={{
										width: totalWidth,
										height: rowHeight
									}}
									className="bg-background border-border sticky top-0 z-20 flex items-center border-b"
								>
									{columns.map((col, index) => (
										<div
											key={index}
											style={{
												width: col.width ?? estimatedColumnWidth,
												minWidth: 80
											}}
											className={cn(
												'border-border box-border flex cursor-pointer items-center justify-between gap-2 truncate overflow-hidden px-3 py-2 text-xs font-medium tracking-wider whitespace-nowrap uppercase select-none',
												index !== columns.length - 1 && 'border-r'
											)}
											onClick={() => handleSort(col.name)}
										>
											<span className="truncate">{col.name}</span>
											<span className="text-muted-foreground">
												{sortColumn === col.name ? (
													sortDirection === 'asc' ? (
														<LuChevronUp />
													) : (
														<LuChevronDown />
													)
												) : (
													<LuChevronsUpDown />
												)}
											</span>
										</div>
									))}
								</div>

								{virtualRows.map(v => {
									const logical = v.index
									const physical = engine.indices[logical]

									return (
										<div
											key={logical}
											className="bg-card text-foreground border-border absolute left-0 box-border flex items-center border-b"
											style={{
												top: v.start,
												height: v.size,
												width: totalWidth
											}}
										>
											{engine.columns.map((col, index) => {
												const value = (col.data as any)[physical]

												return (
													<div
														key={index}
														style={{
															width:
																col.width ?? estimatedColumnWidth,
															minWidth: 80
														}}
														className={cn(
															'border-border box-border truncate overflow-hidden px-3 py-2 text-sm whitespace-nowrap',
															index !== engine.columns.length - 1
																? 'border-r'
																: ''
														)}
														onDoubleClick={() => {
															if (!editable) return

															const newValue = window.prompt(
																`Edit ${col.name}`,
																String(value ?? '')
															)
															if (newValue !== null)
																handleCellEdit(
																	logical,
																	col.name,
																	newValue
																)
														}}
													>
														<span className="block truncate">
															{value !== null &&
															value !== undefined ? (
																String(value)
															) : (
																<i className="text-muted-foreground">
																	null
																</i>
															)}
														</span>
													</div>
												)
											})}
										</div>
									)
								})}
							</div>
						)
					}}
				</GridViewport>
			</div>
		)
	}, [
		engine,
		engine.columns,
		engine.indices,
		estimatedColumnWidth,
		handleSort,
		handleCellEdit,
		rowHeight,
		sortColumn,
		sortDirection,
		editable
	])

	return (
		<div className={cn('flex h-full min-h-0 w-full flex-col', className)}>
			{/* <div className="flex items-center gap-2 p-2">
				<input
					placeholder="Search..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="border-border rounded border px-2 py-1"
				/>
				<div className="text-foreground ml-auto text-sm">{engine.indices.length} rows</div>
			</div> */}

			<div className="flex min-h-0">
				<DOMRenderer />
			</div>

			<div className="border-border flex items-center justify-between border-t px-4 py-3">
				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">Rows per page:</span>
					<Select>
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
					<span className="text-muted-foreground text-sm">Page 1 of 6</span>
					<div className="flex items-center gap-1">
						<Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
							<LuChevronsLeft className="h-4 w-4" />
							<span className="sr-only">First page</span>
						</Button>
						<Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
							<LuChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous page</span>
						</Button>
						<Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
							<LuChevronRight className="h-4 w-4" />
							<span className="sr-only">Next page</span>
						</Button>
						<Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
							<LuChevronsRight className="h-4 w-4" />
							<span className="sr-only">Last page</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
