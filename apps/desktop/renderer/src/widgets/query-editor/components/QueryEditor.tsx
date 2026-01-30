import { useQueryEditor } from '../hooks/useQueryEditor'

import { QueryLineNumbers } from './QueryLineNumbers'
import { QueryResultsPanel } from './QueryResultsPanel'
import { QueryTextarea } from './QueryTextarea'
import { QueryToolbar } from './QueryToolbar'

interface QueryEditorProps {
	initialQuery?: string
	onQueryChange?: (query: string) => void
}

export function QueryEditor({ initialQuery = '', onQueryChange }: QueryEditorProps) {
	const { state, refs, actions, derived } = useQueryEditor({ initialQuery, onQueryChange })

	return (
		<div ref={refs.containerRef} className="bg-background flex h-full flex-col">
			<QueryToolbar
				query={state.query}
				isRunning={state.isRunning}
				onRun={actions.runQuery}
				onClear={actions.clearEditor}
			/>

			<div className="relative flex-1 overflow-hidden">
				<div className="flex h-full">
					<QueryLineNumbers lineNumbers={derived.lineNumbers} />
					<QueryTextarea
						editorRef={refs.editorRef}
						highlightRef={refs.highlightRef}
						query={state.query}
						onChange={actions.handleQueryChange}
						onKeyDown={actions.handleKeyDown}
						onScroll={actions.handleScroll}
					/>
				</div>
			</div>

			{(state.result || state.error || state.isRunning) && (
				<QueryResultsPanel
					result={state.result}
					error={state.error}
					isRunning={state.isRunning}
					isExpanded={state.isResultsExpanded}
					isMaximized={state.isResultsMaximized}
					panelHeight={state.resultsPanelHeight}
					isResizing={state.isResizingResults}
					onToggleExpand={() => actions.setIsResultsExpanded(!state.isResultsExpanded)}
					onToggleMaximize={() =>
						actions.setIsResultsMaximized(!state.isResultsMaximized)
					}
					onCopy={actions.copyResults}
					onResizeMouseDown={actions.handleResultsMouseDown}
					copied={state.copied}
				/>
			)}
		</div>
	)
}
