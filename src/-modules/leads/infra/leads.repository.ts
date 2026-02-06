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
		const advancedFilter: Record<string, string> = {}

		if (input.term) {
			advancedFilter.term = input.term
		}

		if (input.foundationYear) {
			advancedFilter.foundationYear = input.foundationYear
		}

		if (input.keywords) {
			advancedFilter.keywords = input.keywords
		}

		return this.http.post<SearchLeadsData>('crm/leads/search-by-criteria', {
			json: { advancedFilter }
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
}
