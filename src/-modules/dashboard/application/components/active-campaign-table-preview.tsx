import { Button } from '@/components/ui/button'
import { CampaignCard } from './campaign-card'
import { fakeCampaignData } from './fake-campaign-data'

export function ActivesCampaignTablePreview() {
	return (
		<div className='space-y-6 bg-white rounded-2xl'>
			<div className='flex justify-between items-center'>
				<h2 className='label-medium-semibold text-greyscale-800'>
					Campanhas ativas
				</h2>
				<Button
					variant='link'
					className='label-small-medium text-primary-600 hover:text-greyscale-700 cursor-pointer text-primary-500 hover:text-primary-600 p-0 h-auto'
				>
					Ver todas
				</Button>
			</div>

			<div className='space-y-3'>
				{fakeCampaignData.map((campaign) => (
					<CampaignCard key={campaign.name} {...campaign} />
				))}
			</div>
		</div>
	)
}
ActivesCampaignTablePreview.displayName = 'ActivesCampaignTablePreview'
