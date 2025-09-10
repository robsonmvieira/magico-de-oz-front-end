import {
	createContext,
	type JSX,
	type PropsWithChildren,
	useContext,
	useMemo
} from 'react'
import type { HttpClient } from '../http/http-client'
import { KyHttpClient } from '../http/ky-http-client'

type AppDeps = {
	http: HttpClient
}

const DepsContext = createContext<AppDeps | null>(null)

export function AppDepsProvider({
	children
}: Readonly<PropsWithChildren>): JSX.Element {
	const deps = useMemo<AppDeps>(() => ({ http: new KyHttpClient() }), [])
	return <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>
}

export function useDeps(): AppDeps {
	const ctx = useContext(DepsContext)
	if (!ctx) throw new Error('DepsContext not found')
	return ctx
}
