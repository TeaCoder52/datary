import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Database, Eye, EyeOff, Link2, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { availableAdapters } from '../../../shared/config/adapters.config'
import { waitForDB } from '../../../shared/lib/db'
import { cn } from '../../../shared/lib/utils'
import {
	type ConnectionFormValues,
	connectionSchema
} from '../../../shared/lib/validators/connection'
import { Button } from '../../../shared/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../../../shared/ui/form'
import { Input } from '../../../shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../../shared/ui/select'

import type { DatabaseConnection } from '@/entities/connection/model/connection.types'

interface ConnectionFormProps {
	onConnect: (
		connectionData: Omit<DatabaseConnection, 'id' | 'lastConnected'> & { password: string }
	) => void
	onImportUrl?: () => void
	initialData?: Partial<DatabaseConnection>
}

export function ConnectionForm({ onConnect, onImportUrl, initialData }: ConnectionFormProps) {
	const [connectionError, setConnectionError] = useState<string | null>(null)
	const [isConnecting, setIsConnecting] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const form = useForm<ConnectionFormValues>({
		resolver: zodResolver(connectionSchema),
		defaultValues: {
			name: initialData?.name ?? '',
			host: initialData?.host ?? '',
			port: initialData?.port ?? 5432,
			user: initialData?.user ?? '',
			password: '',
			database: initialData?.database ?? '',
			connectionType: initialData?.connectionType ?? 'postgresql',
			ssl: initialData?.ssl ?? false
		}
	})

	const parseErrorMessage = (err: unknown) => {
		if (err instanceof Error) {
			const match = err.message.match(/Error: .+/)

			return match ? match[0] : err.message
		}

		return String(err)
	}

	const connectToDatabase = async (config: ConnectionFormValues) => {
		const db = await waitForDB()

		return db.connect(config)
	}

	const onSubmit = async (values: ConnectionFormValues) => {
		setConnectionError(null)
		setIsConnecting(true)

		try {
			await connectToDatabase(values)

			await window.datary.storage.connections.add(values)

			onConnect(values)
		} catch (err) {
			setConnectionError(parseErrorMessage(err))
		} finally {
			setIsConnecting(false)
		}
	}

	const connectionType = form.watch('connectionType')

	useEffect(() => {
		const adapter = availableAdapters.find(a => a.id === connectionType)

		if (adapter) {
			form.setValue('port', adapter.defaultPort)
		}
	}, [connectionType, form])

	return (
		<div className="w-full max-w-xl space-y-6">
			<Button
				variant="outline"
				className="border-border bg-card text-foreground hover:bg-secondary w-full justify-start gap-2"
				onClick={onImportUrl}
			>
				<Link2 className="text-primary h-4 w-4" />
				Import from URL
			</Button>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="border-border w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background text-muted-foreground px-2">
						Or create new connection
					</span>
				</div>
			</div>

			{connectionError && (
				<div className="border-destructive bg-destructive/10 text-destructive flex items-start gap-3 rounded-md border px-4 py-3 text-sm">
					<AlertCircle className="size-5" />
					<span>{parseErrorMessage(connectionError)}</span>
				</div>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Connection Name</FormLabel>
								<FormControl>
									<Input
										placeholder="My Database"
										disabled={isConnecting}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="connectionType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Database Type</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl className="w-full">
										<SelectTrigger>
											<SelectValue placeholder="Select database type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent position="popper">
										{availableAdapters.map(adapter => (
											<SelectItem key={adapter.id} value={adapter.id}>
												<div className="flex items-center gap-2">
													<Database
														className={cn('h-4 w-4', adapter.color)}
													/>
													{adapter.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="host"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Host</FormLabel>
									<FormControl>
										<Input placeholder="localhost" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="port"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Port</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="5432"
											value={field.value}
											onChange={e => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="user"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="postgres" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? 'text' : 'password'}
												placeholder="••••••••"
												{...field}
												className="pr-10"
											/>
											<button
												type="button"
												className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
												onClick={() => setShowPassword(v => !v)}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="database"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Database Name
									<span className="text-muted-foreground ml-1 text-xs">
										(optional)
									</span>
								</FormLabel>
								<FormControl>
									<Input placeholder="mydb" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* <FormField
						control={form.control}
						name="ssl"
						render={({ field }) => (
							<FormItem className="bg-card border-border flex items-center justify-between rounded-lg border px-4 py-3">
								<div className="space-y-0.5">
									<FormLabel className="text-sm">SSL Connection</FormLabel>
									<p className="text-muted-foreground text-xs">
										Use encrypted connection to the database
									</p>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/> */}

					<Button
						type="submit"
						className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
						disabled={isConnecting}
					>
						{isConnecting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Connecting...
							</>
						) : (
							<>
								<Database className="mr-2 h-4 w-4" />
								Connect
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	)
}
