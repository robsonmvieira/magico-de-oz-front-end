import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'

export function ContentScrapping() {
	return (
		<TabsContent
			value='content-scrapping'
			className='bg-white h-full min-h-0 rounded-lg p-4 overflow-hidden'
		>
			<div className='flex flex-col gap-4 w-full h-full'>
				<h1 className='text-2xl text-primary-500 font-bold'>
					Get Content from Youtube Video
				</h1>
				<div className='flex gap-2'>
					<Input
						className='flex-1 bg-white h-12'
						type='text'
						placeholder='Enter the URL of the Youtube video'
					/>
					<Button className='h-12 font-medium cursor-pointer' type='submit'>
						Get Content
					</Button>
				</div>
			</div>
		</TabsContent>
	)
}
ContentScrapping.displayName = 'ContentScrapping'
