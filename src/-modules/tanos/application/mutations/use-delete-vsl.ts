import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import { useDeleteVslUseCase } from '../hooks/useDeleteVslUseCase'

export function useDeleteVsl() {
	const { deleteVsl } = useDeleteVslUseCase()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: { id: string }) => deleteVsl.execute(params),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.vsl.list()
			})
		}
	})
}
