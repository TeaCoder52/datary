import React from 'react'

import { cn } from '@/shared/lib/utils'

interface Props {
	isResizing?: boolean
	onMouseDown: (e: React.MouseEvent) => void
}

export function SidebarResizer({ isResizing, onMouseDown }: Props) {
	return (
		<div
			className={cn(
				'hover:bg-primary/50 absolute top-0 right-0 h-full w-1 cursor-col-resize transition-colors',
				isResizing && 'bg-primary'
			)}
			onMouseDown={onMouseDown}
		/>
	)
}
