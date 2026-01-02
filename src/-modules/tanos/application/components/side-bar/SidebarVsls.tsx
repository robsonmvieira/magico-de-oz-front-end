import { File, Star } from 'lucide-react'
import type { VSL } from '@/-modules/tanos/domain/entities/vsl.entity'
import { useVslStore } from '@/-modules/tanos/infra/store/vsl.store'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { useListVsls } from '../../queries/use-list-vsls'

export function SidebarVsls() {
	const { data } = useListVsls()
	const setSelectedVsl = useVslStore(state => state.setSelectedItem)
	const vsls = data?.data

	const handleTruncate = (text: string) => {
		return text?.length > 40 ? `${text?.slice(0, 40)}...` : text
	}

	const handleOpenPreview = (vsl: VSL) => {
		setSelectedVsl(vsl)
	}

	return (
		<div className='bg-white rounded-lg p-4 w-1/3 max-w-[400px] h-full'>
			<h1 className='font-semibold text-foreground'>VSLs created</h1>
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
						{Array.isArray(vsls) &&
							vsls
								?.filter((item: VSL) => item?.is_favorite)
								.map((item: VSL) => (
									<button
										type='button'
										key={item.id}
										className='flex items-center gap-2 cursor-pointer'
										onClick={() => handleOpenPreview(item)}
									>
										{item?.product_name && (
											<Star className='w-4 h-4 text-grayscale-800' />
										)}
										<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
											{handleTruncate(item?.product_name)}
										</p>
									</button>
								))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='history'>
					<AccordionTrigger className='text-sm font-semibold text-grayscale-800 cursor-pointer'>
						History
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						{Array.isArray(vsls) &&
							vsls?.map((item: VSL) => (
								<button
									type='button'
									key={item.id}
									className='flex items-center gap-2 cursor-pointer'
									onClick={() => handleOpenPreview(item)}
								>
									{item?.product_name && (
										<File className='w-4 h-4 text-grayscale-800' />
									)}
									<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
										{handleTruncate(item?.product_name)}
									</p>
								</button>
							))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

SidebarVsls.displayName = 'SidebarVsls'
