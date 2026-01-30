import { PanelLeft } from 'lucide-react'

import { SettingRow } from '../setting-row'
import { SettingSection } from '../setting-section'

import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Switch } from '@/shared/ui/switch'

interface SidebarSectionProps {
	settings: any
	updateSetting: <K extends keyof any>(key: K, value: any[K]) => void
}

export function SidebarSection({ settings, updateSetting }: SidebarSectionProps) {
	return (
		<SettingSection
			icon={<PanelLeft className="h-5 w-5" />}
			title="Sidebar"
			description="Configure sidebar layout, position, and behavior preferences."
		>
			<SettingRow
				label="Position"
				description="Choose left or right alignment for the sidebar"
			>
				<Select
					value={settings.sidebarPosition}
					onValueChange={v =>
						updateSetting('sidebarPosition', v as any['sidebarPosition'])
					}
				>
					<SelectTrigger className="w-28">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="left">Left</SelectItem>
						<SelectItem value="right">Right</SelectItem>
					</SelectContent>
				</Select>
			</SettingRow>

			<SettingRow
				label="Auto Collapse"
				description="Automatically collapse sidebar on narrow screens"
			>
				<Switch
					checked={settings.sidebarAutoCollapse}
					onCheckedChange={v => updateSetting('sidebarAutoCollapse', v)}
				/>
			</SettingRow>

			<SettingRow
				label="Default Width"
				description="Initial sidebar width in pixels (200-400)"
			>
				<Input
					type="number"
					min={200}
					max={400}
					value={settings.sidebarDefaultWidth}
					onChange={e =>
						updateSetting('sidebarDefaultWidth', parseInt(e.target.value) || 280)
					}
					className="w-24"
				/>
			</SettingRow>
		</SettingSection>
	)
}
