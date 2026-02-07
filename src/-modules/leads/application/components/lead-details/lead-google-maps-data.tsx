import { Building2, Star } from 'lucide-react'
import type { LeadGoogleMapsData as LeadGoogleMapsDataType } from '@/-modules/leads/domain/types/lead'
import { InfoRow } from './info-row'
import { SectionTitle } from './section-title'

interface LeadGoogleMapsDataProps {
	data: LeadGoogleMapsDataType | undefined
}

export function LeadGoogleMapsData({
	data
}: Readonly<LeadGoogleMapsDataProps>) {
	if (!data) return null

	return (
		<section>
			<SectionTitle>Dados do Google Maps</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<InfoRow icon={Building2} label='Categoria' value={data.category} />
				<InfoRow
					icon={Star}
					label='Avaliação'
					value={
						data.rating ? (
							<span className='flex items-center gap-1'>
								{data.rating.toFixed(1)}
								<Star className='size-3 fill-warning-100 text-warning-100' />
								<span className='text-greyscale-500'>
									({data.reviewsCount} avaliações)
								</span>
							</span>
						) : null
					}
				/>
			</div>
		</section>
	)
}
