import { SyntaxHighlight } from './SyntaxHighlight'

interface QueryTextareaProps {
	editorRef: React.RefObject<HTMLTextAreaElement | null>
	highlightRef: React.RefObject<HTMLDivElement | null>
	query: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
	onScroll: () => void
}

export function QueryTextarea({
	editorRef,
	highlightRef,
	query,
	onChange,
	onKeyDown,
	onScroll
}: QueryTextareaProps) {
	return (
		<div className="relative flex-1 overflow-hidden">
			<div
				ref={highlightRef}
				className="pointer-events-none absolute inset-0 overflow-auto p-3 text-sm leading-6 whitespace-pre-wrap"
				aria-hidden="true"
			>
				<SyntaxHighlight code={query} />
			</div>

			<textarea
				ref={editorRef}
				value={query}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onScroll={onScroll}
				className="caret-foreground absolute inset-0 h-full w-full resize-none bg-transparent p-3 text-sm leading-6 text-transparent outline-none"
				spellCheck={false}
				autoCapitalize="off"
				autoComplete="off"
				autoCorrect="off"
				placeholder="Enter your SQL query here..."
			/>
		</div>
	)
}
