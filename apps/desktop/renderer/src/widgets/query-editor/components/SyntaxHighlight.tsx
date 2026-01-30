import { useMemo } from 'react'

import { escapeHtml, highlightKeywords } from '../lib/syntax-highlight'

export function SyntaxHighlight({ code }: { code: string }) {
	const highlightedCode = useMemo(() => {
		if (!code) return ''

		const tokens: { start: number; end: number; type: 'string' | 'number' | 'comment' }[] = []

		const stringRegex = /'[^']*'/g
		let match
		while ((match = stringRegex.exec(code)) !== null) {
			tokens.push({ start: match.index, end: match.index + match[0].length, type: 'string' })
		}

		const numberRegex = /\b\d+(\.\d+)?\b/g
		while ((match = numberRegex.exec(code)) !== null) {
			if (!tokens.some(t => match!.index >= t.start && match!.index < t.end)) {
				tokens.push({
					start: match.index,
					end: match.index + match[0].length,
					type: 'number'
				})
			}
		}

		const commentRegex = /--.*$/gm
		while ((match = commentRegex.exec(code)) !== null) {
			tokens.push({
				start: match.index,
				end: match.index + match[0].length,
				type: 'comment'
			})
		}

		tokens.sort((a, b) => a.start - b.start)

		let result = ''
		let lastIndex = 0

		for (const token of tokens) {
			const plain = code.slice(lastIndex, token.start)
			result += highlightKeywords(escapeHtml(plain))

			const tokenText = escapeHtml(code.slice(token.start, token.end))

			if (token.type === 'string') {
				result += `<span class="text-chart-2">${tokenText}</span>`
			}
			if (token.type === 'number') {
				result += `<span class="text-chart-3">${tokenText}</span>`
			}
			if (token.type === 'comment') {
				result += `<span class="text-muted-foreground italic">${tokenText}</span>`
			}

			lastIndex = token.end
		}

		const rest = code.slice(lastIndex)
		result += highlightKeywords(escapeHtml(rest))

		return result
	}, [code])

	return <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
}
