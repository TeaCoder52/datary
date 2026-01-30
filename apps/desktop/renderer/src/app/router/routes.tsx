import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../../modules/home/pages/home.page'))
const Settings = lazy(() => import('../../modules/settings/pages/settings.page'))
const Explorer = lazy(() => import('../../modules/explorer/pages/explorer.page'))

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/explorer" element={<Explorer />} />
		</Routes>
	)
}
