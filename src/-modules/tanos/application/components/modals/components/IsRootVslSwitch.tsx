import type { Control, UseFormSetValue } from 'react-hook-form'
import type { VslFormData } from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

interface IsRootVslSwitchProps {
	control: Control<VslFormData>
	setValue: UseFormSetValue<VslFormData>
}

export function IsRootVslSwitch({ control, setValue }: IsRootVslSwitchProps) {
	return (
		<FormField
			control={control}
			name='is_root_vsl'
			render={({ field }) => (
				<FormItem className='flex flex-col w-full'>
					<FormLabel>Is Root VSL</FormLabel>
					<FormControl>
						<Switch
							onCheckedChange={() =>
								setValue('is_root_vsl', field.value === 1 ? 0 : 1)
							}
							{...field}
							checked={field.value === 1}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

IsRootVslSwitch.displayName = 'IsRootVslSwitch'
