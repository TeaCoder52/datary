import { useVirtualizer } from '@tanstack/react-virtual'
import { type ReactNode, useRef } from 'react'

interface GridViewportProps {
	rowCount: number
	rowHeight: number
	contentWidth?: number
	children: (virtualRows: { index: number; start: number; size: number }[]) => ReactNode
	className?: string
	overscan?: number
}

export function GridViewport({
	rowCount,
	rowHeight,
	contentWidth,
	children,
	className,
	overscan = 5
}: GridViewportProps) {
	const parentRef = useRef<HTMLDivElement | null>(null)

	const rowVirtualizer = useVirtualizer({
		count: rowCount,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan
	})

	const virtualItems = rowVirtualizer.getVirtualItems()
	const totalHeight = rowVirtualizer.getTotalSize()

	return (
		<div
			ref={parentRef}
			className={className ?? 'h-full w-full overflow-auto'}
			style={{ position: 'relative' }}
		>
			<div
				style={{ height: totalHeight, position: 'relative', width: contentWidth ?? '100%' }}
			>
				{children(
					virtualItems.map(v => ({ index: v.index, start: v.start, size: v.size }))
				)}
			</div>
		</div>
	)
}
