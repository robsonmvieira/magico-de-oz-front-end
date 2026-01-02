import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useAssetsUseCases } from '../hooks/useAssetsUseCases'

export function useListAssets(params?: { page?: number }) {
	const { listAssets } = useAssetsUseCases()

	return useQuery({
		queryKey: queryKeys.assets.list(params),
		queryFn: () => listAssets.execute(params ?? {}),
		staleTime: 60_000
	})
}
