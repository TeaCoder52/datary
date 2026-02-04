import keytar from 'keytar'

const SERVICE_NAME = 'datary'

export class CredentialVault {
	public async save(id: string, value: string): Promise<void> {
		await keytar.setPassword(SERVICE_NAME, id, value)
	}

	public async get(id: string): Promise<string | null> {
		return keytar.getPassword(SERVICE_NAME, id)
	}

	public async delete(id: string): Promise<void> {
		await keytar.deletePassword(SERVICE_NAME, id)
	}
}
