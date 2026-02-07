import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import {
	type AdvancedSearchFormData,
	advancedSearchSchema,
	defaultAdvancedSearchValues
} from '@/-modules/leads/domain/schemas/search-leads.schema'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const numericInputClassName = cn(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
)

interface AdvancedTabProps {
	readonly onSearch: (data: AdvancedSearchFormData) => void
	readonly onCancel: () => void
	readonly isLoading?: boolean
}

export function AdvancedTab({
	onSearch,
	onCancel,
	isLoading = false
}: Readonly<AdvancedTabProps>) {
	const form = useForm<AdvancedSearchFormData>({
		resolver: zodResolver(advancedSearchSchema),
		defaultValues: defaultAdvancedSearchValues
	})

	const handleSubmit = (data: AdvancedSearchFormData) => {
		onSearch(data)
		form.reset()
	}

	return (
		<TabsContent value='advanced' className='mt-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='term'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Termo de Busca</FormLabel>
								<FormControl>
									<Input
										placeholder='Ex: Clinica veterinaria em Betim'
										className='w-full'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='foundationYear'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ano de Fundação</FormLabel>
								<FormControl>
									<NumericFormat
										decimalScale={0}
										allowNegative={false}
										allowLeadingZeros={false}
										maxLength={4}
										placeholder='Ex: 2020'
										value={field.value}
										onValueChange={values => field.onChange(values.value)}
										className={numericInputClassName}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='keywords'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Palavras-chave</FormLabel>
								<FormControl>
									<Input
										placeholder='Ex: Vacina, Banho, Tosa, etc.'
										className='w-full'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end gap-3 pt-4'>
						<Button type='button' variant='outline' onClick={onCancel} className='cursor-pointer' disabled={isLoading}>
							Cancelar
						</Button>
						<Button type='submit' className='cursor-pointer' disabled={isLoading}>
							{isLoading ? (
								<Loader2 className='size-4 animate-spin' />
							) : (
								<Search className='size-4' />
							)}
							{isLoading ? 'Buscando...' : 'Buscar'}
						</Button>
					</div>
				</form>
			</Form>
		</TabsContent>
	)
}

AdvancedTab.displayName = 'AdvancedTab'
