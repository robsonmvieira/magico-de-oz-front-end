import type { Response } from '@/-modules/shared/domain/classes'
import type { HttpClient } from '@/-modules/shared/infra/http/http-client'
import type { PaginationInput } from '@/-modules/shared/domain/types/pagination'
import type {
	AutocompleteInput,
	AutocompletePlace
} from '../domain/types/autocomplete'
import type { Lead } from '../domain/types/lead'
import type {
	CreateLeadsFromCriteriaData,
	CreateLeadsFromCriteriaInput,
	SearchLeadsData,
	SearchLeadsInput
} from '../domain/types/search-leads'

export type ListLeadsInput = PaginationInput

export class LeadsRepository {
	constructor(private readonly http: HttpClient) {}

	async autocomplete(
		input: AutocompleteInput
	): Promise<Response<AutocompletePlace[]>> {
		const searchParams: Record<string, string> = {
			query: input.query,
			country: input.country ?? 'br'
		}

		if (input.location) {
			searchParams.location = input.location
		}

		return this.http.get<AutocompletePlace[]>('crm/leads/autocomplete', {
			searchParams
		})
	}

	async searchByCriteria(
		input: SearchLeadsInput
	): Promise<Response<SearchLeadsData>> {
		const payload: Record<string, unknown> = {}

		if (input.companyIdentifier) {
			const companyIdentifier: Record<string, string> = {}
			if (input.companyIdentifier.companyName) {
				companyIdentifier.companyName = input.companyIdentifier.companyName
			}
			if (input.companyIdentifier.cnpj) {
				companyIdentifier.cnpj = input.companyIdentifier.cnpj.replaceAll(/\D/g, '')
			}
			if (Object.keys(companyIdentifier).length > 0) {
				payload.companyIdentifier = companyIdentifier
			}
		}

		if (input.sectorFilter) {
			const sectorFilter: Record<string, unknown> = {}
			if (input.sectorFilter.sector) {
				sectorFilter.sector = input.sectorFilter.sector
			}
			if (input.sectorFilter.region) {
				sectorFilter.region = input.sectorFilter.region
			}
			if (input.sectorFilter.states?.length) {
				sectorFilter.states = input.sectorFilter.states
			}
			if (input.sectorFilter.size) {
				sectorFilter.size = input.sectorFilter.size
			}
			if (Object.keys(sectorFilter).length > 0) {
				payload.sectorFilter = sectorFilter
			}
		}

		if (input.advancedFilter) {
			const advancedFilter: Record<string, string> = {}
			if (input.advancedFilter.term) {
				advancedFilter.term = input.advancedFilter.term
			}
			if (input.advancedFilter.foundationYear) {
				advancedFilter.foundationYear = input.advancedFilter.foundationYear
			}
			if (input.advancedFilter.keywords) {
				advancedFilter.keywords = input.advancedFilter.keywords
			}
			if (Object.keys(advancedFilter).length > 0) {
				payload.advancedFilter = advancedFilter
			}
		}

		if (input.limit) {
			payload.limit = input.limit
		}

		return this.http.post<SearchLeadsData>('crm/leads/search-by-criteria', {
			json: payload
		})
	}

	async createFromCriteria(
		input: CreateLeadsFromCriteriaInput
	): Promise<Response<CreateLeadsFromCriteriaData>> {
		return this.http.post<CreateLeadsFromCriteriaData>(
			'crm/leads/create-from-criteria',
			{
				json: { leads: input.leads }
			}
		)
	}

	async list(input?: ListLeadsInput): Promise<Response<Lead[]>> {
		const searchParams: Record<string, string> = {}

		if (input?.page) {
			searchParams.page = String(input.page)
		}

		if (input?.limit) {
			searchParams.limit = String(input.limit)
		}

		if (input?.sortBy) {
			searchParams.sortBy = input.sortBy
		}

		if (input?.sortOrder) {
			searchParams.sortOrder = input.sortOrder
		}

		if (input?.search) {
			searchParams.search = input.search
		}

		return this.http.get<Lead[]>('crm/leads', { searchParams })
	}

	async delete(id: string): Promise<Response<void>> {
		return this.http.delete<void>(`crm/leads/${id}`)
	}
}
