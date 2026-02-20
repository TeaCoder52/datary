import type { ReactNode } from 'react'

import { useContextMenu } from '@/shared/hooks/useContextMenu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/shared/ui/dropdown-menu'

interface Props {
	children: ReactNode
	disabledCloseOthers: boolean
	onClose: () => void
	onCloseOthers: () => void
	onCloseAll: () => void
}
export function ExplorerTabContextMenu({
	children,
	disabledCloseOthers,
	onClose,
	onCloseOthers,
	onCloseAll
}: Props) {
	const { open, position, onContextMenu, close } = useContextMenu()

	return (
		<>
			<div onContextMenu={onContextMenu}>{children}</div>

			{open && (
				<DropdownMenu open={open} onOpenChange={val => !val && close()}>
					<DropdownMenuContent
						align="start"
						sideOffset={4}
						className="absolute"
						style={{ top: position!.y, left: position!.x }}
					>
						<DropdownMenuItem
							onClick={() => {
								onClose()
								close()
							}}
						>
							Close
						</DropdownMenuItem>
						<DropdownMenuItem
							disabled={disabledCloseOthers}
							onClick={() => {
								onCloseOthers()
								close()
							}}
						>
							Close Others
						</DropdownMenuItem>
						<DropdownMenuItem
							disabled={disabledCloseOthers}
							onClick={() => {
								onCloseAll()
								close()
							}}
						>
							Close All
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	)
}
