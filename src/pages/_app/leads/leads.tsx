import { createFileRoute } from '@tanstack/react-router'

function AllLeads() {
	return (
		<div className='p-4 space-y-6 bg-white rounded-2xl'>
			<h1 className='heading-h5-semibold text-greyscale-900'>All Contacts</h1>
		</div>
	)
}

export const Route = createFileRoute('/_app/leads/leads')({
	component: AllLeads
})