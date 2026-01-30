import { Beaker } from 'lucide-react'

import { SettingRow } from '../setting-row'
import { SettingSection } from '../setting-section'

import { Input } from '@/shared/ui/input'
import { Switch } from '@/shared/ui/switch'

interface AdvancedSectionProps {
	settings: any
	updateSetting: <K extends keyof any>(key: K, value: any[K]) => void
}

export function AdvancedSection({ settings, updateSetting }: AdvancedSectionProps) {
	return (
		<SettingSection
			icon={<Beaker className="h-5 w-5" />}
			title="Advanced"
			description="Developer tools, experimental features, and performance tuning options."
		>
			<SettingRow
				label="Developer Mode"
				description="Enable additional debugging tools and logs"
			>
				<Switch
					checked={settings.developerMode}
					onCheckedChange={v => updateSetting('developerMode', v)}
				/>
			</SettingRow>

			<SettingRow
				label="Experimental Features"
				description="Try new features before they are officially released"
			>
				<Switch
					checked={settings.enableExperimentalFeatures}
					onCheckedChange={v => updateSetting('enableExperimentalFeatures', v)}
				/>
			</SettingRow>

			<SettingRow
				label="Query Timeout"
				description="Maximum time for queries in milliseconds"
			>
				<Input
					type="number"
					min={5000}
					max={300000}
					step={1000}
					value={settings.queryTimeout}
					onChange={e => updateSetting('queryTimeout', parseInt(e.target.value) || 30000)}
					className="w-28"
				/>
			</SettingRow>

			<SettingRow
				label="Max Rows Display"
				description="Maximum number of rows to load at once"
			>
				<Input
					type="number"
					min={100}
					max={10000}
					step={100}
					value={settings.maxRowsDisplay}
					onChange={e =>
						updateSetting('maxRowsDisplay', parseInt(e.target.value) || 1000)
					}
					className="w-28"
				/>
			</SettingRow>
		</SettingSection>
	)
}
