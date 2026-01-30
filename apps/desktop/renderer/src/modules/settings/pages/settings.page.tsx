import { ArrowLeft, Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdvancedSection } from '../components/sections/advanced-section'
import { AppearanceSection } from '../components/sections/appearance-section'
import { KeyboardSection } from '../components/sections/keyboard-section'
import { ResetSection } from '../components/sections/reset-section'
import { SidebarSection } from '../components/sections/sidebar-section'
import { defaultSettings } from '../constants/default-settings'

import { Button } from '@/shared/ui/button'

export default function SettingsPage() {
	const navigate = useNavigate()
	const [settings, setSettings] = useState<any>(defaultSettings)
	const [saved, setSaved] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		async function load() {
			try {
				const stored = await window.datary.storage.settings.get<any>('settings')

				if (stored) setSettings(stored)

				setMounted(true)
			} catch (err) {
				console.error('Failed to load settings:', err)
				setMounted(true)
			}
		}
		load()
	}, [])

	const updateSetting = useCallback(
		async <K extends keyof any>(key: K, value: any[K]) => {
			const next = { ...settings, [key]: value }
			try {
				await window.datary.storage.settings.set('settings', next)

				setSettings(next)
				setSaved(true)
				setTimeout(() => setSaved(false), 2000)
			} catch (err) {
				console.error('Failed to save setting:', err)
			}
		},
		[settings]
	)

	const handleReset = useCallback(async () => {
		try {
			await window.datary.storage.settings.set('settings', defaultSettings)

			setSettings(defaultSettings)
			setSaved(true)

			setTimeout(() => setSaved(false), 2000)
		} catch (err) {
			console.error('Failed to reset settings:', err)
		}
	}, [])

	if (!mounted) return null

	return (
		<div className="bg-background min-h-screen">
			<header className="bg-background/95 sticky top-0 z-10 border-b backdrop-blur">
				<div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
							<ArrowLeft />
						</Button>
						<h1 className="text-lg font-semibold">Settings</h1>
					</div>
					{saved && (
						<span className="flex items-center gap-1 text-green-500">
							<Check className="h-4 w-4" /> Saved
						</span>
					)}
				</div>
			</header>

			<main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
				<AppearanceSection settings={settings} updateSetting={updateSetting} />
				<SidebarSection settings={settings} updateSetting={updateSetting} />
				<KeyboardSection />
				<AdvancedSection settings={settings} updateSetting={updateSetting} />
				<ResetSection onReset={handleReset} />
			</main>
		</div>
	)
}
