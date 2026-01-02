import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'

export interface CreateAssetsFormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	isPending: boolean
}

export function CreateAssetsForm({
	onSubmit,
	isPending
}: Readonly<CreateAssetsFormProps>) {
	return (
		<TabsContent
			value='content-scrapping'
			className='bg-white h-full min-h-0 rounded-lg p-4 overflow-hidden'
		>
			<div className='flex flex-col gap-4 w-full h-full'>
				<h1 className='text-2xl text-primary-500 font-bold'>
					Put the URL of the Youtube video!
				</h1>
				<div className='flex gap-2'>
					<form className='w-full flex gap-2' onSubmit={onSubmit}>
						<Input
							name='url'
							className='flex-1 bg-white h-12'
							type='text'
							placeholder='Enter the URL of the Youtube video'
						/>
						<Button
							className='h-12 font-medium cursor-pointer'
							type='submit'
							disabled={isPending}
						>
							{isPending ? 'Processing...' : 'Get Content'}
						</Button>
					</form>
				</div>
			</div>
		</TabsContent>
	)
}
