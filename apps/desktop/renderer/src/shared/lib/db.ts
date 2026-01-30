export const waitForDB = async (timeout = 5000, interval = 50) => {
	let elapsed = 0

	return new Promise<typeof window.datary.db>((resolve, reject) => {
		const check = () => {
			if (window.datary?.db) return resolve(window.datary.db)

			elapsed += interval

			if (elapsed >= timeout) return reject(new Error('Database API not available'))

			setTimeout(check, interval)
		}

		check()
	})
}
