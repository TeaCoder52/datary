export type TabType = 'table' | 'query'

export interface Tab {
	id: string
	name: string
	type: TabType
}
