export interface TreeNode {
	name: string
	type: 'schema' | 'folder' | 'table' | 'view'
	children?: TreeNode[]
}
