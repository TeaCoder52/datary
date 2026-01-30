import { useMemo } from 'react'

import { ExplorerHeader } from '../components/ExplorerHeader'
import { ExplorerSidebar } from '../components/sidebar/ExplorerSidebar'
import { ExplorerTabs } from '../components/tabs/ExplorerTabs'
import { useExplorer } from '../hooks/useExplorer'

import { useHotkeys } from '@/shared/hooks/useHotKeys'
import { TooltipProvider } from '@/shared/ui/tooltip'

export default function ExplorerPage() {
	const explorer = useExplorer()

	const activeTabData = useMemo(() => {
		return explorer.tabs.tabs.find(t => t.id === explorer.tabs.activeTab)
	}, [explorer.tabs, explorer.tabs.activeTab])

	useHotkeys({
		'ctrl+b': explorer.sidebar.toggleSidebar,
		'ctrl+t': explorer.actions.handleOpenQueryTab
	})

	return (
		<TooltipProvider delayDuration={400}>
			<div className="bg-background flex h-screen flex-col">
				<ExplorerHeader
					isRefreshing={explorer.actions.isRefreshing}
					onRefresh={explorer.actions.handleRefresh}
					onOpenQuery={explorer.actions.handleOpenQueryTab}
					onDisconnect={explorer.actions.handleDisconnect}
				/>

				<div className="flex min-h-0 flex-1">
					<ExplorerSidebar
						collapsed={explorer.sidebar.collapsed}
						width={explorer.sidebar.width}
						isResizing={explorer.sidebar.isResizing}
						databases={explorer.database.databases}
						selectedDatabase={explorer.database.selectedDatabase}
						selectedTable={activeTabData?.name}
						onToggle={explorer.sidebar.toggleSidebar}
						onStartResize={explorer.sidebar.startResize}
						onSelectDatabase={explorer.database.selectDatabase}
						onSelectTable={explorer.actions.handleSelectTable}
						onNewQuery={explorer.actions.handleOpenQueryTab}
					/>

					<main className="min-h-0 flex-1 overflow-hidden">
						<ExplorerTabs
							tabs={explorer.tabs.tabs}
							activeTab={explorer.tabs.activeTab}
							onSelectTab={explorer.tabs.setActiveTab}
							onCloseTab={explorer.tabs.closeTab}
						/>
					</main>
				</div>
			</div>
		</TooltipProvider>
	)
}
