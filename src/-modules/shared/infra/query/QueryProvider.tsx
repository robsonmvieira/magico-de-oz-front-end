import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren, useState } from 'react'
import { createQueryClient } from './queryClient'

export function QueryProvider({ children }: PropsWithChildren): JSX.Element {
	const [client] = useState(() => createQueryClient())
	return (
		<QueryClientProvider client={client}>
			{children}
			{import.meta.env.DEV ? (
				<ReactQueryDevtools buttonPosition='bottom-right' />
			) : null}
		</QueryClientProvider>
	)
}
