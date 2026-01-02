import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface UpdateHistoryItem {
	id: string
	user: string
	action: string
	timestamp: string
}

export interface UpdateHistoryProps {
	items: UpdateHistoryItem[]
}

export function UpdateHistory({ items }: Readonly<UpdateHistoryProps>) {
	return (
		<div className='p-4 space-y-6 bg-white rounded-2xl'>
			<div className='flex justify-between items-center'>
				<h2 className='label-medium-semibold text-greyscale-800'>
					Atividades recentes
				</h2>
				<Button
					variant='link'
					className='label-small-medium text-primary-600 hover:text-greyscale-700 cursor-pointer text-primary-500 hover:text-primary-600 p-0 h-auto'
				>
					Ver todas
				</Button>
			</div>

			{/* Timeline */}
			<div className='relative'>
				{/* Vertical dashed line */}
				<div className='absolute left-[5px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-warning-25' />

				{/* Timeline Items */}
				<div className='space-y-3'>
					{items.map((item: UpdateHistoryItem) => (
						<div key={item.id} className='flex gap-3'>
							{/* Timeline Dot */}
							<div className='relative z-10 flex-shrink-0'>
								<div className='w-3 h-3 rounded-full bg-warning-100' />
							</div>

							{/* Content */}
							<div className='flex-1'>
								<div className='bg-white rounded-xl p-4 border border-greyscale-100'>
									<p className='body-xsmall-regular text-greyscale-800'>
										<span className='body-xsmall-medium text-primary-600'>
											{item.user}
										</span>{' '}
										{item.action}
									</p>
									<div className='h-px border-t border-dashed border-greyscale-200 my-3' />
									<div className='flex items-center gap-1.5 text-greyscale-500'>
										<Calendar size={14} />
										<span className='label-xxsmall-regular text-greyscale-500'>
											{item.timestamp}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

UpdateHistory.displayName = 'UpdateHistory'
