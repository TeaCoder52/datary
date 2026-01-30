export function formatLastConnected(value?: string) {
	if (!value) return 'Never'

	const date = new Date(value)
	const now = new Date()
	const diff = now.getTime() - date.getTime()

	const days = Math.floor(diff / (1000 * 60 * 60 * 24))

	if (days === 0) return 'Today'
	if (days === 1) return 'Yesterday'
	if (days < 7) return `${days} days ago`

	return date.toLocaleDateString()
}
