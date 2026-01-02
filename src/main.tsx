import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from '@/-modules/auth/infra/AuthProvider'
import { AppDepsProvider } from '@/-modules/shared/infra/di/deps'
import { QueryProvider } from '@/-modules/shared/infra/query/QueryProvider'
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist in index.html
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<AppDepsProvider>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</AppDepsProvider>
		</QueryProvider>
	</StrictMode>
)
