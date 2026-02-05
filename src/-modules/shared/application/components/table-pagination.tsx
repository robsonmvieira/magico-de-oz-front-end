import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface TablePaginationProps {
	currentPage: number
	totalPages: number
	pageSize: number
	totalItems: number
	onPageChange: (page: number) => void
	onPageSizeChange: (pageSize: number) => void
	pageSizeOptions?: number[]
}

export function TablePagination({
	currentPage,
	totalPages,
	pageSize,
	totalItems,
	onPageChange,
	onPageSizeChange,
	pageSizeOptions = [10, 20, 30, 50, 100]
}: Readonly<TablePaginationProps>) {
	const startItem = (currentPage - 1) * pageSize + 1
	const endItem = Math.min(currentPage * pageSize, totalItems)

	const canGoPrevious = currentPage > 1
	const canGoNext = currentPage < totalPages

	return (
		<div className='flex items-center justify-between px-2 py-4'>
			<div className='flex items-center gap-2'>
				<span className='body-small-regular text-greyscale-700'>
					Mostrando
				</span>
				<Select
					value={pageSize.toString()}
					onValueChange={value => onPageSizeChange(Number(value))}
				>
					<SelectTrigger className='h-8 w-[70px]'>
						<SelectValue placeholder={pageSize.toString()} />
					</SelectTrigger>
					<SelectContent side='top'>
						{pageSizeOptions.map(size => (
							<SelectItem key={size} value={size.toString()}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<span className='body-small-regular text-greyscale-700'>
					por página
				</span>
			</div>

			<div className='flex items-center gap-6'>
				<span className='body-small-regular text-greyscale-700'>
					{startItem}-{endItem} de {totalItems}
				</span>

				<div className='flex items-center gap-2'>
					<span className='body-small-regular text-greyscale-700'>
						Página {currentPage} de {totalPages}
					</span>
					<div className='flex items-center gap-1'>
						<Button
							variant='outline'
							size='icon'
							className={`h-8 w-8 ${canGoPrevious ? 'cursor-pointer' : 'cursor-not-allowed'}`}
							onClick={() => onPageChange(currentPage - 1)}
							disabled={!canGoPrevious}
						>
							<ChevronLeft className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							size='icon'
							className={`h-8 w-8 ${canGoNext ? 'cursor-pointer' : 'cursor-not-allowed'}`}
							onClick={() => onPageChange(currentPage + 1)}
							disabled={!canGoNext}
						>
							<ChevronRight className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
