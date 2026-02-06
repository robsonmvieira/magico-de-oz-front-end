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

export interface ServerPaginationProps {
	currentPage: number
	totalPages: number
	pageSize: number
	totalItems: number
	onPageChange: (page: number) => void
	onPageSizeChange: (pageSize: number) => void
}

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
	serverPagination?: ServerPaginationProps
}

export function DataTable<TData, TValue>({
	columns,
	data,
	emptyMessage = 'Nenhum resultado encontrado.',
	filterableColumns = [],
	searchColumn,
	searchValue,
	defaultPageSize = 10,
	serverPagination
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [pageSize, setPageSize] = useState(defaultPageSize)

	const isServerPagination = !!serverPagination

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
		getPaginationRowModel: isServerPagination ? undefined : getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: isServerPagination,
		state: {
			columnFilters: activeFilters.length > 0 ? activeFilters : columnFilters,
			pagination: {
				pageIndex: 0,
				pageSize: isServerPagination ? serverPagination.pageSize : pageSize
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
				currentPage={
					isServerPagination
						? serverPagination.currentPage
						: table.getState().pagination.pageIndex + 1
				}
				totalPages={
					isServerPagination ? serverPagination.totalPages : table.getPageCount()
				}
				pageSize={
					isServerPagination
						? serverPagination.pageSize
						: table.getState().pagination.pageSize
				}
				totalItems={isServerPagination ? serverPagination.totalItems : data.length}
				onPageChange={page =>
					isServerPagination
						? serverPagination.onPageChange(page)
						: table.setPageIndex(page - 1)
				}
				onPageSizeChange={size =>
					isServerPagination
						? serverPagination.onPageSizeChange(size)
						: table.setPageSize(size)
				}
			/>
		</div>
	)
}
