import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { File, Star } from 'lucide-react'

export function SidebarAssets() {
	const handleTruncate = (text: string) => {
		return text.length > 40 ? `${text.slice(0, 40)}...` : text
	}
	return (
		<div className='bg-white  rounded-lg p-4 w-1/3 max-w-[400px] h-full'>
			<h1 className='font-semibold text-foreground'>IA designed assets</h1>
			<Separator className='mt-4' />
			<Accordion
				type='single'
				collapsible
				className='w-full'
				defaultValue='item-1'
			>
				<AccordionItem value='favorites'>
					<AccordionTrigger className='text-sm font-semibold text-grayscale-800 cursor-pointer'>
						Favorites
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<div className='flex items-center gap-2 cursor-pointer'>
							<Star className='w-4 h-4 text-grayscale-800' />
							<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
								{handleTruncate(
									'Escrevendo uma copy para um produto de beleza'
								)}
							</p>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='history'>
					<AccordionTrigger className='text-sm font-semibold text-grayscale-800 cursor-pointer'>
						History
					</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<div className='flex items-center gap-2 cursor-pointer'>
							<File className='w-4 h-4 text-grayscale-800' />
							<p className='font-regular text-grayscale-800 flex no-wrap truncate'>
								{handleTruncate(
									'Como gerar uma campanha de marketing para um produto de beleza'
								)}
							</p>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
