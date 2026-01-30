import { Keyboard } from 'lucide-react'

import { keyboardShortcuts } from '../../constants/keyboard-shortcuts'
import { SettingSection } from '../setting-section'

export function KeyboardSection() {
	return (
		<SettingSection
			icon={<Keyboard className="h-5 w-5" />}
			title="Keyboard Shortcuts"
			description="Quick reference for available keyboard shortcuts to boost your productivity."
		>
			<div className="space-y-4">
				{['General', 'Navigation', 'Tabs', 'Data', 'Editing'].map(category => (
					<div key={category}>
						<h4 className="text-muted-foreground mb-2.5 text-xs font-medium tracking-wider uppercase">
							{category}
						</h4>
						<div className="space-y-2">
							{keyboardShortcuts
								.filter(s => s.category === category)
								.map(shortcut => (
									<div
										key={shortcut.action}
										className="bg-secondary/50 hover:bg-secondary flex items-center justify-between rounded-lg px-3 py-2 transition-colors"
									>
										<span className="text-foreground text-sm">
											{shortcut.action}
										</span>
										<div className="flex items-center gap-1">
											{shortcut.keys.map((key, i) => (
												<span key={i} className="flex items-center gap-1">
													<kbd className="border-border bg-card text-muted-foreground rounded border px-2 py-0.5 text-xs">
														{key}
													</kbd>
													{i < shortcut.keys.length - 1 && (
														<span className="text-muted-foreground text-xs">
															+
														</span>
													)}
												</span>
											))}
										</div>
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</SettingSection>
	)
}
