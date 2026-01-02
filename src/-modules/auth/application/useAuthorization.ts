import type { Role } from '../domain/types'
import { useAuth } from '../infra/AuthProvider'

export function useAuthorization() {
	const { user } = useAuth()
	const roles = new Set(user?.roles ?? [])

	function hasRole(role: Role) {
		return roles.has(role)
	}

	function hasAnyRole(check: Role[]) {
		return check.some(r => roles.has(r))
	}

	return { user, hasRole, hasAnyRole }
}


