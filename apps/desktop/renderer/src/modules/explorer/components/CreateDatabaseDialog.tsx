import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DATABASE_ENCODINGS } from '../lib/constants'
import {
	type CreateDatabaseFormValues,
	createDatabaseSchema
} from '../lib/validators/create-database'

import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function CreateDatabaseDialog({ open, onOpenChange }: Props) {
	const form = useForm<CreateDatabaseFormValues>({
		// @ts-ignore
		resolver: zodResolver(createDatabaseSchema),
		defaultValues: {
			name: '',
			encoding: 'utf8'
		}
	})

	const handleSubmit = (values: CreateDatabaseFormValues) => {
		toast.success(`Database "${values.name}" successfully created`)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-130">
				<DialogHeader>
					<DialogTitle>Create New Database</DialogTitle>
					<DialogDescription>
						Enter the database name and choose encoding.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={
							// @ts-ignore
							form.handleSubmit(handleSubmit)
						}
						className="space-y-4 pt-3"
					>
						<FormField
							// @ts-ignore
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Database Name</FormLabel>
									<FormControl>
										<Input placeholder="mydb" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							// @ts-ignore
							control={form.control}
							name="encoding"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Encoding</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select encoding" />
											</SelectTrigger>
											<SelectContent position="popper">
												{DATABASE_ENCODINGS.map(enc => (
													<SelectItem key={enc} value={enc}>
														{enc.toUpperCase()}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button variant="outline" onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
