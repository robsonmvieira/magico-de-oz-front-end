import { createFileRoute } from '@tanstack/react-router'
import { SquarePlay } from 'lucide-react'
import { useState } from 'react'
import { DrawerPreviewBase } from '@/-modules/shared/application/components/drawer-preview'
import { useToast } from '@/-modules/shared/application/hooks/useToast'
import {
	CreateVslModal,
	cardOptions,
	DateInfo,
	SidebarVsls,
	TryNowCard,
	VslContentRenderer,
	VslDrawerActions
} from '@/-modules/tanos/application/components'
import { useVslDrawerActions } from '@/-modules/tanos/application/hooks/useVslDrawerActions'
import { useCreateVsl } from '@/-modules/tanos/application/mutations/mutations-create-vsl'
import type { VslFormData } from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import { useVslStore } from '@/-modules/tanos/infra/store/vsl.store'

export const Route = createFileRoute('/_app/tanos/')({
	component: TanosComponent
})

export default function TanosComponent() {
	const toast = useToast()
	const createVslMutation = useCreateVsl()
	const [isVslModalOpen, setIsVslModalOpen] = useState(false)
	const [currentContentUrl, setCurrentContentUrl] = useState<string | null>(
		null
	)

	// Drawer state
	const isDrawerOpen = useVslStore(state => state.isDrawerOpen)
	const selectedVsl = useVslStore(state => state.selectedItem)
	const closeDrawer = useVslStore(state => state.closeDrawer)

	const {
		handleUpdateFavorite,
		handleDeleteVsl,
		handleOpenFullView,
		handleCancel
	} = useVslDrawerActions({
		selectedVsl,
		onClose: closeDrawer
	})

	const handleOpenCurrentContent = () => {
		if (currentContentUrl) {
			window.open(currentContentUrl, '_blank')
		}
	}

	const handleSubmitVsl = (values: VslFormData) => {
		createVslMutation.mutate(values, {
			onSuccess: () => {
				toast.success('Solicitação realizada com sucesso!', {
					description: 'Em breve você receberá o conteúdo da vsl.',
					duration: 4000
				})
			}
		})
	}

	const handleCardClick = (cardId: string) => {
		if (cardId === 'vsl') {
			setIsVslModalOpen(true)
		}
	}

	return (
		<div className='h-full flex gap-4 overflow-hidden'>
			<SidebarVsls />

			<div className='h-full min-h-0 rounded-lg p-4 overflow-hidden w-full'>
				<div className='flex flex-col gap-4 w-full h-full'>
					<div className='flex flex-col gap-2 items-center'>
						<h1 className='text-2xl text-center text-primary-500 font-bold'>
							What do you want to create?
						</h1>
						<h4 className='text-lg text-greyscale-700'>
							We can build the new world
						</h4>
					</div>

					<div className='flex gap-4'>
						{cardOptions.map(card => (
							<TryNowCard
								key={card.id}
								icon={card.icon}
								title={card.title}
								description={card.description}
								onClick={() => handleCardClick(card.id)}
								disabled={!card.enabled}
							/>
						))}
					</div>
				</div>
			</div>

			<CreateVslModal
				isOpen={isVslModalOpen}
				onClose={() => setIsVslModalOpen(false)}
				onSubmit={handleSubmitVsl}
			/>

			<DrawerPreviewBase
				isOpen={isDrawerOpen}
				onClose={handleCancel}
				selectedItem={selectedVsl}
				icon={<SquarePlay className='w-10 h-10' />}
				footerInfo={<DateInfo date={selectedVsl?.created_at} />}
				footerActions={
					<VslDrawerActions
						selectedVsl={selectedVsl}
						onOpenFullView={handleOpenCurrentContent}
						onUpdateFavorite={handleUpdateFavorite}
						onDelete={handleDeleteVsl}
					/>
				}
			>
				<VslContentRenderer
					vsl={selectedVsl}
					onOpenFullView={handleOpenFullView}
					onContentChange={setCurrentContentUrl}
				/>
			</DrawerPreviewBase>
		</div>
	)
}

TanosComponent.displayName = 'TanosComponent'
