import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDeleteAssetUseCases } from '../hooks/useDeleteAssetUseCases'

export function useDeleteAssets() {
	const { deleteAsset } = useDeleteAssetUseCases()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { id: string }) => deleteAsset.execute(params),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.assets.list()
			})
		}
	})
}
