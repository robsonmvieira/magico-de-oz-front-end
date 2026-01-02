import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardPath() {
	return (
		<div className='flex justify-between items-center'>
			<h1 className='label-large-semibold text-greyscale-800'>Dashboard</h1>
			<Button className='cursor-pointer h-12'>
				<Plus /> Nova Campanha
			</Button>
		</div>
	)
}

DashboardPath.displayName = 'DashboardPath'
