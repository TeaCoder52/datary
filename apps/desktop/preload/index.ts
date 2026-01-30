import { contextBridge } from 'electron'

import { exposeApi } from './expose'

contextBridge.exposeInMainWorld('datary', exposeApi)
