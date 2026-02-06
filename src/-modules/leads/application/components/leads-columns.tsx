import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Lead } from '@/-modules/leads/domain/types/lead'

const temperatureColors = {
	cold: 'bg-bluesky-0 text-bluesky-200 border-bluesky-25',
	warm: 'bg-warning-0 text-warning-100 border-warning-25',
	hot: 'bg-error-0 text-error-100 border-error-25'
}

const temperatureLabels = {
	cold: 'Frio',
	warm: 'Morno',
	hot: 'Quente'
}

const stageColors = {
	new: 'bg-greyscale-50 text-greyscale-500 border-greyscale-200',
	contacted: 'bg-bluesky-0 text-bluesky-200 border-bluesky-25',
	qualified: 'bg-success-0 text-success-100 border-success-25',
	proposal: 'bg-warning-0 text-warning-100 border-warning-25',
	negotiation: 'bg-primary-0 text-primary-100 border-primary-25',
	won: 'bg-success-0 text-success-100 border-success-25',
	lost: 'bg-error-0 text-error-100 border-error-25'
}

const stageLabels = {
	new: 'Novo',
	contacted: 'Contactado',
	qualified: 'Qualificado',
	proposal: 'Proposta',
	negotiation: 'Negociação',
	won: 'Ganho',
	lost: 'Perdido'
}

const sourceLabels = {
	google_maps: 'Google Maps',
	manual: 'Manual',
	import: 'Importação',
	api: 'API',
	receita_federal: 'Receita Federal'
}

export const leadsColumns: ColumnDef<Lead>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'tradeName',
		header: 'Empresa',
		cell: ({ row }) => (
			<div className='flex flex-col'>
				<span className='body-small-semibold text-greyscale-900'>
					{row.original.tradeName}
				</span>
				<span className='body-xsmall-regular text-greyscale-500'>
					{row.original.address?.city}, {row.original.address?.state}
				</span>
			</div>
		),
		filterFn: (row, id, value) => {
			const tradeName = row.getValue(id) as string
			const companyName = row.original.companyName || ''
			const searchValue = value.toLowerCase()
			return (
				tradeName.toLowerCase().includes(searchValue) ||
				companyName.toLowerCase().includes(searchValue)
			)
		}
	},
	{
		accessorKey: 'phone',
		header: 'Telefone',
		cell: ({ row }) => (
			<span className='body-small-regular text-greyscale-700'>
				{row.getValue('phone') || '-'}
			</span>
		)
	},
	{
		accessorKey: 'website',
		header: 'Website',
		cell: ({ row }) => {
			const website = row.getValue('website') as string | undefined
			if (!website) return <span className='text-greyscale-400'>-</span>
			return (
				<a
					href={website}
					target='_blank'
					rel='noopener noreferrer'
					className='body-small-regular text-primary-100 hover:underline flex items-center gap-1'
				>
					Visitar <ExternalLink className='size-3' />
				</a>
			)
		}
	},
	{
		accessorKey: 'source',
		header: 'Origem',
		cell: ({ row }) => {
			const source = row.getValue('source') as Lead['source']
			return (
				<span className='body-small-regular text-greyscale-700'>
					{sourceLabels[source] || source}
				</span>
			)
		},
		filterFn: (row, id, value) => {
			if (!value || value === 'all') return true
			return row.getValue(id) === value
		}
	},
	{
		accessorKey: 'score.icpFit',
		header: 'Score ICP',
		cell: ({ row }) => {
			const score = row.original.score?.icpFit ?? 0
			return (
				<span className='body-small-semibold text-greyscale-700'>
					{score}%
				</span>
			)
		}
	},
	{
		accessorKey: 'temperature',
		header: 'Temperatura',
		cell: ({ row }) => {
			const temperature = row.getValue('temperature') as Lead['temperature']
			return (
				<span
					className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${temperatureColors[temperature]}`}
				>
					{temperatureLabels[temperature]}
				</span>
			)
		},
		filterFn: (row, id, value) => {
			if (!value || value === 'all') return true
			return row.getValue(id) === value
		}
	},
	{
		accessorKey: 'stage',
		header: 'Etapa',
		cell: ({ row }) => {
			const stage = row.getValue('stage') as Lead['stage']
			return (
				<span
					className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${stageColors[stage]}`}
				>
					{stageLabels[stage]}
				</span>
			)
		},
		filterFn: (row, id, value) => {
			if (!value || value === 'all') return true
			return row.getValue(id) === value
		}
	},
	{
		id: 'actions',
		cell: () => (
			<Button variant='ghost' size='icon' className='h-8 w-8'>
				<MoreHorizontal className='h-4 w-4' />
			</Button>
		)
	}
]
