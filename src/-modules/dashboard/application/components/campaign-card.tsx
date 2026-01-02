import { Eye, Pencil } from 'lucide-react'

export interface CampaignCardProps {
	name: string
	activeLeads: number
	responseRate: number
	onView?: () => void
	onEdit?: () => void
}

export function CampaignCard({
	name,
	activeLeads,
	responseRate,
	onView,
	onEdit
}: CampaignCardProps) {
	return (
		<div className='w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border border-greyscale-100 rounded-lg'>
			<div className='flex-1 min-w-0'>
				<span className='body-small-medium text-greyscale-800'>{name}</span>
			</div>
			<div className='flex items-center justify-between sm:justify-start gap-4'>
				<div className='sm:w-40 flex-shrink-0'>
					<span className='body-small-regular text-greyscale-800'>
						{activeLeads} leads ativos
					</span>
				</div>
				<div className='sm:w-24 flex-shrink-0'>
					<span className='body-small-regular text-greyscale-800'>
						{responseRate}% resp
					</span>
				</div>
				<div className='flex items-center gap-3 flex-shrink-0'>
					<Eye
						size={16}
						className='text-greyscale-500 hover:text-greyscale-700 cursor-pointer'
						onClick={onView}
					/>
					<Pencil
						size={16}
						className='text-greyscale-500 hover:text-greyscale-700 cursor-pointer'
						onClick={onEdit}
					/>
				</div>
			</div>
		</div>
	)
}
CampaignCard.displayName = 'CampaignCard'
