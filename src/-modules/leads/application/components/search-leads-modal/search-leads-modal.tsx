import { ChartPie, MapPin, SlidersHorizontal, Store } from 'lucide-react'
import { useState } from 'react'
import type {
	AdvancedSearchFormData,
	LocationSearchFormData,
	NameCnpjFormData,
	SectorRegionSizeFormData
} from '@/-modules/leads/domain/schemas/search-leads.schema'
import { useLeadsUseCases } from '@/-modules/leads/application/hooks/useLeadsUseCases'
import type { SearchLeadResult } from '@/-modules/leads/domain/types/search-leads'
import { useToast } from '@/-modules/shared/application/hooks/useToast'
import { useLoading } from '@/-modules/shared/infra/loading/loading-context'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdvancedTab } from './advanced-tab'
import { LocationTab } from './location-tab'
import { NameCnpjTab } from './name-cnpj-tab'
import { SectorRegionSizeTab } from './sector-region-size-tab'
import { SearchResultsModal } from './search-results-modal'

interface SearchLeadsModalProps {
	readonly isOpen: boolean
	readonly onClose: () => void
}

export function SearchLeadsModal({
	isOpen,
	onClose
}: Readonly<SearchLeadsModalProps>) {
	const [activeTab, setActiveTab] = useState('name-cnpj')
	const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)
	const [searchResults, setSearchResults] = useState<SearchLeadResult[]>([])
	const [totalResults, setTotalResults] = useState(0)
	const [isSearching, setIsSearching] = useState(false)
	const { searchLeadsByCriteria, createLeadsFromCriteria } = useLeadsUseCases()
	const [isAddingLeads, setIsAddingLeads] = useState(false)
	const toast = useToast()
	const { startLoading, stopLoading } = useLoading()

	const handleNameCnpjSearch = (data: NameCnpjFormData) => {
		console.log('Busca por Nome/CNPJ:', data)
		onClose()
	}

	const handleSectorRegionSizeSearch = (data: SectorRegionSizeFormData) => {
		console.log('Busca por Setor/Região/Porte:', data)
		onClose()
	}

	const handleAdvancedSearch = async (data: AdvancedSearchFormData) => {
		setIsSearching(true)
		try {
			const response = await searchLeadsByCriteria.execute(data)
			if (response.data) {
				setSearchResults(response.data.results)
				setTotalResults(response.data.total)
				setIsResultsModalOpen(true)
			}
		} catch (error) {
			console.error('Erro na busca:', error)
		} finally {
			setIsSearching(false)
		}
	}

	const handleLocationSearch = (data: LocationSearchFormData) => {
		console.log('Busca por Localização:', data)
		onClose()
	}

	const buildSuccessDescription = (created: number, skipped: number) => {
		const parts: string[] = []
		if (created > 0) {
			parts.push(`${created} lead${created > 1 ? 's' : ''} criado${created > 1 ? 's' : ''}`)
		}
		if (skipped > 0) {
			parts.push(`${skipped} ignorado${skipped > 1 ? 's' : ''}`)
		}
		return parts.join(', ')
	}

	const handleAddLeads = async (leads: SearchLeadResult[]) => {
		setIsAddingLeads(true)
		startLoading('Adicionando leads...')
		try {
			const response = await createLeadsFromCriteria.execute({ leads })
			if (response.data && !response.hasError) {
				const { createdCount, skippedCount } = response.data
				toast.success('Leads adicionados com sucesso!', {
					description: buildSuccessDescription(createdCount, skippedCount)
				})
				setIsResultsModalOpen(false)
				onClose()
			} else {
				toast.error('Erro ao adicionar leads', {
					description: response.errorMessage || 'Tente novamente mais tarde'
				})
			}
		} catch (error) {
			console.error('Erro ao adicionar leads:', error)
			toast.error('Erro ao adicionar leads', {
				description: 'Ocorreu um erro inesperado. Tente novamente.'
			})
		} finally {
			setIsAddingLeads(false)
			stopLoading()
		}
	}

	const handleResultsModalClose = () => {
		setIsResultsModalOpen(false)
	}

	return (
		<>
			<Dialog open={isOpen && !isResultsModalOpen} onOpenChange={onClose}>
				<DialogContent className='sm:max-w-[750px]'>
					<DialogHeader>
						<DialogTitle className='text-xl font-semibold text-greyscale-800'>
							Buscar Leads
						</DialogTitle>
						<DialogDescription className='text-greyscale-600'>
							Selecione o tipo de busca e preencha os campos desejados
						</DialogDescription>
					</DialogHeader>

					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full mt-4'
					>
						<TabsList className='w-full grid grid-cols-4'>
							<TabsTrigger value='name-cnpj'>
								<Store className='size-4' />
								Nome ou CNPJ
							</TabsTrigger>
							<TabsTrigger value='sector-region-size'>
								<ChartPie className='size-4' />
								Setor, Região e Porte
							</TabsTrigger>
							<TabsTrigger value='location'>
								<MapPin className='size-4' />
								Estabelecimentos
							</TabsTrigger>
							<TabsTrigger value='advanced' disabled={isSearching}>
								<SlidersHorizontal className='size-4' />
								Avançado
							</TabsTrigger>
						</TabsList>

						<NameCnpjTab onSearch={handleNameCnpjSearch} onCancel={onClose} />

						<SectorRegionSizeTab
							onSearch={handleSectorRegionSizeSearch}
							onCancel={onClose}
						/>

						<LocationTab onSearch={handleLocationSearch} onCancel={onClose} />

						<AdvancedTab onSearch={handleAdvancedSearch} onCancel={onClose} />
					</Tabs>
				</DialogContent>
			</Dialog>

			<SearchResultsModal
				isOpen={isResultsModalOpen}
				onClose={handleResultsModalClose}
				results={searchResults}
				total={totalResults}
				onAddLeads={handleAddLeads}
				isLoading={isAddingLeads}
			/>
		</>
	)
}

SearchLeadsModal.displayName = 'SearchLeadsModal'
