import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react'

interface LoadingContextType {
	isLoading: boolean
	loadingMessage: string | null
	startLoading: (message?: string) => void
	stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export function LoadingProvider({ children }: Readonly<PropsWithChildren>) {
	const [isLoading, setIsLoading] = useState(false)
	const [loadingMessage, setLoadingMessage] = useState<string | null>(null)

	const startLoading = useCallback((message?: string) => {
		setLoadingMessage(message ?? null)
		setIsLoading(true)
	}, [])

	const stopLoading = useCallback(() => {
		setIsLoading(false)
		setLoadingMessage(null)
	}, [])

	const value = useMemo(
		() => ({
			isLoading,
			loadingMessage,
			startLoading,
			stopLoading
		}),
		[isLoading, loadingMessage, startLoading, stopLoading]
	)

	return (
		<LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
	)
}

export function useLoading(): LoadingContextType {
	const ctx = useContext(LoadingContext)
	if (!ctx) throw new Error('LoadingContext not found')
	return ctx
}
