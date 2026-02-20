import { useCallback, useState } from 'react'

export function useContextMenu() {
	const [open, setOpen] = useState(false)
	const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

	const onContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault()

		setPosition({ x: e.clientX, y: e.clientY })
		setOpen(true)
	}, [])

	const openAtButton = useCallback(() => {
		setPosition(null)
		setOpen(true)
	}, [])

	const close = useCallback(() => setOpen(false), [])

	return { open, position, onContextMenu, openAtButton, close }
}
