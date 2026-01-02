import type { HTTPError } from 'ky'
import { useToast } from '@/-modules/shared/application/hooks'
import type { VSL } from '@/-modules/tanos/domain/entities/vsl.entity'
import { useDeleteVsl } from '../mutations/use-delete-vsl'
import { useUpdateFavoriteVsl } from '../mutations/use-update-favorite-vsl'

interface UseVslDrawerActionsProps {
	selectedVsl: VSL | null
	onClose: () => void
}

export function useVslDrawerActions({
	selectedVsl,
	onClose
}: UseVslDrawerActionsProps) {
	const toast = useToast()
	const updateFavoriteMutation = useUpdateFavoriteVsl()
	const deleteVslMutation = useDeleteVsl()

	const handleUpdateFavorite = () => {
		if (!selectedVsl) return

		updateFavoriteMutation.mutate({
			id: selectedVsl.id,
			is_favorite: !selectedVsl.is_favorite
		})
		toast.success('Favorito atualizado com sucesso!', {
			description: 'O favorito foi atualizado com sucesso.',
			duration: 4000
		})
	}

	const handleDeleteVsl = () => {
		if (!selectedVsl) return

		deleteVslMutation.mutate(
			{
				id: selectedVsl.id
			},
			{
				onSuccess: () => {
					toast.success('VSL deletada com sucesso!', {
						description: 'A VSL foi deletada com sucesso.',
						duration: 4000
					})
					onClose()
				},
				onError: (err: unknown) => {
					const httpError = err as HTTPError
					const not_found_status = 404

					if (httpError.response?.status === not_found_status) {
						toast.error('VSL não encontrada', {
							description: 'A VSL não foi encontrada.',
							duration: 4000
						})
						return
					}

					console.error('Erro ao deletar VSL:', httpError)
					toast.error('Erro ao deletar VSL', {
						description: 'Tente novamente em alguns instantes.',
						duration: 4000
					})
				}
			}
		)
	}

	const handleOpenFullView = (url: string) => {
		if (url) {
			window.open(url, '_blank')
		}
	}

	const handleCancel = () => {
		onClose()
	}

	return {
		handleUpdateFavorite,
		handleDeleteVsl,
		handleOpenFullView,
		handleCancel
	}
}
