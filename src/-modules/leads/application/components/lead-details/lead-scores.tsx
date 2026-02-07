import type { LeadScore } from '@/-modules/leads/domain/types/lead'
import { SectionTitle } from './section-title'

interface LeadScoresProps {
	score: LeadScore | undefined
}

export function LeadScores({ score }: Readonly<LeadScoresProps>) {
	return (
		<section>
			<SectionTitle>Scores</SectionTitle>
			<div className='grid grid-cols-3 gap-4'>
				<div className='bg-greyscale-50 rounded-lg p-4 text-center'>
					<span className='heading-h3 text-primary-100'>
						{score?.icpFit ?? 0}%
					</span>
					<p className='body-xsmall-regular text-greyscale-500 mt-1'>ICP Fit</p>
				</div>
				<div className='bg-greyscale-50 rounded-lg p-4 text-center'>
					<span className='heading-h3 text-success-100'>
						{score?.engagement ?? 0}%
					</span>
					<p className='body-xsmall-regular text-greyscale-500 mt-1'>
						Engajamento
					</p>
				</div>
				<div className='bg-greyscale-50 rounded-lg p-4 text-center'>
					<span className='heading-h3 text-bluesky-200'>
						{score?.completeness ?? 0}%
					</span>
					<p className='body-xsmall-regular text-greyscale-500 mt-1'>
						Completude
					</p>
				</div>
			</div>
		</section>
	)
}
