import { Plus, Search, Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SearchLeadsModal } from './search-leads-modal'

export function LeadPath() {
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

	return (
		<>
			<div className='flex justify-between items-center'>
				<h1 className='label-large-semibold text-greyscale-800'>Leads</h1>
				<div className='flex gap-2'>
					<Button variant='outline' className='cursor-pointer h-12'>
						<Upload /> Importar CSV
					</Button>
					<Button
						variant='outline'
						className='cursor-pointer h-12'
						onClick={() => setIsSearchModalOpen(true)}
					>
						<Search /> Buscar Leads
					</Button>
					<Button className='cursor-pointer h-12'>
						<Plus /> Novo Lead
					</Button>
				</div>
			</div>

			<SearchLeadsModal
				isOpen={isSearchModalOpen}
				onClose={() => setIsSearchModalOpen(false)}
			/>
		</>
	)
}

LeadPath.displayName = 'LeadPath'
