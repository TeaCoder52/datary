import { useDatabase } from './useDatabase'
import { useExplorerActions } from './useExplorerActions'
import { useExplorerSidebar } from './useExplorerSidebar'
import { useExplorerTabs } from './useExplorerTabs'

export function useExplorer() {
	const sidebar = useExplorerSidebar()
	const tabs = useExplorerTabs()
	const database = useDatabase()
	const actions = useExplorerActions(tabs)

	return {
		sidebar,
		tabs,
		database,
		actions
	}
}
