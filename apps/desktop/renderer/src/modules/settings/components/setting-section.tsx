import type { ReactNode } from 'react'

interface SettingSectionProps {
	icon: ReactNode
	title: string
	description: string
	children: ReactNode
}

export function SettingSection({ icon, title, description, children }: SettingSectionProps) {
	return (
		<section className="group">
			<div className="mb-6 flex items-start gap-4">
				<div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
					{icon}
				</div>
				<div>
					<h2 className="text-foreground text-base font-medium">{title}</h2>
					<p className="text-muted-foreground mt-1 text-sm">{description}</p>
				</div>
			</div>
			<div className="border-border bg-background space-y-5 rounded-xl border p-6">
				{children}
			</div>
		</section>
	)
}
