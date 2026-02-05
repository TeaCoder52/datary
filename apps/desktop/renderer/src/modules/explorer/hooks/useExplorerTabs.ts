import { useCallback, useState } from 'react'

import type { Tab } from '../types/explorer.types'

export function useExplorerTabs() {
	const [tabs, setTabs] = useState<Tab[]>([])
	const [activeTab, setActiveTab] = useState<string>('')

	const addTab = useCallback((t: Omit<Tab, 'id'> & { id?: string }) => {
		const id = t.id ?? crypto.randomUUID()
		const newTab: Tab = { id, name: t.name, type: t.type }

		setTabs(prev => [...prev, newTab])
		setActiveTab(id)

		return id
	}, [])

	const closeTab = useCallback(
		(tabId: string) => {
			setTabs(prev => {
				const index = prev.findIndex(t => t.id === tabId)
				const nextTabs = prev.filter(t => t.id !== tabId)

				if (activeTab !== tabId) return nextTabs

				if (nextTabs.length === 0) {
					setActiveTab('')
					return nextTabs
				}

				const nextIndex = index < nextTabs.length ? index : nextTabs.length - 1
				setActiveTab(nextTabs[nextIndex].id)

				return nextTabs
			})
		},
		[activeTab]
	)

	const closeOthers = useCallback((tabId: string) => {
		setTabs(prev => prev.filter(t => t.id === tabId))
		setActiveTab(tabId)
	}, [])

	const closeAll = useCallback(() => {
		setTabs([])
		setActiveTab('')
	}, [])

	return {
		tabs,
		activeTab,
		setActiveTab,
		addTab,
		closeTab,
		closeOthers,
		closeAll
	}
}
