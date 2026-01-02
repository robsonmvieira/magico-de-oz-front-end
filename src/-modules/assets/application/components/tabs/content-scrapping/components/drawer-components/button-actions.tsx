import { ExternalLink, Star, Trash } from 'lucide-react'
import type { Asset } from '@/-modules/assets/domain/use-cases/create-assets'
import { Button } from '@/components/ui/button'

interface ButtonActionsProps {
	handleOpenFullView: () => void
	handleUpdateFavorite: () => void
	handleDeleteAsset: () => void
	selectedAsset: Asset | null
}

export function ButtonActions({
	handleOpenFullView,
	handleUpdateFavorite,
	handleDeleteAsset,
	selectedAsset
}: Readonly<ButtonActionsProps>) {
	return (
		<div className='flex w-full justify-between gap-2'>
			<Button
				onClick={handleOpenFullView}
				disabled={!selectedAsset?.file_url}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<ExternalLink className='w-4 h-4' />
				Visão completa
			</Button>

			<Button
				variant='secondary'
				onClick={handleUpdateFavorite}
				disabled={!selectedAsset?.file_url || !selectedAsset?.id}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<Star className='w-4 h-4' />
				{selectedAsset?.is_favorite ? 'Desfavoritar' : 'Favoritar'}
			</Button>

			<Button
				variant='destructive'
				onClick={handleDeleteAsset}
				disabled={!selectedAsset?.id}
				className='flex items-center gap-2 h-12 cursor-pointer flex-1'
			>
				<Trash className='w-4 h-4' />
				Deletar
			</Button>
		</div>
	)
}
ButtonActions.displayName = 'ButtonActions'
