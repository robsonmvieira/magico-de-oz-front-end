import { ExternalLink, Globe, MapPin, Phone } from 'lucide-react'
import type { LeadAddress } from '@/-modules/leads/domain/types/lead'
import { InfoRow } from './info-row'
import { SectionTitle } from './section-title'

interface LeadContactProps {
	phone: string
	website?: string
	address: LeadAddress | undefined
}

export function LeadContact({
	phone,
	website,
	address
}: Readonly<LeadContactProps>) {
	const fullAddress = [
		address?.street,
		address?.neighborhood,
		address?.city,
		address?.state,
		address?.zipCode
	]
		.filter(Boolean)
		.join(', ')

	return (
		<section>
			<SectionTitle>Contato</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<InfoRow icon={Phone} label='Telefone' value={phone} />
				<InfoRow
					icon={Globe}
					label='Website'
					value={
						website ? (
							<a
								href={website}
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary-100 hover:underline flex items-center gap-1'
							>
								{website} <ExternalLink className='size-3' />
							</a>
						) : null
					}
				/>
				<InfoRow icon={MapPin} label='Endereço' value={fullAddress || null} />
			</div>
		</section>
	)
}
