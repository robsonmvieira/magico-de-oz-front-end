import type { HTTPError } from 'ky'
import { useEffect, useState } from 'react'
import type { Asset } from '@/-modules/assets/domain/use-cases/create-assets'
import { useToast } from '@/-modules/shared/application/hooks'
import { useDeleteAssets } from '../mutations/use-delete-assets'
import { useUpdateFavoriteAssets } from '../mutations/use-update-favorite-assets'

interface UseAssetDrawerActionsProps {
	selectedAsset: Asset | null
	onClose: () => void
}

export function useAssetDrawerActions({
	selectedAsset,
	onClose
}: UseAssetDrawerActionsProps) {
	const toast = useToast()
	const updateFavoriteMutation = useUpdateFavoriteAssets()
	const deleteAssetMutation = useDeleteAssets()

	const [pdfLoading, setPdfLoading] = useState(true)
	const [pdfError, setPdfError] = useState(false)

	const handleUpdateFavorite = () => {
		if (!selectedAsset) return

		updateFavoriteMutation.mutate({
			id: selectedAsset.id,
			is_favorite: !selectedAsset.is_favorite
		})
		toast.success('Favorito atualizado com sucesso!', {
			description: 'O favorito foi atualizado com sucesso.',
			duration: 4000
		})
	}

	const handleDeleteAsset = () => {
		if (!selectedAsset) return

		deleteAssetMutation.mutate(
			{
				id: selectedAsset.id
			},
			{
				onSuccess: () => {
					toast.success('Asset deletado com sucesso!', {
						description: 'O asset foi deletado com sucesso.',
						duration: 4000
					})
					onClose()
				},
				onError: (err: unknown) => {
					const httpError = err as HTTPError
					const not_found_status = 404

					if (httpError.response?.status === not_found_status) {
						toast.error('Asset não encontrado', {
							description: 'O asset não foi encontrado.',
							duration: 4000
						})
						return
					}

					console.error('Erro ao deletar asset:', httpError)
					toast.error('Erro ao deletar asset', {
						description: 'Tente novamente em alguns instantes.',
						duration: 4000
					})
				}
			}
		)
	}

	const handleOpenFullView = () => {
		if (selectedAsset?.file_url) {
			window.open(selectedAsset.file_url, '_blank')
		}
	}

	const handlePdfLoad = () => {
		setPdfLoading(false)
		setPdfError(false)
	}

	const handleCancel = () => {
		onClose()
		setPdfLoading(true)
		setPdfError(false)
	}

	// Reset estado quando asset muda
	useEffect(() => {
		if (selectedAsset) {
			setPdfLoading(true)
			setPdfError(false)
		}
	}, [selectedAsset])

	return {
		pdfLoading,
		pdfError,
		handleUpdateFavorite,
		handleDeleteAsset,
		handleOpenFullView,
		handlePdfLoad,
		handleCancel
	}
}
