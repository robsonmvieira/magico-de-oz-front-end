import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TryNowCardProps {
	icon: LucideIcon
	title: string
	description: string
	onClick: () => void
	disabled?: boolean
}

export function TryNowCard({
	icon: Icon,
	description,
	onClick,
	disabled = false
}: TryNowCardProps) {
	return (
		<div className='bg-white p-4 rounded-lg w-1/3'>
			<div className='size-8 rounded bg-gradient-to-br from-teal-500 to-yellow-400 p-[2px] flex items-center justify-center'>
				<div className='size-full bg-white rounded flex items-center justify-center'>
					<Icon className='text-teal-700' size={20} />
				</div>
			</div>
			<p className='text-sm mt-4 font-medium text-greyscale-700'>
				{description}
			</p>
			<Button
				variant='outline'
				className='mt-4 w-full cursor-pointer'
				onClick={onClick}
				disabled={disabled}
			>
				Try now!
			</Button>
		</div>
	)
}

TryNowCard.displayName = 'TryNowCard'
