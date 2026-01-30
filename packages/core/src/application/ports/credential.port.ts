export interface CredentialPort {
	encrypt?(plain: string): Promise<string>
	decrypt(encrypted: string): Promise<string>
}
