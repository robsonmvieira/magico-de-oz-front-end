import type { Lead } from '@/-modules/leads/domain/types/lead'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
	LeadCnpjData,
	LeadContact,
	LeadDecisionMakers,
	LeadGoogleMapsData,
	LeadHeader,
	LeadMetadata,
	LeadScores
} from './lead-details'

interface LeadDetailsModalProps {
	lead: Lead | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function LeadDetailsModal({
	lead,
	open,
	onOpenChange
}: Readonly<LeadDetailsModalProps>) {
	if (!lead) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
				<LeadHeader lead={lead} />

				<div className='space-y-6 mt-4'>
					<LeadContact
						phone={lead.phone}
						website={lead.website}
						address={lead.address}
					/>

					<Separator />

					<LeadScores score={lead.score} />

					<Separator />

					{lead.decisionMakers && lead.decisionMakers.length > 0 && (
						<>
							<LeadDecisionMakers decisionMakers={lead.decisionMakers} />
							<Separator />
						</>
					)}

					{lead.googleMapsData && (
						<>
							<LeadGoogleMapsData data={lead.googleMapsData} />
							<Separator />
						</>
					)}

					{lead.cnpjWsData && (
						<>
							<LeadCnpjData data={lead.cnpjWsData} />
							<Separator />
						</>
					)}

					<LeadMetadata
						source={lead.source}
						createdAt={lead.createdAt}
						updatedAt={lead.updatedAt}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
