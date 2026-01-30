import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { executeQuery } from '../lib/execute-query.mock'
import type { QueryResult, UseQueryEditorProps } from '../types'

const MIN_RESULTS_HEIGHT = 100
const MAX_RESULTS_HEIGHT = 600

export function useQueryEditor({ initialQuery = '', onQueryChange }: UseQueryEditorProps) {
	const [query, setQuery] = useState(
		initialQuery ||
			"SELECT * FROM users\nWHERE status = 'active'\nORDER BY created_at DESC\nLIMIT 100;"
	)

	const [isRunning, setIsRunning] = useState(false)
	const [result, setResult] = useState<QueryResult | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [copied, setCopied] = useState(false)

	const [resultsPanelHeight, setResultsPanelHeight] = useState(300)
	const [isResizingResults, setIsResizingResults] = useState(false)
	const [isResultsExpanded, setIsResultsExpanded] = useState(true)
	const [isResultsMaximized, setIsResultsMaximized] = useState(false)

	const editorRef = useRef<HTMLTextAreaElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const highlightRef = useRef<HTMLDivElement>(null)

	const lineNumbers = useMemo(() => {
		return query.split('\n').map((_, i) => i + 1)
	}, [query])

	const handleScroll = useCallback(() => {
		if (!editorRef.current || !highlightRef.current) return

		highlightRef.current.scrollTop = editorRef.current.scrollTop
		highlightRef.current.scrollLeft = editorRef.current.scrollLeft
	}, [])

	const handleQueryChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const value = e.target.value
			setQuery(value)
			onQueryChange?.(value)
		},
		[onQueryChange]
	)

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === 'Tab') {
				e.preventDefault()

				const target = e.currentTarget
				const start = target.selectionStart
				const end = target.selectionEnd

				const newQuery = query.slice(0, start) + '  ' + query.slice(end)

				setQuery(newQuery)

				requestAnimationFrame(() => {
					target.selectionStart = target.selectionEnd = start + 2
				})
			}

			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.preventDefault()
				runQuery()
			}
		},
		[query]
	)

	const runQuery = useCallback(async () => {
		if (!query.trim() || isRunning) return

		setIsRunning(true)
		setError(null)
		setResult(null)

		try {
			if (query.toLowerCase().includes('error')) {
				throw new Error('Syntax error near "error": unexpected token')
			}

			const queryResult = await executeQuery(query)
			setResult(queryResult)
			setIsResultsExpanded(true)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error')
		} finally {
			setIsRunning(false)
		}
	}, [query, isRunning])

	const clearEditor = useCallback(() => {
		setQuery('')
		setResult(null)
		setError(null)
		editorRef.current?.focus()
	}, [])

	const copyResults = useCallback(async () => {
		if (!result) return

		const text = result.rows
			.map(row => result.columns.map(col => String(row[col] ?? 'NULL')).join('\t'))
			.join('\n')

		await navigator.clipboard.writeText(text)
		setCopied(true)

		setTimeout(() => setCopied(false), 2000)
	}, [result])

	const handleResultsMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		setIsResizingResults(true)
	}, [])

	const handleResultsMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizingResults || !containerRef.current) return

			const rect = containerRef.current.getBoundingClientRect()
			const newHeight = rect.bottom - e.clientY

			if (newHeight >= MIN_RESULTS_HEIGHT && newHeight <= MAX_RESULTS_HEIGHT) {
				setResultsPanelHeight(newHeight)
			}
		},
		[isResizingResults]
	)

	const handleResultsMouseUp = useCallback(() => {
		setIsResizingResults(false)
	}, [])

	useEffect(() => {
		if (!isResizingResults) return

		document.addEventListener('mousemove', handleResultsMouseMove)
		document.addEventListener('mouseup', handleResultsMouseUp)
		document.body.style.cursor = 'row-resize'
		document.body.style.userSelect = 'none'

		return () => {
			document.removeEventListener('mousemove', handleResultsMouseMove)
			document.removeEventListener('mouseup', handleResultsMouseUp)
			document.body.style.cursor = ''
			document.body.style.userSelect = ''
		}
	}, [isResizingResults, handleResultsMouseMove, handleResultsMouseUp])

	return {
		state: {
			query,
			isRunning,
			result,
			error,
			copied,
			resultsPanelHeight,
			isResultsExpanded,
			isResultsMaximized,
			isResizingResults
		},
		refs: {
			editorRef,
			containerRef,
			highlightRef
		},
		actions: {
			setIsResultsExpanded,
			setIsResultsMaximized,
			handleQueryChange,
			handleKeyDown,
			handleScroll,
			handleResultsMouseDown,
			runQuery,
			clearEditor,
			copyResults
		},
		derived: {
			lineNumbers
		}
	}
}
