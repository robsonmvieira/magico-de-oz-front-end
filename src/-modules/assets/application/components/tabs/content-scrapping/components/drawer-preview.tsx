import { ExternalLink, FileText, Loader2 } from 'lucide-react'
import type { Asset } from '@/-modules/assets/domain/use-cases/create-assets'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer'
import { ButtonActions, DateInfo, ErrorPreview } from './drawer-components'

interface DrawerPreviewProps {
	isOpen: boolean
	handleCancel: () => void
	selectedAsset: Asset | null
	pdfLoading: boolean
	pdfError: boolean
	handleOpenFullView: () => void
	handleUpdateFavorite: () => void
	handleDeleteAsset: () => void
	handlePdfLoad: () => void
}

export function DrawerPreview({
	isOpen,
	handleCancel,
	selectedAsset,
	pdfLoading,
	pdfError,
	handleOpenFullView,
	handleUpdateFavorite,
	handleDeleteAsset,
	handlePdfLoad
}: Readonly<DrawerPreviewProps>) {
	return (
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
						<ErrorPreview />
					)}
				</div>

				<DrawerFooter className='flex flex-col gap-2 flex-shrink-0 '>
					<DateInfo date={selectedAsset?.created_at} />
					<ButtonActions
						handleOpenFullView={handleOpenFullView}
						handleUpdateFavorite={handleUpdateFavorite}
						handleDeleteAsset={handleDeleteAsset}
						selectedAsset={selectedAsset}
					/>

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
	)
}
DrawerPreview.displayName = 'DrawerPreview'
