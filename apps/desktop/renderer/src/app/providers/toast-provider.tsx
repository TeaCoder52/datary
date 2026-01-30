import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			toastOptions={{
				duration: 4000,
				style: {
					fontFamily: "'Geist Mono', monospace",
					fontSize: '0.875rem',
					borderRadius: '0.5rem',
					padding: '0.75rem 1rem',
					color: 'var(--foreground)',
					background: 'var(--card)',
					boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
				},
				success: {
					style: { background: 'var(--chart-2)', color: 'var(--foreground)' }
				},
				error: {
					style: {
						background: 'var(--destructive)',
						color: 'var(--destructive-foreground)'
					}
				}
			}}
		/>
	)
}
