import { z } from 'zod'

const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/

const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/

const DOMAIN_REGEX = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))+$/

export const connectionSchema = z.object({
	name: z.string().min(1, 'Connection name is required').max(50, 'Name is too long'),
	connectionType: z.enum(['postgresql', 'mysql', 'mariadb', 'sqlite', 'mssql']),
	host: z
		.string()
		.min(1, 'Host is required')
		.refine(
			value =>
				value === 'localhost' ||
				IPV4_REGEX.test(value) ||
				IPV6_REGEX.test(value) ||
				DOMAIN_REGEX.test(value),
			{
				message: 'Host must be a valid domain, IP address, or "localhost"'
			}
		),
	port: z
		.number()
		.int('Port must be an integer')
		.min(1, 'Port must be between 1 and 65535')
		.max(65535, 'Port must be between 1 and 65535'),
	user: z.string().min(1, 'Username is required').max(64),
	password: z.string().max(128),
	database: z.string().max(64),
	ssl: z.boolean()
})

export type ConnectionFormValues = z.infer<typeof connectionSchema>
