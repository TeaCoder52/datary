import type { ReactNode } from 'react'

import type { Tab } from '../../types/explorer.types'

import { TabContent } from './TabContent'
import { TableTabs } from '@/shared/components/table-tabs'
import { cn } from '@/shared/lib/utils'

interface Props {
	tabs: Tab[]
	activeTab: string
	onSelectTab: (id: string) => void
	onCloseTab: (id: string) => void
	children?: ReactNode
}

export function ExplorerTabs({ tabs, activeTab, onSelectTab, onCloseTab }: Props) {
	return (
		<div className="flex h-full flex-col">
			<TableTabs
				tabs={tabs}
				activeTab={activeTab}
				onSelectTab={onSelectTab}
				onCloseTab={onCloseTab}
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
