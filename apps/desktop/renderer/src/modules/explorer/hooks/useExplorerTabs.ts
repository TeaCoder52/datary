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

	const closeTab = useCallback((tabId: string) => {
		setTabs(prev => prev.filter(t => t.id !== tabId))
		setActiveTab(prevActive => (prevActive === tabId ? '' : prevActive))
	}, [])

	return { tabs, activeTab, setActiveTab, addTab, closeTab }
}
