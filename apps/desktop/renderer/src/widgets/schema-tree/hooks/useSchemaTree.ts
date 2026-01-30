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
				const schemas = await window.datary.db.loadSchemas(database)
				if (!schemas.length) {
					toast.error(`No schemas found for database ${database}`)
					return
				}

				const treeData: TreeNode[] = []

				for (const schema of schemas) {
					const schemaName = typeof schema === 'string' ? schema : schema.name

					const tables = await window.datary.db
						.loadTables(database, schemaName)
						.catch(() => [])
					const views = await window.datary.db
						.loadViews(database, schemaName)
						.catch(() => [])

					const folders: TreeNode[] = []

					if (tables.length) {
						folders.push({
							name: 'Tables',
							type: 'folder',
							children: tables.map(t => ({ name: t.name, type: 'table' }))
						})
					}

					if (views.length) {
						folders.push({
							name: 'Views',
							type: 'folder',
							children: views.map(v => ({ name: v.name, type: 'view' }))
						})
					}

					if (folders.length) {
						treeData.push({
							name: schemaName,
							type: 'schema',
							children: folders
						})
					}
				}

				if (!cancelled) setTree(treeData)
			} catch (err: any) {
				if (!cancelled) {
					setError(err?.message || 'Failed to load database tree')
					toast.error(err?.message || 'Failed to load database tree')
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
