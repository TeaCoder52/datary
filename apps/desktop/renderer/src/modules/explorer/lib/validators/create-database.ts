import { z } from 'zod'

import { DATABASE_ENCODINGS, type DatabaseEncoding } from '../constants'

export const createDatabaseSchema = z.object({
	name: z.string().min(1, 'Database name is required'),
	encoding: z
		.enum(DATABASE_ENCODINGS)
		.default('utf8')
		.transform(val => val as DatabaseEncoding)
})

export type CreateDatabaseFormValues = z.infer<typeof createDatabaseSchema>
