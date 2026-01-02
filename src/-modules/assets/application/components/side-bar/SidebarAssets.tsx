import { File, Star } from 'lucide-react'
import type { Asset } from '@/-modules/assets/domain/use-cases/create-assets'
import { useAssetStore } from '@/-modules/assets/infra/store/asset.store'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { useListAssets } from '../../queries/use-list-assets'

export function SidebarAssets() {
	const { data } = useListAssets()
	const setSelectedAsset = useAssetStore(state => state.setSelectedAsset)
	const response = data?.data
	const handleTruncate = (text: string) => {
		return text?.length > 40 ? `${text?.slice(0, 40)}...` : text
	}

	const handleOpenPreviewAsset = (asset: Asset) => {
		setSelectedAsset(asset)
	}

	return (
		<div className='bg-white  rounded-lg p-4 w-1/3 max-w-[400px] h-full'>
			<h1 className='font-semibold text-foreground'>IA designed assets</h1>
			<Separator className='mt-4' />
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='history'
			>
				<AccordionItem value='favorites'>
					<AccordionTrigger className='text-sm font-semibold text-grayscale-800 cursor-pointer'>
						Favorites
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						{/* <div className='flex items-center gap-2 cursor-pointer'>
							<Star className='w-4 h-4 text-grayscale-800' />
							<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
								{handleTruncate(
									'Escrevendo uma copy para um produto de beleza'
								)}
							</p>
						</div> */}
						{Array.isArray(response) &&
							response
								?.filter((item: Asset) => item.is_favorite)
								.map((item: Asset) => (
									<button
										type='button'
										key={item.id}
										className='flex items-center gap-2 cursor-pointer'
										onClick={() => handleOpenPreviewAsset(item)}
									>
										{item?.title && (
											<Star className='w-4 h-4 text-grayscale-800' />
										)}
										<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
											{handleTruncate(item?.title)}
										</p>
									</button>
								))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='history'>
					<AccordionTrigger className='text-sm font-semibold text-grayscale-800 cursor-pointer'>
						History
					</AccordionTrigger>
					{Array.isArray(response) && (
						<AccordionContent className='flex flex-col gap-4 text-balance'>
							{Array.isArray(response) &&
								response?.map((item: Asset) => (
									<button
										type='button'
										key={item.id}
										className='flex items-center gap-2 cursor-pointer'
										onClick={() => handleOpenPreviewAsset(item)}
									>
										{item?.title && (
											<File className='w-4 h-4 text-grayscale-800' />
										)}
										<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
											{handleTruncate(item?.title)}
										</p>
									</button>
								))}
						</AccordionContent>
					)}
				</AccordionItem>
			</Accordion>
		</div>
	)
}
