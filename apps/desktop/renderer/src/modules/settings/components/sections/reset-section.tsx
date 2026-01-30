import { RotateCcw } from 'lucide-react'

import { SettingSection } from '../setting-section'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'

interface ResetSectionProps {
	onReset: () => void
}

export function ResetSection({ onReset }: ResetSectionProps) {
	return (
		<SettingSection
			icon={<RotateCcw className="h-5 w-5" />}
			title="Reset All Settings"
			description="Restore all settings to their original default values. This action cannot be undone."
		>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="outline"
						className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
					>
						<RotateCcw className="mr-2 h-4 w-4" />
						Reset Settings
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Reset all settings?</AlertDialogTitle>
						<AlertDialogDescription>
							This will restore all preferences to their default values. Your saved
							connections and data will not be affected.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={onReset}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Reset All
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</SettingSection>
	)
}
