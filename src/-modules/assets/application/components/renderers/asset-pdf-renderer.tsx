import { ExternalLink, FileText, Loader2 } from 'lucide-react'
import type { Asset } from '@/-modules/assets/domain/use-cases/create-assets'
import { Button } from '@/components/ui/button'
import { ErrorPreview } from '../tabs/content-scrapping/components/drawer-components'

interface AssetPdfRendererProps {
	asset: Asset | null
	pdfLoading: boolean
	pdfError: boolean
	onPdfLoad: () => void
	onOpenFullView: () => void
}

export function AssetPdfRenderer({
	asset,
	pdfLoading,
	pdfError,
	onPdfLoad,
	onOpenFullView
}: AssetPdfRendererProps) {
	if (!asset?.file_url) {
		return <ErrorPreview />
	}

	return (
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
							onClick={onOpenFullView}
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
					data={asset.file_url}
					type='application/pdf'
					onLoad={onPdfLoad}
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
								onClick={onOpenFullView}
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
	)
}

AssetPdfRenderer.displayName = 'AssetPdfRenderer'
