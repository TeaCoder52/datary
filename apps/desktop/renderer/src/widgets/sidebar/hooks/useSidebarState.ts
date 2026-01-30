import { useCallback, useEffect, useRef, useState } from 'react'

import {
	COLLAPSED_WIDTH,
	DEFAULT_SIDEBAR_WIDTH,
	MAX_SIDEBAR_WIDTH,
	MIN_SIDEBAR_WIDTH
} from '@/shared/constants/sidebar'

export function useSidebarState() {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [width, setWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
	const [isResizing, setIsResizing] = useState(false)

	const lastWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH)

	const toggleCollapse = useCallback(() => {
		if (isCollapsed) {
			setWidth(lastWidthRef.current)
		} else {
			lastWidthRef.current = width
		}
		setIsCollapsed(v => !v)
	}, [isCollapsed, width])

	const startResize = useCallback(() => {
		setIsResizing(true)
	}, [])

	useEffect(() => {
		if (!isResizing) return

		const onMove = (e: MouseEvent) => {
			if (e.clientX >= MIN_SIDEBAR_WIDTH && e.clientX <= MAX_SIDEBAR_WIDTH) {
				setWidth(e.clientX)
				lastWidthRef.current = e.clientX
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
		isCollapsed,
		isResizing,
		width: isCollapsed ? COLLAPSED_WIDTH : width,
		toggleCollapse,
		startResize
	}
}
