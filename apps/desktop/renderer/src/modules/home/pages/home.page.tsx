import { Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ConnectionForm } from '../components/connection-form'

import { useConnectionStore } from '@/entities/connection/model/connection.store'
import type { DatabaseConnection } from '@/entities/connection/model/connection.types'
import { waitForDB } from '@/shared/lib/db'
import type { ConnectionFormValues } from '@/shared/lib/validators/connection'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Sidebar } from '@/widgets/sidebar/components/Sidebar'

export default function HomePage() {
	const navigate = useNavigate()

	const setConnection = useConnectionStore(state => state.setConnection)

	const [connections, setConnections] = useState<DatabaseConnection[]>()
	const [selectedConnection, setSelectedConnection] = useState<DatabaseConnection | null>(null)

	const [importDialogOpen, setImportDialogOpen] = useState(false)
	const [importUrl, setImportUrl] = useState('')

	useEffect(() => {
		async function loadConnections() {
			const savedConnections = await window.datary.storage.connections.get()
			setConnections(savedConnections)
		}
		loadConnections()
	}, [])

	const handleSelect = (connection: DatabaseConnection) => {
		setSelectedConnection(connection)
	}

	const connectToDatabase = async (config: ConnectionFormValues) => {
		const db = await waitForDB()

		return db.connect(config)
	}

	const handleConnect = async (
		connectionData: Omit<DatabaseConnection, 'id' | 'lastConnected'> & { password: string }
	) => {
		const updatedConnections = await window.datary.storage.connections.add(connectionData)

		setConnection(connectionData)
		setConnections(updatedConnections)

		navigate('/explorer')
	}

	const handleDelete = async (id: string) => {
		const connection = connections!.find(c => c.id === id)
		if (!connection) return

		const updatedConnections = await window.datary.storage.connections.delete(connection)
		setConnections(updatedConnections)

		if (selectedConnection?.id === id) {
			setSelectedConnection(null)
		}
	}

	const handleQuickConnect = async (connection: DatabaseConnection & { password?: string }) => {
		const connWithPassword: Omit<DatabaseConnection, 'id' | 'lastConnected'> & {
			password: string
		} = {
			...connection,
			password: connection.password || ''
		}

		const updatedConnections = await window.datary.storage.connections.add(connWithPassword)

		connectToDatabase(connWithPassword)

		setConnection(connWithPassword)
		setConnections(updatedConnections)

		navigate('/explorer')
	}

	const handleImportUrl = () => {
		if (!importUrl) return

		try {
			const url = new URL(importUrl)

			const connectionData: Omit<DatabaseConnection, 'id' | 'lastConnected'> & {
				password: string
			} = {
				name: `Imported - ${url.hostname}`,
				host: url.hostname,
				port: parseInt(url.port) || 5432,
				user: url.username || 'postgres',
				password: url.password || '',
				database: url.pathname.slice(1) || '',
				type: 'postgresql',
				ssl: url.searchParams.get('sslmode') === 'require'
			}

			handleConnect(connectionData)
			setImportDialogOpen(false)
			setImportUrl('')
		} catch {
			console.error('Invalid connection URL')
		}
	}

	return (
		<div className="bg-background flex h-screen">
			<Sidebar
				connections={connections ?? []}
				selectedId={selectedConnection?.id}
				onSelect={handleSelect}
				onDelete={handleDelete}
				onConnect={handleQuickConnect}
			/>

			<main className="flex flex-1 flex-col overflow-hidden">
				<header className="border-border flex items-center justify-between border-b px-8 py-4">
					<div>
						<h1 className="text-foreground text-xl font-semibold">New Connection</h1>
						<p className="text-muted-foreground text-sm">
							Connect to a database to start exploring
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						asChild
						className="text-muted-foreground hover:bg-secondary hover:text-foreground h-9 w-9 rounded-lg transition-colors"
						aria-label="Open settings"
					>
						<Link to="/settings">
							<Settings className="h-5 w-5" />
						</Link>
					</Button>
				</header>

				<div className="flex flex-1 items-start justify-center overflow-y-auto px-8 py-12">
					<ConnectionForm
						onConnect={handleConnect}
						onImportUrl={() => setImportDialogOpen(true)}
						initialData={selectedConnection || undefined}
					/>
				</div>
			</main>

			<Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle>Import Connection from URL</DialogTitle>
						<DialogDescription>
							Paste a database connection URL to import connection settings
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 pt-3">
						<div className="space-y-2">
							<Label htmlFor="url">Connection URL</Label>
							<Input
								id="url"
								placeholder="postgresql://user:password@host:5432/database"
								value={importUrl}
								onChange={e => setImportUrl(e.target.value)}
							/>
						</div>
						<div className="flex justify-end gap-2">
							<Button variant="outline" onClick={() => setImportDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleImportUrl}>Import</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
