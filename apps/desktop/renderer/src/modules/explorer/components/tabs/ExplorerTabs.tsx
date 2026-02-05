import type { ReactNode } from 'react'

import type { Tab } from '../../types/explorer.types'

import { ExplorerTabContextMenu } from './ExplorerTabContextMenu'
import { TabContent } from './TabContent'
import { TableTabs } from './TableTabs'
import { cn } from '@/shared/lib/utils'

interface Props {
	tabs: Tab[]
	activeTab: string
	onSelectTab: (id: string) => void
	onCloseTab: (id: string) => void
	onCloseOthers: (id: string) => void
	onCloseAll: () => void
	children?: ReactNode
}

export function ExplorerTabs({
	tabs,
	activeTab,
	onSelectTab,
	onCloseTab,
	onCloseOthers,
	onCloseAll
}: Props) {
	return (
		<div className="flex h-full flex-col">
			<TableTabs
				tabs={tabs}
				activeTab={activeTab}
				onSelectTab={onSelectTab}
				onCloseTab={onCloseTab}
				renderTab={(tab, tabNode) => (
					<ExplorerTabContextMenu
						disabledCloseOthers={tabs.length <= 1}
						onClose={() => onCloseTab(tab.id)}
						onCloseOthers={() => {
							onSelectTab(tab.id)
							onCloseOthers(tab.id)
						}}
						onCloseAll={() => {
							onCloseAll()
						}}
					>
						<div className="h-full">{tabNode}</div>
					</ExplorerTabContextMenu>
				)}
			>
				{tabs.map(tab => (
					<div
						key={tab.id}
						className={cn('h-full', activeTab === tab.id ? 'block' : 'hidden')}
					>
						<TabContent tab={tab} />
					</div>
				))}
			</TableTabs>
		</div>
	)
}
