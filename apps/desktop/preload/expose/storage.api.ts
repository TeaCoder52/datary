import { IPC_CHANNELS } from '@datary/ipc'
import { ipcRenderer } from 'electron'

export const storageApi = {
	settings: {
		get: <T>(key: string): Promise<T> => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.GET, key),

		set: (key: string, value: unknown) =>
			ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.SET, key, value),

		delete: (key: string) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.DELETE, key),

		clear: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.CLEAR)
	},

	connections: {
		get: (): Promise<any[]> => ipcRenderer.invoke(IPC_CHANNELS.CONNECTIONS.GET),

		add: (connection: any) => ipcRenderer.invoke(IPC_CHANNELS.CONNECTIONS.ADD, connection),

		delete: (connection: any) =>
			ipcRenderer.invoke(IPC_CHANNELS.CONNECTIONS.DELETE, connection),

		clear: () => ipcRenderer.invoke(IPC_CHANNELS.CONNECTIONS.CLEAR)
	}
}
