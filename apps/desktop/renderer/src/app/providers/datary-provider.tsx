import { Loader2 } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

interface DataryProviderProps {
	children: ReactNode
}

export function DataryProvider({ children }: DataryProviderProps) {
	const [dataryReady, setDataryReady] = useState<boolean | null>(null)

	useEffect(() => {
		const checkInterval = setInterval(() => {
			if ((window as any).datary) {
				setDataryReady(true)
				clearInterval(checkInterval)
			}
		}, 100)

		const timeout = setTimeout(() => {
			if (!dataryReady) setDataryReady(false)
		}, 3000)

		return () => {
			clearInterval(checkInterval)
			clearTimeout(timeout)
		}
	}, [dataryReady])

	const handleReload = () => window.location.reload()

	if (dataryReady === null) {
		return (
			<div className="bg-background text-foreground flex h-screen w-screen items-center justify-center">
				<Loader2 className="text-primary h-9 w-9 animate-spin" />
			</div>
		)
	}

	if (!dataryReady) {
		return (
			<div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">Something went wrong</h1>
				<p className="text-muted-foreground max-w-xs text-center">
					The application failed to initialize correctly. Please try reloading the app.
				</p>
				<button
					className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white"
					onClick={handleReload}
				>
					Reload
				</button>
			</div>
		)
	}

	return <>{children}</>
}
