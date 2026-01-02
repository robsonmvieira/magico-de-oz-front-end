import { type LucideIcon, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
export interface DashboardKpiProps {
	readonly title: string
	readonly value: number
	readonly valueType: 'number' | 'percentage'
	readonly valueIndicator: 'up' | 'down'
	readonly valueIcon: LucideIcon
}

export function DashboardKpi({
	title,
	value,
	valueType,
	valueIndicator,
	valueIcon: VIcon
}: DashboardKpiProps) {
	return (
		<div className='bg-white p-6 rounded-2xl border border-greyscale-200 min-w-[280px]'>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='label-small-medium text-greyscale-800 whitespace-nowrap'>
					{title}
				</h3>
				<Button
					variant='ghost'
					size='icon'
					className='h-8 w-8 text-greyscale-400 hover:text-greyscale-600 flex-shrink-0'
				>
					<MoreVertical size={20} />
				</Button>
			</div>
			<div className='flex flex-col gap-3'>
				<p className='heading-h3-semibold text-greyscale-900 leading-none'>
					{value}
					{valueType === 'percentage' ? '%' : ''}
				</p>
				<div className='flex items-center gap-1 flex-wrap'>
					<div
						className={`rounded-full bg-${valueIndicator === 'up' ? 'success' : 'error'}-100 p-1 flex-shrink-0`}
					>
						<VIcon size={12} className='text-white' />
					</div>
					<span className='label-small-medium text-success-100'>4.2%</span>
					<span className='label-small-regular text-greyscale-500 whitespace-nowrap'>
						vs último mês
					</span>
				</div>
			</div>
		</div>
	)
}

DashboardKpi.displayName = 'DashboardKpi'
