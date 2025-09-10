import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCreateAssetUseCases } from '../hooks'

export function useCreateAssets() {
	const { createAsset } = useCreateAssetUseCases()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { url: string }) => createAsset.execute(params),
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
