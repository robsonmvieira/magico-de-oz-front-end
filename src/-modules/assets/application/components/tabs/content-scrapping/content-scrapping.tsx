import { useCreateAssets } from '@/-modules/assets/application/mutations/use-create-assets'
import { useAssetStore } from '@/-modules/assets/infra/store/asset.store'
import { useToast } from '@/-modules/shared/application/hooks'
import {
	extractYouTubeVideoId,
	isValidYouTubeVideoUrl,
	isYouTubeDomain
} from '@/-modules/shared/domain/utils/youtube-validator'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { Download, ExternalLink, FileText, Loader2, Star } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useUpdateFavoriteAssets } from '../../../mutations/use-update-favorite-assets'
export function ContentScrapping() {
	const toast = useToast()
	const createAssetMutation = useCreateAssets()
	const updateFavoriteMutation = useUpdateFavoriteAssets()
	const isOpen = useAssetStore(state => state.isDrawerOpen)
	const closeDrawer = useAssetStore(state => state.closeDrawer)
	const selectedAsset = useAssetStore(state => state.selectedAsset)
	const [pdfLoading, setPdfLoading] = useState(true)
	const [pdfError, setPdfError] = useState(false)
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

		// Abrir drawer para confirmação
		// setPendingUrl(url)
		// setIsOpen(true)
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

	const handleUpdateFavorite = () => {
		updateFavoriteMutation.mutate({
			id: selectedAsset?.id as string,
			is_favorite: !selectedAsset?.is_favorite
		})
		toast.success('Favorito atualizado com sucesso!', {
			description: 'O favorito foi atualizado com sucesso.',
			duration: 4000
		})
	}
	const handleCancel = () => {
		closeDrawer()
		setPdfLoading(true)
		setPdfError(false)
	}

	const handleDownloadPdf = () => {
		if (selectedAsset?.file_url) {
			const link = document.createElement('a')
			link.href = selectedAsset.file_url
			link.download = `${selectedAsset.title || 'document'}.pdf`
			link.target = '_blank'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}
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

	useEffect(() => {
		console.log('selectedAsset', selectedAsset)
		if (selectedAsset) {
			setPdfLoading(true)
			setPdfError(false)
		}
	}, [selectedAsset])
	return (
		<>
			<TabsContent
				value='content-scrapping'
				className='bg-white h-full min-h-0 rounded-lg p-4 overflow-hidden'
			>
				<div className='flex flex-col gap-4 w-full h-full'>
					<h1 className='text-2xl text-primary-500 font-bold'>
						Put the URL of the Youtube video!
					</h1>
					<div className='flex gap-2'>
						<form className='w-full flex gap-2' onSubmit={handleSubmit}>
							<Input
								name='url'
								className='flex-1 bg-white h-12'
								type='text'
								placeholder='Enter the URL of the Youtube video'
							/>
							<Button
								className='h-12 font-medium cursor-pointer'
								type='submit'
								disabled={createAssetMutation.isPending}
							>
								{createAssetMutation.isPending
									? 'Processing...'
									: 'Get Content'}
							</Button>
						</form>
					</div>
				</div>
			</TabsContent>
			<Drawer
				open={isOpen}
				onOpenChange={open => !open && handleCancel()}
				direction='right'
			>
				<DrawerContent className='w-[800px] !max-w-[800px] sm:!max-w-[800px] h-screen flex flex-col'>
					<DrawerHeader className='flex-shrink-0'>
						<DrawerTitle className='text-lg font-medium flex items-center gap-2'>
							<FileText className='w-10 h-10' />
							{selectedAsset?.title}
						</DrawerTitle>
					</DrawerHeader>

					<div className='flex-1 px-6 pb-4 min-h-0'>
						{selectedAsset?.file_url ? (
							<div className='relative w-full h-full border rounded-lg overflow-hidden bg-gray-50'>
								{pdfLoading && (
									<div className='absolute inset-0 flex items-center justify-center bg-white/80 z-10'>
										<div className='flex items-center gap-2 text-gray-600'>
											<Loader2 className='w-5 h-5 animate-spin' />
											<span>Carregando PDF...</span>
										</div>
									</div>
								)}

								{pdfError ? (
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='text-center p-6'>
											<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
											<h3 className='font-medium text-gray-900 mb-2'>
												Erro ao carregar PDF
											</h3>
											<p className='text-sm text-gray-600 mb-4'>
												Não foi possível carregar o preview do PDF.
											</p>
											<Button
												variant='outline'
												size='sm'
												onClick={handleOpenFullView}
												className='flex items-center gap-2'
											>
												<ExternalLink className='w-4 h-4' />
												Abrir em nova aba
											</Button>
										</div>
									</div>
								) : (
									<object
										className='w-full h-full'
										data={selectedAsset.file_url}
										type='application/pdf'
										onLoad={handlePdfLoad}
									>
										<div className='flex items-center justify-center h-full'>
											<div className='text-center p-6'>
												<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
												<h3 className='font-medium text-gray-900 mb-2'>
													PDF não suportado
												</h3>
												<p className='text-sm text-gray-600 mb-4'>
													Seu navegador não suporta visualização de PDF.
												</p>
												<Button
													variant='outline'
													size='sm'
													onClick={handleOpenFullView}
													className='flex items-center gap-2'
												>
													<ExternalLink className='w-4 h-4' />
													Abrir em nova aba
												</Button>
											</div>
										</div>
									</object>
								)}
							</div>
						) : (
							<div className='flex items-center justify-center h-full border rounded-lg bg-gray-50'>
								<div className='text-center p-6'>
									<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
									<h3 className='font-medium text-gray-900 mb-2'>
										Nenhum arquivo disponível
									</h3>
									<p className='text-sm text-gray-600'>
										O arquivo PDF não está disponível para visualização.
									</p>
								</div>
							</div>
						)}
					</div>

					<DrawerFooter className='flex-shrink-0'>
						<div className='flex gap-2'>
							<Button
								onClick={handleOpenFullView}
								disabled={!selectedAsset?.file_url}
								className='flex items-center gap-2 h-12 cursor-pointer'
							>
								<ExternalLink className='w-4 h-4' />
								Visão completa
							</Button>
							<Button
								variant='outline'
								onClick={handleDownloadPdf}
								disabled={!selectedAsset?.file_url}
								className='flex items-center gap-2 h-12 cursor-pointer'
							>
								<Download className='w-4 h-4' />
								Download
							</Button>
							<Button
								variant='secondary'
								onClick={handleUpdateFavorite}
								disabled={!selectedAsset?.file_url || !selectedAsset?.id}
								className='flex items-center gap-2 h-12 cursor-pointer'
							>
								<Star className='w-4 h-4' />
								{selectedAsset?.is_favorite ? 'Desfavoritar' : 'Favoritar'}
							</Button>
						</div>
						<DrawerClose asChild>
							<Button
								variant='outline'
								onClick={handleCancel}
								className='h-12 cursor-pointer'
							>
								Fechar
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
ContentScrapping.displayName = 'ContentScrapping'
