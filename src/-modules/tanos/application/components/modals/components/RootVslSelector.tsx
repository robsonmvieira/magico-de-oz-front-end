import { Check, ChevronsUpDown } from 'lucide-react'
import type { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import {
	languages,
	type VslFormData
} from '@/-modules/tanos/domain/schemas/vsl-form.schema'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface RootVslSelectorProps {
	control: Control<VslFormData>
	setValue: UseFormSetValue<VslFormData>
	watch: UseFormWatch<VslFormData>
	open: boolean
	setOpen: (open: boolean) => void
}

export function RootVslSelector({
	control,
	setValue,
	watch,
	open,
	setOpen
}: RootVslSelectorProps) {
	const isDisabled = watch('is_root_vsl') === 1

	return (
		<FormField
			control={control}
			name='root_vsl_id'
			render={({ field }) => (
				<FormItem className='flex flex-col w-full'>
					<FormLabel>Root VSL</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild disabled={isDisabled}>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									disabled={isDisabled}
									className={cn(
										'w-full justify-between',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value
										? languages.find(language => language.value === field.value)
												?.label
										: 'Select Root VSL'}
									<ChevronsUpDown className='opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
							<Command>
								<CommandInput
									placeholder='Search Root VSL...'
									className='h-9'
								/>
								<CommandList>
									<CommandEmpty>No VSL found.</CommandEmpty>
									<CommandGroup>
										{languages.map(language => (
											<CommandItem
												key={language.value}
												value={language.label}
												onSelect={() => {
													setValue('root_vsl_id', language.value)
													setOpen(false)
												}}
											>
												{language.label}
												<Check
													className={cn(
														'ml-auto',
														language.value === field.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

RootVslSelector.displayName = 'RootVslSelector'
