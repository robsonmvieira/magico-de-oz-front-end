import { createFileRoute } from '@tanstack/react-router'
import {
	ActivesCampaignTablePreview,
	DashboardKpi,
	type DashboardKpiProps,
	DashboardPath,
	fakeCardData,
	fakeUpdateHistoryData,
	SendEmailChart,
	UpdateHistory
} from '@/-modules/dashboard/application/components'

export const Route = createFileRoute('/_app/')({
	component: Index
})

function Index() {
	return (
		<div className='flex flex-col gap-3'>
			<div className='p-4 space-y-6 bg-white rounded-2xl'>
				<DashboardPath />
				<div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4'>
					{fakeCardData.map((card: DashboardKpiProps) => (
						<DashboardKpi key={card.title} {...card} />
					))}
				</div>
			</div>
			<div className='flex flex-col lg:flex-row gap-4'>
				<div className='p-4 space-y-6 bg-white rounded-2xl lg:w-2/3'>
					<ActivesCampaignTablePreview />
				</div>
				<div className='lg:w-1/3'>
					<UpdateHistory items={fakeUpdateHistoryData} />
				</div>
			</div>
			<div className='p-4 space-y-6 bg-white rounded-2xl'>
				<SendEmailChart />
			</div>
		</div>
	)
}
