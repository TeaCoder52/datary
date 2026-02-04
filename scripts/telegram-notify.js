import fetch from 'node-fetch';
import fs from 'fs';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const actor = process.env.GITHUB_ACTOR;
const event = process.env.GITHUB_EVENT_NAME;
const repo = process.env.GITHUB_REPOSITORY;
const ref = process.env.GITHUB_REF;
const sha = process.env.GITHUB_SHA;
const payloadPath = process.env.GITHUB_EVENT_PATH;

let message = `*GitHub Notification*\nRepository: ${repo}\nActor: ${actor}\nEvent: ${event}\nRef: ${ref}\nSHA: ${sha}`;

if (payloadPath && fs.existsSync(payloadPath)) {
	const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

	if (event === 'pull_request') {
		const pr = payload.pull_request;
		message += `\nPR Title: ${pr.title}\nAction: ${payload.action}\nURL: ${pr.html_url}`;
	}

	if (event === 'issues') {
		const issue = payload.issue;
		message += `\nIssue Title: ${issue.title}\nAction: ${payload.action}\nURL: ${issue.html_url}`;
	}
}

await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
		chat_id: chatId,
		text: message,
		parse_mode: 'Markdown'
	})
});

