import { useDeps } from '@/-modules/shared/infra/di/deps'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { ListAssetsUseCase } from '../../domain/usecases/list-assets'
import { AssetsRepository } from '../../infra/assets.repository'

export function useListAssets(params?: { page?: number }) {
	const { http } = useDeps()

	return useQuery({
		queryKey: queryKeys.assets.list(params),
		queryFn: () => {
			const repo = new AssetsRepository(http)
			const uc = new ListAssetsUseCase(repo)
			return uc.execute(params ?? {})
		},
		staleTime: 60_000
	})
}
