import { Plus, Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LeadPath() {
	return (
		<div className='flex justify-between items-center'>
			<h1 className='label-large-semibold text-greyscale-800'>Leads</h1>
      <div className='flex gap-2'>
      <Button variant='outline' className='cursor-pointer h-12'>
				<Upload /> Importar CSV
			</Button>
      <Button variant='outline' className='cursor-pointer h-12'>
				<Search /> Buscar Lead
			</Button>
      <Button className='cursor-pointer h-12'>
				<Plus /> Novo Lead
			</Button>
      </div>
		</div>
	)
}

LeadPath.displayName = 'LeadPath'
