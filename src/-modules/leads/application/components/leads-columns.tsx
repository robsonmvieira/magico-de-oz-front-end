import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Lead } from '@/-modules/leads/domain/types/lead'

const statusColors = {
	active: 'bg-success-0 text-success-100 border-success-25',
	inactive: 'bg-greyscale-50 text-greyscale-500 border-greyscale-200',
	pending: 'bg-warning-0 text-warning-100 border-warning-25',
	engaged: 'bg-bluesky-0 text-bluesky-200 border-bluesky-25'
}

const statusLabels = {
	active: 'Ativo',
	inactive: 'Inativo',
	pending: 'Pendente',
	engaged: 'Engajado'
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
		accessorKey: 'name',
		header: 'Nome/Empresa',
		cell: ({ row }) => (
			<div className='flex flex-col'>
				<span className='body-small-semibold text-greyscale-900'>
					{row.original.name}
				</span>
				{row.original.company && (
					<span className='body-xsmall-regular text-greyscale-500'>
						{row.original.company}
					</span>
				)}
			</div>
		),
		filterFn: (row, id, value) => {
			const name = row.getValue(id) as string
			const company = row.original.company || ''
			const searchValue = value.toLowerCase()
			return (
				name.toLowerCase().includes(searchValue) ||
				company.toLowerCase().includes(searchValue)
			)
		}
	},
	{
		accessorKey: 'position',
		header: 'Cargo',
		cell: ({ row }) => (
			<span className='body-small-regular text-greyscale-700'>
				{row.getValue('position') || '-'}
			</span>
		)
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => (
			<span className='body-small-regular text-greyscale-700'>
				{row.getValue('email')}
			</span>
		),
		filterFn: (row, id, value) => {
			return String(row.getValue(id))
				.toLowerCase()
				.includes(String(value).toLowerCase())
		}
	},
	{
		accessorKey: 'phone',
		header: 'Telefone',
		cell: ({ row }) => (
			<span className='body-small-regular text-greyscale-700'>
				{row.getValue('phone')}
			</span>
		)
	},
	{
		accessorKey: 'campaign',
		header: 'Campanha',
		cell: ({ row }) => (
			<span className='body-small-regular text-greyscale-700'>
				{row.getValue('campaign') || '-'}
			</span>
		),
		filterFn: (row, id, value) => {
			if (!value || value === 'all') return true
			return row.getValue(id) === value
		}
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status') as Lead['status']
			return (
				<span
					className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${statusColors[status]}`}
				>
					{statusLabels[status]}
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
