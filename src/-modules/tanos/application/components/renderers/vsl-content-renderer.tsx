import { ExternalLink, FileText, Loader2, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { VSL } from '@/-modules/tanos/domain/entities/vsl.entity'
import { Button } from '@/components/ui/button'

interface VslContentRendererProps {
	vsl: VSL | null
	onOpenFullView: (url: string) => void
	onContentChange?: (url: string | null) => void
}

type ContentType = 'pt-pdf' | 'es-pdf' | 'video'

export function VslContentRenderer({
	vsl,
	onOpenFullView,
	onContentChange
}: VslContentRendererProps) {
	const [selectedContent, setSelectedContent] = useState<ContentType>('pt-pdf')
	const [pdfLoading, setPdfLoading] = useState(true)
	const [pdfError, setPdfError] = useState(false)

	if (!vsl) {
		return (
			<div className='flex items-center justify-center h-full'>
				<div className='text-center p-6'>
					<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
					<h3 className='font-medium text-gray-900 mb-2'>
						Nenhuma VSL selecionada
					</h3>
					<p className='text-sm text-gray-600'>
						Selecione uma VSL da lista para visualizar
					</p>
				</div>
			</div>
		)
	}

	const handlePdfLoad = () => {
		setPdfLoading(false)
		setPdfError(false)
	}

	const handleContentChange = (type: ContentType) => {
		setSelectedContent(type)
		setPdfLoading(true)
		setPdfError(false)
	}

	const getCurrentUrl = () => {
		switch (selectedContent) {
			case 'pt-pdf':
				return vsl.portuguese_pdf_url
			case 'es-pdf':
				return vsl.spanish_pdf_url
			case 'video':
				return vsl.mp4_url
			default:
				return null
		}
	}

	const currentUrl = getCurrentUrl()

	// Notifica o componente pai quando o conteúdo selecionado mudar
	useEffect(() => {
		if (onContentChange) {
			onContentChange(currentUrl)
		}
	}, [currentUrl, onContentChange])

	return (
		<div className='flex flex-col h-full gap-4'>
			{/* Seletor de conteúdo */}
			<div className='flex gap-2 flex-shrink-0'>
				{vsl.portuguese_pdf_url && (
					<Button
						variant={selectedContent === 'pt-pdf' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleContentChange('pt-pdf')}
						className='flex items-center gap-2'
					>
						<FileText className='w-4 h-4' />
						PDF Português
					</Button>
				)}
				{vsl.spanish_pdf_url && (
					<Button
						variant={selectedContent === 'es-pdf' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleContentChange('es-pdf')}
						className='flex items-center gap-2'
					>
						<FileText className='w-4 h-4' />
						PDF Espanhol
					</Button>
				)}
				{vsl.has_video && vsl.mp4_url && (
					<Button
						variant={selectedContent === 'video' ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleContentChange('video')}
						className='flex items-center gap-2'
					>
						<Video className='w-4 h-4' />
						Vídeo
					</Button>
				)}
			</div>

			{/* Área de preview */}
			<div className='relative flex-1 border rounded-lg overflow-hidden bg-gray-50'>
				{!currentUrl ? (
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='text-center p-6'>
							<FileText className='w-12 h-12 text-gray-400 mx-auto mb-4' />
							<h3 className='font-medium text-gray-900 mb-2'>
								Conteúdo não disponível
							</h3>
							<p className='text-sm text-gray-600'>
								Este conteúdo ainda não foi processado.
							</p>
						</div>
					</div>
				) : selectedContent === 'video' ? (
					<video
						className='w-full h-full object-contain'
						controls
						src={currentUrl}
					>
						<track kind='captions' />
						Seu navegador não suporta a reprodução de vídeo.
					</video>
				) : (
					<>
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
										onClick={() => onOpenFullView(currentUrl)}
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
								data={currentUrl}
								type='application/pdf'
								onLoad={handlePdfLoad}
								onError={() => setPdfError(true)}
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
											onClick={() => onOpenFullView(currentUrl)}
											className='flex items-center gap-2'
										>
											<ExternalLink className='w-4 h-4' />
											Abrir em nova aba
										</Button>
									</div>
								</div>
							</object>
						)}
					</>
				)}
			</div>
		</div>
	)
}

VslContentRenderer.displayName = 'VslContentRenderer'
