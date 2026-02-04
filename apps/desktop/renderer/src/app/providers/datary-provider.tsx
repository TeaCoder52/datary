import { Loader2 } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

import { Button } from '@/shared/ui/button'

interface DataryProviderProps {
	children: ReactNode
}

export function DataryProvider({ children }: DataryProviderProps) {
	const [ready, setReady] = useState<boolean | null>(null)

	useEffect(() => {
		const checkInterval = setInterval(() => {
			if (window.datary) {
				setReady(true)
				clearInterval(checkInterval)
			}
		}, 100)

		const timeout = setTimeout(() => {
			if (!ready) setReady(false)
		}, 3000)

		return () => {
			clearInterval(checkInterval)
			clearTimeout(timeout)
		}
	}, [ready])

	const handleReload = () => window.location.reload()

	if (ready === null) {
		return (
			<div className="bg-background text-foreground flex h-screen w-screen items-center justify-center">
				<Loader2 className="text-primary h-9 w-9 animate-spin" />
			</div>
		)
	}

	if (!ready) {
		return (
			<div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">Something went wrong</h1>
				<p className="text-muted-foreground max-w-xs text-center">
					The application failed to initialize correctly. Please try reloading the app.
				</p>
				<Button onClick={handleReload}>Reload</Button>
			</div>
		)
	}

	return <>{children}</>
}
