import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import type { TreeNode } from '../types'

export function useSchemaTree(database?: string) {
	const [tree, setTree] = useState<TreeNode[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!database) return

		let cancelled = false

		setLoading(true)
		setError(null)

		const loadTree = async () => {
			try {
				const adapter = await window.datary.db.getAdapterType()

				if (adapter === 'mysql') {
					const [tables, views] = await Promise.all([
						window.datary.db.loadTables(database, null).catch(() => []),
						window.datary.db.loadViews(database, null).catch(() => [])
					])

					const folders: TreeNode[] = []

					if (tables.length) {
						folders.push({
							type: 'folder',
							name: 'Tables',
							children: tables.map(t => ({
								type: 'table',
								name: t.name
							}))
						})
					}

					if (views.length) {
						folders.push({
							type: 'folder',
							name: 'Views',
							children: views.map(v => ({
								type: 'view',
								name: v.name
							}))
						})
					}

					if (!cancelled) setTree(folders)

					return
				}

				const schemas = await window.datary.db.loadSchemas(database)

				if (!schemas.length) {
					toast.error(`No schemas found for database ${database}`)
					return
				}

				const treeData: TreeNode[] = []

				for (const schema of schemas) {
					const schemaName = schema.name

					const [tables, views] = await Promise.all([
						window.datary.db.loadTables(database, schemaName).catch(() => []),
						window.datary.db.loadViews(database, schemaName).catch(() => [])
					])

					const children: TreeNode[] = []

					if (tables.length) {
						children.push({
							type: 'folder',
							name: 'Tables',
							children: tables.map(t => ({
								type: 'table',
								name: t.name
							}))
						})
					}

					if (views.length) {
						children.push({
							type: 'folder',
							name: 'Views',
							children: views.map(v => ({
								type: 'view',
								name: v.name
							}))
						})
					}

					if (children.length) {
						treeData.push({
							type: 'schema',
							name: schemaName,
							children
						})
					}
				}

				if (!cancelled) setTree(treeData)
			} catch (err: any) {
				if (!cancelled) {
					const message = err?.message || 'Failed to load database tree'
					setError(message)
					toast.error(message)
				}
			} finally {
				if (!cancelled) setLoading(false)
			}
		}

		loadTree()
		return () => {
			cancelled = true
		}
	}, [database])

	return { tree, loading, error }
}
