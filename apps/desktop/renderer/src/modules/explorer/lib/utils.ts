export function countTablesAndViews(tree: any[] | undefined) {
	let tables = 0
	let views = 0

	if (!Array.isArray(tree)) return { tables, views }

	function walk(nodes: any[]) {
		for (const n of nodes) {
			if (!n || typeof n !== 'object') continue
			if (n.type === 'table') tables++
			if (n.type === 'view') views++
			if (Array.isArray(n.children) && n.children.length) walk(n.children)
		}
	}

	walk(tree)

	return { tables, views }
}
