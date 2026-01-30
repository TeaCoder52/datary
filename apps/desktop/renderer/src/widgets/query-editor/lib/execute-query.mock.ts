import type { QueryResult } from '../types'

export async function executeQuery(query: string): Promise<QueryResult> {
	await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

	const trimmedQuery = query.trim().toUpperCase()

	if (trimmedQuery.startsWith('SELECT COUNT')) {
		return {
			columns: ['count'],
			rows: [{ count: 1247 }],
			rowCount: 1,
			executionTime: 45,
			isScalar: true,
			scalarValue: 1247
		}
	}

	if (
		trimmedQuery.includes('SUM(') ||
		trimmedQuery.includes('AVG(') ||
		trimmedQuery.includes('MAX(') ||
		trimmedQuery.includes('MIN(')
	) {
		return {
			columns: ['result'],
			rows: [{ result: 45892.5 }],
			rowCount: 1,
			executionTime: 62,
			isScalar: true,
			scalarValue: 45892.5
		}
	}

	return {
		columns: ['id', 'name', 'email', 'status', 'created_at', 'last_login'],
		rows: [
			{
				id: 1,
				name: 'John Doe',
				email: 'john@example.com',
				status: 'active',
				created_at: '2024-01-15',
				last_login: '2024-01-20 14:32:00'
			},
			{
				id: 2,
				name: 'Jane Smith',
				email: 'jane@example.com',
				status: 'active',
				created_at: '2024-01-16',
				last_login: '2024-01-20 09:15:00'
			},
			{
				id: 3,
				name: 'Bob Wilson',
				email: 'bob@example.com',
				status: 'inactive',
				created_at: '2024-01-17',
				last_login: '2024-01-18 16:45:00'
			},
			{
				id: 4,
				name: 'Alice Brown',
				email: 'alice@example.com',
				status: 'active',
				created_at: '2024-01-18',
				last_login: '2024-01-20 11:22:00'
			},
			{
				id: 5,
				name: 'Charlie Davis',
				email: 'charlie@example.com',
				status: 'pending',
				created_at: '2024-01-19',
				last_login: null
			},
			{
				id: 6,
				name: 'Eva Martinez',
				email: 'eva@example.com',
				status: 'active',
				created_at: '2024-01-19',
				last_login: '2024-01-20 08:00:00'
			},
			{
				id: 7,
				name: 'Frank Lee',
				email: 'frank@example.com',
				status: 'active',
				created_at: '2024-01-20',
				last_login: '2024-01-20 13:45:00'
			},
			{
				id: 8,
				name: 'Grace Kim',
				email: 'grace@example.com',
				status: 'inactive',
				created_at: '2024-01-20',
				last_login: '2024-01-15 10:30:00'
			}
		],
		rowCount: 8,
		executionTime: 128
	}
}
