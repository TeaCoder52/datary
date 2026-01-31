import type {
	ColumnMetadataContract,
	DatabaseMetadataContract,
	TableMetadataContract
} from '@datary/core'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { DataryProvider } from './app/providers/datary-provider'
import { ThemeProvider } from './app/providers/theme-provider'
import { ToastProvider } from './app/providers/toast-provider'
import { AppRouter } from './app/router/routes'
import './app/styles/globals.css'

declare global {
	interface Window {
		datary: {
			version: string
			db: {
				connect: Function
				getAdapterType: Function
				loadDatabases(): Promise<DatabaseMetadataContract[]>
				loadSchemas(database: string): Promise<any[]>
				loadTables(
					database: string,
					schema: string | null
				): Promise<TableMetadataContract[]>
				loadViews(database: string, schema: string | null): Promise<TableMetadataContract[]>
				loadColumns(
					database: string,
					schema: string,
					table: string
				): Promise<ColumnMetadataContract[]>
				loadTableData: any
				disconnect: Function
			}
			storage: {
				settings: {
					get<T>(key: string): Promise<T>
					set(key: string, value: any): Promise<boolean>
					delete(key: string): Promise<boolean>
					clear(): Promise<boolean>
				}
				connections: any
			}
		}
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<ThemeProvider>
			<DataryProvider>
				<ToastProvider />

				<AppRouter />
			</DataryProvider>
		</ThemeProvider>
	</HashRouter>
)
