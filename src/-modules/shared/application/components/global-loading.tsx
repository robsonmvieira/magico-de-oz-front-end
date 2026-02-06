import { Loader2 } from 'lucide-react'
import { useLoading } from '../../infra/loading/loading-context'

export function GlobalLoading() {
	const { isLoading, loadingMessage } = useLoading()

	if (!isLoading) return null

	return (
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-greyscale-900/50 backdrop-blur-sm'>
			<div className='flex flex-col items-center gap-3 rounded-xl bg-greyscale-0 p-6 shadow-lg'>
				<Loader2 className='size-8 animate-spin text-primary-100' />
				{loadingMessage && (
					<span className='body-small-medium text-greyscale-700'>
						{loadingMessage}
					</span>
				)}
			</div>
		</div>
	)
}
