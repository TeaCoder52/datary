import { cn } from '@/shared/lib/utils'

interface Props {
	onMouseDown: (e: React.MouseEvent) => void
}

export function SidebarResizer({ onMouseDown }: Props) {
	return (
		<div
			onMouseDown={onMouseDown}
			className={cn(
				'absolute top-0 right-0 h-full w-1 cursor-col-resize',
				'hover:bg-primary/50'
			)}
		/>
	)
}
