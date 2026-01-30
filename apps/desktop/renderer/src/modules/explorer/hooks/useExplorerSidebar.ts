import { useCallback, useEffect, useRef, useState } from 'react'

import {
	COLLAPSED_WIDTH,
	DEFAULT_SIDEBAR_WIDTH,
	MAX_SIDEBAR_WIDTH,
	MIN_SIDEBAR_WIDTH
} from '@/shared/constants/sidebar'

export function useExplorerSidebar() {
	const [collapsed, setCollapsed] = useState(false)
	const [width, setWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
	const [isResizing, setIsResizing] = useState(false)
	const lastWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH)

	const toggleSidebar = useCallback(() => {
		if (collapsed) {
			setWidth(lastWidthRef.current)
		} else {
			lastWidthRef.current = width
		}
		setCollapsed(v => !v)
	}, [collapsed, width])

	const startResize = useCallback(() => setIsResizing(true), [])

	useEffect(() => {
		if (!isResizing) return

		const onMove = (e: MouseEvent) => {
			const newWidth = e.clientX
			if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
				setWidth(newWidth)
				lastWidthRef.current = newWidth
			}
		}
		const onUp = () => setIsResizing(false)

		document.addEventListener('mousemove', onMove)
		document.addEventListener('mouseup', onUp)
		document.body.style.cursor = 'col-resize'
		document.body.style.userSelect = 'none'

		return () => {
			document.removeEventListener('mousemove', onMove)
			document.removeEventListener('mouseup', onUp)
			document.body.style.cursor = ''
			document.body.style.userSelect = ''
		}
	}, [isResizing])

	return {
		collapsed,
		width: collapsed ? COLLAPSED_WIDTH : width,
		rawWidth: width,
		isResizing,
		toggleSidebar,
		startResize,
		_internal: { lastWidthRef }
	}
}
