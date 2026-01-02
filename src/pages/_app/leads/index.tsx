import { useState } from 'react'
import { LeadPath, SelectPopover } from '@/-modules/leads/application/components'
import { leadsColumns } from '@/-modules/leads/application/components/leads-columns'
import { fakeLeadsData } from '@/-modules/leads/application/data/fake-leads-data'
import {
	OrderByData,
	selectCampaignData,
	StatusCampaignData
} from '@/-modules/leads/application/components/fake-data/campaign'
import { DataTable } from '@/-modules/shared/application/components/data-table'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'

function AllLeads() {
	const [campaignFilter, setCampaignFilter] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [searchValue, setSearchValue] = useState('')

	const filters = [
		...(campaignFilter && campaignFilter !== 'all'
			? [{ id: 'campaign', value: campaignFilter }]
			: []),
		...(statusFilter && statusFilter !== 'all'
			? [{ id: 'status', value: statusFilter }]
			: [])
	]

	return (
		<div className='p-4 space-y-6 bg-white rounded-2xl'>
			<LeadPath />
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-4'>
					<SelectPopover
						label='Campanha'
						options={selectCampaignData}
						onValueChange={setCampaignFilter}
					/>
					<SelectPopover
						label='Status'
						options={StatusCampaignData}
						onValueChange={setStatusFilter}
					/>
					<SelectPopover label='Ordernar por' options={OrderByData} />
				</div>
				<div className='flex items-center shadow-sm rounded-md px-4 py-2'>
					<Search className='size-4 text-greyscale-500' />
					<Input
						className='shadow-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
						placeholder='Buscar lead, campanha, status...'
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</div>
			</div>
			<DataTable
				columns={leadsColumns}
				data={fakeLeadsData}
				filterableColumns={filters}
				searchColumn='name'
				searchValue={searchValue}
				emptyMessage='Nenhum lead encontrado.'
			/>
		</div>
	)
}

export const Route = createFileRoute('/_app/leads/')({
	component: AllLeads
})