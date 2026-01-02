import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { TablePagination } from '@/-modules/shared/application/components/table-pagination'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
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

export const columns: ColumnDef<Lead>[] = [
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
		)
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
		)
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
		)
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

interface LeadsTableProps {
	data: Lead[]
}

export function LeadsTable({ data }: LeadsTableProps) {
	const [pageSize, setPageSize] = useState(10)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination: {
				pageIndex: 0,
				pageSize
			}
		},
		onPaginationChange: updater => {
			if (typeof updater === 'function') {
				const newState = updater(table.getState().pagination)
				setPageSize(newState.pageSize)
			}
		}
	})

	return (
		<div className='space-y-4'>
			<div className='rounded-xl border border-greyscale-200'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className='bg-greyscale-25'>
							{headerGroup.headers.map(header => (
								<TableHead
									key={header.id}
									className='label-small-medium text-greyscale-800'
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
								className='border-greyscale-100'
							>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id} className='py-4'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center body-small-regular text-greyscale-500'
							>
								Nenhum lead encontrado.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			</div>
			<TablePagination
				currentPage={table.getState().pagination.pageIndex + 1}
				totalPages={table.getPageCount()}
				pageSize={table.getState().pagination.pageSize}
				totalItems={data.length}
				onPageChange={page => table.setPageIndex(page - 1)}
				onPageSizeChange={size => table.setPageSize(size)}
			/>
		</div>
	)
}
