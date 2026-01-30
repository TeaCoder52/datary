import { useEffect } from 'react'

type HotkeyHandler = (event: KeyboardEvent) => void

type HotkeysMap = Record<string, HotkeyHandler>

interface UseHotkeysOptions {
	ignoreInput?: boolean
	enabled?: boolean
}

export function useHotkeys(hotkeys: HotkeysMap, options: UseHotkeysOptions = {}) {
	const { ignoreInput = true, enabled = true } = options

	useEffect(() => {
		if (!enabled) return

		const handler = (event: KeyboardEvent) => {
			if (ignoreInput) {
				const target = event.target as HTMLElement
				const tag = target?.tagName?.toLowerCase()

				if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) {
					return
				}
			}

			const key = normalizeKey(event)

			const callback = hotkeys[key]
			if (!callback) return

			event.preventDefault()
			callback(event)
		}

		window.addEventListener('keydown', handler)
		return () => window.removeEventListener('keydown', handler)
	}, [hotkeys, ignoreInput, enabled])
}

function normalizeKey(event: KeyboardEvent): string {
	const keys: string[] = []

	if (event.ctrlKey) keys.push('ctrl')
	if (event.metaKey) keys.push('cmd')
	if (event.shiftKey) keys.push('shift')
	if (event.altKey) keys.push('alt')

	const key = event.key.toLowerCase()

	if (!['control', 'meta', 'shift', 'alt'].includes(key)) {
		keys.push(key)
	}

	return keys.join('+')
}
