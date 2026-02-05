import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	type RowSelectionState,
	useReactTable
} from '@tanstack/react-table'
import { Building2, MapPin, UserPlus } from 'lucide-react'
import { useState } from 'react'
import type { SearchLeadResult } from '@/-modules/leads/domain/types/search-leads'
import { TablePagination } from '@/-modules/shared/application/components/table-pagination'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

const sectorLabels: Record<string, string> = {
	hospitality: 'Hot. e Alimentação',
	technology: 'Tecnologia',
	finance: 'Finanças',
	health: 'Saúde',
	education: 'Educação',
	retail: 'Varejo',
	industry: 'Indústria',
	agro: 'Agronegócio',
	construction: 'Construção',
	logistics: 'Logística',
	real_estate: 'Imobiliário',
	services: 'Serviços'
}

const companySizeLabels: Record<string, string> = {
	'00': 'Não informado',
	'01': 'ME',
	'03': 'EPP',
	'05': 'Médio/Grande'
}

const columns: ColumnDef<SearchLeadResult>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Selecionar todos'
				className='cursor-pointer'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				disabled={row.original.existsAsLead}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Selecionar linha'
				className={row.original.existsAsLead ? 'cursor-not-allowed' : 'cursor-pointer'}
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'companyName',
		header: 'Empresa',
		cell: ({ row }) => (
			<div className='flex flex-col'>
				<span className='body-small-semibold text-greyscale-900'>
					{row.original.tradeName || row.original.companyName}
				</span>
				<span className='body-xsmall-regular text-greyscale-500'>
					CNPJ: {formatCnpj(row.original.fullCnpj)}
				</span>
			</div>
		)
	},
	{
		accessorKey: 'sector',
		header: 'Setor',
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<Building2 className='size-4 text-greyscale-400' />
				<span className='body-small-regular text-greyscale-700'>
					{sectorLabels[row.original.sector] || row.original.sector || '-'}
				</span>
			</div>
		)
	},
	{
		accessorKey: 'address.city',
		header: 'Cidade',
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<MapPin className='size-4 text-greyscale-400' />
				<span className='body-small-regular text-greyscale-700'>
					{row.original.address?.city || '-'},{' '}
					{row.original.address?.state || ''}
				</span>
			</div>
		)
	},
	{
		accessorKey: 'companySize',
		header: 'Porte',
		cell: ({ row }) => (
			<span className='inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium bg-greyscale-50 text-greyscale-700 border-greyscale-200'>
				{companySizeLabels[row.original.companySize] ||
					row.original.companySize}
			</span>
		)
	},
	{
		id: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<span
				className={`inline-flex items-center px-2.5 py-1 rounded-full border label-xsmall-medium ${
					row.original.existsAsLead
						? 'bg-bluesky-0 text-bluesky-200 border-bluesky-25'
						: 'bg-success-0 text-success-100 border-success-25'
				}`}
			>
				{row.original.existsAsLead ? 'Já adicionado' : 'Disponível'}
			</span>
		)
	}
]

function formatCnpj(cnpj: string): string {
	if (!cnpj || cnpj.length !== 14) return cnpj
	return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

interface SearchResultsModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
	readonly results: SearchLeadResult[]
	readonly total: number
	readonly onAddLeads: (leads: SearchLeadResult[]) => void
	readonly isLoading?: boolean
}

export function SearchResultsModal({
	isOpen,
	onClose,
	results,
	total,
	onAddLeads,
	isLoading = false
}: Readonly<SearchResultsModalProps>) {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10
	})

	const table = useReactTable({
		data: results,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		enableRowSelection: row => !row.original.existsAsLead,
		state: {
			rowSelection,
			pagination
		},
		onPaginationChange: setPagination
	})

	const selectedLeads = table
		.getSelectedRowModel()
		.rows.map(row => row.original)

	const handleAddLeads = () => {
		onAddLeads(selectedLeads)
		setRowSelection({})
	}

	const handleClose = () => {
		setRowSelection({})
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-[1280px] max-h-[85vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle className='text-xl font-semibold text-greyscale-800'>
						Resultados da Busca
					</DialogTitle>
					<DialogDescription className='text-greyscale-600'>
						{total} empresa{total !== 1 ? 's' : ''} encontrada
						{total !== 1 ? 's' : ''}. Selecione as que deseja adicionar como
						leads.
					</DialogDescription>
				</DialogHeader>

				<div className='flex-1 overflow-auto'>
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
											className={`border-greyscale-100 ${
												row.original.existsAsLead ? 'opacity-60' : ''
											}`}
										>
											{row.getVisibleCells().map(cell => (
												<TableCell key={cell.id} className='py-4'>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
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
											Nenhuma empresa encontrada.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>

				<div className='flex flex-col gap-4 pt-4 border-t border-greyscale-100'>
					<TablePagination
						currentPage={table.getState().pagination.pageIndex + 1}
						totalPages={table.getPageCount()}
						pageSize={table.getState().pagination.pageSize}
						totalItems={results.length}
						onPageChange={page => table.setPageIndex(page - 1)}
						onPageSizeChange={size => table.setPageSize(size)}
					/>

					<div className='flex items-center justify-between'>
						<span className='body-small-regular text-greyscale-600'>
							{selectedLeads.length} empresa
							{selectedLeads.length !== 1 ? 's' : ''} selecionada
							{selectedLeads.length !== 1 ? 's' : ''}
						</span>

						<div className='flex gap-3'>
							<Button type='button' variant='outline' onClick={handleClose} className='cursor-pointer'>
								Cancelar
							</Button>
							<Button
								type='button'
								onClick={handleAddLeads}
								disabled={selectedLeads.length === 0 || isLoading}
								className='cursor-pointer'
							>
								<UserPlus className='size-4' />
								Adicionar Leads ({selectedLeads.length})
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

SearchResultsModal.displayName = 'SearchResultsModal'
