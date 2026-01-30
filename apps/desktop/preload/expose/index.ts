import { dbApi } from './db.api'
import { storageApi } from './storage.api'

export const exposeApi = {
	version: '0.0.1',
	db: dbApi,
	storage: storageApi
}
