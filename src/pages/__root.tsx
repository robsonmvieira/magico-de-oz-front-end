import { Toast } from '@/-modules/shared/application/components'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<Toast />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
})
