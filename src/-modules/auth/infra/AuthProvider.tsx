import { useDeps } from '@/-modules/shared/infra/di/deps'
import { isAuthEnabled } from '@/-modules/shared/infra/env/flags'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '../domain/types'
import { GetCurrentUserUseCase } from '../domain/usecases/get-current-user'
import { AuthRepository } from './auth.repository'

type AuthState = {
	user: User | null
	isAuthenticated: boolean
	setUser: (u: User | null) => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
	const { http } = useDeps()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const init = async () => {
			const repo = new AuthRepository(http)
			const uc = new GetCurrentUserUseCase(repo)
			const current = await uc.execute()
			setUser(current)
		}
		if (isAuthEnabled()) {
			void init()
		} else {
			// ambiente local: usuário stub já é retornado pelo repo quando auth está desativado
			const repo = new AuthRepository(http)
			const uc = new GetCurrentUserUseCase(repo)
			void uc.execute().then(setUser)
		}
	}, [http])

	const value = useMemo<AuthState>(
		() => ({ user, setUser, isAuthenticated: Boolean(user) }),
		[user]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('AuthContext not found')
	return ctx
}
