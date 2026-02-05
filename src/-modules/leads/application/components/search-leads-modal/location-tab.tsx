import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MapPin, Search, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	defaultLocationSearchValues,
	type LocationSearchFormData,
	locationSearchSchema
} from '@/-modules/leads/domain/schemas/search-leads.schema'
import type { AutocompletePlace } from '@/-modules/leads/domain/types/autocomplete'
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
import { useLeadsUseCases } from '../../hooks'

const inputClassName = cn(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
	'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
)

interface LocationTabProps {
	readonly onSearch: (data: LocationSearchFormData) => void
	readonly onCancel: () => void
}

export function LocationTab({
	onSearch,
	onCancel
}: Readonly<LocationTabProps>) {
	const [searchValue, setSearchValue] = useState('')
	const [predictions, setPredictions] = useState<AutocompletePlace[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [showDropdown, setShowDropdown] = useState(false)
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

	const { autocompletePlaces } = useLeadsUseCases()

	const form = useForm<LocationSearchFormData>({
		resolver: zodResolver(locationSearchSchema),
		defaultValues: defaultLocationSearchValues
	})

	const searchPlaces = useCallback(
		async (input: string) => {
			if (!input || input.length < 3) {
				setPredictions([])
				setShowDropdown(false)
				return
			}

			setIsLoading(true)

			try {
				const response = await autocompletePlaces.execute({ query: input })

				if (response.data && !response.has_error) {
					setPredictions(response.data)
					setShowDropdown(true)
				} else {
					setPredictions([])
					setShowDropdown(false)
				}
			} catch (error) {
				console.error('Erro ao buscar lugares:', error)
				setPredictions([])
				setShowDropdown(false)
			} finally {
				setIsLoading(false)
			}
		},
		[autocompletePlaces]
	)

	const handleInputChange = (value: string) => {
		setSearchValue(value)
		form.setValue('placeName', value)

		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current)
		}

		debounceTimeout.current = setTimeout(() => {
			searchPlaces(value)
		}, 300)
	}

	const handleSelectPlace = (place: AutocompletePlace) => {
		setSearchValue(place.name)
		setShowDropdown(false)
		setPredictions([])
		form.setValue('placeId', place.placeId)
		form.setValue('placeName', place.name)
	}

	const handleClearSelection = () => {
		setSearchValue('')
		setPredictions([])
		setShowDropdown(false)
		form.setValue('placeId', '')
		form.setValue('placeName', '')
	}

	const handleSubmit = (data: LocationSearchFormData) => {
		onSearch(data)
		form.reset()
		setSearchValue('')
	}

	return (
		<TabsContent value='location' className='mt-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='placeName'
						render={() => (
							<FormItem>
								<FormLabel>O que você está buscando?</FormLabel>
								<FormControl>
									<div className='relative'>
										<div className='relative'>
											<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
											<Input
												placeholder='Ex: Restaurante em Copacabana, Clínica veterinária em Betim...'
												value={searchValue}
												onChange={e => handleInputChange(e.target.value)}
												onFocus={() =>
													predictions.length > 0 && setShowDropdown(true)
												}
												className={cn(inputClassName, 'pl-9 pr-9')}
											/>
											{isLoading && (
												<Loader2 className='absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-muted-foreground' />
											)}
											{searchValue && !isLoading && (
												<button
													type='button'
													onClick={handleClearSelection}
													className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
												>
													<X className='size-4' />
												</button>
											)}
										</div>

										{showDropdown && predictions.length > 0 && (
											<div className='absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto'>
												{predictions.map(place => (
													<button
														key={place.placeId}
														type='button'
														onClick={() => handleSelectPlace(place)}
														className='w-full px-3 py-2 text-left hover:bg-accent flex items-start gap-2'
													>
														<MapPin className='size-4 mt-0.5 shrink-0 text-muted-foreground' />
														<div className='flex flex-col'>
															<span className='text-sm font-medium'>
																{place.name}
															</span>
															<span className='text-xs text-muted-foreground'>
																{place.address}
															</span>
														</div>
													</button>
												))}
											</div>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<p className='text-sm text-muted-foreground'>
						Digite o tipo de estabelecimento e a localização para buscar leads.
						Ex: "Pizzaria em Belo Horizonte", "Academia em Ipanema"
					</p>

					<div className='flex justify-end gap-3 pt-4'>
						<Button type='button' variant='outline' onClick={onCancel}>
							Cancelar
						</Button>
						<Button type='submit' disabled={!searchValue}>
							<Search className='size-4' />
							Buscar
						</Button>
					</div>
				</form>
			</Form>
		</TabsContent>
	)
}

LocationTab.displayName = 'LocationTab'
