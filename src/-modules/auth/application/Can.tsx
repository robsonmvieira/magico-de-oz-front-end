import type { PropsWithChildren, ReactNode } from 'react'
import { useAuthorization } from './useAuthorization'

type CanProps = PropsWithChildren<{
	roles?: string[]
	fallback?: ReactNode
}>

export function Can({ roles, children, fallback = null }: CanProps) {
	const { hasAnyRole } = useAuthorization()
	if (!roles || roles.length === 0) return children
	return hasAnyRole(roles) ? children : <>{fallback}</>
}
