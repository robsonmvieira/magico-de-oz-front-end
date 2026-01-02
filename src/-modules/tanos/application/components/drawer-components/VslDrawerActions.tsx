import { ExternalLink, Star, Trash } from 'lucide-react'
import type { VSL } from '@/-modules/tanos/domain/entities/vsl.entity'
import { Button } from '@/components/ui/button'

interface VslDrawerActionsProps {
	selectedVsl: VSL | null
	onOpenFullView: () => void
	onUpdateFavorite: () => void
	onDelete: () => void
}

export function VslDrawerActions({
	selectedVsl,
	onOpenFullView,
	onUpdateFavorite,
	onDelete
}: VslDrawerActionsProps) {
	const hasContent =
		selectedVsl?.portuguese_pdf_url ||
		selectedVsl?.spanish_pdf_url ||
		(selectedVsl?.has_video && selectedVsl?.mp4_url)

	return (
		<div className='flex w-full justify-between gap-2'>
			<Button
				onClick={onOpenFullView}
				disabled={!hasContent}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<ExternalLink className='w-4 h-4' />
				Visão completa
			</Button>

			<Button
				variant='secondary'
				onClick={onUpdateFavorite}
				disabled={!selectedVsl?.id}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<Star
					className={`w-4 h-4 ${selectedVsl?.is_favorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
				/>
				{selectedVsl?.is_favorite ? 'Desfavoritar' : 'Favoritar'}
			</Button>

			<Button
				variant='destructive'
				onClick={onDelete}
				disabled={!selectedVsl?.id}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<Trash className='w-4 h-4' />
				Deletar
			</Button>
		</div>
	)
}

VslDrawerActions.displayName = 'VslDrawerActions'
