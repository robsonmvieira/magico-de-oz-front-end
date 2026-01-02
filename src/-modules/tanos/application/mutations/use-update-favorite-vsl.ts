import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useUpdateFavoriteVslUseCase } from '../hooks/useUpdateFavoriteVslUseCase'

export function useUpdateFavoriteVsl() {
	const { updateFavorite } = useUpdateFavoriteVslUseCase()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { id: string; is_favorite: boolean }) =>
			updateFavorite.execute(params),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.vsl.list()
			})
		},
		onError: error => {
			console.error('Erro ao atualizar favorito:', error)
		}
	})
}
