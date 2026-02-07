import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import {
	defaultNameCnpjValues,
	type NameCnpjFormData,
	nameCnpjSchema
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

const inputClassName = cn(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
)

interface NameCnpjTabProps {
	readonly onSearch: (data: NameCnpjFormData) => void
	readonly onCancel: () => void
	readonly isLoading?: boolean
}

export function NameCnpjTab({
	onSearch,
	onCancel,
	isLoading = false
}: Readonly<NameCnpjTabProps>) {
	const form = useForm<NameCnpjFormData>({
		resolver: zodResolver(nameCnpjSchema),
		defaultValues: defaultNameCnpjValues
	})

	const handleSubmit = (data: NameCnpjFormData) => {
		onSearch(data)
		form.reset()
	}

	return (
		<TabsContent value='name-cnpj' className='mt-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='companyName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome da Empresa</FormLabel>
								<FormControl>
									<Input
										placeholder='Digite o nome da empresa'
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
						name='cnpj'
						render={({ field }) => (
							<FormItem>
								<FormLabel>CNPJ</FormLabel>
								<FormControl>
									<IMaskInput
										mask='00.000.000/0000-00'
										placeholder='00.000.000/0000-00'
										value={field.value}
										onAccept={value => field.onChange(value)}
										className={inputClassName}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end gap-3 pt-4'>
						<Button type='button' variant='outline' onClick={onCancel} disabled={isLoading} className='cursor-pointer'>
							Cancelar
						</Button>
						<Button type='submit' disabled={isLoading} className='cursor-pointer'>
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

NameCnpjTab.displayName = 'NameCnpjTab'
