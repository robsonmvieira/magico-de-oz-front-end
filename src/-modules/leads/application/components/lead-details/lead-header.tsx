import type { Lead } from '@/-modules/leads/domain/types/lead'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
	stageColors,
	stageLabels,
	temperatureColors,
	temperatureLabels
} from './lead-labels'

interface LeadHeaderProps {
	lead: Lead
}

export function LeadHeader({ lead }: Readonly<LeadHeaderProps>) {
	return (
		<DialogHeader className='mt-8'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<DialogTitle className='text-xl'>
						{lead.tradeName || lead.companyName}
					</DialogTitle>
					{lead.tradeName && lead.companyName !== lead.tradeName && (
						<p className='body-small-regular text-greyscale-500 mt-1'>
							{lead.companyName}
						</p>
					)}
				</div>
				<div className='flex gap-2'>
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${temperatureColors[lead.temperature]}`}
					>
						{temperatureLabels[lead.temperature]}
					</span>
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${stageColors[lead.stage]}`}
					>
						{stageLabels[lead.stage]}
					</span>
				</div>
			</div>
		</DialogHeader>
	)
}
