import { ChevronLeft, ChevronRight, Table, X } from 'lucide-react'
import React from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '../lib/utils'
import { Button } from '../ui/button'

export interface Tab {
	id: string
	name: string
	type: 'table' | 'query'
}

interface TableTabsProps {
	tabs: Tab[]
	activeTab: string
	onSelectTab: (id: string) => void
	onCloseTab: (id: string) => void
	children: React.ReactNode
}

export function TableTabs({ tabs, activeTab, onSelectTab, onCloseTab, children }: TableTabsProps) {
	const tabsRef = useRef<HTMLDivElement>(null)
	const [showScrollButtons, setShowScrollButtons] = useState(false)

	useEffect(() => {
		const checkScroll = () => {
			if (tabsRef.current) {
				setShowScrollButtons(tabsRef.current.scrollWidth > tabsRef.current.clientWidth)
			}
		}

		checkScroll()
		window.addEventListener('resize', checkScroll)
		return () => window.removeEventListener('resize', checkScroll)
	}, [tabs])

	const scroll = (direction: 'left' | 'right') => {
		if (tabsRef.current) {
			const scrollAmount = 200
			tabsRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className="flex h-full flex-col">
			<div className="border-border bg-card flex items-center border-b">
				{showScrollButtons && (
					<Button
						variant="ghost"
						size="icon"
						className="border-border h-9 w-8 shrink-0 rounded-none border-r"
						onClick={() => scroll('left')}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Scroll left</span>
					</Button>
				)}

				<div ref={tabsRef} className="scrollbar-none flex flex-1 overflow-x-auto">
					{tabs.map(tab => (
						<button
							key={tab.id}
							type="button"
							className={cn(
								'group border-border flex shrink-0 items-center gap-2 border-r px-4 py-2 text-sm transition-colors',
								activeTab === tab.id
									? 'bg-background text-foreground'
									: 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
							)}
							onClick={() => onSelectTab(tab.id)}
						>
							<Table className="text-primary h-4 w-4" />
							<span className="max-w-32 truncate">{tab.name}</span>
							<button
								type="button"
								className={cn(
									'ml-1 rounded p-0.5 transition-colors',
									'text-muted-foreground hover:bg-secondary hover:text-foreground',
									'opacity-0 group-hover:opacity-100',
									activeTab === tab.id && 'opacity-100'
								)}
								onClick={e => {
									e.stopPropagation()
									onCloseTab(tab.id)
								}}
							>
								<X className="h-3.5 w-3.5" />
								<span className="sr-only">Close tab</span>
							</button>
						</button>
					))}
				</div>

				{showScrollButtons && (
					<Button
						variant="ghost"
						size="icon"
						className="border-border h-9 w-8 shrink-0 rounded-none border-l"
						onClick={() => scroll('right')}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Scroll right</span>
					</Button>
				)}
			</div>

			<div className="flex-1 overflow-hidden">
				{tabs.length > 0 ? (
					children
				) : (
					<div className="text-muted-foreground flex h-full items-center justify-center">
						<div className="text-center">
							<Table className="text-muted-foreground/50 mx-auto h-12 w-12" />
							<p className="mt-4 text-sm">Select a table to view its data</p>
							<p className="text-muted-foreground mt-1 text-xs">
								Use the tree on the right to browse tables
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
