import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
	defaultSectorRegionSizeValues,
	type SectorRegionSizeFormData,
	sectorRegionSizeSchema
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { TabsContent } from '@/components/ui/tabs'

const SECTOR_OPTIONS = [
	{ value: 'tech', label: 'Tecnologia' },
	{ value: 'finance', label: 'Financeiro' },
	{ value: 'health', label: 'Saúde' },
	{ value: 'education', label: 'Educação' },
	{ value: 'retail', label: 'Varejo' },
	{ value: 'industry', label: 'Indústria' },
	{ value: 'agro', label: 'Agronegócio' },
	{ value: 'construction', label: 'Construção Civil' },
	{ value: 'logistics', label: 'Transporte e Logística' },
	{ value: 'hospitality', label: 'Hotelaria e Alimentação' },
	{ value: 'real_estate', label: 'Imobiliário' },
	{ value: 'services', label: 'Serviços Gerais' }
]

const REGION_OPTIONS = [
	{ value: 'norte', label: 'Norte' },
	{ value: 'nordeste', label: 'Nordeste' },
	{ value: 'centro-oeste', label: 'Centro-Oeste' },
	{ value: 'sudeste', label: 'Sudeste' },
	{ value: 'sul', label: 'Sul' }
]

const SIZE_OPTIONS = [
	{ value: '01', label: 'Micro Empresa (ME)' },
	{ value: '03', label: 'Empresa de Pequeno Porte (EPP)' },
	{ value: '05', label: 'Demais (Médio/Grande)' }
]

interface SectorRegionSizeTabProps {
	readonly onSearch: (data: SectorRegionSizeFormData) => void
	readonly onCancel: () => void
}

export function SectorRegionSizeTab({
	onSearch,
	onCancel
}: Readonly<SectorRegionSizeTabProps>) {
	const form = useForm<SectorRegionSizeFormData>({
		resolver: zodResolver(sectorRegionSizeSchema),
		defaultValues: defaultSectorRegionSizeValues
	})

	const handleSubmit = (data: SectorRegionSizeFormData) => {
		onSearch(data)
		form.reset()
	}

	return (
		<TabsContent value='sector-region-size' className='mt-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='sector'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Setor</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione o setor' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{SECTOR_OPTIONS.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='region'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Região</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione a região' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{REGION_OPTIONS.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='size'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Porte</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione o porte' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{SIZE_OPTIONS.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-end gap-3 pt-4'>
						<Button type='button' variant='outline' onClick={onCancel}>
							Cancelar
						</Button>
						<Button type='submit'>
							<Search className='size-4' />
							Buscar
						</Button>
					</div>
				</form>
			</Form>
		</TabsContent>
	)
}

SectorRegionSizeTab.displayName = 'SectorRegionSizeTab'
