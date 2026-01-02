import { isAuthEnabled } from '@/-modules/shared/infra/env/flags'
import { useAuth } from '../../infra/AuthProvider'

export function requireAuth() {
	return {
		beforeLoad: () => {
			if (!isAuthEnabled()) return
			// As guards in TanStack Router are hooks, we need to rely on route-level usage.
		}
	}
}

export function useRequireAuth() {
	const { isAuthenticated } = useAuth()
	return (redirect: (to: string) => void) => {
		if (!isAuthEnabled()) return
		if (!isAuthenticated) redirect('/login')
	}
}
