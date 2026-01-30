import { SQL_FUNCTIONS, SQL_KEYWORDS, SQL_TYPES } from './sql-keywords'

export function escapeHtml(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

export function highlightKeywords(text: string): string {
	let result = text

	const wordBoundary = '(?<![a-zA-Z0-9_-])($1)(?![a-zA-Z0-9_-])'

	for (const keyword of SQL_KEYWORDS) {
		const regex = new RegExp(wordBoundary.replace('$1', keyword), 'gi')
		result = result.replace(regex, '<span class="text-primary font-medium">$1</span>')
	}

	for (const func of SQL_FUNCTIONS) {
		const regex = new RegExp(`(?<![a-zA-Z0-9_-])(${func})(?=\\s*\\()`, 'gi')
		result = result.replace(regex, '<span class="text-chart-4">$1</span>')
	}

	for (const type of SQL_TYPES) {
		const regex = new RegExp(`(?<![a-zA-Z0-9_-])(${type})(?![a-zA-Z0-9_-])`, 'gi')
		result = result.replace(regex, '<span class="text-chart-5">$1</span>')
	}

	return result
}
