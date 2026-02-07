import { Building2, Calendar, Users } from 'lucide-react'
import type { LeadCnpjWsData } from '@/-modules/leads/domain/types/lead'
import { formatCurrency, formatDate } from './lead-formatters'
import { InfoRow } from './info-row'
import { SectionTitle } from './section-title'

interface LeadCnpjDataProps {
	data: LeadCnpjWsData | undefined
}

export function LeadCnpjData({ data }: Readonly<LeadCnpjDataProps>) {
	if (!data) return null

	return (
		<section>
			<SectionTitle>Dados da Receita Federal</SectionTitle>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<InfoRow icon={Building2} label='CNPJ' value={data.cnpj} />
				<InfoRow
					icon={Building2}
					label='Razão Social'
					value={data.businessName}
				/>
				<InfoRow
					icon={Calendar}
					label='Data de Abertura'
					value={data.openingDate ? formatDate(data.openingDate) : null}
				/>
				<InfoRow
					icon={Building2}
					label='Capital Social'
					value={data.capital ? formatCurrency(data.capital) : null}
				/>
			</div>
			{data.partners && data.partners.length > 0 && (
				<div className='mt-4'>
					<p className='body-xsmall-semibold text-greyscale-600 mb-2 flex items-center gap-1'>
						<Users className='size-3' /> Sócios
					</p>
					<div className='space-y-2'>
						{data.partners.map((partner) => (
							<div
								key={partner.name}
								className='bg-greyscale-50 rounded-lg px-3 py-2'
							>
								<p className='body-small-regular text-greyscale-900'>
									{partner.name}
								</p>
								<p className='body-xsmall-regular text-greyscale-500'>
									{partner.qualification}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	)
}
