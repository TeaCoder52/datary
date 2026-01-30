export const logger = {
	info: (...args: any[]) => console.info('[main]', ...args),
	error: (...args: any[]) => console.error('[main]', ...args),
	debug: (...args: any[]) => console.debug('[main]', ...args)
}
