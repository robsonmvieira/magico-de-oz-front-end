import { useAuth } from '../infra/AuthProvider'

export function useAuthorization() {
	const { user } = useAuth()
	const roles = new Set(user?.roles ?? [])

	function hasRole(role: string) {
		return roles.has(role)
	}

	function hasAnyRole(check: string[]) {
		return check.some(r => roles.has(r))
	}

	return { user, hasRole, hasAnyRole }
}


