import { FileText } from 'lucide-react'
import type { FormEvent } from 'react'
import { useCreateAssets } from '@/-modules/assets/application/mutations/use-create-assets'
import { useAssetStore } from '@/-modules/assets/infra/store/asset.store'
import { DrawerPreviewBase } from '@/-modules/shared/application/components/drawer-preview'
import { useToast } from '@/-modules/shared/application/hooks'
import {
	extractYouTubeVideoId,
	isValidYouTubeVideoUrl,
	isYouTubeDomain
} from '@/-modules/shared/domain/utils/youtube-validator'
import { useAssetDrawerActions } from '../../../hooks/useAssetDrawerActions'
import { AssetPdfRenderer } from '../../renderers/asset-pdf-renderer'
import { CreateAssetsForm } from './components'
import { ButtonActions, DateInfo } from './components/drawer-components'

export function ContentScrapping() {
	const toast = useToast()
	const createAssetMutation = useCreateAssets()
	const isOpen = useAssetStore(state => state.isDrawerOpen)
	const closeDrawer = useAssetStore(state => state.closeDrawer)
	const selectedAsset = useAssetStore(state => state.selectedItem)

	const {
		pdfLoading,
		pdfError,
		handleUpdateFavorite,
		handleDeleteAsset,
		handleOpenFullView,
		handlePdfLoad,
		handleCancel
	} = useAssetDrawerActions({
		selectedAsset,
		onClose: closeDrawer
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.target as HTMLFormElement
		const url = form.url.value.trim()

		// Validar se a URL é válida
		if (!url) {
			toast.error('URL obrigatória', {
				description: 'Por favor, informe a URL do vídeo do YouTube.',
				duration: 4000
			})
			return
		}

		// Verificar se é uma URL do YouTube
		if (!isYouTubeDomain(url)) {
			toast.error('URL inválida', {
				description: 'No momento, apenas URLs do YouTube são suportadas.',
				duration: 4000
			})
			return
		}

		// Verificar se é uma URL de vídeo válida do YouTube
		if (!isValidYouTubeVideoUrl(url)) {
			toast.error('URL de vídeo inválida', {
				description:
					'Por favor, informe uma URL de vídeo específica do YouTube (ex: /watch?v=ID).',
				duration: 4000
			})
			return
		}

		// Extrair ID do vídeo
		const videoId = extractYouTubeVideoId(url)
		if (!videoId) {
			toast.error('Erro ao extrair ID', {
				description: 'Não foi possível extrair o ID do vídeo da URL.',
				duration: 4000
			})
			return
		}
		createAssetMutation.mutate(
			{
				url: url
			},
			{
				onSuccess: () => {
					toast.success('Solicitação realizada com sucesso!', {
						description: `Em breve você receberá o conteúdo do vídeo.`,
						duration: 4000
					})
					// Limpar formulário
					form.reset()
				},
				onError: (error: unknown) => {
					toast.error('Erro ao processar solicitação', {
						description: 'Tente novamente em alguns instantes.',
						duration: 4000
					})
					console.error('Erro ao criar asset:', error)
				}
			}
		)
	}

	return (
		<>
			<CreateAssetsForm
				onSubmit={handleSubmit}
				isPending={createAssetMutation.isPending}
			/>
			<DrawerPreviewBase
				isOpen={isOpen}
				onClose={handleCancel}
				selectedItem={selectedAsset}
				icon={<FileText className='w-10 h-10' />}
				footerInfo={<DateInfo date={selectedAsset?.created_at} />}
				footerActions={
					<ButtonActions
						handleOpenFullView={handleOpenFullView}
						handleUpdateFavorite={handleUpdateFavorite}
						handleDeleteAsset={handleDeleteAsset}
						selectedAsset={selectedAsset}
					/>
				}
			>
				<AssetPdfRenderer
					asset={selectedAsset}
					pdfLoading={pdfLoading}
					pdfError={pdfError}
					onPdfLoad={handlePdfLoad}
					onOpenFullView={handleOpenFullView}
				/>
			</DrawerPreviewBase>
		</>
	)
}
ContentScrapping.displayName = 'ContentScrapping'
