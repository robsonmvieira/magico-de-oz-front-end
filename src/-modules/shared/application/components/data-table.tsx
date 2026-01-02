import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { TablePagination } from './table-pagination'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	emptyMessage?: string
	filterableColumns?: {
		id: string
		value: string
	}[]
	searchColumn?: string
	searchValue?: string
	defaultPageSize?: number
}

export function DataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = 'Nenhum resultado encontrado.',
	filterableColumns = [],
	searchColumn,
	searchValue,
	defaultPageSize = 10
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pageSize, setPageSize] = useState(defaultPageSize)

	// Atualiza filtros quando props mudam
	const activeFilters = [
		...filterableColumns.map(f => ({ id: f.id, value: f.value })),
		...(searchColumn && searchValue
			? [{ id: searchColumn, value: searchValue }]
			: [])
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters: activeFilters.length > 0 ? activeFilters : columnFilters,
			pagination: {
				pageIndex: 0,
				pageSize
			}
		},
		onColumnFiltersChange: setColumnFilters,
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
									{emptyMessage}
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
