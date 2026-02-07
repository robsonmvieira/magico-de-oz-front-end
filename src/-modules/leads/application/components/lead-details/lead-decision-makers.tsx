import { Mail, Phone, User } from 'lucide-react'
import type { LeadDecisionMaker } from '@/-modules/leads/domain/types/lead'
import { SectionTitle } from './section-title'

interface LeadDecisionMakersProps {
	decisionMakers: LeadDecisionMaker[] | undefined
}

export function LeadDecisionMakers({
	decisionMakers
}: Readonly<LeadDecisionMakersProps>) {
	if (!decisionMakers || decisionMakers.length === 0) return null

	return (
		<section>
			<SectionTitle>Decisores</SectionTitle>
			<div className='space-y-3'>
				{decisionMakers.map((dm) => (
					<div
						key={dm.email ?? dm.name}
						className='bg-greyscale-50 rounded-lg p-4 flex items-start gap-3'
					>
						<div className='bg-primary-0 rounded-full p-2'>
							<User className='size-4 text-primary-100' />
						</div>
						<div className='flex-1'>
							<p className='body-small-semibold text-greyscale-900'>{dm.name}</p>
							{dm.position && (
								<p className='body-xsmall-regular text-greyscale-500'>
									{dm.position}
								</p>
							)}
							<div className='flex flex-wrap gap-4 mt-2'>
								{dm.email && (
									<a
										href={`mailto:${dm.email}`}
										className='body-xsmall-regular text-primary-100 hover:underline flex items-center gap-1'
									>
										<Mail className='size-3' /> {dm.email}
									</a>
								)}
								{dm.phone && (
									<span className='body-xsmall-regular text-greyscale-600 flex items-center gap-1'>
										<Phone className='size-3' /> {dm.phone}
									</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
