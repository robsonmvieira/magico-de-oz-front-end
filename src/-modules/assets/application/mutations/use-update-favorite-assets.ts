import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useUpdateFavoriteAssetUseCases } from '../hooks/useUpdateFavoriteAssetUseCases'

export function useUpdateFavoriteAssets() {
	const { updateFavorite } = useUpdateFavoriteAssetUseCases()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { id: string; is_favorite: boolean }) =>
			updateFavorite.execute(params),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.assets.list()
			})
		},
		onError: error => {
			console.error('Erro ao criar asset:', error)
		}
	})
}
