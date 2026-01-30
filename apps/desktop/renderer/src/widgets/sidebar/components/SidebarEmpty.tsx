import { Database } from 'lucide-react'

export function SidebarEmpty() {
	return (
		<div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center">
			<Database className="mb-2 h-12 w-12" />
			<h4 className="text-sm font-medium">No Connections Yet</h4>
			<p className="text-xs">Connect to a database to get started</p>
		</div>
	)
}
