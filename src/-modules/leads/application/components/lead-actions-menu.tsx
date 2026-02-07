import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

interface LeadActionsMenuProps {
	onDelete: () => void
}

export function LeadActionsMenu({ onDelete }: Readonly<LeadActionsMenuProps>) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='h-8 w-8 cursor-pointer'
					onClick={(e) => e.stopPropagation()}
				>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end' className='w-40 p-2'>
				<button
					type='button'
					onClick={(e) => {
						e.stopPropagation()
						setOpen(false)
						onDelete()
					}}
					className='flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer'
				>
					<Trash2 className='size-4' />
					Deletar
				</button>
			</PopoverContent>
		</Popover>
	)
}
