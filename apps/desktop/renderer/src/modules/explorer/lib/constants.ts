export const DATABASE_ENCODINGS = ['utf8', 'latin5', 'utf16', 'ascii'] as const

export type DatabaseEncoding = (typeof DATABASE_ENCODINGS)[number]
