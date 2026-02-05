import fs from 'fs'

const {
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID,
	GITHUB_EVENT_NAME,
	GITHUB_EVENT_PATH,
	GITHUB_REPOSITORY,
	GITHUB_ACTOR,
	GITHUB_REF,
} = process.env

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
	console.error('Telegram env vars are missing')
	process.exit(1)
}

let message = `*GitHub Notification*\n\n`
message += `Repo: ${GITHUB_REPOSITORY}\n`
message += `Actor: ${GITHUB_ACTOR}\n`
message += `Event: ${GITHUB_EVENT_NAME}\n`

if (GITHUB_EVENT_PATH && fs.existsSync(GITHUB_EVENT_PATH)) {
	const payload = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH, 'utf8'))

	if (GITHUB_EVENT_NAME === 'push') {
		message += `\n*Push*\n\n`
		message += `Branch: ${GITHUB_REF?.replace('refs/heads/', '')}\n`

		payload.commits?.slice(0, 3).forEach((c, i) => {
			message += `${i + 1}. ${c.message.split('\n')[0]}\n`
		})
	}

	if (GITHUB_EVENT_NAME === 'pull_request' || GITHUB_EVENT_NAME === 'pull_request_target') {
		const pr = payload.pull_request
		message += `\n*Pull Request*\n\n`
		message += `Title: ${pr.title}\n`
		message += `Action: ${payload.action}\n`
		message += `URL: ${pr.html_url}\n`
	}

	if (GITHUB_EVENT_NAME === 'issues') {
		const issue = payload.issue
		message += `\n*Issue*\n\n`
		message += `Title: ${issue.title}\n`
		message += `Action: ${payload.action}\n`
		message += `URL: ${issue.html_url}\n`
	}
}

await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		chat_id: TELEGRAM_CHAT_ID,
		text: message,
		parse_mode: 'Markdown'
	})
})
