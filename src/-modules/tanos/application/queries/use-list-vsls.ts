import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useVslsUseCases } from '../hooks/useVslsUseCase'

export function useListVsls(params?: { page?: number }) {
	const { listAssets } = useVslsUseCases()

	return useQuery({
		queryKey: queryKeys.assets.list(params),
		queryFn: () => listAssets.execute(params ?? {}),
		staleTime: 60_000
	})
}
