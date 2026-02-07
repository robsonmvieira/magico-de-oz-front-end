import { Building2, Calendar } from 'lucide-react'
import type { LeadSource } from '@/-modules/leads/domain/types/lead'
import { formatDate } from './lead-formatters'
import { sourceLabels } from './lead-labels'
import { InfoRow } from './info-row'
import { SectionTitle } from './section-title'

interface LeadMetadataProps {
	source: LeadSource
	createdAt: string
	updatedAt: string
}

export function LeadMetadata({
	source,
	createdAt,
	updatedAt
}: Readonly<LeadMetadataProps>) {
	return (
		<section>
			<SectionTitle>Informações Adicionais</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<InfoRow icon={Building2} label='Origem' value={sourceLabels[source]} />
				<InfoRow
					icon={Calendar}
					label='Criado em'
					value={createdAt ? formatDate(createdAt) : null}
				/>
				<InfoRow
					icon={Calendar}
					label='Atualizado em'
					value={updatedAt ? formatDate(updatedAt) : null}
				/>
			</div>
		</section>
	)
}
