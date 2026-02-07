import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	LeadDetailsModal,
	LeadPath,
	SelectPopover
} from '@/-modules/leads/application/components'
import { createLeadsColumns } from '@/-modules/leads/application/components/leads-columns'
import { useLeadsUseCases } from '@/-modules/leads/application/hooks'
import type { Lead } from '@/-modules/leads/domain/types/lead'
import { DataTable } from '@/-modules/shared/application/components/data-table'
import { useToast } from '@/-modules/shared/application/hooks'
import { Input } from '@/components/ui/input'

interface PaginationState {
	page: number
	limit: number
	totalItems: number
	totalPages: number
}

const temperatureFilterData = [
	{ label: 'Todas', value: 'all' },
	{ label: 'Frio', value: 'cold' },
	{ label: 'Morno', value: 'warm' },
	{ label: 'Quente', value: 'hot' }
]

const stageFilterData = [
	{ label: 'Todas', value: 'all' },
	{ label: 'Novo', value: 'new' },
	{ label: 'Contactado', value: 'contacted' },
	{ label: 'Qualificado', value: 'qualified' },
	{ label: 'Proposta', value: 'proposal' },
	{ label: 'Negociação', value: 'negotiation' },
	{ label: 'Ganho', value: 'won' },
	{ label: 'Perdido', value: 'lost' }
]

const sourceFilterData = [
	{ label: 'Todas', value: 'all' },
	{ label: 'Google Maps', value: 'google_maps' },
	{ label: 'Manual', value: 'manual' },
	{ label: 'Importação', value: 'import' },
	{ label: 'API', value: 'api' },
	{ label: 'Receita Federal', value: 'receita_federal' }
]

const DEFAULT_PAGE_SIZE = 10

function AllLeads() {
	const [temperatureFilter, setTemperatureFilter] = useState('')
	const [stageFilter, setStageFilter] = useState('')
	const [sourceFilter, setSourceFilter] = useState('')
	const [searchValue, setSearchValue] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [leads, setLeads] = useState<Lead[]>([])
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [pagination, setPagination] = useState<PaginationState>({
		page: 1,
		limit: DEFAULT_PAGE_SIZE,
		totalItems: 0,
		totalPages: 0
	})

	const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

	const { listLeads, deleteLead } = useLeadsUseCases()
	const toast = useToast()

	useEffect(() => {
		const fetchLeads = async () => {
			try {
				const response = await listLeads.execute({
					page: pagination.page,
					limit: pagination.limit,
					search: searchQuery || undefined,
					sortBy: 'createdAt',
					sortOrder: 'desc'
				})
				if (response.data && !response.hasError) {
					setLeads(response.data)
					setPagination((prev) => ({
						...prev,
						totalItems: response.totalItems ?? 0,
						totalPages: response.totalPages ?? 0
					}))
				}
			} catch (error) {
				console.error('Erro ao carregar leads:', error)
			}
		}

		fetchLeads()
	}, [pagination.page, pagination.limit, searchQuery, listLeads])

	const handleSearchChange = (value: string) => {
		setSearchValue(value)

		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current)
		}

		debounceTimeout.current = setTimeout(() => {
			setSearchQuery(value)
			setPagination((prev) => ({ ...prev, page: 1 }))
		}, 500)
	}

	const handlePageChange = (page: number) => {
		setPagination((prev) => ({ ...prev, page }))
	}

	const handlePageSizeChange = (limit: number) => {
		setPagination((prev) => ({ ...prev, limit, page: 1 }))
	}

	const handleRowClick = (lead: Lead) => {
		setSelectedLead(lead)
		setIsModalOpen(true)
	}

	const handleDeleteLead = useCallback(
		async (lead: Lead) => {
			try {
				const response = await deleteLead.execute(lead.id)
				if (!response.hasError) {
					setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id))
					toast.success('Lead deletado com sucesso.')
					setPagination((prev) => ({
						...prev,
						totalItems: Math.max(0, prev.totalItems - 1)
					}))
				} else {
					toast.error('Erro ao deletar lead.')
				}
			} catch (error) {
				console.error('Erro ao deletar lead:', error)
				toast.error('Erro ao deletar lead.')
			}
		},
		[deleteLead, toast]
	)

	const columns = useMemo(
		() => createLeadsColumns({ onDelete: handleDeleteLead }),
		[handleDeleteLead]
	)

	const filters = [
		...(temperatureFilter && temperatureFilter !== 'all'
			? [{ id: 'temperature', value: temperatureFilter }]
			: []),
		...(stageFilter && stageFilter !== 'all'
			? [{ id: 'stage', value: stageFilter }]
			: []),
		...(sourceFilter && sourceFilter !== 'all'
			? [{ id: 'source', value: sourceFilter }]
			: [])
	]

	return (
		<div className='p-4 space-y-6 bg-white rounded-2xl'>
			<LeadPath />
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-4'>
					<SelectPopover
						label='Temperatura'
						options={temperatureFilterData}
						onValueChange={setTemperatureFilter}
					/>
					<SelectPopover
						label='Etapa'
						options={stageFilterData}
						onValueChange={setStageFilter}
					/>
					<SelectPopover
						label='Origem'
						options={sourceFilterData}
						onValueChange={setSourceFilter}
					/>
				</div>
				<div className='flex items-center shadow-sm rounded-md px-4 py-2'>
					<Search className='size-4 text-greyscale-500' />
					<Input
						className='shadow-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
						placeholder='Buscar lead...'
						value={searchValue}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={leads}
				filterableColumns={filters}
				emptyMessage='Nenhum lead encontrado.'
				serverPagination={{
					currentPage: pagination.page,
					totalPages: pagination.totalPages,
					pageSize: pagination.limit,
					totalItems: pagination.totalItems,
					onPageChange: handlePageChange,
					onPageSizeChange: handlePageSizeChange
				}}
				onRowClick={handleRowClick}
			/>
			<LeadDetailsModal
				lead={selectedLead}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
			/>
		</div>
	)
}

export const Route = createFileRoute('/_app/leads')({
	component: AllLeads
})
