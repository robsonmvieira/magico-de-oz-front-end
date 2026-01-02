import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	defaultVslFormValues,
	type VslFormData,
	vslFormSchema
} from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import {
	IsRootVslSwitch,
	LanguageSelector,
	RootVslSelector,
	VideoUpload,
	VslFormFields
} from './components'

interface CreateVslModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (values: VslFormData) => void
}

export function CreateVslModal({
	isOpen,
	onClose,
	onSubmit
}: CreateVslModalProps) {
	const [openRootVsl, setOpenRootVsl] = useState(false)
	const [openLanguage, setOpenLanguage] = useState(false)

	const form = useForm<VslFormData>({
		resolver: zodResolver(vslFormSchema),
		defaultValues: defaultVslFormValues
	})

	const handleSubmit = (values: VslFormData) => {
		onSubmit(values)
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-[20vw] sm:max-w-[50vw]'>
				<DialogHeader className='flex flex-col gap-2 items-center'>
					<DialogTitle className='text-2xl font-bold'>
						Create your VSL
					</DialogTitle>
					<DialogDescription className='text-lg text-greyscale-700'>
						Fill all the fields to create your VSL. Our AI will do the rest.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-8 w-full'
					>
						<VslFormFields control={form.control} />

						<div className='flex gap-2 w-full'>
							<RootVslSelector
								control={form.control}
								setValue={form.setValue}
								watch={form.watch}
								open={openRootVsl}
								setOpen={setOpenRootVsl}
							/>

							<LanguageSelector
								control={form.control}
								setValue={form.setValue}
								open={openLanguage}
								setOpen={setOpenLanguage}
							/>
						</div>

						<div className='flex gap-2 w-full'>
							<VideoUpload control={form.control} />
						</div>

						<div>
							<IsRootVslSwitch
								control={form.control}
								setValue={form.setValue}
							/>
						</div>

						<Button type='submit'>Submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

CreateVslModal.displayName = 'CreateVslModal'
