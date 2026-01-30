import { Palette } from 'lucide-react'

import { SettingRow } from '../setting-row'
import { SettingSection } from '../setting-section'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Switch } from '@/shared/ui/switch'

interface Props {
	settings: any
	updateSetting: <K extends keyof any>(key: K, value: any[K]) => void
}

export function AppearanceSection({ settings, updateSetting }: Props) {
	return (
		<SettingSection
			icon={<Palette className="h-5 w-5" />}
			title="Appearance"
			description="Customize look & feel"
		>
			<SettingRow label="Color Theme">
				<Select
					value={settings.theme}
					onValueChange={v => updateSetting('theme', v as any['theme'])}
				>
					<SelectTrigger className="w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
			</SettingRow>

			<SettingRow label="Show Row Numbers">
				<Switch
					checked={settings.showRowNumbers}
					onCheckedChange={v => updateSetting('showRowNumbers', v)}
				/>
			</SettingRow>

			<SettingRow label="Default Page Size">
				<Select
					value={String(settings.defaultPageSize)}
					onValueChange={v => updateSetting('defaultPageSize', parseInt(v))}
				>
					<SelectTrigger className="w-24">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="25">25</SelectItem>
						<SelectItem value="50">50</SelectItem>
						<SelectItem value="100">100</SelectItem>
					</SelectContent>
				</Select>
			</SettingRow>
		</SettingSection>
	)
}
