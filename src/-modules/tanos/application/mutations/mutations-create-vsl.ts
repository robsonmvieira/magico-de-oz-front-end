import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/-modules/shared/infra/query/query-keys'
import type { CreateVSLInput } from '../../infra/VSLRepository'
import { useCreateVslUseCase } from '../hooks/useCreateVslUseCase'

export function useCreateVsl() {
	const { createAsset } = useCreateVslUseCase()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (params: CreateVSLInput) => createAsset.execute(params),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.vsl.list()
			})
		},
		onError: error => {
			console.error('Erro ao criar asset:', error)
		}
	})
}
