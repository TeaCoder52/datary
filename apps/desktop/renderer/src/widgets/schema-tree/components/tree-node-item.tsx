import { ChevronDown, ChevronRight, Eye, Folder, FolderOpen, Table } from 'lucide-react'
import { useState } from 'react'

import type { TreeNode } from '../types'

import { cn } from '@/shared/lib/utils'

interface TreeNodeItemProps {
	node: TreeNode
	level: number
	selectedTable?: string
	onSelectTable: (tableName: string) => void
}

export function TreeNodeItem({ node, level, selectedTable, onSelectTable }: TreeNodeItemProps) {
	const [isOpen, setIsOpen] = useState(level < 2)

	const hasChildren = node.children?.length! > 0
	const isSelected = node.type === 'table' && node.name === selectedTable

	const toggle = () => {
		if (node.type === 'table' || node.type === 'view') {
			onSelectTable(node.name)
		} else if (hasChildren) {
			setIsOpen(!isOpen)
		}
	}

	const getIcon = () => {
		switch (node.type) {
			case 'schema':
				return isOpen ? (
					<FolderOpen className="h-4 w-4 text-amber-400" />
				) : (
					<Folder className="h-4 w-4 text-amber-400" />
				)
			case 'folder':
				return isOpen ? (
					<FolderOpen className="text-muted-foreground h-4 w-4" />
				) : (
					<Folder className="text-muted-foreground h-4 w-4" />
				)
			case 'table':
				return <Table className="text-primary h-4 w-4" />
			case 'view':
				return <Eye className="text-muted-foreground h-4 w-4" />
		}
	}

	return (
		<div>
			<button
				type="button"
				className={cn(
					'flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-sm transition-colors',
					isSelected ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'
				)}
				style={{ paddingLeft: `${level * 16}px` }}
				onClick={toggle}
			>
				<span className="flex h-4 w-4 shrink-0 items-center justify-center">
					{hasChildren ? (
						isOpen ? (
							<ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
						) : (
							<ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
						)
					) : (
						<span className="w-4" />
					)}
				</span>
				<span className="shrink-0">{getIcon()}</span>
				<span className="flex-1 truncate">{node.name}</span>
			</button>

			{hasChildren && isOpen && (
				<div className="border-muted/20 animate-in slide-in-from-top-1 ml-2 border-l duration-200">
					{node.children!.map(child => (
						<TreeNodeItem
							key={`${child.type}-${child.name}`}
							node={child}
							level={level + 1}
							selectedTable={selectedTable}
							onSelectTable={onSelectTable}
						/>
					))}
				</div>
			)}

			{node.type === 'folder' && !hasChildren && isOpen && (
				<div className="text-muted-foreground ml-[calc(16px*(level+1))] px-2 py-1 text-xs italic">
					{node.name === 'Tables'
						? 'No tables in this schema'
						: 'No views in this schema'}
				</div>
			)}
		</div>
	)
}
