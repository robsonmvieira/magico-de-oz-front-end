import { Check, ChevronsUpDown } from 'lucide-react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import {
	languagesOptions,
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

interface LanguageSelectorProps {
	control: Control<VslFormData>
	setValue: UseFormSetValue<VslFormData>
	open: boolean
	setOpen: (open: boolean) => void
}

export function LanguageSelector({
	control,
	setValue,
	open,
	setOpen
}: LanguageSelectorProps) {
	return (
		<FormField
			control={control}
			name='language_option'
			render={({ field }) => (
				<FormItem className='flex flex-col w-full'>
					<FormLabel>Language Options</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									className={cn(
										'w-full justify-between',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value
										? languagesOptions.find(
												language => language.value === field.value
											)?.label
										: 'Select Language Option'}
									<ChevronsUpDown className='opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
							<Command>
								<CommandInput
									placeholder='Search Language Option...'
									className='h-9'
								/>
								<CommandList>
									<CommandEmpty>No language found.</CommandEmpty>
									<CommandGroup>
										{languagesOptions.map(language => (
											<CommandItem
												key={language.value}
												value={language.label}
												onSelect={() => {
													setValue('language_option', language.value)
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

LanguageSelector.displayName = 'LanguageSelector'
