import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toast } from '@/-modules/shared/application/components'

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<Toast />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
})
