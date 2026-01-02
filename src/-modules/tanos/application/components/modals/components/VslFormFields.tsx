import type { Control } from 'react-hook-form'
import type { VslFormData } from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface VslFormFieldsProps {
	control: Control<VslFormData>
}

export function VslFormFields({ control }: VslFormFieldsProps) {
	return (
		<>
			<div className='flex gap-2 w-full'>
				<FormField
					control={control}
					name='owner_name'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Owner Name</FormLabel>
							<FormControl>
								<Input placeholder='Owner Name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='product_name'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Product Name</FormLabel>
							<FormControl>
								<Input placeholder='Product Name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className='flex gap-2 w-full'>
				<FormField
					control={control}
					name='ad_url'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Ad URL</FormLabel>
							<FormControl>
								<Input placeholder='Ad URL' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name='inlead_url'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Inlead URL</FormLabel>
							<FormControl>
								<Input placeholder='Inlead URL' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	)
}

VslFormFields.displayName = 'VslFormFields'
