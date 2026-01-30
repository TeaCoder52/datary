import type { ReactNode } from 'react'

import { Label } from '@/shared/ui/label'

interface SettingRowProps {
	label: string
	description?: string
	children: ReactNode
}

export function SettingRow({ label, description, children }: SettingRowProps) {
	return (
		<div className="flex items-center justify-between gap-4">
			<div className="flex-1">
				<Label className="text-sm font-medium">{label}</Label>
				{description && (
					<p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
				)}
			</div>
			{children}
		</div>
	)
}
