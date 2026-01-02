import type { ReactNode } from 'react'
import type { DrawerItem } from '@/-modules/shared/domain/types/drawer-item'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer'

export interface DrawerPreviewBaseProps<TItem extends DrawerItem> {
	isOpen: boolean
	onClose: () => void
	selectedItem: TItem | null
	title?: string
	icon?: ReactNode
	children: ReactNode
	footerActions?: ReactNode
	footerInfo?: ReactNode
	width?: string
}

export function DrawerPreviewBase<TItem extends DrawerItem>({
	isOpen,
	onClose,
	selectedItem,
	title,
	icon,
	children,
	footerActions,
	footerInfo,
	width = '800px'
}: DrawerPreviewBaseProps<TItem>) {
	return (
		<Drawer
			open={isOpen}
			onOpenChange={open => !open && onClose()}
			direction='right'
		>
			<DrawerContent
				className={`w-[${width}] !max-w-[${width}] sm:!max-w-[${width}] h-screen flex flex-col`}
			>
				<DrawerHeader className='flex-shrink-0'>
					<DrawerTitle className='text-lg font-medium flex items-center gap-2'>
						{icon}
						{title || selectedItem?.title}
					</DrawerTitle>
				</DrawerHeader>

				<div className='flex-1 px-6 pb-4 min-h-0'>{children}</div>

				<DrawerFooter className='flex flex-col gap-2 flex-shrink-0'>
					{footerInfo}
					{footerActions}

					<DrawerClose asChild>
						<Button
							variant='outline'
							onClick={onClose}
							className='h-12 cursor-pointer'
						>
							Fechar
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

DrawerPreviewBase.displayName = 'DrawerPreviewBase'
