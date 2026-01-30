export const IPC_CHANNELS = {
	SETTINGS: {
		GET: 'settings:get',
		SET: 'settings:set',
		DELETE: 'settings:delete',
		CLEAR: 'settings:clear'
	},
	CONNECTIONS: {
		GET: 'connections:get',
		ADD: 'connections:add',
		DELETE: 'connections:delete',
		CLEAR: 'connections:clear'
	},

	DB_CONNECT: 'db:connect',
	DB_DISCONNECT: 'db:disconnect',

	DB_QUERY: 'db:query',

	DB_LOAD_DATABASES: 'db:metadata:load-databases',
	DB_LOAD_SCHEMAS: 'db:metadata:load-schemas',
	DB_LOAD_TABLES: 'db:metadata:load-tables',
	DB_LOAD_VIEWS: 'db:metadata:load-views',
	DB_LOAD_COLUMNS: 'db:metadata:load-columns',
	DB_LOAD_DATA: 'db:metadata:load-data'
} as const
