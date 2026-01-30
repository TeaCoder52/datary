import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	base: './',
	server: {
		port: 5173,
		strictPort: true
	},
	resolve: {
		alias: {
			'@': '/src'
		}
	}
})
